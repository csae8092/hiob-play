import type { PageLoad } from './$types.js';
import { data_mapping } from '$lib/constants.js';
import { error } from '@sveltejs/kit';
import type { VersesData, PassagesData, MidrashData } from '$lib/datatypes.js';

type PayloadTypeMap = {
	verses: VersesData;
	passages: PassagesData;
	midrash: MidrashData;
};

type DataMap = typeof data_mapping;
type ItemKey = keyof DataMap;

export const load: PageLoad = async ({ fetch, params, url }) => {
	const item = params.item;
	const pageSize = Number(url.searchParams.get('pageSize') ?? 25);
	const page = Number(url.searchParams.get('page') ?? 1);
	if (!Number.isInteger(pageSize) || pageSize < 1) throw error(400, 'pageSize must be a positive integer');
	const clampedPageSize = Math.min(pageSize, 50);
	if (!Number.isInteger(page) || page < 1) throw error(400, 'page must be a positive integer'); if (!(item in data_mapping)) {
		throw error(404, 'Item not found');
	}

	const item_key: ItemKey = item as ItemKey;
	const item_data = data_mapping[item_key];
	const response = await fetch(`/data/${item_data.file}`);

	if (!response.ok) {
		throw error(response.status === 404 ? 404 : 500, `Data file not found: ${item_data.file}`);
	}

	const rawPayload = await response.json() as PayloadTypeMap[typeof item_key];
	const entries = Object.entries(rawPayload);
	const totalSize = entries.length;
	const start = (page - 1) * clampedPageSize;

	if (totalSize > 0 && start >= totalSize) {
		throw error(404, `Page ${page} is out of range (${totalSize} items, pageSize ${clampedPageSize})`);
	}

	const payload = Object.fromEntries(entries.slice(start, start + clampedPageSize));

	return {
		item,
		...item_data,
		payload,
		pageSize: clampedPageSize,
		page,
		totalSize,
		numberOfPages: Math.ceil(totalSize / clampedPageSize)
	};
};