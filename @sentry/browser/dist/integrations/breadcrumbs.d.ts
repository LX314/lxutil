import { Breadcrumb, BreadcrumbHint, Integration } from '@sentry/types';
/**
 * @hidden
 */
export interface SentryWrappedXMLHttpRequest extends XMLHttpRequest {
    [key: string]: any;
    __sentry_xhr__?: {
        method?: string;
        url?: string;
        status_code?: number;
    };
}
/** JSDoc */
interface BreadcrumbIntegrations {
    console?: boolean;
    dom?: boolean;
    fetch?: boolean;
    history?: boolean;
    sentry?: boolean;
    xhr?: boolean;
}
/** Default Breadcrumbs instrumentations */
export declare class Breadcrumbs implements Integration {
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    static id: string;
    /** JSDoc */
    private readonly _options;
    /**
     * @inheritDoc
     */
    constructor(options?: BreadcrumbIntegrations);
    /** JSDoc */
    private _instrumentConsole;
    /** JSDoc */
    private _instrumentDOM;
    /** JSDoc */
    private _instrumentFetch;
    /** JSDoc */
    private _instrumentHistory;
    /** JSDoc */
    private _instrumentXHR;
    /**
     * Helper that checks if integration is enabled on the client.
     * @param breadcrumb Breadcrumb
     * @param hint BreadcrumbHint
     */
    static addBreadcrumb(breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void;
    /**
     * Instrument browser built-ins w/ breadcrumb capturing
     *  - Console API
     *  - DOM API (click/typing)
     *  - XMLHttpRequest API
     *  - Fetch API
     *  - History API
     */
    setupOnce(): void;
}
export {};
//# sourceMappingURL=breadcrumbs.d.ts.map