<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.result.hiob_id}</title>
</svelte:head>
<div class="prose dark:prose-invert">
	<h1>HIOB ID: {data.result.hiob_id}</h1>
</div>
