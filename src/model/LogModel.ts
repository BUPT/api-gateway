/**
 * 定义Log的模型
 * 访问时间，用户名称，用户类别（是否为管理员等），ip，访问设备，访问服务，访问状态（是否访问成功），响应时间
 */
class LogModel {
    private _ID:String='0';
    private _time:String='';
    private _username:String='';
    private _classes:String='';
    private _ip:String = ''
    private _device:String='';
    private _service:String='';
    private _status:String='';
    private _responseTime:String='';

    constructor() {
       
    }
    public getAll():String{
        return this._ID+' '+this._time+' '+this._username+' '+this._classes+' '+this._ip+' '+this._device+' '+this._service+' '+this._status+' '+this._responseTime;
    }
    public get(): any {
        return [this._ID,this._time,this._username,this._classes,this._ip,this._device,this._service,this._status,this._responseTime];
    }

    set ID(id:String){
        this._ID = id;
    }
    set time(time:String){
        this._time  =time;
    }
    set username(name:String){
        this._username = name;
    }
    set classes(classes:String) {
        this._classes = classes;
    }
    set ip(ip:String){
        this._ip = ip;
    }
    set device(device:String){
        this._device = device;
    }
    set service(service:String){
        this._service = service;
    }
    set status(status:String){
        this._status = status;
    }
    set responseTime(responseTime:String){
        this._responseTime= responseTime;
    }


}

export { LogModel };