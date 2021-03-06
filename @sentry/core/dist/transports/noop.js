Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("lxutil/@sentry/types");
/** Noop transport */
var NoopTransport = /** @class */ (function () {
    function NoopTransport() {
    }
    /**
     * @inheritDoc
     */
    NoopTransport.prototype.sendEvent = function (_) {
        return Promise.resolve({
            reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
            status: types_1.Status.Skipped,
        });
    };
    /**
     * @inheritDoc
     */
    NoopTransport.prototype.close = function (_) {
        return Promise.resolve(true);
    };
    return NoopTransport;
}());
exports.NoopTransport = NoopTransport;
//# sourceMappingURL=noop.js.map