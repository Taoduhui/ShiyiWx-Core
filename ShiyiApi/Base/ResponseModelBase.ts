import { CustomRespDataModel } from "@Root/ShiyiFramework/Config/ApiConfig/Api.Config";

export var ResponseExceptionHandler:Map<number,(RespData:ResponseDataModelBase)=>void>=new Map<number,(RespData:ResponseDataModelBase)=>void>();

export interface ResponseDataModelBase extends CustomRespDataModel {
}
/**
 * ShiyiApi的ResponseModel需继承自此类
 * 继承自此类需要子类定义Response数据结构
 * 并实现Parse方法用于解析数据
 * 视情况可添加对数据进一步处理的方法*/
export abstract class ResponseModelBase<ResultT=any> {

    public StatusCode: number = 0;
    /**
     * 解析Response数据,返回this
     * @param data 原始Response数据
     */
    public abstract Parse(data: string|Record<string,any>): ResultT;
}