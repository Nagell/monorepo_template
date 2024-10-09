const isDevelopment = import.meta.env.MODE !== 'production'

const isProduction = import.meta.env.MODE === 'production'

const getEnvMode = () => import.meta.env.MODE

export default {
    isDevelopment,
    isProduction,
    getEnvMode,
}
