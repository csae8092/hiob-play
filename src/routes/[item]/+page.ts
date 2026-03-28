import type { PageLoad } from './$types.js';
import { data_mapping } from '$lib/constants.js';
import { paginate } from '$lib/helpers.js';
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
	if (!(item in data_mapping)) {
		throw error(404, 'Item not found');
	}

	const item_key: ItemKey = item as ItemKey;
	const item_data = data_mapping[item_key];
	const response = await fetch(`/data/${item_data.file}`);

	if (!response.ok) {
		throw error(response.status === 404 ? 404 : 500, `Data file not found: ${item_data.file}`);
	}

	const rawPayload = await response.json() as PayloadTypeMap[typeof item_key];

	return {
		item,
		...item_data,
		...paginate(rawPayload, page, pageSize)
	};
};