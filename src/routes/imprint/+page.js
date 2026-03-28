import { imprint_api_url } from '$lib/constants';

export async function load({ fetch }) {
	const res = await fetch(imprint_api_url);
	const imprint_body = await res.text();
	return { imprint_body };
}
