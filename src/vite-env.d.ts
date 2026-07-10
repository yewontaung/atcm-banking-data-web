interface ImportMetaEnv {
    readonly VITE_PROJECT_TITLE: string,
    readonly VITE_TOKEN: string,
    readonly VITE_API_URL: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}