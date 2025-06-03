<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const { form } = superForm(data.form);
</script>

<form method="POST">
	<label for="category">Category</label>
	<input type="number" name="category" bind:value={$form.category} />
	<label for="accessToken">Access Token</label>
	<input type="text" name="accessToken" bind:value={$form.accessToken} />
	<button type="submit">Submit</button>
</form>
