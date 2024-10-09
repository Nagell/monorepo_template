import { type UseAxiosOptions, useAxios } from '@vueuse/integrations/useAxios'
import axios from 'axios'

import type { AxiosInstance, AxiosRequestConfig, HeadersDefaults } from 'axios'

interface HttpClientPayload {
    path?: string
    config?: AxiosRequestConfig<any>
    options?: UseAxiosOptions
    securityWorker?: (securityData?: unknown | null) => AxiosRequestConfig | void
}

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
    Text = 'text/plain',
}

/**
 * useHttpClient composable function
 * @param path Request path, ex. 'users'. If set to a http(s) path, will overwrite the base url.
 * @param config Custom axios config (will be merged with the default one)
 * @param options UseAxios options, more: https://vueuse.org/integrations/useAxios/#type-declarations
 * @param securityWorker Called only if available. Should return yet another axios config (ex. with some headers),
 * which will be merged with the previously mentioned configs
 * @returns pre-configured useAxios instance
 * @example
 * ```ts
 * const { data, error, isLoading } = await useHttpClient<User[]>({
 *     path: 'users',
 * })
 */
export function useHttpClient<T>(
    {
        path,
        config,
        options,
        securityWorker
    }: HttpClientPayload = {}
) {
    // Basic URL for the API
    const baseUrl: string = import.meta.env.VITE_APP_API_URL
    // Extend this one if more standard options are needed
    const apiClient: AxiosInstance = axios.create({
        baseURL: baseUrl,
        method: 'get',
        headers: {
            'Content-Type': ContentType.Json,
        }
    })
    // Prepare default options for useAxios
    options = options || {
        onError: e => console.error('Error in useApiHelper:', e),
        immediate: true
    }
    // Prepare the request parameters
    const requestParams = _mergeRequestParams(config, securityWorker && _getSecureParams())

    /**
     * Merge the request parameters from two objects with the predefined defaults
     */
    function _mergeRequestParams(params1?: AxiosRequestConfig, params2?: AxiosRequestConfig) {
        const method = params1?.method || params2?.method

        return {
            ...apiClient.defaults,
            ...(params1 || {}),
            ...(params2 || {}),
            headers: {
                ...((method && apiClient.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
                ...(params1?.headers || {}),
                ...(params2?.headers || {}),
            },
        }
    }

    /**
     * Get the secure parameters from the security worker if it was provided
     */
    function _getSecureParams() {
        return (securityWorker && (securityWorker())) || {}
    }

    /**
     * Prepare the path for the request.
     * If the path is an absolute URL, return it as is
     */
    function _preparePath(path: string | undefined) {
        const isAbsoluteUrl = !!path?.match(/^https?:/)?.[0]

        if (!path) return baseUrl

        return isAbsoluteUrl ? path : `${baseUrl}/${path}`
    }

    return useAxios<T>(_preparePath(path), requestParams, apiClient, options)
}
