<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { app_config, main_nav } from '$lib/constants';
	import { SiGithub } from '@icons-pack/svelte-simple-icons';

	import MyModeToggleButton from '$lib/components/my-mode-toggle-button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { MenuIcon } from '@lucide/svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{app_config.title_short}</title>
</svelte:head>
<div class="flex min-h-screen flex-col">
	<header class="sticky top-0 z-50 bg-background">
		<div class="max-w-10xl mx-auto flex items-center justify-between gap-8 px-4 py-7 sm:px-6">
			<div
				class="flex flex-1 items-center justify-between gap-8 font-medium text-foreground lg:gap-16"
			>
				<a href="/" class="hover:text-primary">{app_config.title_short}</a>
			</div>
			<div
				class="flex flex-1 items-center gap-8 font-medium text-muted-foreground max-md:hidden lg:gap-16"
			>
				{#each main_nav as x, id}
					<a href={x.href} class="hover:text-primary" id={`main-nav-${id}`}>
						{x.label}
					</a>
				{/each}
			</div>

			<div class="flex items-center gap-6">
				<MyModeToggleButton></MyModeToggleButton>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class="md:hidden">
						{#snippet child({ props })}
							<Button {...props} variant="outline" size="icon">
								<MenuIcon />
								<span class="sr-only">Menu</span>
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						{#each main_nav as x}
							<DropdownMenu.Item>
								<a href={x.href}>
									{x.label}
								</a>
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</div>
	</header>
	<main class="flex-1">
		<div class="mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-40">
			{@render children()}
		</div>
	</main>
	<footer class="mt-8 mb-3 flex justify-center">
		<a href={app_config.code_repo_url}>
			<SiGithub></SiGithub>
			<span class="sr-only">Link to code on GitHub</span>
		</a>
	</footer>
</div>
