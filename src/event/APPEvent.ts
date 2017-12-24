/**
 * @author: 林贻民
 */
interface APPEvent{
    // 事件名称
    event : string;
    // 传递参数
    data : any;
    // 处理函数
    handler : (arg1? : any, arg2? : any, arg3? : any) => void;
}

export{APPEvent};