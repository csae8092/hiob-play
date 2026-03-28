import type { PageLoad } from './$types.js';
import { data_mapping } from '$lib/constants.js';
import { error } from '@sveltejs/kit';
import type { VersesData, PassagesData, MidrashData } from '$lib/types';

type PayloadTypeMap = {
	verses: VersesData;
	passages: PassagesData;
	midrash: MidrashData;
};

type DataMap = typeof data_mapping;
type ItemKey = keyof DataMap;

export const load: PageLoad = async ({ fetch, params }) => {
	const item = params.item;
	if (!(item in data_mapping)) {
		throw error(404, 'Item not found');
	}

	const item_key: ItemKey = item as ItemKey;
	const item_data = data_mapping[item_key];
	const response = await fetch(`/data/${item_data.file}`);

	if (!response.ok) {
		throw error(response.status === 404 ? 404 : 500, `Data file not found: ${item_data.file}`);
	}

	const payload = await response.json() as PayloadTypeMap[typeof item_key];

	return {
		item,
		...item_data,
		payload
	};
};