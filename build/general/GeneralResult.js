"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneralResult {
    constructor(result, reason, datum) {
        this._result = result;
        this._reason = reason;
        this._datum = datum;
    }
    setResult(result) {
        this._result = result;
    }
    getResult() {
        return this._result;
    }
    setReason(reason) {
        this._reason = reason;
    }
    getReason() {
        return this._reason;
    }
    setDatum(datum) {
        this._datum = datum;
    }
    getDatum() {
        return this._datum;
    }
    // 将此类的属性以JSON的形式返回
    getReturn() {
        return {
            "result": this.getResult(),
            "reason": this.getReason(),
            "datum": this.getDatum()
        };
    }
}
exports.GeneralResult = GeneralResult;
