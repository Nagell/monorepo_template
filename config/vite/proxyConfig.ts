import { ProxyOptions } from 'vite'

export default getProxyConfiguration

/**
 * Returns a predefined proxy configuration for the specified target.
 * Options can be used to override the default configuration
 * @example
 * ```ts
 * const proxy = getProxyConfiguration('https://localhost:7148/')
 * ```
 * @example
 * ```ts
 * const proxy = getProxyConfiguration('https://localhost:7148/', { changeOrigin: false }, true)
 * ```
 * @returns Proxy configuration
 * @see https://vitejs.dev/config/server-options.html#server-proxy
 */
function getProxyConfiguration(
    target: string,
    options: Omit<ProxyOptions, 'target'> = {},
    debug = false
): ProxyOptions {
    const config = {
        target,
        // Default options
        changeOrigin: true,
        secure: false,
        ws: true,
        // User options
        ...options,
    }
    // Add debug logging
    if (debug) {
        config.configure = (proxy) => {
            proxy.on('error', (err) => {
                console.log('proxy error', err)
            })
            proxy.on('proxyReq', (proxyReq, req) => {
                console.log('Sending Request to the Target:', req.method, req.url)
            })
            proxy.on('proxyRes', (proxyRes, req) => {
                console.log('Received Response from the Target:', proxyRes.statusCode, req.url)
            })
        }
    }

    return config
}
