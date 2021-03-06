import { Event, Response } from '@sentry/types';
import { BaseTransport } from './base';
/** `XHR` based transport */
export declare class XHRTransport extends BaseTransport {
    /**
     * @inheritDoc
     */
    sendEvent(event: Event): Promise<Response>;
}
//# sourceMappingURL=xhr.d.ts.map