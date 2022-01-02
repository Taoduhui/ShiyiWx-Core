import { RequestMiddleware, ResponseMiddleware } from "@Root/ShiyiFramework/ShiyiApi/Base/Middleware";
import { CookiesAttach } from "./RequestMiddleware/CookiesAttach";
import { JWTAuth } from "./RequestMiddleware/JWTAuth";
import { Cookies } from "./ResponseMiddleware/Cookies";
import { ErrorHandler } from "./ResponseMiddleware/ErrorHandler";

export interface NotificationModel{
    id:number,
    desc:string
}

export interface CustomRespDataModel{
    "code": number,
    "notification":Array<NotificationModel>,
    "msg": "success",
    "data": any
}

export var Host: string = "https://sport.slanceli.top/wxapi";
//export var Host: string = "http://localhost:8000";

export const CustomRequestMiddleware:Array<RequestMiddleware>=[
    new CookiesAttach(),
    new JWTAuth(),
]


export const CustomResponseMiddleware:Array<ResponseMiddleware>=[
    new Cookies(),
    new ErrorHandler()
]
