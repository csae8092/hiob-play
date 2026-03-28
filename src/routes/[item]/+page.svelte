<script lang="ts">
	import type { PageProps } from './$types';
	import type { VersesData } from '$lib/datatypes';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.label}</title>
</svelte:head>
<div class="prose dark:prose-invert">
	<h1>{data.label} the project</h1>
	<p>Slug: {data.item}</p>
	<p>file: {data.file}</p>
	<h2>payload</h2>
	<ul>
		{#each Object.entries(data.payload as VersesData) as [key, values]}
			<li>{key}: {values.hiob_id}</li>
		{/each}
	</ul>
</div>
