/**
 * 定义整个二级能力平台监测的模型
 * 服务，单位时间内总访问次数，当前并发量，平均响应时间
 */
class SoursePerformanceModel {
    static _soursePerformanceMap:Map<String,SoursePerformanceModel> = new Map();
    private _serverName:String='serverName';
    private _totleVisit:number=0;
    private _unitTimeTotleVisit:number=0;
    private _concurrentVolume:number=0;
    private _averageResponseTime:number=0;

    private _totleVisitList:number[];
    private _unitTimeTotleVisitList:number[];
    private _averageResponseTimeList:number[];
    public constructor() {
        this._totleVisitList = new Array();
        this._unitTimeTotleVisitList = new Array();
        this._averageResponseTimeList = new Array();
 
        for(var i = 0;i<30;i++){
            this._totleVisitList.push(Math.ceil(Math.random()*1000));
        }
        for(var i = 0;i<24;i++){
            this._unitTimeTotleVisitList.push(Math.ceil(Math.random()*10));
            this._averageResponseTimeList.push(Math.ceil(Math.random()*100));
         }
     }
    
    public get(): any {
        return this._serverName;
    }
    public static getAll(): String {
        let str :String = '';
        SoursePerformanceModel._soursePerformanceMap.forEach(function(value,key,map){
            str = str+'\n'+ '  serverName:'+key+'  totleVisit: '+value.totleVisit+'  unitTimeTotleVisit:'+value.unitTimeTotleVisit+'  concurrentVolume:'+value.concurrentVolume+'  averageResponseTime:'+value.averageResponseTime;
        });
        return str;
    }
    set serverName(serverName:String){
        this._serverName = serverName;
    }
    get serverName(){
        return this._serverName;
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
    set concurrentVolume(concurrentVolume:number) {
        this._concurrentVolume = concurrentVolume;
    }
    get concurrentVolume(){
        return this._concurrentVolume;
    }
    set averageResponseTime(averageResponseTime:number){
        this._averageResponseTime = averageResponseTime;
    }
    get averageResponseTime(){
        return this._averageResponseTime;
    }

    set totleVisitList(totleVisitList:number[]){
        this._totleVisitList  =totleVisitList;
    }
    get totleVisitList():number[]{
        return this._totleVisitList;
    }
    set unitTimeTotleVisitList(unitTimeTotleVisitList:number[]){
        this._unitTimeTotleVisitList  =unitTimeTotleVisitList;
    }
    get unitTimeTotleVisitList():number[]{
        return this._unitTimeTotleVisitList;
    }
    set averageResponseTimeList(averageResponseTimeList:number[]){
        this._averageResponseTimeList  =averageResponseTimeList;
    }
    get averageResponseTimeList():number[]{
        return this._averageResponseTimeList;
    }

}

export { SoursePerformanceModel };