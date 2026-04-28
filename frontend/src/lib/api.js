const RAW_BASE = import.meta.env.VITE_API_URL ?? ''
const BASE = RAW_BASE.replace(/\/+$/, '')

export const apiUrl = (path) => `${BASE}${path.startsWith('/') ? path : `/${path}`}`
