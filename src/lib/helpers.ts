import { error } from '@sveltejs/kit';


export function paginate(
    payload: Record<string, unknown>,
    page: number = 1,
    pageSize: number = 25,
    maxPageSize: number = 50
) {
    if (!Number.isInteger(pageSize) || pageSize < 1) throw error(400, 'pageSize must be a positive integer');
    if (!Number.isInteger(page) || page < 1) throw error(400, 'page must be a positive integer');
    const clampedPageSize = Math.min(pageSize, maxPageSize);
    const entries = Object.entries(payload);
    const totalSize = entries.length;
    const start = (page - 1) * clampedPageSize;
    if (totalSize > 0 && start >= totalSize) {
        throw error(404, `Page ${page} is out of range (${totalSize} items, pageSize ${clampedPageSize})`);
    }
    return {
        payload: Object.fromEntries(entries.slice(start, start + clampedPageSize)),
        page,
        pageSize: clampedPageSize,
        totalSize,
        numberOfPages: Math.ceil(totalSize / clampedPageSize)
    };
}