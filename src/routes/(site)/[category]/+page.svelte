<script lang="ts">
	import type { Parameter } from "$lib/types";
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props()
	const parameters: Parameter[] = $derived.by(
		() => data.parameters
		.filter(p => p.required)
	)
</script>

<form class="flex flex-col gap-2">
{#each parameters as param}
	<div class="flex flex-col gap-1">
		<label for={param.id}>{param.name}</label>
		{#if (param.type == 'dictionary' && param.dictionary != undefined)}
			<select name={param.id} class="border rounded-sm w-[250px]">
				{#each param.dictionary as value}
					<option value={value.id}>{value.value}</option>
				{/each}
			</select>
		{:else}
			<input name={param.id} class="border rounded-sm w-[250px]"/>
		{/if}
	</div>
{/each}
</form>
