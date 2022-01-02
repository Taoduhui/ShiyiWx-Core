import { Router } from "../Router/Router";

export class Event {
    public EventName:string;
    public EventData:Record<string,any>;
    public Stop:boolean = false;
    constructor(EventName:string, EventData:Record<string,any>){
        this.EventName = EventName;
        this.EventData = EventData;
    }

    public async Run(_IncludeComponent?:boolean){
        for(let i=Router.PageStacks.length-1;i>=0;i--){
            let Page = Router.PageStacks[i];
            Page.EventHandler(this)
            if(this.Stop){
                break;
            }
        }
    }

    public Catch(){
        this.Stop = true;
    }

    public Pass(){
        this.Stop = false;
    }
}

export class CustomEvent<DataT> extends Event{
    constructor(EventName:string, EventData:DataT){
        super(EventName,EventData);
    }
}