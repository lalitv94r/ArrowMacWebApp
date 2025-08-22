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

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null; // avoid SSR issues
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
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
                    const isFormData = body instanceof FormData;

                    // 🔹 Get CSRF token from cookie
                    const csrfToken = getCookie("csrftoken");

                    const options: RequestInit = {
                        method,
                        headers: {
                            ...(isFormData
                                ? {}
                                : { "Content-Type": "application/json" }),
                            "Authorization": session?.accessToken
                                ? `Bearer ${session.accessToken}`
                                : "",
                            ...(method !== "GET" && csrfToken
                                ? { "X-CSRFToken": csrfToken }
                                : {}),
                            ...headers,
                        },
                        credentials: "include", // ensures cookies are sent
                    };

                    if (body) {
                        options.body = isFormData ? body : JSON.stringify(body);
                    }

                    const api_endpoint = getBaseURL() + url;
                    console.log("api_endpoint", api_endpoint);

                    const res = await fetch(api_endpoint, options);
                    const result: T = await res.json();

                    if ((result as any)?.status === 401) {
                        toast.error((result as any)?.messages?.[0]?.message);
                        signOut();
                    }
                    setResponse(result);
                    resolve(result);
                } catch (err: any) {
                    console.log("ERROR", err);
                    setError(err.message);
                    reject(err);
                } finally {
                    setLoading(false);
                }
            });
        },
        [session]
    );

    const get = (url: string, headers?: Record<string, string>) => request(url, "GET", null, headers);
    const post = (url: string, body?: any, headers?: Record<string, string>) => request(url, "POST", body, headers);
    const put = (url: string, body?: any, headers?: Record<string, string>) => request(url, "PUT", body, headers);
    const patch = (url: string, body?: any, headers?: Record<string, string>) => request(url, "PATCH", body, headers);
    const del = (url: string, headers?: Record<string, string>) => request(url, "DELETE", null, headers);

    return { loading, error, response, get, post, put, patch, del };
};

export default useFetch;