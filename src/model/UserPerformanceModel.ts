/**
 * 定义整个对于用户的平台监测的模型
 * 用户名，访问总次数，单位时间访问次数，最后一次访问时间
 */
class UserPerformanceModel {
    static _userPerformanceMap:Map<String,UserPerformanceModel> = new Map();
    private _userName:String='userName';
    private _totleVisit:number=0;
    private _unitTimeTotleVisit:number=0;
    private _lastVisitTime:Date=null;

    constructor() {
       
    }
    public static getAll():String{
        let str:String = '';
        UserPerformanceModel._userPerformanceMap.forEach(function(value,key,map){
            str = str+'\n'+ key+' value= '+value.totleVisit+' '+value.unitTimeTotleVisit+' '+value._lastVisitTime;
        });
        return str;
    }
    public get(): any {
        return this._userName;
    }

    set userName(userName:String){
        this._userName = userName;
    }
    get userName(){
        return this._userName;
    }
    set totleVisit(totleVisit:number){
        this._totleVisit  =totleVisit;
    }
    get totleVisit(){
        return this._totleVisit;
    }
    set unitTimeTotleVisit(unitTimeTotleVisit:number){
        this._unitTimeTotleVisit = unitTimeTotleVisit;
    }
    get unitTimeTotleVisit(){
        return this._unitTimeTotleVisit;
    }

    set lastVisitTime(lastVisitTime:Date){
        this._lastVisitTime = lastVisitTime;
    }
    get lastVisitTime(){
        return this._lastVisitTime;
    }


}

export { UserPerformanceModel };