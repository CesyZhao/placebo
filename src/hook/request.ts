import { useState, useCallback } from "react";

type ResultOf<T extends () => any> = ReturnType<T> extends Promise<infer R>
	? R
	: ReturnType<T>;

export function useRequest<Request extends (...args: any[]) => Promise<any>>(
	request: Request,
	...args: Parameters<Request>
) {
	const [loading, setLoading] = useState(false);
	const taskWithLoadingState = useCallback(async () => {
		let response: { result: ResultOf<Request> } | { error: any };
		setLoading(true);
		try {
			const result = await request(...args);
			response = { result };
		} catch (error: any) {
			response = { error };
		}
		setLoading(false);
		return response;
	}, [request, args]);

	return [taskWithLoadingState, loading] as const;
}