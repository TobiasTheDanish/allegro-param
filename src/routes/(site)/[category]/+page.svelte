<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let parameters = $state(data.required.map((p) => ({ ...p, values: [], valuesIds: [] })));

	let initialJsonData = $state('');
	const newJsonData = $derived.by(() => {
		try {
			return JSON.stringify(
				parameters.map((param) => ({
					id: param.id,
					values: param.values.length > 0 ? param.values : undefined,
					valuesIds: param.valuesIds.length > 0 ? param.valuesIds : undefined
				}))
			);
		} catch (e) {
			console.error(e);
		}
	});

	const onchange = () => {
		try {
			const data = JSON.parse(initialJsonData);
			if (Array.isArray(data)) {
				data.forEach((v) => {
					let param = parameters.find((p) => p.id == v.id);
					if (param != undefined) {
						if (param.type == 'dictionary') {
							param.valuesIds = v.valuesIds;
						} else {
							param.values = v.values;
						}
					}
				});
			}
		} catch (e) {
			console.error(e);
		}
	};
</script>

<div class="grid grid-cols-2 gap-2 h-[450px]">
	<div class="size-full">
		<textarea bind:value={initialJsonData} {onchange} class="size-full"></textarea>
	</div>
	<div class="size-full">
		<textarea value={newJsonData} readonly class="size-full"></textarea>
	</div>
</div>

<form class="grid grid-cols-5 gap-2">
	{#each parameters as param}
		<div class="flex flex-col gap-1">
			<label for={param.id}>{param.name}</label>
			{#if param.type == 'dictionary' && param.dictionary != undefined}
				<select
					bind:value={param.valuesIds}
					multiple
					name={param.id}
					class="border rounded-sm w-[250px]"
				>
					{#each param.dictionary as value}
						<option value={value.id}>{value.value}</option>
					{/each}
				</select>
			{:else}
				<input name={param.id} bind:value={param.values} class="border rounded-sm w-[250px]" />
			{/if}
		</div>
	{/each}
</form>
