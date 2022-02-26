import { Task } from "../Task/Task";

export class WxApi {

    public static Login(): Task<string> {
        let task = new Task<string>((task) => {
            wx.login({
                success: (res) => {
                    task.Continue(res.code);
                }
            })
        }, true);
        return task;
    }

    public static GetSystemInfo():Task<WechatMiniprogram.SystemInfo>{
        let task = new Task<WechatMiniprogram.SystemInfo>((task)=>{
            wx.getSystemInfo({
                success:(res)=>{
                    task.Continue(res)
                }
            })
        },true);
        return task;
    }
}

export interface ScrollViewContext{
    scrollEnabled:boolean;
    bounces:boolean;
    showScrollbar:boolean;
    pagingEnabled:boolean;
    fastDeceleration:boolean;
    decelerationDisabled:boolean;
    scrollTo:(param:{
        top:number,
        left:number,
        velocity:number,
        duration:number,
        animated:boolean
    })=>{};
    scrollIntoView:(selector:string)=>{}
}