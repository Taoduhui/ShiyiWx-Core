import { Task } from "../Utils/Utils";

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
}