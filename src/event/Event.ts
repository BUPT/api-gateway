/**
 * @author: 林贻民
 * @description: 使用单例设计模式实现全局事件机制
 * 
 */

import { EventEmitter } from "events";


class Event{
    public static readonly appEvent: Event = new Event();

    private eventEmitter: EventEmitter = new EventEmitter();

    private Event(){

    }

    /**
     * 发布事件
     * @param event 
     * @param data 
     */
    public publish(event: string, data?: any): void{
        if(data !== undefined){
            this.eventEmitter.emit(event, data);
        }else{
            this.eventEmitter.emit(event);
        }
    }

    public subscribe(event: string, handler: (data?: any) => void):void{
        
    }

    public unSubscribe(): void{

    }
}