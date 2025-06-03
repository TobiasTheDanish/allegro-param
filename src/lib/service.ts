import type { Parameter } from "./types";

export type FetchFn = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

type Error = string | null

export type Service = ReturnType<typeof ServiceFactory>

export const ServiceFactory = (fetch: FetchFn) => ({
	getParams: async function({category, accessToken}: {
		category: number,
		accessToken: string,
	}): Promise<[Parameter[], Error]> {
		const res = await fetch(`https://api.allegro.pl/sale/categories/${category}/parameters`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Accept: 'application/vnd.allegro.public.v1+json',
				"Accept-Language": 'en-US'
			},
		})

		if (res.ok) {
			const data: {parameters: Parameter[]} = await res.json()

			return [data.parameters, null]
		} else {
			return [[], await res.text()]
		}
	}
})
