<script lang="ts">
	import type { PageProps } from './$types';
	import type { VersesData } from '$lib/datatypes';
	import * as Table from '$lib/components/ui/table/index.js';
	let { data }: PageProps = $props();
	const payloadEntries = $derived(Object.entries(data.payload as VersesData));
	const payloadHeaders = $derived(payloadEntries[0] ? Object.keys(payloadEntries[0][1]) : []);
</script>

<svelte:head>
	<title>{data.label}</title>
</svelte:head>
<div class="prose dark:prose-invert">
	<h1>{data.label}</h1>
	<p>Slug: {data.item}</p>
	<p>file: {data.file}</p>
	<h2>payload</h2>
</div>
<div>
	<Table.Root>
		<Table.Caption>Data overview for {data.label}</Table.Caption>
		<Table.Header>
			<Table.Row>
				{#each payloadHeaders as key}
					{#if key != 'order'}
						<Table.Head>{key}</Table.Head>
					{/if}
				{/each}
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each Object.entries(data.payload as VersesData) as [key, values]}
				<Table.Row>
					{#each Object.entries(values) as [k, v]}
						{#if k == 'id'}
							<Table.Cell><a href={`/${data.item}/${v}`}>{v}</a></Table.Cell>
						{:else if k == 'order'}{:else if Array.isArray(v) && v.every((item) => item && typeof item === 'object' && !Array.isArray(item) && 'value' in item)}
							<Table.Cell>
								<ul>
									{#each v as item}
										<li>{item.value}</li>
									{/each}
								</ul>
							</Table.Cell>
						{:else}
							<Table.Cell>{v}</Table.Cell>
						{/if}
					{/each}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
