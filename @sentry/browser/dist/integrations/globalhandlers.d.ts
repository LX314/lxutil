import { Integration } from '@sentry/types';
/** JSDoc */
interface GlobalHandlersIntegrations {
    onerror: boolean;
    onunhandledrejection: boolean;
}
/** Global handlers */
export declare class GlobalHandlers implements Integration {
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
    /** JSDoc */
    constructor(options?: GlobalHandlersIntegrations);
    /**
     * @inheritDoc
     */
    setupOnce(): void;
    /**
     * This function creates an Event from an TraceKitStackTrace.
     *
     * @param stacktrace TraceKitStackTrace to be converted to an Event.
     */
    private _eventFromGlobalHandler;
}
export {};
//# sourceMappingURL=globalhandlers.d.ts.map