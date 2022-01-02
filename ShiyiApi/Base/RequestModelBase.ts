import { GlobalData } from "@Root/GlobalData/GlobalData";
import { StorageKey } from "@Root/ShiyiFramework/Config/StorageConfig/Storage.Config";
/**
 * ShiyiApi的RequestModel需继承自此类
 * 继承自此类需子类重写构造函数用于传入参数
 * 并实现GetBody方法用于将数据转换为Record<string,any>
 * 以及GetMethod方法用于定义Request的方法*/
export abstract class RequestModelBase {
    /**
     * 定义Request方法，仅需return一种方法即可*/
    public abstract GetMethod(): "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" ;
    /**
     * 将Request的数据拼接为Record<string,any>*/
    public abstract GetBody(): Record<string, any>;
    /**
     * 获取Header，实现了微信小程序的Cookie系统*/
    public GetHeader(): Record<string, any> {
        let Header: Record<string, any> = {};
        return Header;
    }

}