declare type HandlerOnSuccess<T, U = any> = (value: T) => U | Thenable<U>;
declare type HandlerOnFail<U = any> = (reason: any) => U | Thenable<U>;
/** JSDoc */
interface Thenable<T> {
    /** JSDoc */
    then<U>(onSuccess?: HandlerOnSuccess<T, U>, onFail?: HandlerOnFail<U> | ((reason: any) => void)): Thenable<U>;
}
declare type Resolve<R> = (value?: R | Thenable<R> | any) => void;
declare type Reject = (value?: any) => void;
/** JSDoc */
export declare class SyncPromise<T> implements PromiseLike<T> {
    /** JSDoc */
    private _state;
    /** JSDoc */
    private _handlers;
    /** JSDoc */
    private _value;
    constructor(callback: (resolve: Resolve<T>, reject: Reject) => void);
    /** JSDoc */
    private readonly _resolve;
    /** JSDoc */
    private readonly _reject;
    /** JSDoc */
    private readonly _setResult;
    /** JSDoc */
    private readonly _executeHandlers;
    /** JSDoc */
    private readonly _attachHandler;
    /** JSDoc */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined): SyncPromise<TResult1 | TResult2>;
    /** JSDoc */
    catch<U>(onFail: HandlerOnFail<U>): SyncPromise<U>;
    /** JSDoc */
    toString(): string;
    /** JSDoc */
    static resolve<U>(value?: U | Thenable<U>): SyncPromise<U>;
    /** JSDoc */
    static reject<U>(reason?: any): SyncPromise<U>;
}
export {};
//# sourceMappingURL=syncpromise.d.ts.map