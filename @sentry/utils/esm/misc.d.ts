import { Event, Integration, Mechanism } from '@sentry/types';
/** Internal */
interface SentryGlobal {
    Sentry?: {
        Integrations?: Integration[];
    };
    SENTRY_ENVIRONMENT?: string;
    SENTRY_DSN?: string;
    SENTRY_RELEASE?: {
        id?: string;
    };
    __SENTRY__: {
        globalEventProcessors: any;
        hub: any;
        logger: any;
    };
}
/**
 * Requires a module which is protected _against bundler minification.
 *
 * @param request The module path to resolve
 */
export declare function dynamicRequire(mod: any, request: string): any;
/**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */
export declare function isNodeEnv(): boolean;
/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */
export declare function getGlobalObject<T>(): T & SentryGlobal;
/**
 * UUID4 generator
 *
 * @returns string Generated UUID4.
 */
export declare function uuid4(): string;
/**
 * Parses string form of URL into an object
 * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
 * // intentionally using regex and not <a/> href parsing trick because React Native and other
 * // environments where DOM might not be available
 * @returns parsed URL object
 */
export declare function parseUrl(url: string): {
    host?: string;
    path?: string;
    protocol?: string;
    relative?: string;
};
/**
 * Extracts either message or type+value from an event that can be used for user-facing logs
 * @returns event's description
 */
export declare function getEventDescription(event: Event): string;
/** JSDoc */
export declare function consoleSandbox(callback: () => any): any;
/**
 * Adds exception values, type and value to an synthetic Exception.
 * @param event The event to modify.
 * @param value Value of the exception.
 * @param type Type of the exception.
 * @param mechanism Mechanism of the exception.
 * @hidden
 */
export declare function addExceptionTypeValue(event: Event, value?: string, type?: string, mechanism?: Mechanism): void;
export {};
//# sourceMappingURL=misc.d.ts.map