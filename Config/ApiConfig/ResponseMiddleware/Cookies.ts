import { ResponseMiddleware, ResponseType } from "@Root/ShiyiFramework/ShiyiApi/Base/Middleware";
import { SaveCookies } from "@Root/ShiyiFramework/Utils/Utils";
import { CustomRespDataModel } from "../Api.Config";

export class Cookies extends ResponseMiddleware{
    protected ProcessAction(data: ResponseType): ResponseType {
        SaveCookies(data.cookies);
        return data;
    }
}