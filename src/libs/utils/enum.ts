export const STATUS: { [key: string]: string } = {
    LOADING: 'LOADING',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
} as const

export const TOKEN: { [key: string]: string } = {
    ACCESS: 'name_access',
    REFRESH: 'name_refresh',
} as const
