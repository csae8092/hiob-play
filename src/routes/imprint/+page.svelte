<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Imprint</title>
</svelte:head>
<div class="prose dark:prose-invert">
	{@html data.imprint_body}
</div>
