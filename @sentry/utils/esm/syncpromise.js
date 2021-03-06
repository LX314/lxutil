import { isThenable } from './is';
/** SyncPromise internal states */
var States;
(function (States) {
    /** Pending */
    States["PENDING"] = "PENDING";
    /** Resolved / OK */
    States["RESOLVED"] = "RESOLVED";
    /** Rejected / Error */
    States["REJECTED"] = "REJECTED";
})(States || (States = {}));
/** JSDoc */
var SyncPromise = /** @class */ (function () {
    function SyncPromise(callback) {
        var _this = this;
        /** JSDoc */
        this._state = States.PENDING;
        /** JSDoc */
        this._handlers = [];
        /** JSDoc */
        this._resolve = function (value) {
            _this._setResult(value, States.RESOLVED);
        };
        /** JSDoc */
        this._reject = function (reason) {
            _this._setResult(reason, States.REJECTED);
        };
        /** JSDoc */
        this._setResult = function (value, state) {
            if (_this._state !== States.PENDING) {
                return;
            }
            if (isThenable(value)) {
                value.then(_this._resolve, _this._reject);
                return;
            }
            _this._value = value;
            _this._state = state;
            _this._executeHandlers();
        };
        /** JSDoc */
        this._executeHandlers = function () {
            if (_this._state === States.PENDING) {
                return;
            }
            if (_this._state === States.REJECTED) {
                // tslint:disable-next-line:no-unsafe-any
                _this._handlers.forEach(function (h) { return h.onFail && h.onFail(_this._value); });
            }
            else {
                // tslint:disable-next-line:no-unsafe-any
                _this._handlers.forEach(function (h) { return h.onSuccess && h.onSuccess(_this._value); });
            }
            _this._handlers = [];
            return;
        };
        /** JSDoc */
        this._attachHandler = function (handler) {
            _this._handlers = _this._handlers.concat(handler);
            _this._executeHandlers();
        };
        try {
            callback(this._resolve, this._reject);
        }
        catch (e) {
            this._reject(e);
        }
    }
    /** JSDoc */
    SyncPromise.prototype.then = function (onfulfilled, onrejected) {
        var _this = this;
        // public then<U>(onSuccess?: HandlerOnSuccess<T, U>, onFail?: HandlerOnFail<U>): SyncPromise<T | U> {
        return new SyncPromise(function (resolve, reject) {
            _this._attachHandler({
                onFail: function (reason) {
                    if (!onrejected) {
                        reject(reason);
                        return;
                    }
                    try {
                        resolve(onrejected(reason));
                        return;
                    }
                    catch (e) {
                        reject(e);
                        return;
                    }
                },
                onSuccess: function (result) {
                    if (!onfulfilled) {
                        resolve(result);
                        return;
                    }
                    try {
                        resolve(onfulfilled(result));
                        return;
                    }
                    catch (e) {
                        reject(e);
                        return;
                    }
                },
            });
        });
    };
    /** JSDoc */
    SyncPromise.prototype.catch = function (onFail) {
        // tslint:disable-next-line:no-unsafe-any
        return this.then(function (val) { return val; }, onFail);
    };
    /** JSDoc */
    SyncPromise.prototype.toString = function () {
        return "[object SyncPromise]";
    };
    /** JSDoc */
    SyncPromise.resolve = function (value) {
        return new SyncPromise(function (resolve) {
            resolve(value);
        });
    };
    /** JSDoc */
    SyncPromise.reject = function (reason) {
        return new SyncPromise(function (_, reject) {
            reject(reason);
        });
    };
    return SyncPromise;
}());
export { SyncPromise };
//# sourceMappingURL=syncpromise.js.map