export interface Api {
    //API名字
    apiname: string;
    //API地区
    area: string;
    //api方法
    method: string;
    //api状态
    status:string;
    //api分类
    APIType: string;
    //api描述
    des: string;
    //API请求路径
    path: string;
    //API服务地址
    Address: string;
    //api请求端口号
    ServicePort: string;
    //api参数？？？？
    //API成功返回结果
    successResult: string;
    //api失败结果
    errorResult: string;
    //api错误码？？？？
    id: number;
    DataCenter:any;
    Node: any;
    time:any;
    ServiceAddress: any;
    ServiceEnableTagOverride: any;
    ServiceID: any;
    ServiceName: string;
    ServiceTags: any;
}