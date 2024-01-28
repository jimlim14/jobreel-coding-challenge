export default async function fetcher(
	url: string,
	method: string | undefined = undefined,
	data: any = undefined,
) {
	try {
		const res = await fetch(`http://localhost:3000${url}`, {
			method: method ? method : "GET",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			throw new Error("Request failed");
		}
		return {
			data: await res.json(),
			error: null,
		};
	} catch (e: any) {
		return {
			data: null,
			error: e.message || "Something went wrong",
		};
	}
}
