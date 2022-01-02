import { GlobalData } from "@Root/GlobalData/GlobalData";
import { RequsetBody } from "@Root/ShiyiFramework/ShiyiApi/Base/ApiBase";
import { RequestMiddleware } from "@Root/ShiyiFramework/ShiyiApi/Base/Middleware";

export class JWTAuth extends RequestMiddleware{
    protected ProcessAction(data: RequsetBody): RequsetBody {
        let Token = GlobalData.Token.Get();
        if(Token){
            data.header["Authorization"]="Bearer " + Token;
        }
        data.header["Content-Type"]="application/json";
        return data;
    }
}