import * as tslib_1 from "tslib";
import { BaseBackend } from 'lxutil/@sentry/core';
import { Severity } from 'lxutil/@sentry/types';
import { addExceptionTypeValue, isDOMError, isDOMException, isError, isErrorEvent, isPlainObject, supportsFetch, SyncPromise, } from 'lxutil/@sentry/utils';
import { eventFromPlainObject, eventFromStacktrace, prepareFramesForEvent } from './parsers';
import { _computeStackTrace } from './tracekit';
import { FetchTransport, XHRTransport } from './transports';
/**
 * The Sentry Browser SDK Backend.
 * @hidden
 */
var BrowserBackend = /** @class */ (function (_super) {
    tslib_1.__extends(BrowserBackend, _super);
    function BrowserBackend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype._setupTransport = function () {
        if (!this._options.dsn) {
            // We return the noop transport here in case there is no Dsn.
            return _super.prototype._setupTransport.call(this);
        }
        var transportOptions = tslib_1.__assign({}, this._options.transportOptions, { dsn: this._options.dsn });
        if (this._options.transport) {
            return new this._options.transport(transportOptions);
        }
        if (supportsFetch()) {
            return new FetchTransport(transportOptions);
        }
        return new XHRTransport(transportOptions);
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.eventFromException = function (exception, hint) {
        var _this = this;
        var event;
        if (isErrorEvent(exception) && exception.error) {
            // If it is an ErrorEvent with `error` property, extract it to get actual Error
            var errorEvent = exception;
            exception = errorEvent.error; // tslint:disable-line:no-parameter-reassignment
            event = eventFromStacktrace(_computeStackTrace(exception));
            return SyncPromise.resolve(this._buildEvent(event, hint));
        }
        if (isDOMError(exception) || isDOMException(exception)) {
            // If it is a DOMError or DOMException (which are legacy APIs, but still supported in some browsers)
            // then we just extract the name and message, as they don't provide anything else
            // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
            // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
            var domException = exception;
            var name_1 = domException.name || (isDOMError(domException) ? 'DOMError' : 'DOMException');
            var message_1 = domException.message ? name_1 + ": " + domException.message : name_1;
            return this.eventFromMessage(message_1, Severity.Error, hint).then(function (messageEvent) {
                addExceptionTypeValue(messageEvent, message_1);
                return SyncPromise.resolve(_this._buildEvent(messageEvent, hint));
            });
        }
        if (isError(exception)) {
            // we have a real Error object, do nothing
            event = eventFromStacktrace(_computeStackTrace(exception));
            return SyncPromise.resolve(this._buildEvent(event, hint));
        }
        if (isPlainObject(exception) && hint && hint.syntheticException) {
            // If it is plain Object, serialize it manually and extract options
            // This will allow us to group events based on top-level keys
            // which is much better than creating new group when any key/value change
            var objectException = exception;
            event = eventFromPlainObject(objectException, hint.syntheticException);
            addExceptionTypeValue(event, 'Custom Object', undefined, {
                handled: true,
                synthetic: true,
                type: 'generic',
            });
            event.level = Severity.Error;
            return SyncPromise.resolve(this._buildEvent(event, hint));
        }
        // If none of previous checks were valid, then it means that
        // it's not a DOMError/DOMException
        // it's not a plain Object
        // it's not a valid ErrorEvent (one with an error property)
        // it's not an Error
        // So bail out and capture it as a simple message:
        var stringException = exception;
        return this.eventFromMessage(stringException, undefined, hint).then(function (messageEvent) {
            addExceptionTypeValue(messageEvent, "" + stringException, undefined, {
                handled: true,
                synthetic: true,
                type: 'generic',
            });
            messageEvent.level = Severity.Error;
            return SyncPromise.resolve(_this._buildEvent(messageEvent, hint));
        });
    };
    /**
     * This is an internal helper function that creates an event.
     */
    BrowserBackend.prototype._buildEvent = function (event, hint) {
        return tslib_1.__assign({}, event, { event_id: hint && hint.event_id });
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.eventFromMessage = function (message, level, hint) {
        if (level === void 0) { level = Severity.Info; }
        var event = {
            event_id: hint && hint.event_id,
            level: level,
            message: message,
        };
        if (this._options.attachStacktrace && hint && hint.syntheticException) {
            var stacktrace = _computeStackTrace(hint.syntheticException);
            var frames_1 = prepareFramesForEvent(stacktrace.stack);
            event.stacktrace = {
                frames: frames_1,
            };
        }
        return SyncPromise.resolve(event);
    };
    return BrowserBackend;
}(BaseBackend));
export { BrowserBackend };
//# sourceMappingURL=backend.js.map