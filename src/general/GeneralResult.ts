class GeneralResult{
    private _result: boolean;
    private _reason: string;
    private _datum: any;

    constructor(result: boolean, reason: string, datum: any){
        this._result = result;
        this._reason = reason;
        this._datum = datum;
        console.log(datum);
    }

    public setResult(result: boolean): void{
        this._result = result;
    }
    public getResult(): boolean{
        return this._result;
    }

    public setReason(reason: string): void{
        this._reason = reason;
    }

    public getReason(): string{
        return this._reason;
    }

    public setDatum(datum: any): void{
        this._datum = datum;
    }

    public getDatum(): any{
        return this._datum;
    }

    // 将此类的属性以JSON的形式返回
    public getReturn(): {[key: string]: any}{
        return {
            "result": this.getResult(),
            "reason": this.getReason(),
            "datum": this.getDatum()
        };
    }
}
export{GeneralResult};