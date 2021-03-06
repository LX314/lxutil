export { Breadcrumb, Request, SdkInfo, Event, Exception, Response, Severity, StackFrame, Stacktrace, Status, Thread, User, } from '@sentry/types';
export { addGlobalEventProcessor, addBreadcrumb, captureException, captureEvent, captureMessage, configureScope, getHubFromCarrier, getCurrentHub, Hub, Scope, setContext, setExtra, setExtras, setTag, setTags, setUser, Span, withScope, } from '@sentry/core';
export { BrowserOptions } from './backend';
export { BrowserClient, ReportDialogOptions } from './client';
export { defaultIntegrations, forceLoad, init, lastEventId, onLoad, showReportDialog, flush, close, wrap } from './sdk';
export { SDK_NAME, SDK_VERSION } from './version';
import { Integrations as CoreIntegrations } from '@sentry/core';
import * as BrowserIntegrations from './integrations';
import * as Transports from './transports';
declare const INTEGRATIONS: {
    GlobalHandlers: typeof BrowserIntegrations.GlobalHandlers;
    TryCatch: typeof BrowserIntegrations.TryCatch;
    Breadcrumbs: typeof BrowserIntegrations.Breadcrumbs;
    LinkedErrors: typeof BrowserIntegrations.LinkedErrors;
    UserAgent: typeof BrowserIntegrations.UserAgent;
    FunctionToString: typeof CoreIntegrations.FunctionToString;
    InboundFilters: typeof CoreIntegrations.InboundFilters;
};
export { INTEGRATIONS as Integrations, Transports };
//# sourceMappingURL=index.d.ts.map