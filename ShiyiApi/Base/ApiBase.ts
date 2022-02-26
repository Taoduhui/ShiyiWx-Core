import { Debug } from "../../Utils/Utils";
import Utils = require("../../Utils/Utils");
import { RequestModelBase } from "./RequestModelBase";
import {  ResponseDataModelBase, ResponseExceptionHandler, ResponseModelBase } from "./ResponseModelBase";
import { CustomRequestMiddleware, CustomRespDataModel, CustomResponseMiddleware, Host } from "@Root/ShiyiFramework/Config/ApiConfig/Api.Config";
import { RequestMiddleware, ResponseMiddleware, ResponseType } from "./Middleware";
import { Task } from "../../Task/Task";

export interface RequsetBody{
    method: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" ,
    url: string,
    data: Record<string,any>,
    header: Record<string,any>,
}

/**
 * ShiyiApi需继承自ApiBase
 * 继承ApiBase仅需要子类重写构造函数
 * 将相应的Model以及结束事件传入ApiBase
 * 视情况可选是否传入外部的结束事件给子类*/
export abstract class ApiBase<ResultT = any> extends Task<ResultT> {
    public Host: string = Host;
    public Url: string = "";//完整Url
    public ReqModel: RequestModelBase;
    public RespModel: ResponseModelBase;
    public RequestMiddlewareGroup:Array<RequestMiddleware>=[];
    public ResponseMiddlewareGroup:Array<ResponseMiddleware>=[];
    public Responed: (model: ResultT) => void;
    /**
     * 
     * @param _Url 请求的Url，https://domian:port + [_Url]
     * @param _ReqModel RequestModel，定义了Request所需数据
     * @param _RespModel ResponseModel，定义了Response处理数据的方法
     * @param _Responed 请求完成后的处理事件
     */
    constructor(
        _Url: string,
        _ReqModel: RequestModelBase,
        _RespModel: ResponseModelBase,
        _Responed: (model: ResultT) => void) {
        super((task) => {
            let Body:RequsetBody = {
                method: this.ReqModel.GetMethod(),
                url: this.Url,
                data: this.ReqModel.GetBody(),
                header: this.ReqModel.GetHeader(),
            }

            //#region "个体Api中间件"
            for(let i=0;i<this.RequestMiddlewareGroup.length;i++){
                let res = this.RequestMiddlewareGroup[i].Process(Body);
                if(res){
                    Body = res;
                }else{
                    return;
                }
            }
            //#endregion

            //#region "全局中间件"
            for(let i=0;i<CustomRequestMiddleware.length;i++){
                let res = CustomRequestMiddleware[i].Process(Body);
                if(res){
                    Body = res;
                }else{
                    return;
                }
            }
            //#endregion

            wx.request({
                method: Body.method,
                url: Body.url,
                data: Body.data,
                header: Body.header,
                success: res => {
                    let CustomData:CustomRespDataModel;
                    for(let i=0;i<this.ResponseMiddlewareGroup.length;i++){
                        let CustomData = this.ResponseMiddlewareGroup[i].Process(res as ResponseType);
                        if(CustomData==null){
                            return;
                        }
                    }
                    for(let i=0;i<CustomResponseMiddleware.length;i++){
                        let CustomData = CustomResponseMiddleware[i].Process(res as ResponseType);
                        if(CustomData==null){
                            return;
                        }
                    }
                    let RespData = res.data as ResponseDataModelBase;
                    this.RespModel.StatusCode = res.statusCode;
                    let ParsedData = this.RespModel.Parse(RespData)
                    this.Responed(ParsedData);
                    task._continue(ParsedData);
                },
                fail: res => {
                    wx.showToast({
                        title:'网络错误',
                        icon:'error',
                        duration:2000
                    })
                    Debug(3)({
                        Url: this.Url,
                        Msg: res
                    });
                }
            })
        },true);
        this.Url = this.Host + _Url;
        this.ReqModel = _ReqModel;
        this.RespModel = _RespModel;
        this.Responed = _Responed;

    }

    

    /**
     * 执行Request*/
    public Exec(): ApiBase<ResultT> {
        this.Run();
        return this;
    };
}