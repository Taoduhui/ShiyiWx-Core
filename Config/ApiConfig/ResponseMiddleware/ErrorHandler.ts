import { ResponseMiddleware, ResponseType } from "@Root/ShiyiFramework/ShiyiApi/Base/Middleware";

export const ResponseCode={
    NetError:9999,
    Notification:9998,
    Ok:1000,
    CodeInvalidParam:1001,
    CodeUserExist:1002,
    CodeUserNotExist:1003,
    CodeInvalidPassword:1004,
    CodeServerBusy:1005,
    CodeNeedLogin:1006,
    CodeInvalidToken:1007,
    CodeHasRelation:1008
}

export class ErrorHandler extends ResponseMiddleware{
    protected ProcessAction(data: ResponseType): ResponseType {
        let body = data.data;
        if (body.notification) {
            let NotifyStr = "";
            body.notification.forEach(value=>{
                NotifyStr+=value+"\n";
            })
            wx.showModal({
                content:NotifyStr
            })
            
        }
        if (body.code != ResponseCode.Ok) {
            if(body.code==ResponseCode.CodeInvalidToken||body.code==ResponseCode.CodeNeedLogin){
                wx.showToast({title:"登录信息失效,请重新启动程序",icon:"error",duration:2000});
            }else if(body.code==ResponseCode.CodeServerBusy){
                wx.showToast({title:"服务繁忙",icon:"error",duration:2000});
            }else if(body.code==ResponseCode.CodeInvalidParam){
                wx.showToast({title:"参数错误",icon:"error",duration:2000});
            }
            this.Block();
        }
        return data;
    }
    
}