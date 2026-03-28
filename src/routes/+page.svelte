<script lang="ts">
	import { app_config } from '$lib/constants';
</script>

<svelte:head>
	<title>{app_config.title_short}</title>
</svelte:head>

<div class="prose dark:prose-invert">
	<h1>{app_config.title}</h1>
	<h2>{app_config.title_short}</h2>
</div>
