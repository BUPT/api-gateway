/**
 * @author: 林贻民
 * @description: 使用单例设计模式实现全局事件机制
 * 
 */

import { EventEmitter } from "events";
import { APPEvent } from "./APPEvent";


class NotifyEvent implements APPEvent{
    public static readonly notifyEvent: NotifyEvent = new NotifyEvent();

    private eventEmitter: EventEmitter = new EventEmitter();

    private NotifyEvent(){

    }

    event : string;

    public setEvent(event: string): void{
        this.event = event;
    }

    public getEvent(): string{
        return this.event;
    }

    data: any;

    public setData(data : any){
        this.data = data;
    }

    public getData(): any{
        return this.data;
    }

    public handler(arg1?: any, arg2?: any, arg3?: any): void{
        
    }
    /**
     * 发布事件
     * @param appEvent 
     */
    public publish(appEvent: APPEvent): void{
        if(appEvent.data !== undefined){
            this.eventEmitter.emit(appEvent.event, appEvent.data);
        }else{
            this.eventEmitter.emit(appEvent.event);
        }
    }

    public subscribe(appEvent: APPEvent):void{
        this.eventEmitter.on(appEvent.event, appEvent.handler);
    }

    public unSubscribe(appEvent: APPEvent): void{
        this.eventEmitter.removeAllListeners(appEvent.event);
    }
}