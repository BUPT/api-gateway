/**
 * 定义整个一级网关能力平台监测的模型
 * 总访问次数，单位时间总访问次数，并发数，cpu memory iops监控，均响应时间
 * 
 */
class TopPerformanceModel {
    static topPerformance:TopPerformanceModel;
    private _totleVisit:number=0;
    private _unitTimeTotleVisit:number=0;
    private _concurrentVolume:number=0;
    private _cpuUsage:number = 0
    private _memoryUsage:String='0';
    private _iopsUsage:number=0;
    private _averageResponseTime:number=0;

    constructor() {
       
    }
    //进行一次初始化，然后将 topPerformance 作为调用对象
    public static init():any{
        TopPerformanceModel.topPerformance = new TopPerformanceModel()
    }
    public static getAll():String{
        return TopPerformanceModel.topPerformance._totleVisit+' '+TopPerformanceModel.topPerformance._unitTimeTotleVisit+' '+TopPerformanceModel.topPerformance._concurrentVolume+' '+TopPerformanceModel.topPerformance._cpuUsage+' '+TopPerformanceModel.topPerformance._iopsUsage+' '+TopPerformanceModel.topPerformance._memoryUsage+' '+TopPerformanceModel.topPerformance._averageResponseTime+' ';
    }
    public get(): any {
        return this._cpuUsage;
    }

    set totleVisit(totleVisit:number){
        this._totleVisit  =totleVisit;
    }
    set unitTimeTotleVisit(unitTimeTotleVisit:number){
        this._unitTimeTotleVisit = unitTimeTotleVisit;
    }
    set concurrentVolume(concurrentVolume:number) {
        this._concurrentVolume = concurrentVolume;
    }
    set cpuUsage(cpuUsage:number){
        this._cpuUsage = cpuUsage;
    }
    set memoryUsage(memoryUsage:String){
        this._memoryUsage = memoryUsage;
    }
    set iopsUsage(iopsUsage:number){
        this._iopsUsage = iopsUsage;
    }
    set averageResponseTime(averageResponseTime:number){
        this._averageResponseTime = averageResponseTime;
    }


}

export { TopPerformanceModel };