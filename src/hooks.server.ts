import { ServiceFactory } from "$lib/service";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.service = ServiceFactory(event.fetch)

	const result = await resolve(event)
	return result
}
