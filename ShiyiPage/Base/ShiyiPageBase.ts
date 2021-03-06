import { Event } from "../../Event/Event";
import { Router } from "../../Router/Router";
import { Data } from "../../Data/Data";
import { GlobalData } from "../../../GlobalData/GlobalData";
import { PesudoCompnent } from "../../ShiyiPesudoCompnent/PesudoCompnent";
import { DataChangeOption } from "../../UI/Model/DataChangeModel/DataChangeModel";
import { IuiOption } from "../../UI/Model/IuiOption";
import { CustomGlobalPageData } from "../../Config/ShiyiPageConfig/ShiyiPage.Config";
import { Debug, ShiyiDebug } from "@Root/ShiyiFramework/Utils/Utils";


abstract class ShiyiPageExternBase<PageT extends ShiyiPageBase> {
    public PageInstance!: PageT
    public get Inst(): PageT {
        return this.PageInstance;
    }
    public _Render!: (value: Record<string, any>) => void;
    public data!: Record<string, any>;
    constructor() {
    }

    public _init(): ShiyiPageExternBase<PageT> {

        this._Render = this.PageInstance.Render.bind(this.PageInstance);
        this.data = this.PageInstance.data;
        return this;
    }
    public abstract InitCustomData(_options?: Record<string, any> | undefined): void;

    public Render<T extends PageData>(value: Partial<Record<keyof T, any>>): void {

        this._Render(value);
    }
}

export abstract class ShiyiPageFuncBase<PageT extends ShiyiPageBase> extends ShiyiPageExternBase<PageT> {
}

export abstract class ShiyiPageUIBase<PageT extends ShiyiPageBase> extends ShiyiPageExternBase<PageT> {
    public _init(): ShiyiPageExternBase<PageT> {

        super._init();
        this.LoadGlobalUIConfig();
        return this;
    }
    public LoadGlobalUIConfig(): void {

        this.PageInstance.BindGlobal(GlobalData.Theme, "Theme",
            (value: boolean) => {
                return value ? "Boy" : "Girl";
            }
        )
    }
}

export interface PageData extends CustomGlobalPageData {

}

export interface PesudoCompnentStack {

}

export interface ShiyiPageBase extends WechatMiniprogram.Page.InstanceMethods<WechatMiniprogram.Component.DataOption> {

}

interface ObserverTarget<DataT> {
    name: string;
    PreProcess?: (value: DataT) => any;
}

interface ObserverBackwardTarget<DataT> {
    TargetDataObj: Data<any>;
    PreProcess?: (value: DataT) => any;
}



export abstract class ShiyiPageBase
    implements WechatMiniprogram.Page.Options<
    WechatMiniprogram.Page.DataOption,
    WechatMiniprogram.Page.CustomOption
    >{
    public data!: PageData;
    public Func!: ShiyiPageExternBase<ShiyiPageBase>;
    public UI!: ShiyiPageExternBase<ShiyiPageBase>;
    //#region ????????????
    public RegisteredEventHandlers: Record<string, (e: Event) => void> = {};
    public PesudoCompnents!: PesudoCompnentStack;
    protected Loaded?: () => void;
    /**
     * ????????????????????????
     * @param Trigger ?????????
     * @param Handler ????????????
     */
    public BindEvent(Trigger: string, Handler: (e: Event) => void): void {

        this.AddHandler(Trigger, Handler);
    }
    public AddHandler(Trigger: string, Handler: (e: Event) => void): void {

        this.RegisteredEventHandlers[Trigger] = Handler;
    }
    public Removehandler(Trigger: string, Handler: (e: Event) => void): void {

        if (this.RegisteredEventHandlers[Trigger] === Handler) {
            delete this.RegisteredEventHandlers[Trigger];
        }
    }

    public EventHandler(e: Event): void {

        e.Catch();
        let Handler = this.RegisteredEventHandlers[e.EventName];
        Debug(3)(Handler);
        if (Handler) {
            Handler(e);
        } else {
            e.Pass();
        }
    }
    //#endregion

    //#region ????????????


    private ObserverList: Record<string, Array<ObserverTarget<any>>> = {};
    /**
     * ??????????????????
     * @param data ???????????????
     * @param target ????????????????????????
     */
    public AddObserver<DataT>(data: Data<DataT>, target: ObserverTarget<DataT>) {
        if (this.ObserverList[data.DataKey]) {
            let CurrentList = this.ObserverList[data.DataKey];
            CurrentList.forEach((value, index) => {
                if (value.name == target.name) {
                    CurrentList.splice(index, 1);
                }
            })
            CurrentList.push(target);
        } else {
            this.ObserverList[data.DataKey] = [target];
        }
        data.Bind(this);
    }



    public RemoveObserver<DataT>(data: Data<DataT>) {

        if (this.ObserverList[data.DataKey]) {
            delete this.ObserverList[data.DataKey];
        }
    }

    public ObserverNotify(key: string, value: any) {

        let target = this.ObserverList[key];
        if (target) {
            let NotifyData: Record<string, any> = {};
            target.forEach(preprocess => {
                NotifyData[preprocess.name] = preprocess.PreProcess ? preprocess.PreProcess(value) : value;
            })
            this.RenderNoBackward<any>(NotifyData);
        }

    }


    /**
     * ??????????????????
     * @type {GlobalDataT} ??????????????????
     * @type {T} ??????????????????PageData???data??????
     * @param GlobalData ????????????Object
     * @param SelfDataKey ????????????Key
     * @param PreProcess ???????????????
     */
    public BindGlobal<GlobalDataT, T extends PageData>(
        GlobalData: Data<GlobalDataT>,
        SelfDataKey: keyof T,
        PreProcess?: (value: GlobalDataT) => any) {
        this.AddObserver<GlobalDataT>(GlobalData, {
            name: SelfDataKey as string,
            PreProcess: PreProcess
        })
    }

    private RegisteredGlobalBackWardBinding: Record<string, Array<ObserverBackwardTarget<any>>> = {};

    public BindGlobalBackward<SelfDataT, T extends PageData>(
        SelfDataKey: keyof T,
        GlobalDataObj: Data<any>,
        PreProcess?: (value: SelfDataT) => any) {

        if (!this.RegisteredGlobalBackWardBinding[SelfDataKey as string]) {
            this.RegisteredGlobalBackWardBinding[SelfDataKey as string] = new Array<ObserverBackwardTarget<any>>();
        }
        this.RegisteredGlobalBackWardBinding[SelfDataKey as string].push({
            "TargetDataObj": GlobalDataObj,
            "PreProcess": PreProcess
        });
    }

    /**
     * ????????????????????????
     * @param SelfDataKey ????????????Key
     * @param GlobalDataObj ????????????Object
     * @param SelfToGlobalPreProcess ???????????????????????????????????????
     * @param GlobalToSelfPreProcess ???????????????????????????????????????
     */
    public BindGlobalTwoWay<SelfDataT, GlobalDataT, T extends PageData>(
        SelfDataKey: keyof T,
        GlobalDataObj: Data<GlobalDataT>,
        SelfToGlobalPreProcess?: (value: SelfDataT) => GlobalDataT,
        GlobalToSelfPreProcess?: (value: GlobalDataT) => SelfDataT) {

        this.BindGlobal<GlobalDataT, T>(GlobalDataObj, SelfDataKey, GlobalToSelfPreProcess);
        this.BindGlobalBackward<SelfDataT, T>(SelfDataKey, GlobalDataObj, SelfToGlobalPreProcess);
    }


    private RegisteredSelfBinding: Record<string, Array<ObserverTarget<any>>> = {};

    /**
     * ?????????????????????
     * @type {SrcDataT} ???????????????
     * @type {T} ??????????????????PageData???data??????
     * @param SrcKey ?????????Key
     * @param TargetKey ????????????Key
     * @param PreProcess ???????????????
     */
    public BindSelf<SrcDataT, T extends PageData>(SrcKey: keyof T, TargetKey: keyof T, PreProcess?: (value: SrcDataT) => any) {

        if (!this.RegisteredSelfBinding[SrcKey as string]) {
            this.RegisteredSelfBinding[SrcKey as string] = new Array<ObserverTarget<any>>();
        }
        this.RegisteredSelfBinding[SrcKey as string].push({
            name: TargetKey as string,
            PreProcess: PreProcess
        })
        let RenderData: Record<string, any> = {};
        //@ts-ignore
        RenderData[SrcKey as string] = this.data[SrcKey]
        this.Render<any>(RenderData)
    }

    /**
     * 
     * @param FirstData Data1
     * @param SecData Data2
     * @param FirstToSecPreProcess Data1???Data2????????????
     * @param SecToFirstPreProcess Data2???Data1????????????
     */
    public BindSelfTwoWay<FirstDataT, SecDataT, T extends PageData>(
        FirstData: keyof T,
        SecData: keyof T,
        FirstToSecPreProcess?: (value: FirstDataT) => SecDataT,
        SecToFirstPreProcess?: (value: SecDataT) => FirstDataT
    ) {

        this.BindSelf<FirstDataT, T>(FirstData, SecData, FirstToSecPreProcess);
        this.BindSelf<SecDataT, T>(SecData, FirstData, SecToFirstPreProcess);
    }

    public Render<T extends PageData>(value: Partial<Record<keyof T, any>>) {

        this._render<T>(value, false);
    }
    public RenderNoBackward<T extends PageData>(value: Partial<Record<keyof T, any>>) {

        this._render<T>(value, true);
    }


    private ComponentDataKeyPair: Record<string, { key: string, CompInst: PesudoCompnent }> = {};
    private _render<T extends PageData>(value: Partial<Record<keyof T, any>>, DisableBackward: boolean) {
        let Modified = false;
        let Keys = Object.keys(value)
        type DataKeys = keyof T;
        Keys.forEach(key => {
            if (this.ComponentDataKeyPair[key]) {
                //@ts-ignore
                this.ComponentDataKeyPair[key].CompInst.data[this.ComponentDataKeyPair[key].key] = value[key];
            }
            if (this.RegisteredSelfBinding[key]) {
                this.RegisteredSelfBinding[key].forEach((target) => {
                    if (Keys.indexOf(target.name as string) < 0) {
                        Modified = true;
                        if (target.PreProcess) {
                            value[target.name as DataKeys] = target.PreProcess(value[key as DataKeys]);
                        } else {
                            value[target.name as DataKeys] = value[key as DataKeys];
                        }
                    }
                })
            }
            if (!DisableBackward && this.RegisteredGlobalBackWardBinding[key]) {
                this.RegisteredGlobalBackWardBinding[key].forEach(target => {
                    target.TargetDataObj.Set(
                        target.PreProcess ?
                            target.PreProcess(value[key as DataKeys]) :
                            value[key as DataKeys]);
                })
            }
        });
        if (Modified) {
            this._render<T>(value, DisableBackward);
            return;
        }
        this.setData(value);
    }

    //#endregion

    protected _loadPesudoComponents(): Array<string> {

        if (!this.PesudoCompnents) {
            return [];
        }
        let IdArr: Array<string> = [];
        let components = this.PesudoCompnents as Record<string, PesudoCompnent>;
        Object.keys(components).forEach(key => {
            let Comp = components[key];
            Comp.PageInstance = this;
            Comp.animate = this.animate.bind(this);
            Comp.clearAnimation = this.clearAnimation.bind(this);
            Comp._render = this.Render.bind(this);
            let CompProto = Comp;
            let CompId = components[key].ComponentId;
            IdArr.push(CompId);
            while (CompProto) {
                Object.keys(CompProto).forEach(key => {
                    //if (BaseFunctions.indexOf(key) < 0 ) { 
                    //@ts-ignore
                    if (typeof CompProto[key] == "function") {
                        //@ts-ignore
                        this[CompId + key] = CompProto[key].bind(Comp);
                    }
                    //}
                });
                CompProto = Object.getPrototypeOf(CompProto);
            }
            let CompData: Record<string, any> = {};
            var MappingCompData = {}

            Object.keys(components[key].data).forEach(datakey => {
                //@ts-ignore
                CompData[CompId + datakey] = components[key].data[datakey];
                this.ComponentDataKeyPair[CompId + datakey] = {
                    key: datakey,
                    CompInst: components[key]
                }
            })
            this.Render(CompData);
            Comp.Init();
        })
        Debug(3)("GetAllComponents", this.PesudoCompnents);
        return IdArr;
    }

    public _getAllComponents(): Record<string, PesudoCompnent> {
        Debug(9)("_getAllComponents");
        let AllComps: Record<string, PesudoCompnent> = {};
        let comps = this.PesudoCompnents as Record<string, PesudoCompnent>;
        if (!comps) { return {} }
        Object.keys(comps).forEach(key => {
            AllComps[comps[key].ComponentId] = comps[key];
            let subcomps = comps[key].GetAllComponents();
            Object.keys(subcomps).forEach(subkey => {
                AllComps[subkey] = subcomps[subkey];
            })
        })
        return AllComps;
    }

    public DataChange(e: IuiOption) {
        let model = e as DataChangeOption;
        let path = model.currentTarget.dataset.key.split(".");
        let data: Record<string, any> = {}
        let root = data;
        for (let i = 0; i < path.length; i++) {
            if (i == path.length - 1) {
                data[path[i]] = model.detail.value;
                continue;
            }
            if (typeof data[path[i]] == "number") {
                //@ts-ignore
                data[path[i]] = Number(this.data[path[i]]);
            } else {
                //@ts-ignore
                data[path[i]] = this.data[path[i]];
            }
            data = data[path[i]];
        }
        this.Render(root);
    }

    protected _loadExtends() {

        this.Func.PageInstance = this;
        this.Func._init();
        this.UI.PageInstance = this;
        this.UI._init();
        this.UI.InitCustomData();
        this.Func.InitCustomData();
    }

    // IdArr: Array<string>
    public _enablePesudoComponents() {

        if (!this.PesudoCompnents) {
            return;
        }
        let components = this.PesudoCompnents as Record<string, PesudoCompnent>;
        Object.keys(components).forEach(key => {
            components[key].SetVisibility(true);

        })
        // let EnableCommand:Record<string,boolean>={};
        // IdArr.forEach(id=>{
        //     EnableCommand[id+'Visible']=true
        // })
        // Debug(3)("EnablePesudoComponents",EnableCommand);
        // this.Render<any>(this.EnablePesudoComponents);
    }

    public InParameter: any

    public onLoad() {
        this.InParameter = Router.NavigateParam;
        Router.PageLoad(this);
        if (this.Loaded) {
            this.Loaded();
        }
        this.PesudoCompnents = this._getAllComponents();
        this.BackupComp();
        let IdArr = this._loadPesudoComponents();
        this._loadExtends();
        this._pageInitCompeted();
    }

    public _pageInitCompeted() {

        this._enablePesudoComponents();
        let components = this.PesudoCompnents as Record<string, PesudoCompnent>;
        Object.keys(components).forEach(key => {
            components[key]._onReady();
        })
        this.Ready();
    }

    public Ready() { }

    private PesudoComponentBackup: Record<string, any> = {};
    private BackupComp() {
        Object.keys(this.PesudoCompnents).forEach(key => {
            if (!this.PesudoComponentBackup[key]) {
                //@ts-ignore
                this.PesudoComponentBackup[key] = JSON.stringify(this.PesudoCompnents[key]["data"]);
            }
        })
        Debug(5)(this.PesudoComponentBackup);
    }

    private RecoveryComp() {
        Debug(5)(this.PesudoComponentBackup);
        Object.keys(this.PesudoCompnents).forEach(key => {
            if(this.PesudoComponentBackup[key]){
                //@ts-ignore
                this.PesudoCompnents[key]["data"] = JSON.parse(this.PesudoComponentBackup[key]); 
            }else{
                //@ts-ignore
                console.error("RecoveryFaild,key:",key,this.PesudoCompnents[key]);
            }
        })
    }

    public onUnload() {
        this.RecoveryComp();
        Router.PageUnload();
    }
};