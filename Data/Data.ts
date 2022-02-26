import { Router } from "../Router/Router";
import { ShiyiPageBase } from "../ShiyiPage/Base/ShiyiPageBase";
import { Debug, Guid, ShiyiDebug } from "../Utils/Utils";


export class GetSetData<DataT>{
    protected data: DataT;
    protected _getFunc?: (data: DataT) => DataT;
    protected _setFunc?: (data: DataT) => DataT;
    constructor(data: DataT, _getFunc?: (data: DataT) => DataT, _setFunc?: (data: DataT) => DataT) {

        this.data = data;
        this._getFunc = _getFunc;
        this._setFunc = _setFunc;
    }
    public Get(): DataT {
        if (this._getFunc) {
            return this._getFunc(this.data);
        }
        return this.data;
    }
    public Set(data: DataT) {

        if (this._setFunc) {
            this.data = this._setFunc(data);
            return;
        }
        this.data = data;
    }
}

export class Data<DataT> extends GetSetData<DataT>{

    public readonly DataKey: string;
    protected RegisteredBindding: Array<ShiyiPageBase> = [];

    constructor(data: DataT, _getFunc?: (data: DataT) => DataT, _setFunc?: (data: DataT) => DataT) {
        super(data, _getFunc, _setFunc);
        this.DataKey = Guid.newGuid().toString();
    }

    public Set(data: DataT, IsGlobalNotification?: boolean) {
        if (data != this.data) {
            Debug(3)("Data Updated", "ObserverNotify:", data,)
            super.Set(data);
            this.RegisteredBindding.forEach(page => {
                page.ObserverNotify(this.DataKey, data);
            });
            if (!IsGlobalNotification) {
                this.RegisteredGlobalBinding.forEach((PreProcess, TargetData) => {
                    TargetData.Set(PreProcess ? PreProcess(data) : data, true);
                })
            }
        }
    }

    public RemoveBindding(page: ShiyiPageBase) {

        if (this.RegisteredBindding.indexOf(page) >= 0) {
            this.RegisteredBindding.splice(this.RegisteredBindding.indexOf(page), 1);
        }
    }


    public Bind(page: ShiyiPageBase): string {

        if (this.RegisteredBindding.indexOf(page) < 0) {
            Router.RegisterPageUnLoaded(page, this.PageUnload.bind(this));
            page.ObserverNotify(this.DataKey, this.Get());
            this.RegisteredBindding.push(page);
        }
        return this.DataKey;
    }

    public RegisteredGlobalBinding: Map<Data<any>, undefined | ((value: DataT) => any)> = new Map<Data<any>, undefined | ((value: DataT) => any)>();
    public BindToGlobal<TargetDataT>(TargetData: Data<TargetDataT>, PreProcess?: (value: DataT) => TargetDataT) {

        this.RegisteredGlobalBinding.set(TargetData, PreProcess);
    }

    public PageUnload(page: ShiyiPageBase): void {

        this.RemoveBindding(page);
    }
}

export class StorageData<DataT> extends Data<DataT>{
    protected StorageKey: string;
    constructor(data: DataT, storageKey: string, _getFunc?: (data: DataT) => DataT, _setFunc?: (data: DataT) => any) {
        super(data, _getFunc, _setFunc);
        this.StorageKey = storageKey;
    }

    public Get(): DataT {
        let data: DataT;
        data = wx.getStorageSync(this.StorageKey);
        if (data) {
            if (this._getFunc) {
                return this._getFunc(data);
            }
            return data;
        }else{
            this.Set(this.data);
            return this.data;
        }

    }

    public Set(data: DataT) {
        if (this._setFunc) {
            data = this._setFunc(data);
        }
        wx.setStorageSync(this.StorageKey, data);
        this.RegisteredBindding.forEach(page => {
            page.ObserverNotify(this.DataKey, data);
        });
    }
}

export function Default<T>(data:T,DefaultData:T):T{
    if(data){
        return data;
    }else{
        return DefaultData;
    }
}

