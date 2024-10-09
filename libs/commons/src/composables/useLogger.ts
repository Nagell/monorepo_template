import { ref } from 'vue'

import environmentHelpers from './../helpers/environment'

/**
 * A composable function that provides a simple logging interface depending on the environment running mode.
 * It prevents logging in production mode by default.
 *
 * @example
 * ```ts
 * const logger = useLogger();
 * logger.log('Hello, world!');
 * ```
 * @example
 * ```ts
 * const logger = useLogger();
 * logger.isLoggingEnabled.value = false;
 * logger.log('Hello, world!'); // Nothing will be logged
 * ```
 */
export function useLogger() {
    const isLoggingEnabled = ref(false)

    const base = [
        'background-color: #333',
        'padding: 0.125rem 0.25rem',
        'border-radius: 0.25rem',
        'font-family: monospace',
    ]

    const styles = {
        log: [
            'color: #FFF',
        ].concat(base).join(';'),
        info: [
            'color: #0BF',
        ].concat(base).join(';'),
        warn: [
            'color: #FF0',
        ].concat(base).join(';'),
        error: [
            'color: #F00',
        ].concat(base).join(';'),
    }

    isLoggingEnabled.value = environmentHelpers.isDevelopment

    function log(...messages: unknown[]) {
        if (!isLoggingEnabled.value) return
        console.log('%c%s', styles.log, '</>', ...messages)
    }

    function info(...messages: unknown[]) {
        if (!isLoggingEnabled.value) return
        console.info('%c%s', styles.info, '</>', ...messages)
    }

    function warn(...messages: unknown[]) {
        if (!isLoggingEnabled.value) return
        console.warn('%c%s', styles.warn, '</>', ...messages)
    }

    function error(...messages: unknown[]) {
        if (!isLoggingEnabled.value) return
        console.error('%c%s', styles.error, '</>', ...messages)
    }

    function dir(...messages: unknown[]) {
        if (!isLoggingEnabled.value) return
        console.dir(messages)
    }

    function table(...messages: unknown[]) {
        if (!isLoggingEnabled.value) return
        console.table(messages)
    }

    return {
        isLoggingEnabled,
        log,
        info,
        warn,
        error,
        dir,
        table
    }
}
