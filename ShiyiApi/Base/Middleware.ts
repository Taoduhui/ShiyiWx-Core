import { CustomRespDataModel } from "@Root/ShiyiFramework/Config/ApiConfig/Api.Config";
import { RequsetBody } from "./ApiBase";

export interface ResponseType extends WechatMiniprogram.RequestSuccessCallbackResult<
    string |
    WechatMiniprogram.IAnyObject |
    ArrayBuffer
>{
    data:CustomRespDataModel
}

export abstract class Middleware {

    private IsBlocked = false;

    protected abstract ProcessAction(data: Record<string, any>): Record<string, any>;

    public Process(data: Record<string, any>): Record<string, any> | null {
        let res = this.ProcessAction(data);
        if (this.IsBlocked) {
            return null;
        }
        return res;
    }

    protected Block() {
        this.IsBlocked = true;
    }
}

export abstract class RequestMiddleware extends Middleware {
    protected abstract ProcessAction(data: RequsetBody): RequsetBody;
    public Process(data: RequsetBody): RequsetBody | null {
        let res = super.Process(data);
        return res == null ? res : res as RequsetBody;
    }
}

export abstract class ResponseMiddleware extends Middleware {
    protected abstract ProcessAction(
        data: ResponseType): ResponseType;
    public Process(
        data: ResponseType): ResponseType| null {
        let res = super.Process(data);
        return res == null ? res : res as ResponseType;
    }
}