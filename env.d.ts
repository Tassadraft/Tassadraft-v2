interface ImportMetaEnv {
    readonly VITE_TASSADAPI_BASE_URL: string;
    readonly VITE_TASSADAPI_CONTACT: string;

    readonly VITE_GITHUB_REPOSITORY: string;

    readonly VITE_COMPANY_RESPONSIBLE: string;
    readonly VITE_COMPANY_ADDRESS: string;
    readonly VITE_COMPANY_SIRET: string;

    readonly VITE_HOST_NAME: string;
    readonly VITE_HOST_ADDRESS: string;
    readonly VITE_HOST_RCS: string;
    readonly VITE_HOST_CAPITAL: string;
    readonly VITE_HOST_APE_CODE: string;
    readonly VITE_HOST_VAT_NUMBER: string;
    readonly VITE_HOST_DATACENTER: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
