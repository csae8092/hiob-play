import type { PageLoad } from './$types.js';
import { data_mapping } from '$lib/constants.js';
import { error } from '@sveltejs/kit';

type DataMap = typeof data_mapping;
type ItemKey = keyof DataMap;

export const load: PageLoad = ({ params }) => {
	const item = params.item;

	if (!(item in data_mapping)) {
		throw error(404, 'Item not found');
	}

	const item_key: ItemKey = item as ItemKey;
	return {
		item,
		...data_mapping[item_key]
	};
};