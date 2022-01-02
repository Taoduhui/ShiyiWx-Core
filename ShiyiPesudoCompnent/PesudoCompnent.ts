import { GlobalData } from "@Root/GlobalData/GlobalData";
import { Data } from "../Data/Data";
import { ShiyiPageBase } from "../ShiyiPage/Base/ShiyiPageBase";
import { DataChangeOption } from "../UI/Model/DataChangeModel/DataChangeModel";
import { IuiOption } from "../UI/Model/IuiOption";


abstract class ShiyiComponentExternBase<CompT extends PesudoCompnent> {
    public CompInstance!: CompT
    public get Inst(): CompT {
        return this.CompInstance;
    }


    public _render!: (value: Record<string, any>) => void;

    constructor() {

    }

    public Init(): ShiyiComponentExternBase<CompT> {
        this._render = this.CompInstance.Render.bind(this.CompInstance);
        return this;
    }

    public abstract InitCustomData(_options?: Record<string, any> | undefined): void;

    public Render<T extends PesudoCompnentData>(value: Partial<Record<keyof T, any>>): void {
        this._render(value);
    }
}

export abstract class ShiyiCompFuncBase<CompT extends PesudoCompnent> extends ShiyiComponentExternBase<CompT> {
}

export abstract class ShiyiCompUIBase<CompT extends PesudoCompnent> extends ShiyiComponentExternBase<CompT> {
    public Init(): ShiyiComponentExternBase<CompT> {
        super.Init();
        this.LoadGlobalUIConfig();
        return this;
    }
    public LoadGlobalUIConfig(): void {
    }
}

export interface PesudoCompnentData {
    Theme: string
}

interface ObserverTarget<DataT> {
    name: string;
    PreProcess?: (value: DataT) => any;
}

interface ObserverBackwardTarget<DataT> {
    TargetDataObj: Data<any>;
    PreProcess?: (value: DataT) => any;
}


export abstract class PesudoCompnent {
    public Func!: ShiyiCompFuncBase<PesudoCompnent>;
    public UI!: ShiyiCompUIBase<PesudoCompnent>;
    public PageInstance!: ShiyiPageBase;
    public get Inst(): ShiyiPageBase {
        return this.PageInstance;
    }
    public ComponentId: string = "";
    public data!: PesudoCompnentData;

    public _render!: (value: Record<string, any>) => void;

    constructor(_ComponentId: string) {
        this.ComponentId = _ComponentId;
    }

    public Init(): PesudoCompnent {
        this.UI.CompInstance = this;
        this.Func.CompInstance = this;
        this.UI.Init().InitCustomData();
        this.Func.Init().InitCustomData();
        return this;
    }


    public Render<T extends PesudoCompnentData>(value: Partial<Record<keyof T, any>>): void {
        let RealValue: Record<string, any> = {};
        Object.keys(value).forEach(key => {
            RealValue[this.ComponentId + key] = (value as Record<string, any>)[key];
        })
        this._render(RealValue);
    }

    //#region 数据绑定
    /**
     * 全局数据绑定
     * @type {GlobalDataT} 全局数据类型
     * @type {T} 页面中派生自PesudoCompnentData的data类型
     * @param GlobalData 全局数据Object
     * @param SelfDataKey 自身数据Key
     * @param PreProcess 预处理方式
     */
    public BindGlobal<GlobalDataT, T extends PesudoCompnentData>(
        GlobalData: Data<GlobalDataT>,
        SelfDataKey: keyof T,
        PreProcess?: (value: GlobalDataT) => any) {
        this.Inst.BindGlobal<GlobalDataT, any>(GlobalData, this.ComponentId + SelfDataKey, PreProcess);
    }

    private RegisteredGlobalBackWardBinding: Record<string, Array<ObserverBackwardTarget<any>>> = {};

    public BindGlobalBackward<SelfDataT, T extends PesudoCompnentData>(
        SelfDataKey: keyof T,
        GlobalDataObj: Data<any>,
        PreProcess?: (value: SelfDataT) => any) {
        this.Inst.BindGlobalBackward<any, any>(this.ComponentId + SelfDataKey, GlobalDataObj, PreProcess);
    }

    /**
     * 全局数据双向绑定
     * @param SelfDataKey 自身数据Key
     * @param GlobalDataObj 全局数据Object
     * @param SelfToGlobalPreProcess 自身数据到全局数据的预处理
     * @param GlobalToSelfPreProcess 全局数据到自身数据的预处理
     */
    public BindGlobalTwoWay<SelfDataT, GlobalDataT, T extends PesudoCompnentData>(
        SelfDataKey: keyof T,
        GlobalDataObj: Data<GlobalDataT>,
        SelfToGlobalPreProcess?: (value: SelfDataT) => GlobalDataT,
        GlobalToSelfPreProcess?: (value: GlobalDataT) => SelfDataT) {
        this.BindGlobal<GlobalDataT, T>(GlobalDataObj, SelfDataKey, GlobalToSelfPreProcess);
        this.BindGlobalBackward<SelfDataT, T>(SelfDataKey, GlobalDataObj, SelfToGlobalPreProcess);
    }


    private RegisteredSelfBinding: Record<string, Array<ObserverTarget<any>>> = {};

    /**
     * 页面数据自绑定
     * @type {SrcDataT} 源数据类型
     * @type {T} 页面中派生自PesudoCompnentData的data类型
     * @param SrcKey 源数据Key
     * @param TargetKey 目标数据Key
     * @param PreProcess 预处理方式
     */
    public BindSelf<SrcDataT, T extends PesudoCompnentData>(SrcKey: keyof T, TargetKey: keyof T, PreProcess?: (value: SrcDataT) => any) {
        this.Inst.BindSelf<any, any>(this.ComponentId + SrcKey, this.ComponentId + TargetKey, PreProcess)
    }

    public BindSelfTwoWay<FirstDataT, SecDataT, T extends PesudoCompnentData>(
        FirstData: keyof T,
        SecData: keyof T,
        FirstToSecPreProcess?: (value: FirstDataT) => SecDataT,
        SecToFirstPreProcess?: (value: SecDataT) => FirstDataT
    ) {
        this.BindSelf<FirstDataT, T>(FirstData, SecData, FirstToSecPreProcess);
        this.BindSelf<SecDataT, T>(SecData, FirstData, SecToFirstPreProcess);
    }

}