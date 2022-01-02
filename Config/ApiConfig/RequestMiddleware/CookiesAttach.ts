import { RequsetBody } from "@Root/ShiyiFramework/ShiyiApi/Base/ApiBase";
import { RequestMiddleware } from "@Root/ShiyiFramework/ShiyiApi/Base/Middleware";
import { StorageKey } from "../../StorageConfig/Storage.Config";

export class CookiesAttach extends RequestMiddleware{
    protected ProcessAction(data: RequsetBody): RequsetBody {
        let cookies: string = this.GetCookies();
        if (cookies != "") {
            data.header["cookie"] = cookies;
        }
        return data;
    }
    
    private GetCookies() {
        let cookies: string = "";
        if (wx.getStorageSync(StorageKey.Cookies)) {
            let cookiesMap: Record<string, string> = JSON.parse(wx.getStorageSync(StorageKey.Cookies));
            let keys = Object.keys(cookiesMap) as Array<string>;
            for (let i = 0; i < keys.length; i++) {
                cookies += keys[i] + "=" + cookiesMap[keys[i]] + ";";
            }
        }
        return cookies;
    }
}