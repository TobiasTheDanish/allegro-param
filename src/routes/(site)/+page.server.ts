import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';

const schema = z.object({
	category: z.coerce.number(),
	accessToken: z.string(),
})

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema))

	return { form };
}

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(schema))
		if (!form.valid) {
			return fail(400, { form })
		}

		cookies.set('access-token', form.data.accessToken, { path: '/'})

		redirect(303,	`/${form.data.category}`)
	}
}
