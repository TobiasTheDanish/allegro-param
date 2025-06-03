import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
	const category = parseInt(params.category);

	const accessToken = cookies.get('access-token');
	if (!accessToken) {
		redirect(303, '/');
	}

	const [parameters, error] = await locals.service.getParams({ category, accessToken });
	if (error != null) {
		fail(500, { error });
	}

	const required = parameters.filter((param) => param.required);

	return { required };
};
