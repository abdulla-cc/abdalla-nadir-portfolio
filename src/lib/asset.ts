/** Prefix a public/ asset path with the Vite base URL (GitHub Pages subpath). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`
