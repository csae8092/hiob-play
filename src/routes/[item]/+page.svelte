<script lang="ts">
	import type { PageProps } from './$types';
	import type { VersesData } from '$lib/datatypes';
	import { goto } from '$app/navigation';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { page as pageStore } from '$app/state';

	let url = $derived(pageStore.url);

	let { data }: PageProps = $props();
	const payloadEntries = $derived(Object.entries(data.payload as VersesData));
	const payloadHeaders = $derived(payloadEntries[0] ? Object.keys(payloadEntries[0][1]) : []);

	const handlePageChange = (nextPage: number) => {
		const nextUrl = new URL(url);
		nextUrl.searchParams.set('page', String(nextPage));
		goto(nextUrl, { keepFocus: true, noScroll: true });
	};
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
<div class="pb-5">
	<Pagination.Root
		count={data.totalSize}
		page={data.page}
		perPage={data.pageSize}
		onPageChange={handlePageChange}
	>
		{#snippet children({ pages, currentPage })}
			<Pagination.Content>
				<Pagination.Item>
					<Pagination.PrevButton />
				</Pagination.Item>
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item>
							<Pagination.Link {page} isActive={currentPage === page.value}>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.Ellipsis />
				</Pagination.Item>
				<Pagination.Item>
					<Pagination.NextButton />
				</Pagination.Item>
			</Pagination.Content>
		{/snippet}
	</Pagination.Root>
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
