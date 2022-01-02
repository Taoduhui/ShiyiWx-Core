import { ResponseCode } from "@Root/ShiyiFramework/Config/ApiConfig/ResponseMiddleware/ErrorHandler";
import { RequestModelBase } from "../../../../Base/RequestModelBase";
import {  ResponseDataModelBase, ResponseModelBase } from "../../../../Base/ResponseModelBase";


export class SampleReqModel extends RequestModelBase {
    private Id:number;
    constructor(id:number) {
        super();
        this.Id = id;
    }
    public GetMethod(): "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT"  {
        return "GET"
}
    public GetBody(): Record<string, any> {
        return {
            id: this.Id,
        };
    }

}

export interface SampleApiRespData extends ResponseDataModelBase{

}

export class SampleRespModel extends ResponseModelBase {

    public IsOk:boolean = false;
    public Parse(data: SampleApiRespData) {
        this.IsOk = data.code == ResponseCode.Ok;
        return this;
    }
    
}