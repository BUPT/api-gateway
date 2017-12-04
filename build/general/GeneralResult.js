"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
//数据返回格式
=======
>>>>>>> 7b8875d097b14c5d46d2878ed607b6d83b0e52af
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
