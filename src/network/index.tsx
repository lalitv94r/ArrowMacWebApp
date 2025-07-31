import { useState, useCallback } from "react";
import { getBaseURL } from "./appConfig";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

type FetchResponse<T = any> = T | null;
type FetchError = string | null;

interface UseFetchResult<T = any> {
    loading: boolean;
    error: FetchError;
    response: FetchResponse<T>;
    get: (url: string, headers?: Record<string, string>) => Promise<T>;
    post: (url: string, body?: any, headers?: Record<string, string>) => Promise<T>;
    put: (url: string, body?: any, headers?: Record<string, string>) => Promise<T>;
    patch: (url: string, body?: any, headers?: Record<string, string>) => Promise<T>;
    del: (url: string, headers?: Record<string, string>) => Promise<T>;
}

const useFetch = <T = any>(): UseFetchResult<T> => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<FetchError>(null);
    const [response, setResponse] = useState<FetchResponse<T>>(null);

    const { data: session } = useSession();

    const request = useCallback(
        (
            url: string,
            method: string = "GET",
            body: any = null,
            headers: Record<string, string> = {}
        ): Promise<T> => {
            return new Promise(async (resolve, reject) => {
                setLoading(true);
                setError(null);
                setResponse(null);
                try {
                    const options: RequestInit = {
                        method,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": session?.accessToken ? `Bearer ${session.accessToken}` : "",
                            ...headers,
                        },
                        credentials: "include",
                    };

                    console.log("options", options)

                    if (body) {
                        options.body = JSON.stringify(body);
                    }

                    const api_endpoint = getBaseURL() + url;
                    console.log("api_endpoint", api_endpoint);

                    const res = await fetch(api_endpoint, options);

                    const result: T = await res.json();
                    console.log("RESULT", result);
                    if ((result as any)?.status === 401) {
                        // do logout
                        toast.error((result as any)?.messages?.[0]?.message);
                        signOut();
                    }
                    setResponse(result);
                    resolve(result);
                    // @ts-ignore
                    // if ((result as any).status_code !== 200) {
                    //     // @ts-ignore
                    //     if ((result as any)?.status_code === 401) {
                    //         // Store?.dispatch(authActionLogout());
                    //     } else {
                    //         // @ts-ignore
                    //         toast.error((result as any).message);
                    //         // @ts-ignore
                    //         setError((result as any)?.message);
                    //     }
                    // }
                } catch (err: any) {
                    console.log("ERROR", err);
                    setError(err.message);
                    reject(err);
                } finally {
                    setLoading(false);
                }
            });
        },
        []
    );

    const get = (url: string, headers?: Record<string, string>) => request(url, "GET", null, headers);
    const post = (url: string, body?: any, headers?: Record<string, string>) => request(url, "POST", body, headers);
    const put = (url: string, body?: any, headers?: Record<string, string>) => request(url, "PUT", body, headers);
    const patch = (url: string, body?: any, headers?: Record<string, string>) => request(url, "PATCH", body, headers);
    const del = (url: string, headers?: Record<string, string>) => request(url, "DELETE", null, headers);

    return { loading, error, response, get, post, put, patch, del };
};

export default useFetch;