import { GlobalData } from "@Root/GlobalData/GlobalData";
import { Data } from "../Data/Data";
import { PesudoCompnentStack, ShiyiPageBase } from "../ShiyiPage/Base/ShiyiPageBase";
import { Task } from "../Task/Task";
import { DataChangeOption } from "../UI/Model/DataChangeModel/DataChangeModel";
import { IuiOption } from "../UI/Model/IuiOption";
import { ShiyiDebug } from "../Utils/Utils";


abstract class ShiyiComponentExternBase<CompT extends PesudoCompnent> {
    public CompInstance!: CompT
    public get Inst(): CompT {
        
        return this.CompInstance;
    }


    public _render!: (value: Record<string, any>) => void;

    constructor() {

    }

    public _init(): ShiyiComponentExternBase<CompT> {
        
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
    public _init(): ShiyiComponentExternBase<CompT> {
        
        super._init();
        this.LoadGlobalUIConfig();
        return this;
    }
    public LoadGlobalUIConfig(): void {
        
    }
}

export interface PesudoCompnentData {
    Theme: string;
    Visible: boolean
}

interface ObserverTarget<DataT> {
    name: string;
    PreProcess?: (value: DataT) => any;
}

interface ObserverBackwardTarget<DataT> {
    TargetDataObj: Data<any>;
    PreProcess?: (value: DataT) => any;
}


interface KeyFrame {
    /** 关键帧的偏移，范围[0-1] */
    offset?: number
    /** 动画缓动函数 */
    ease?: string
    /** 基点位置，即 CSS transform-origin */
    transformOrigin?: string
    /** 背景颜色，即 CSS background-color */
    backgroundColor?: string
    /** 底边位置，即 CSS bottom */
    bottom?: number | string
    /** 高度，即 CSS height */
    height?: number | string
    /** 左边位置，即 CSS left */
    left?: number | string
    /** 宽度，即 CSS width */
    width?: number | string
    /** 不透明度，即 CSS opacity */
    opacity?: number | string
    /** 右边位置，即 CSS right */
    right?: number | string
    /** 顶边位置，即 CSS top */
    top?: number | string
    /** 变换矩阵，即 CSS transform matrix */
    matrix?: number[]
    /** 三维变换矩阵，即 CSS transform matrix3d */
    matrix3d?: number[]
    /** 旋转，即 CSS transform rotate */
    rotate?: number
    /** 三维旋转，即 CSS transform rotate3d */
    rotate3d?: number[]
    /** X 方向旋转，即 CSS transform rotateX */
    rotateX?: number
    /** Y 方向旋转，即 CSS transform rotateY */
    rotateY?: number
    /** Z 方向旋转，即 CSS transform rotateZ */
    rotateZ?: number
    /** 缩放，即 CSS transform scale */
    scale?: number[]
    /** 三维缩放，即 CSS transform scale3d */
    scale3d?: number[]
    /** X 方向缩放，即 CSS transform scaleX */
    scaleX?: number
    /** Y 方向缩放，即 CSS transform scaleY */
    scaleY?: number
    /** Z 方向缩放，即 CSS transform scaleZ */
    scaleZ?: number
    /** 倾斜，即 CSS transform skew */
    skew?: number[]
    /** X 方向倾斜，即 CSS transform skewX */
    skewX?: number
    /** Y 方向倾斜，即 CSS transform skewY */
    skewY?: number
    /** 位移，即 CSS transform translate */
    translate?: Array<number | string>
    /** 三维位移，即 CSS transform translate3d */
    translate3d?: Array<number | string>
    /** X 方向位移，即 CSS transform translateX */
    translateX?: number | string
    /** Y 方向位移，即 CSS transform translateY */
    translateY?: number | string
    /** Z 方向位移，即 CSS transform translateZ */
    translateZ?: number | string
}
interface ClearAnimationOptions {
    /** 基点位置，即 CSS transform-origin */
    transformOrigin?: boolean
    /** 背景颜色，即 CSS background-color */
    backgroundColor?: boolean
    /** 底边位置，即 CSS bottom */
    bottom?: boolean
    /** 高度，即 CSS height */
    height?: boolean
    /** 左边位置，即 CSS left */
    left?: boolean
    /** 宽度，即 CSS width */
    width?: boolean
    /** 不透明度，即 CSS opacity */
    opacity?: boolean
    /** 右边位置，即 CSS right */
    right?: boolean
    /** 顶边位置，即 CSS top */
    top?: boolean
    /** 变换矩阵，即 CSS transform matrix */
    matrix?: boolean
    /** 三维变换矩阵，即 CSS transform matrix3d */
    matrix3d?: boolean
    /** 旋转，即 CSS transform rotate */
    rotate?: boolean
    /** 三维旋转，即 CSS transform rotate3d */
    rotate3d?: boolean
    /** X 方向旋转，即 CSS transform rotateX */
    rotateX?: boolean
    /** Y 方向旋转，即 CSS transform rotateY */
    rotateY?: boolean
    /** Z 方向旋转，即 CSS transform rotateZ */
    rotateZ?: boolean
    /** 缩放，即 CSS transform scale */
    scale?: boolean
    /** 三维缩放，即 CSS transform scale3d */
    scale3d?: boolean
    /** X 方向缩放，即 CSS transform scaleX */
    scaleX?: boolean
    /** Y 方向缩放，即 CSS transform scaleY */
    scaleY?: boolean
    /** Z 方向缩放，即 CSS transform scaleZ */
    scaleZ?: boolean
    /** 倾斜，即 CSS transform skew */
    skew?: boolean
    /** X 方向倾斜，即 CSS transform skewX */
    skewX?: boolean
    /** Y 方向倾斜，即 CSS transform skewY */
    skewY?: boolean
    /** 位移，即 CSS transform translate */
    translate?: boolean
    /** 三维位移，即 CSS transform translate3d */
    translate3d?: boolean
    /** X 方向位移，即 CSS transform translateX */
    translateX?: boolean
    /** Y 方向位移，即 CSS transform translateY */
    translateY?: boolean
    /** Z 方向位移，即 CSS transform translateZ */
    translateZ?: boolean
}

export abstract class PesudoCompnent {

    public Func!: ShiyiCompFuncBase<PesudoCompnent>;
    public UI!: ShiyiCompUIBase<PesudoCompnent>;
    public PageInstance!: ShiyiPageBase;
    public get Inst(): ShiyiPageBase {
        return this.PageInstance;
    }
    public PesudoCompnents!: PesudoCompnentStack;
    private ComponentIdBackup = "";
    public ComponentId: string = "";
    public data!: PesudoCompnentData;
    public animate!: (
        selector: string,
        keyFrames: KeyFrame[],
        duration: number,
        callback?: () => void
    ) => void
    public clearAnimation!: (
        selector: string,
        options?: ClearAnimationOptions,
        callback?: () => void
    ) => void

    public _render!: (value: Record<string, any>) => void;

    constructor(_ComponentId: string) {
        this.ComponentId = _ComponentId;
        this.ComponentIdBackup = _ComponentId;
    }

    public AnimateTask(selector:string,keyFrames:KeyFrame[],duration:number):Task<void>{
        return new Task((task)=>{
            this.animate(selector,keyFrames,duration,()=>{
                task.Continue();
            })
        },true)
    }

    public Init(): PesudoCompnent {
        
        this.UI.CompInstance = this;
        this.Func.CompInstance = this;
        return this;
    }

    public SetVisibility(visible: boolean) {
        
        this.Render<PesudoCompnentData>({
            "Visible": visible
        })
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

    public GetAllComponents(): Record<string, PesudoCompnent> {
        
        let AllComps: Record<string, PesudoCompnent> = {};
        let comps = this.PesudoCompnents as Record<string, PesudoCompnent>;
        if (!comps) { return {} }
        Object.keys(comps).forEach(key => {
            comps[key].ComponentId = this.ComponentIdBackup + comps[key].ComponentIdBackup;
            AllComps[comps[key].ComponentId] = comps[key];
            let subcomps = comps[key].GetAllComponents();
            Object.keys(subcomps).forEach(subkey => {
                AllComps[subkey] = subcomps[subkey];
            })
        })
        return AllComps;
    }

    public _onReady() {
        this.UI._init().InitCustomData();
        this.Func._init().InitCustomData();
        this.Ready();
    }

    public Ready() { }
}