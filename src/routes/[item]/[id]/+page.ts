import type { PageLoad } from './$types.js';
import { error } from '@sveltejs/kit';
import { data_mapping } from '$lib/constants.js';
import type { VersesData, PassagesData, MidrashData } from '$lib/datatypes.js';

type PayloadTypeMap = {
    verses: VersesData;
    passages: PassagesData;
    midrash: MidrashData;
};

type DataMap = typeof data_mapping;
type ItemKey = keyof DataMap;
type PayloadEntryTypeMap = {
    [K in ItemKey]: PayloadTypeMap[K][string];
};

export const load: PageLoad = async ({ fetch, params }) => {
    const item = params.item;
    const item_id = params.id;

    if (!(item in data_mapping)) {
        throw error(404, 'Item not found');
    }

    const item_key: ItemKey = item as ItemKey;
    const item_data = data_mapping[item_key];
    const response = await fetch(`/data/${item_data.file}`);

    if (!response.ok) {
        throw error(response.status === 404 ? 404 : 500, `Data file not found: ${item_data.file}`);
    }

    const rawPayload = (await response.json()) as PayloadTypeMap[typeof item_key];
    const result = rawPayload[item_id] as PayloadEntryTypeMap[typeof item_key];

    if (!result) {
        throw error(404, `Item id not found: ${item_id}`);
    }

    return {
        item,
        item_id,
        result
    };
};