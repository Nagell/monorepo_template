import merge from './merge'
import getProxyConfiguration from './proxyConfig'
import applicationConfiguration from './vite.application'

import type { UserConfig } from 'vite'

export { getProxyConfiguration }

/**
 * Returns Vite build configuration for client applications,
 * optionally amended with the specified options
 * @param options Custom build options
 * @returns Vite build configuration
 */
export function getApplicationConfiguration(options: UserConfig = {}) {
    return getConfiguration(applicationConfiguration, options)
}

/**
 * Returns Vite build configuration amended with the specified options
 * @param configuration Default build options
 * @param options Custom build options
 * @returns Vite build configuration
 */
function getConfiguration(configuration: UserConfig, options: UserConfig = {}) {
    const result = merge(
        // Default configuration
        configuration,
        // Custom options to override the default configuration
        options
    )

    // Handy when you need to peek into that final build configuration
    // console.warn(JSON.stringify(result, null, 2))

    return result
}
