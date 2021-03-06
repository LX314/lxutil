Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("lxutil/@sentry/core");
var types_1 = require("lxutil/@sentry/types");
var utils_1 = require("lxutil/@sentry/utils");
var parsers_1 = require("./parsers");
var tracekit_1 = require("./tracekit");
var transports_1 = require("./transports");
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
        if (utils_1.supportsFetch()) {
            return new transports_1.FetchTransport(transportOptions);
        }
        return new transports_1.XHRTransport(transportOptions);
    };
    /**
     * @inheritDoc
     */
    BrowserBackend.prototype.eventFromException = function (exception, hint) {
        var _this = this;
        var event;
        if (utils_1.isErrorEvent(exception) && exception.error) {
            // If it is an ErrorEvent with `error` property, extract it to get actual Error
            var errorEvent = exception;
            exception = errorEvent.error; // tslint:disable-line:no-parameter-reassignment
            event = parsers_1.eventFromStacktrace(tracekit_1._computeStackTrace(exception));
            return utils_1.SyncPromise.resolve(this._buildEvent(event, hint));
        }
        if (utils_1.isDOMError(exception) || utils_1.isDOMException(exception)) {
            // If it is a DOMError or DOMException (which are legacy APIs, but still supported in some browsers)
            // then we just extract the name and message, as they don't provide anything else
            // https://developer.mozilla.org/en-US/docs/Web/API/DOMError
            // https://developer.mozilla.org/en-US/docs/Web/API/DOMException
            var domException = exception;
            var name_1 = domException.name || (utils_1.isDOMError(domException) ? 'DOMError' : 'DOMException');
            var message_1 = domException.message ? name_1 + ": " + domException.message : name_1;
            return this.eventFromMessage(message_1, types_1.Severity.Error, hint).then(function (messageEvent) {
                utils_1.addExceptionTypeValue(messageEvent, message_1);
                return utils_1.SyncPromise.resolve(_this._buildEvent(messageEvent, hint));
            });
        }
        if (utils_1.isError(exception)) {
            // we have a real Error object, do nothing
            event = parsers_1.eventFromStacktrace(tracekit_1._computeStackTrace(exception));
            return utils_1.SyncPromise.resolve(this._buildEvent(event, hint));
        }
        if (utils_1.isPlainObject(exception) && hint && hint.syntheticException) {
            // If it is plain Object, serialize it manually and extract options
            // This will allow us to group events based on top-level keys
            // which is much better than creating new group when any key/value change
            var objectException = exception;
            event = parsers_1.eventFromPlainObject(objectException, hint.syntheticException);
            utils_1.addExceptionTypeValue(event, 'Custom Object', undefined, {
                handled: true,
                synthetic: true,
                type: 'generic',
            });
            event.level = types_1.Severity.Error;
            return utils_1.SyncPromise.resolve(this._buildEvent(event, hint));
        }
        // If none of previous checks were valid, then it means that
        // it's not a DOMError/DOMException
        // it's not a plain Object
        // it's not a valid ErrorEvent (one with an error property)
        // it's not an Error
        // So bail out and capture it as a simple message:
        var stringException = exception;
        return this.eventFromMessage(stringException, undefined, hint).then(function (messageEvent) {
            utils_1.addExceptionTypeValue(messageEvent, "" + stringException, undefined, {
                handled: true,
                synthetic: true,
                type: 'generic',
            });
            messageEvent.level = types_1.Severity.Error;
            return utils_1.SyncPromise.resolve(_this._buildEvent(messageEvent, hint));
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
        if (level === void 0) { level = types_1.Severity.Info; }
        var event = {
            event_id: hint && hint.event_id,
            level: level,
            message: message,
        };
        if (this._options.attachStacktrace && hint && hint.syntheticException) {
            var stacktrace = tracekit_1._computeStackTrace(hint.syntheticException);
            var frames_1 = parsers_1.prepareFramesForEvent(stacktrace.stack);
            event.stacktrace = {
                frames: frames_1,
            };
        }
        return utils_1.SyncPromise.resolve(event);
    };
    return BrowserBackend;
}(core_1.BaseBackend));
exports.BrowserBackend = BrowserBackend;
//# sourceMappingURL=backend.js.map