"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiyiPageBase = exports.ShiyiPageUIBase = exports.ShiyiPageFuncBase = void 0;
var Router_1 = require("../../Router/Router");
var GlobalData_1 = require("../../../GlobalData/GlobalData");
var Utils_1 = require("../../../ShiyiFramework/Utils/Utils");
var ShiyiPageExternBase = (function () {
    function ShiyiPageExternBase() {
    }
    Object.defineProperty(ShiyiPageExternBase.prototype, "Inst", {
        get: function () {
            return this.PageInstance;
        },
        enumerable: false,
        configurable: true
    });
    ShiyiPageExternBase.prototype._init = function () {
        this._Render = this.PageInstance.Render.bind(this.PageInstance);
        this.data = this.PageInstance.data;
        return this;
    };
    ShiyiPageExternBase.prototype.Render = function (value) {
        this._Render(value);
    };
    return ShiyiPageExternBase;
}());
var ShiyiPageFuncBase = (function (_super) {
    __extends(ShiyiPageFuncBase, _super);
    function ShiyiPageFuncBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ShiyiPageFuncBase;
}(ShiyiPageExternBase));
exports.ShiyiPageFuncBase = ShiyiPageFuncBase;
var ShiyiPageUIBase = (function (_super) {
    __extends(ShiyiPageUIBase, _super);
    function ShiyiPageUIBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShiyiPageUIBase.prototype._init = function () {
        _super.prototype._init.call(this);
        this.LoadGlobalUIConfig();
        return this;
    };
    ShiyiPageUIBase.prototype.LoadGlobalUIConfig = function () {
        this.PageInstance.BindGlobal(GlobalData_1.GlobalData.Theme, "Theme", function (value) {
            return value ? "Boy" : "Girl";
        });
    };
    return ShiyiPageUIBase;
}(ShiyiPageExternBase));
exports.ShiyiPageUIBase = ShiyiPageUIBase;
var ShiyiPageBase = (function () {
    function ShiyiPageBase() {
        this.RegisteredEventHandlers = {};
        this.ObserverList = {};
        this.RegisteredGlobalBackWardBinding = {};
        this.RegisteredSelfBinding = {};
        this.ComponentDataKeyPair = {};
        this.PesudoComponentBackup = {};
    }
    ShiyiPageBase.prototype.BindEvent = function (Trigger, Handler) {
        this.AddHandler(Trigger, Handler);
    };
    ShiyiPageBase.prototype.AddHandler = function (Trigger, Handler) {
        this.RegisteredEventHandlers[Trigger] = Handler;
    };
    ShiyiPageBase.prototype.Removehandler = function (Trigger, Handler) {
        if (this.RegisteredEventHandlers[Trigger] === Handler) {
            delete this.RegisteredEventHandlers[Trigger];
        }
    };
    ShiyiPageBase.prototype.EventHandler = function (e) {
        e.Catch();
        var Handler = this.RegisteredEventHandlers[e.EventName];
        (0, Utils_1.Debug)(3)(Handler);
        if (Handler) {
            Handler(e);
        }
        else {
            e.Pass();
        }
    };
    ShiyiPageBase.prototype.AddObserver = function (data, target) {
        if (this.ObserverList[data.DataKey]) {
            var CurrentList_1 = this.ObserverList[data.DataKey];
            CurrentList_1.forEach(function (value, index) {
                if (value.name == target.name) {
                    CurrentList_1.splice(index, 1);
                }
            });
            CurrentList_1.push(target);
        }
        else {
            this.ObserverList[data.DataKey] = [target];
        }
        data.Bind(this);
    };
    ShiyiPageBase.prototype.RemoveObserver = function (data) {
        if (this.ObserverList[data.DataKey]) {
            delete this.ObserverList[data.DataKey];
        }
    };
    ShiyiPageBase.prototype.ObserverNotify = function (key, value) {
        var target = this.ObserverList[key];
        if (target) {
            var NotifyData_1 = {};
            target.forEach(function (preprocess) {
                NotifyData_1[preprocess.name] = preprocess.PreProcess ? preprocess.PreProcess(value) : value;
            });
            this.RenderNoBackward(NotifyData_1);
        }
    };
    ShiyiPageBase.prototype.BindGlobal = function (GlobalData, SelfDataKey, PreProcess) {
        this.AddObserver(GlobalData, {
            name: SelfDataKey,
            PreProcess: PreProcess
        });
    };
    ShiyiPageBase.prototype.BindGlobalBackward = function (SelfDataKey, GlobalDataObj, PreProcess) {
        if (!this.RegisteredGlobalBackWardBinding[SelfDataKey]) {
            this.RegisteredGlobalBackWardBinding[SelfDataKey] = new Array();
        }
        this.RegisteredGlobalBackWardBinding[SelfDataKey].push({
            "TargetDataObj": GlobalDataObj,
            "PreProcess": PreProcess
        });
    };
    ShiyiPageBase.prototype.BindGlobalTwoWay = function (SelfDataKey, GlobalDataObj, SelfToGlobalPreProcess, GlobalToSelfPreProcess) {
        this.BindGlobal(GlobalDataObj, SelfDataKey, GlobalToSelfPreProcess);
        this.BindGlobalBackward(SelfDataKey, GlobalDataObj, SelfToGlobalPreProcess);
    };
    ShiyiPageBase.prototype.BindSelf = function (SrcKey, TargetKey, PreProcess) {
        if (!this.RegisteredSelfBinding[SrcKey]) {
            this.RegisteredSelfBinding[SrcKey] = new Array();
        }
        this.RegisteredSelfBinding[SrcKey].push({
            name: TargetKey,
            PreProcess: PreProcess
        });
        var RenderData = {};
        RenderData[SrcKey] = this.data[SrcKey];
        this.Render(RenderData);
    };
    ShiyiPageBase.prototype.BindSelfTwoWay = function (FirstData, SecData, FirstToSecPreProcess, SecToFirstPreProcess) {
        this.BindSelf(FirstData, SecData, FirstToSecPreProcess);
        this.BindSelf(SecData, FirstData, SecToFirstPreProcess);
    };
    ShiyiPageBase.prototype.Render = function (value) {
        this._render(value, false);
    };
    ShiyiPageBase.prototype.RenderNoBackward = function (value) {
        this._render(value, true);
    };
    ShiyiPageBase.prototype._render = function (value, DisableBackward) {
        var _this = this;
        var Modified = false;
        var Keys = Object.keys(value);
        Keys.forEach(function (key) {
            if (_this.ComponentDataKeyPair[key]) {
                _this.ComponentDataKeyPair[key].CompInst.data[_this.ComponentDataKeyPair[key].key] = value[key];
            }
            if (_this.RegisteredSelfBinding[key]) {
                _this.RegisteredSelfBinding[key].forEach(function (target) {
                    if (Keys.indexOf(target.name) < 0) {
                        Modified = true;
                        if (target.PreProcess) {
                            value[target.name] = target.PreProcess(value[key]);
                        }
                        else {
                            value[target.name] = value[key];
                        }
                    }
                });
            }
            if (!DisableBackward && _this.RegisteredGlobalBackWardBinding[key]) {
                _this.RegisteredGlobalBackWardBinding[key].forEach(function (target) {
                    target.TargetDataObj.Set(target.PreProcess ?
                        target.PreProcess(value[key]) :
                        value[key]);
                });
            }
        });
        if (Modified) {
            this._render(value, DisableBackward);
            return;
        }
        this.setData(value);
    };
    ShiyiPageBase.prototype._loadPesudoComponents = function () {
        var _this = this;
        if (!this.PesudoCompnents) {
            return [];
        }
        var IdArr = [];
        var components = this.PesudoCompnents;
        Object.keys(components).forEach(function (key) {
            var Comp = components[key];
            Comp.PageInstance = _this;
            Comp.animate = _this.animate.bind(_this);
            Comp.clearAnimation = _this.clearAnimation.bind(_this);
            Comp._render = _this.Render.bind(_this);
            var CompProto = Comp;
            var CompId = components[key].ComponentId;
            IdArr.push(CompId);
            while (CompProto) {
                Object.keys(CompProto).forEach(function (key) {
                    if (typeof CompProto[key] == "function") {
                        _this[CompId + key] = CompProto[key].bind(Comp);
                    }
                });
                CompProto = Object.getPrototypeOf(CompProto);
            }
            var CompData = {};
            var MappingCompData = {};
            Object.keys(components[key].data).forEach(function (datakey) {
                CompData[CompId + datakey] = components[key].data[datakey];
                _this.ComponentDataKeyPair[CompId + datakey] = {
                    key: datakey,
                    CompInst: components[key]
                };
            });
            _this.Render(CompData);
            Comp.Init();
        });
        (0, Utils_1.Debug)(3)("GetAllComponents", this.PesudoCompnents);
        return IdArr;
    };
    ShiyiPageBase.prototype._getAllComponents = function () {
        (0, Utils_1.Debug)(9)("_getAllComponents");
        var AllComps = {};
        var comps = this.PesudoCompnents;
        if (!comps) {
            return {};
        }
        Object.keys(comps).forEach(function (key) {
            AllComps[comps[key].ComponentId] = comps[key];
            var subcomps = comps[key].GetAllComponents();
            Object.keys(subcomps).forEach(function (subkey) {
                AllComps[subkey] = subcomps[subkey];
            });
        });
        return AllComps;
    };
    ShiyiPageBase.prototype.DataChange = function (e) {
        var model = e;
        var path = model.currentTarget.dataset.key.split(".");
        var data = {};
        var root = data;
        for (var i = 0; i < path.length; i++) {
            if (i == path.length - 1) {
                data[path[i]] = model.detail.value;
                continue;
            }
            if (typeof data[path[i]] == "number") {
                data[path[i]] = Number(this.data[path[i]]);
            }
            else {
                data[path[i]] = this.data[path[i]];
            }
            data = data[path[i]];
        }
        this.Render(root);
    };
    ShiyiPageBase.prototype._loadExtends = function () {
        this.Func.PageInstance = this;
        this.Func._init();
        this.UI.PageInstance = this;
        this.UI._init();
        this.UI.InitCustomData();
        this.Func.InitCustomData();
    };
    ShiyiPageBase.prototype._enablePesudoComponents = function () {
        if (!this.PesudoCompnents) {
            return;
        }
        var components = this.PesudoCompnents;
        Object.keys(components).forEach(function (key) {
            components[key].SetVisibility(true);
        });
    };
    ShiyiPageBase.prototype.onLoad = function () {
        this.InParameter = Router_1.Router.NavigateParam;
        Router_1.Router.PageLoad(this);
        if (this.Loaded) {
            this.Loaded();
        }
        this.PesudoCompnents = this._getAllComponents();
        this.BackupComp();
        var IdArr = this._loadPesudoComponents();
        this._loadExtends();
        this._pageInitCompeted();
    };
    ShiyiPageBase.prototype._pageInitCompeted = function () {
        this._enablePesudoComponents();
        var components = this.PesudoCompnents;
        Object.keys(components).forEach(function (key) {
            components[key]._onReady();
        });
        this.Ready();
    };
    ShiyiPageBase.prototype.Ready = function () { };
    ShiyiPageBase.prototype.BackupComp = function () {
        var _this = this;
        Object.keys(this.PesudoCompnents).forEach(function (key) {
            if (!_this.PesudoComponentBackup[key]) {
                _this.PesudoComponentBackup[key] = JSON.stringify(_this.PesudoCompnents[key]["data"]);
            }
        });
        (0, Utils_1.Debug)(5)(this.PesudoComponentBackup);
    };
    ShiyiPageBase.prototype.RecoveryComp = function () {
        var _this = this;
        (0, Utils_1.Debug)(5)(this.PesudoComponentBackup);
        Object.keys(this.PesudoCompnents).forEach(function (key) {
            if (_this.PesudoComponentBackup[key]) {
                _this.PesudoCompnents[key]["data"] = JSON.parse(_this.PesudoComponentBackup[key]);
            }
            else {
                console.error("RecoveryFaild,key:", key, _this.PesudoCompnents[key]);
            }
        });
    };
    ShiyiPageBase.prototype.onUnload = function () {
        this.RecoveryComp();
        Router_1.Router.PageUnload();
    };
    return ShiyiPageBase;
}());
exports.ShiyiPageBase = ShiyiPageBase;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hpeWlQYWdlQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNoaXlpUGFnZUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsOENBQTZDO0FBRTdDLDZEQUE0RDtBQUs1RCwwREFBcUU7QUFHckU7SUFPSTtJQUNBLENBQUM7SUFORCxzQkFBVyxxQ0FBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBTU0sbUNBQUssR0FBWjtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFHTSxvQ0FBTSxHQUFiLFVBQWtDLEtBQW9DO1FBRWxFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQUVEO0lBQTZFLHFDQUEwQjtJQUF2Rzs7SUFDQSxDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQUFDLEFBREQsQ0FBNkUsbUJBQW1CLEdBQy9GO0FBRHFCLDhDQUFpQjtBQUd2QztJQUEyRSxtQ0FBMEI7SUFBckc7O0lBZUEsQ0FBQztJQWRVLCtCQUFLLEdBQVo7UUFFSSxpQkFBTSxLQUFLLFdBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSw0Q0FBa0IsR0FBekI7UUFFSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyx1QkFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQ2xELFVBQUMsS0FBYztZQUNYLE9B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QUFFLENBQUM7SUFDeEIsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQyxBQXBaRCxJQW9aQztBQXBacUIsc0NBQWE7QUFvWmxDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudCB9IGZyb20gXCIuLi8uLi9FdmVudC9FdmVudFwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiLi4vLi4vUm91dGVyL1JvdXRlclwiO1xyXG5pbXBvcnQgeyBEYXRhIH0gZnJvbSBcIi4uLy4uL0RhdGEvRGF0YVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxEYXRhIH0gZnJvbSBcIi4uLy4uLy4uL0dsb2JhbERhdGEvR2xvYmFsRGF0YVwiO1xyXG5pbXBvcnQgeyBQZXN1ZG9Db21wbmVudCB9IGZyb20gXCIuLi8uLi9TaGl5aVBlc3Vkb0NvbXBuZW50L1Blc3Vkb0NvbXBuZW50XCI7XHJcbmltcG9ydCB7IERhdGFDaGFuZ2VPcHRpb24gfSBmcm9tIFwiLi4vLi4vVUkvTW9kZWwvRGF0YUNoYW5nZU1vZGVsL0RhdGFDaGFuZ2VNb2RlbFwiO1xyXG5pbXBvcnQgeyBJdWlPcHRpb24gfSBmcm9tIFwiLi4vLi4vVUkvTW9kZWwvSXVpT3B0aW9uXCI7XHJcbmltcG9ydCB7IEN1c3RvbUdsb2JhbFBhZ2VEYXRhIH0gZnJvbSBcIi4uLy4uL0NvbmZpZy9TaGl5aVBhZ2VDb25maWcvU2hpeWlQYWdlLkNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBEZWJ1ZywgU2hpeWlEZWJ1ZyB9IGZyb20gXCJAUm9vdC9TaGl5aUZyYW1ld29yay9VdGlscy9VdGlsc1wiO1xyXG5cclxuXHJcbmFic3RyYWN0IGNsYXNzIFNoaXlpUGFnZUV4dGVybkJhc2U8UGFnZVQgZXh0ZW5kcyBTaGl5aVBhZ2VCYXNlPiB7XHJcbiAgICBwdWJsaWMgUGFnZUluc3RhbmNlITogUGFnZVRcclxuICAgIHB1YmxpYyBnZXQgSW5zdCgpOiBQYWdlVCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUGFnZUluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIF9SZW5kZXIhOiAodmFsdWU6IFJlY29yZDxzdHJpbmcsIGFueT4pID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgZGF0YSE6IFJlY29yZDxzdHJpbmcsIGFueT47XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX2luaXQoKTogU2hpeWlQYWdlRXh0ZXJuQmFzZTxQYWdlVD4ge1xyXG5cclxuICAgICAgICB0aGlzLl9SZW5kZXIgPSB0aGlzLlBhZ2VJbnN0YW5jZS5SZW5kZXIuYmluZCh0aGlzLlBhZ2VJbnN0YW5jZSk7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gdGhpcy5QYWdlSW5zdGFuY2UuZGF0YTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBJbml0Q3VzdG9tRGF0YShfb3B0aW9ucz86IFJlY29yZDxzdHJpbmcsIGFueT4gfCB1bmRlZmluZWQpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBSZW5kZXI8VCBleHRlbmRzIFBhZ2VEYXRhPih2YWx1ZTogUGFydGlhbDxSZWNvcmQ8a2V5b2YgVCwgYW55Pj4pOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5fUmVuZGVyKHZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNoaXlpUGFnZUZ1bmNCYXNlPFBhZ2VUIGV4dGVuZHMgU2hpeWlQYWdlQmFzZT4gZXh0ZW5kcyBTaGl5aVBhZ2VFeHRlcm5CYXNlPFBhZ2VUPiB7XHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTaGl5aVBhZ2VVSUJhc2U8UGFnZVQgZXh0ZW5kcyBTaGl5aVBhZ2VCYXNlPiBleHRlbmRzIFNoaXlpUGFnZUV4dGVybkJhc2U8UGFnZVQ+IHtcclxuICAgIHB1YmxpYyBfaW5pdCgpOiBTaGl5aVBhZ2VFeHRlcm5CYXNlPFBhZ2VUPiB7XHJcblxyXG4gICAgICAgIHN1cGVyLl9pbml0KCk7XHJcbiAgICAgICAgdGhpcy5Mb2FkR2xvYmFsVUlDb25maWcoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBMb2FkR2xvYmFsVUlDb25maWcoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMuUGFnZUluc3RhbmNlLkJpbmRHbG9iYWwoR2xvYmFsRGF0YS5UaGVtZSwgXCJUaGVtZVwiLFxyXG4gICAgICAgICAgICAodmFsdWU6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZSA/IFwiQm95XCIgOiBcIkdpcmxcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQYWdlRGF0YSBleHRlbmRzIEN1c3RvbUdsb2JhbFBhZ2VEYXRhIHtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGVzdWRvQ29tcG5lbnRTdGFjayB7XHJcblxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNoaXlpUGFnZUJhc2UgZXh0ZW5kcyBXZWNoYXRNaW5pcHJvZ3JhbS5QYWdlLkluc3RhbmNlTWV0aG9kczxXZWNoYXRNaW5pcHJvZ3JhbS5Db21wb25lbnQuRGF0YU9wdGlvbj4ge1xyXG5cclxufVxyXG5cclxuaW50ZXJmYWNlIE9ic2VydmVyVGFyZ2V0PERhdGFUPiB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBQcmVQcm9jZXNzPzogKHZhbHVlOiBEYXRhVCkgPT4gYW55O1xyXG59XHJcblxyXG5pbnRlcmZhY2UgT2JzZXJ2ZXJCYWNrd2FyZFRhcmdldDxEYXRhVD4ge1xyXG4gICAgVGFyZ2V0RGF0YU9iajogRGF0YTxhbnk+O1xyXG4gICAgUHJlUHJvY2Vzcz86ICh2YWx1ZTogRGF0YVQpID0+IGFueTtcclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2hpeWlQYWdlQmFzZVxyXG4gICAgaW1wbGVtZW50cyBXZWNoYXRNaW5pcHJvZ3JhbS5QYWdlLk9wdGlvbnM8XHJcbiAgICBXZWNoYXRNaW5pcHJvZ3JhbS5QYWdlLkRhdGFPcHRpb24sXHJcbiAgICBXZWNoYXRNaW5pcHJvZ3JhbS5QYWdlLkN1c3RvbU9wdGlvblxyXG4gICAgPntcclxuICAgIHB1YmxpYyBkYXRhITogUGFnZURhdGE7XHJcbiAgICBwdWJsaWMgRnVuYyE6IFNoaXlpUGFnZUV4dGVybkJhc2U8U2hpeWlQYWdlQmFzZT47XHJcbiAgICBwdWJsaWMgVUkhOiBTaGl5aVBhZ2VFeHRlcm5CYXNlPFNoaXlpUGFnZUJhc2U+O1xyXG4gICAgLy8jcmVnaW9uIOS6i+S7tuWkhOeQhlxyXG4gICAgcHVibGljIFJlZ2lzdGVyZWRFdmVudEhhbmRsZXJzOiBSZWNvcmQ8c3RyaW5nLCAoZTogRXZlbnQpID0+IHZvaWQ+ID0ge307XHJcbiAgICBwdWJsaWMgUGVzdWRvQ29tcG5lbnRzITogUGVzdWRvQ29tcG5lbnRTdGFjaztcclxuICAgIHByb3RlY3RlZCBMb2FkZWQ/OiAoKSA9PiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiDnu5Hlrprkuovku7blpITnkIbmlrnms5VcclxuICAgICAqIEBwYXJhbSBUcmlnZ2VyIOS6i+S7tuWQjVxyXG4gICAgICogQHBhcmFtIEhhbmRsZXIg5aSE55CG5pa55rOVXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBCaW5kRXZlbnQoVHJpZ2dlcjogc3RyaW5nLCBIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWQpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5BZGRIYW5kbGVyKFRyaWdnZXIsIEhhbmRsZXIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIEFkZEhhbmRsZXIoVHJpZ2dlcjogc3RyaW5nLCBIYW5kbGVyOiAoZTogRXZlbnQpID0+IHZvaWQpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5SZWdpc3RlcmVkRXZlbnRIYW5kbGVyc1tUcmlnZ2VyXSA9IEhhbmRsZXI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgUmVtb3ZlaGFuZGxlcihUcmlnZ2VyOiBzdHJpbmcsIEhhbmRsZXI6IChlOiBFdmVudCkgPT4gdm9pZCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5SZWdpc3RlcmVkRXZlbnRIYW5kbGVyc1tUcmlnZ2VyXSA9PT0gSGFuZGxlcikge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5SZWdpc3RlcmVkRXZlbnRIYW5kbGVyc1tUcmlnZ2VyXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEV2ZW50SGFuZGxlcihlOiBFdmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBlLkNhdGNoKCk7XHJcbiAgICAgICAgbGV0IEhhbmRsZXIgPSB0aGlzLlJlZ2lzdGVyZWRFdmVudEhhbmRsZXJzW2UuRXZlbnROYW1lXTtcclxuICAgICAgICBEZWJ1ZygzKShIYW5kbGVyKTtcclxuICAgICAgICBpZiAoSGFuZGxlcikge1xyXG4gICAgICAgICAgICBIYW5kbGVyKGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGUuUGFzcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vI2VuZHJlZ2lvblxyXG5cclxuICAgIC8vI3JlZ2lvbiDmlbDmja7nu5HlrppcclxuXHJcblxyXG4gICAgcHJpdmF0ZSBPYnNlcnZlckxpc3Q6IFJlY29yZDxzdHJpbmcsIEFycmF5PE9ic2VydmVyVGFyZ2V0PGFueT4+PiA9IHt9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDlhajlsYDmlbDmja7nu5HlrppcclxuICAgICAqIEBwYXJhbSBkYXRhIOe7keWumuaVsOaNrua6kFxyXG4gICAgICogQHBhcmFtIHRhcmdldCDnu5HlrprmnKzpobXpnaLnmoTmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIEFkZE9ic2VydmVyPERhdGFUPihkYXRhOiBEYXRhPERhdGFUPiwgdGFyZ2V0OiBPYnNlcnZlclRhcmdldDxEYXRhVD4pIHtcclxuICAgICAgICBpZiAodGhpcy5PYnNlcnZlckxpc3RbZGF0YS5EYXRhS2V5XSkge1xyXG4gICAgICAgICAgICBsZXQgQ3VycmVudExpc3QgPSB0aGlzLk9ic2VydmVyTGlzdFtkYXRhLkRhdGFLZXldO1xyXG4gICAgICAgICAgICBDdXJyZW50TGlzdC5mb3JFYWNoKCh2YWx1ZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5uYW1lID09IHRhcmdldC5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgQ3VycmVudExpc3Quc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgQ3VycmVudExpc3QucHVzaCh0YXJnZXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuT2JzZXJ2ZXJMaXN0W2RhdGEuRGF0YUtleV0gPSBbdGFyZ2V0XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0YS5CaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIFJlbW92ZU9ic2VydmVyPERhdGFUPihkYXRhOiBEYXRhPERhdGFUPikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5PYnNlcnZlckxpc3RbZGF0YS5EYXRhS2V5XSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5PYnNlcnZlckxpc3RbZGF0YS5EYXRhS2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE9ic2VydmVyTm90aWZ5KGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcblxyXG4gICAgICAgIGxldCB0YXJnZXQgPSB0aGlzLk9ic2VydmVyTGlzdFtrZXldO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgbGV0IE5vdGlmeURhdGE6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuICAgICAgICAgICAgdGFyZ2V0LmZvckVhY2gocHJlcHJvY2VzcyA9PiB7XHJcbiAgICAgICAgICAgICAgICBOb3RpZnlEYXRhW3ByZXByb2Nlc3MubmFtZV0gPSBwcmVwcm9jZXNzLlByZVByb2Nlc3MgPyBwcmVwcm9jZXNzLlByZVByb2Nlc3ModmFsdWUpIDogdmFsdWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHRoaXMuUmVuZGVyTm9CYWNrd2FyZDxhbnk+KE5vdGlmeURhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWo5bGA5pWw5o2u57uR5a6aXHJcbiAgICAgKiBAdHlwZSB7R2xvYmFsRGF0YVR9IOWFqOWxgOaVsOaNruexu+Wei1xyXG4gICAgICogQHR5cGUge1R9IOmhtemdouS4rea0vueUn+iHqlBhZ2VEYXRh55qEZGF0Yeexu+Wei1xyXG4gICAgICogQHBhcmFtIEdsb2JhbERhdGEg5YWo5bGA5pWw5o2uT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gU2VsZkRhdGFLZXkg6Ieq6Lqr5pWw5o2uS2V5XHJcbiAgICAgKiBAcGFyYW0gUHJlUHJvY2VzcyDpooTlpITnkIbmlrnlvI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIEJpbmRHbG9iYWw8R2xvYmFsRGF0YVQsIFQgZXh0ZW5kcyBQYWdlRGF0YT4oXHJcbiAgICAgICAgR2xvYmFsRGF0YTogRGF0YTxHbG9iYWxEYXRhVD4sXHJcbiAgICAgICAgU2VsZkRhdGFLZXk6IGtleW9mIFQsXHJcbiAgICAgICAgUHJlUHJvY2Vzcz86ICh2YWx1ZTogR2xvYmFsRGF0YVQpID0+IGFueSkge1xyXG4gICAgICAgIHRoaXMuQWRkT2JzZXJ2ZXI8R2xvYmFsRGF0YVQ+KEdsb2JhbERhdGEsIHtcclxuICAgICAgICAgICAgbmFtZTogU2VsZkRhdGFLZXkgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICBQcmVQcm9jZXNzOiBQcmVQcm9jZXNzXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFJlZ2lzdGVyZWRHbG9iYWxCYWNrV2FyZEJpbmRpbmc6IFJlY29yZDxzdHJpbmcsIEFycmF5PE9ic2VydmVyQmFja3dhcmRUYXJnZXQ8YW55Pj4+ID0ge307XHJcblxyXG4gICAgcHVibGljIEJpbmRHbG9iYWxCYWNrd2FyZDxTZWxmRGF0YVQsIFQgZXh0ZW5kcyBQYWdlRGF0YT4oXHJcbiAgICAgICAgU2VsZkRhdGFLZXk6IGtleW9mIFQsXHJcbiAgICAgICAgR2xvYmFsRGF0YU9iajogRGF0YTxhbnk+LFxyXG4gICAgICAgIFByZVByb2Nlc3M/OiAodmFsdWU6IFNlbGZEYXRhVCkgPT4gYW55KSB7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5SZWdpc3RlcmVkR2xvYmFsQmFja1dhcmRCaW5kaW5nW1NlbGZEYXRhS2V5IGFzIHN0cmluZ10pIHtcclxuICAgICAgICAgICAgdGhpcy5SZWdpc3RlcmVkR2xvYmFsQmFja1dhcmRCaW5kaW5nW1NlbGZEYXRhS2V5IGFzIHN0cmluZ10gPSBuZXcgQXJyYXk8T2JzZXJ2ZXJCYWNrd2FyZFRhcmdldDxhbnk+PigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlJlZ2lzdGVyZWRHbG9iYWxCYWNrV2FyZEJpbmRpbmdbU2VsZkRhdGFLZXkgYXMgc3RyaW5nXS5wdXNoKHtcclxuICAgICAgICAgICAgXCJUYXJnZXREYXRhT2JqXCI6IEdsb2JhbERhdGFPYmosXHJcbiAgICAgICAgICAgIFwiUHJlUHJvY2Vzc1wiOiBQcmVQcm9jZXNzXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhajlsYDmlbDmja7lj4zlkJHnu5HlrppcclxuICAgICAqIEBwYXJhbSBTZWxmRGF0YUtleSDoh6rouqvmlbDmja5LZXlcclxuICAgICAqIEBwYXJhbSBHbG9iYWxEYXRhT2JqIOWFqOWxgOaVsOaNrk9iamVjdFxyXG4gICAgICogQHBhcmFtIFNlbGZUb0dsb2JhbFByZVByb2Nlc3Mg6Ieq6Lqr5pWw5o2u5Yiw5YWo5bGA5pWw5o2u55qE6aKE5aSE55CGXHJcbiAgICAgKiBAcGFyYW0gR2xvYmFsVG9TZWxmUHJlUHJvY2VzcyDlhajlsYDmlbDmja7liLDoh6rouqvmlbDmja7nmoTpooTlpITnkIZcclxuICAgICAqL1xyXG4gICAgcHVibGljIEJpbmRHbG9iYWxUd29XYXk8U2VsZkRhdGFULCBHbG9iYWxEYXRhVCwgVCBleHRlbmRzIFBhZ2VEYXRhPihcclxuICAgICAgICBTZWxmRGF0YUtleToga2V5b2YgVCxcclxuICAgICAgICBHbG9iYWxEYXRhT2JqOiBEYXRhPEdsb2JhbERhdGFUPixcclxuICAgICAgICBTZWxmVG9HbG9iYWxQcmVQcm9jZXNzPzogKHZhbHVlOiBTZWxmRGF0YVQpID0+IEdsb2JhbERhdGFULFxyXG4gICAgICAgIEdsb2JhbFRvU2VsZlByZVByb2Nlc3M/OiAodmFsdWU6IEdsb2JhbERhdGFUKSA9PiBTZWxmRGF0YVQpIHtcclxuXHJcbiAgICAgICAgdGhpcy5CaW5kR2xvYmFsPEdsb2JhbERhdGFULCBUPihHbG9iYWxEYXRhT2JqLCBTZWxmRGF0YUtleSwgR2xvYmFsVG9TZWxmUHJlUHJvY2Vzcyk7XHJcbiAgICAgICAgdGhpcy5CaW5kR2xvYmFsQmFja3dhcmQ8U2VsZkRhdGFULCBUPihTZWxmRGF0YUtleSwgR2xvYmFsRGF0YU9iaiwgU2VsZlRvR2xvYmFsUHJlUHJvY2Vzcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgUmVnaXN0ZXJlZFNlbGZCaW5kaW5nOiBSZWNvcmQ8c3RyaW5nLCBBcnJheTxPYnNlcnZlclRhcmdldDxhbnk+Pj4gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouaVsOaNruiHque7keWumlxyXG4gICAgICogQHR5cGUge1NyY0RhdGFUfSDmupDmlbDmja7nsbvlnotcclxuICAgICAqIEB0eXBlIHtUfSDpobXpnaLkuK3mtL7nlJ/oh6pQYWdlRGF0YeeahGRhdGHnsbvlnotcclxuICAgICAqIEBwYXJhbSBTcmNLZXkg5rqQ5pWw5o2uS2V5XHJcbiAgICAgKiBAcGFyYW0gVGFyZ2V0S2V5IOebruagh+aVsOaNrktleVxyXG4gICAgICogQHBhcmFtIFByZVByb2Nlc3Mg6aKE5aSE55CG5pa55byPXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBCaW5kU2VsZjxTcmNEYXRhVCwgVCBleHRlbmRzIFBhZ2VEYXRhPihTcmNLZXk6IGtleW9mIFQsIFRhcmdldEtleToga2V5b2YgVCwgUHJlUHJvY2Vzcz86ICh2YWx1ZTogU3JjRGF0YVQpID0+IGFueSkge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuUmVnaXN0ZXJlZFNlbGZCaW5kaW5nW1NyY0tleSBhcyBzdHJpbmddKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUmVnaXN0ZXJlZFNlbGZCaW5kaW5nW1NyY0tleSBhcyBzdHJpbmddID0gbmV3IEFycmF5PE9ic2VydmVyVGFyZ2V0PGFueT4+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVnaXN0ZXJlZFNlbGZCaW5kaW5nW1NyY0tleSBhcyBzdHJpbmddLnB1c2goe1xyXG4gICAgICAgICAgICBuYW1lOiBUYXJnZXRLZXkgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgICBQcmVQcm9jZXNzOiBQcmVQcm9jZXNzXHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgUmVuZGVyRGF0YTogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xyXG4gICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgIFJlbmRlckRhdGFbU3JjS2V5IGFzIHN0cmluZ10gPSB0aGlzLmRhdGFbU3JjS2V5XVxyXG4gICAgICAgIHRoaXMuUmVuZGVyPGFueT4oUmVuZGVyRGF0YSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIEZpcnN0RGF0YSBEYXRhMVxyXG4gICAgICogQHBhcmFtIFNlY0RhdGEgRGF0YTJcclxuICAgICAqIEBwYXJhbSBGaXJzdFRvU2VjUHJlUHJvY2VzcyBEYXRhMeWIsERhdGEy55qE6aKE5aSE55CGXHJcbiAgICAgKiBAcGFyYW0gU2VjVG9GaXJzdFByZVByb2Nlc3MgRGF0YTLliLBEYXRhMeeahOmihOWkhOeQhlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQmluZFNlbGZUd29XYXk8Rmlyc3REYXRhVCwgU2VjRGF0YVQsIFQgZXh0ZW5kcyBQYWdlRGF0YT4oXHJcbiAgICAgICAgRmlyc3REYXRhOiBrZXlvZiBULFxyXG4gICAgICAgIFNlY0RhdGE6IGtleW9mIFQsXHJcbiAgICAgICAgRmlyc3RUb1NlY1ByZVByb2Nlc3M/OiAodmFsdWU6IEZpcnN0RGF0YVQpID0+IFNlY0RhdGFULFxyXG4gICAgICAgIFNlY1RvRmlyc3RQcmVQcm9jZXNzPzogKHZhbHVlOiBTZWNEYXRhVCkgPT4gRmlyc3REYXRhVFxyXG4gICAgKSB7XHJcblxyXG4gICAgICAgIHRoaXMuQmluZFNlbGY8Rmlyc3REYXRhVCwgVD4oRmlyc3REYXRhLCBTZWNEYXRhLCBGaXJzdFRvU2VjUHJlUHJvY2Vzcyk7XHJcbiAgICAgICAgdGhpcy5CaW5kU2VsZjxTZWNEYXRhVCwgVD4oU2VjRGF0YSwgRmlyc3REYXRhLCBTZWNUb0ZpcnN0UHJlUHJvY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlbmRlcjxUIGV4dGVuZHMgUGFnZURhdGE+KHZhbHVlOiBQYXJ0aWFsPFJlY29yZDxrZXlvZiBULCBhbnk+Pikge1xyXG5cclxuICAgICAgICB0aGlzLl9yZW5kZXI8VD4odmFsdWUsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBSZW5kZXJOb0JhY2t3YXJkPFQgZXh0ZW5kcyBQYWdlRGF0YT4odmFsdWU6IFBhcnRpYWw8UmVjb3JkPGtleW9mIFQsIGFueT4+KSB7XHJcblxyXG4gICAgICAgIHRoaXMuX3JlbmRlcjxUPih2YWx1ZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgQ29tcG9uZW50RGF0YUtleVBhaXI6IFJlY29yZDxzdHJpbmcsIHsga2V5OiBzdHJpbmcsIENvbXBJbnN0OiBQZXN1ZG9Db21wbmVudCB9PiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfcmVuZGVyPFQgZXh0ZW5kcyBQYWdlRGF0YT4odmFsdWU6IFBhcnRpYWw8UmVjb3JkPGtleW9mIFQsIGFueT4+LCBEaXNhYmxlQmFja3dhcmQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgTW9kaWZpZWQgPSBmYWxzZTtcclxuICAgICAgICBsZXQgS2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKVxyXG4gICAgICAgIHR5cGUgRGF0YUtleXMgPSBrZXlvZiBUO1xyXG4gICAgICAgIEtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Db21wb25lbnREYXRhS2V5UGFpcltrZXldKSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcG9uZW50RGF0YUtleVBhaXJba2V5XS5Db21wSW5zdC5kYXRhW3RoaXMuQ29tcG9uZW50RGF0YUtleVBhaXJba2V5XS5rZXldID0gdmFsdWVba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5SZWdpc3RlcmVkU2VsZkJpbmRpbmdba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZWdpc3RlcmVkU2VsZkJpbmRpbmdba2V5XS5mb3JFYWNoKCh0YXJnZXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoS2V5cy5pbmRleE9mKHRhcmdldC5uYW1lIGFzIHN0cmluZykgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGlmaWVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldC5QcmVQcm9jZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVt0YXJnZXQubmFtZSBhcyBEYXRhS2V5c10gPSB0YXJnZXQuUHJlUHJvY2Vzcyh2YWx1ZVtrZXkgYXMgRGF0YUtleXNdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW3RhcmdldC5uYW1lIGFzIERhdGFLZXlzXSA9IHZhbHVlW2tleSBhcyBEYXRhS2V5c107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghRGlzYWJsZUJhY2t3YXJkICYmIHRoaXMuUmVnaXN0ZXJlZEdsb2JhbEJhY2tXYXJkQmluZGluZ1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlZ2lzdGVyZWRHbG9iYWxCYWNrV2FyZEJpbmRpbmdba2V5XS5mb3JFYWNoKHRhcmdldCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LlRhcmdldERhdGFPYmouU2V0KFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuUHJlUHJvY2VzcyA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuUHJlUHJvY2Vzcyh2YWx1ZVtrZXkgYXMgRGF0YUtleXNdKSA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVtrZXkgYXMgRGF0YUtleXNdKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoTW9kaWZpZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyPFQ+KHZhbHVlLCBEaXNhYmxlQmFja3dhcmQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8jZW5kcmVnaW9uXHJcblxyXG4gICAgcHJvdGVjdGVkIF9sb2FkUGVzdWRvQ29tcG9uZW50cygpOiBBcnJheTxzdHJpbmc+IHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLlBlc3Vkb0NvbXBuZW50cykge1xyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBJZEFycjogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gdGhpcy5QZXN1ZG9Db21wbmVudHMgYXMgUmVjb3JkPHN0cmluZywgUGVzdWRvQ29tcG5lbnQ+O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgbGV0IENvbXAgPSBjb21wb25lbnRzW2tleV07XHJcbiAgICAgICAgICAgIENvbXAuUGFnZUluc3RhbmNlID0gdGhpcztcclxuICAgICAgICAgICAgQ29tcC5hbmltYXRlID0gdGhpcy5hbmltYXRlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIENvbXAuY2xlYXJBbmltYXRpb24gPSB0aGlzLmNsZWFyQW5pbWF0aW9uLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIENvbXAuX3JlbmRlciA9IHRoaXMuUmVuZGVyLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgIGxldCBDb21wUHJvdG8gPSBDb21wO1xyXG4gICAgICAgICAgICBsZXQgQ29tcElkID0gY29tcG9uZW50c1trZXldLkNvbXBvbmVudElkO1xyXG4gICAgICAgICAgICBJZEFyci5wdXNoKENvbXBJZCk7XHJcbiAgICAgICAgICAgIHdoaWxlIChDb21wUHJvdG8pIHtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKENvbXBQcm90bykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKEJhc2VGdW5jdGlvbnMuaW5kZXhPZihrZXkpIDwgMCApIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBDb21wUHJvdG9ba2V5XSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbQ29tcElkICsga2V5XSA9IENvbXBQcm90b1trZXldLmJpbmQoQ29tcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBDb21wUHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29tcFByb3RvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgQ29tcERhdGE6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuICAgICAgICAgICAgdmFyIE1hcHBpbmdDb21wRGF0YSA9IHt9XHJcblxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnRzW2tleV0uZGF0YSkuZm9yRWFjaChkYXRha2V5ID0+IHtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgQ29tcERhdGFbQ29tcElkICsgZGF0YWtleV0gPSBjb21wb25lbnRzW2tleV0uZGF0YVtkYXRha2V5XTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcG9uZW50RGF0YUtleVBhaXJbQ29tcElkICsgZGF0YWtleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBkYXRha2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIENvbXBJbnN0OiBjb21wb25lbnRzW2tleV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5SZW5kZXIoQ29tcERhdGEpO1xyXG4gICAgICAgICAgICBDb21wLkluaXQoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIERlYnVnKDMpKFwiR2V0QWxsQ29tcG9uZW50c1wiLCB0aGlzLlBlc3Vkb0NvbXBuZW50cyk7XHJcbiAgICAgICAgcmV0dXJuIElkQXJyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfZ2V0QWxsQ29tcG9uZW50cygpOiBSZWNvcmQ8c3RyaW5nLCBQZXN1ZG9Db21wbmVudD4ge1xyXG4gICAgICAgIERlYnVnKDkpKFwiX2dldEFsbENvbXBvbmVudHNcIik7XHJcbiAgICAgICAgbGV0IEFsbENvbXBzOiBSZWNvcmQ8c3RyaW5nLCBQZXN1ZG9Db21wbmVudD4gPSB7fTtcclxuICAgICAgICBsZXQgY29tcHMgPSB0aGlzLlBlc3Vkb0NvbXBuZW50cyBhcyBSZWNvcmQ8c3RyaW5nLCBQZXN1ZG9Db21wbmVudD47XHJcbiAgICAgICAgaWYgKCFjb21wcykgeyByZXR1cm4ge30gfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKGNvbXBzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIEFsbENvbXBzW2NvbXBzW2tleV0uQ29tcG9uZW50SWRdID0gY29tcHNba2V5XTtcclxuICAgICAgICAgICAgbGV0IHN1YmNvbXBzID0gY29tcHNba2V5XS5HZXRBbGxDb21wb25lbnRzKCk7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHN1YmNvbXBzKS5mb3JFYWNoKHN1YmtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICBBbGxDb21wc1tzdWJrZXldID0gc3ViY29tcHNbc3Via2V5XTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBBbGxDb21wcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRGF0YUNoYW5nZShlOiBJdWlPcHRpb24pIHtcclxuICAgICAgICBsZXQgbW9kZWwgPSBlIGFzIERhdGFDaGFuZ2VPcHRpb247XHJcbiAgICAgICAgbGV0IHBhdGggPSBtb2RlbC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQua2V5LnNwbGl0KFwiLlwiKTtcclxuICAgICAgICBsZXQgZGF0YTogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9XHJcbiAgICAgICAgbGV0IHJvb3QgPSBkYXRhO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBwYXRoLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbcGF0aFtpXV0gPSBtb2RlbC5kZXRhaWwudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGFbcGF0aFtpXV0gPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgLy9AdHMtaWdub3JlXHJcbiAgICAgICAgICAgICAgICBkYXRhW3BhdGhbaV1dID0gTnVtYmVyKHRoaXMuZGF0YVtwYXRoW2ldXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGRhdGFbcGF0aFtpXV0gPSB0aGlzLmRhdGFbcGF0aFtpXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YSA9IGRhdGFbcGF0aFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVuZGVyKHJvb3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfbG9hZEV4dGVuZHMoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuRnVuYy5QYWdlSW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuRnVuYy5faW5pdCgpO1xyXG4gICAgICAgIHRoaXMuVUkuUGFnZUluc3RhbmNlID0gdGhpcztcclxuICAgICAgICB0aGlzLlVJLl9pbml0KCk7XHJcbiAgICAgICAgdGhpcy5VSS5Jbml0Q3VzdG9tRGF0YSgpO1xyXG4gICAgICAgIHRoaXMuRnVuYy5Jbml0Q3VzdG9tRGF0YSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElkQXJyOiBBcnJheTxzdHJpbmc+XHJcbiAgICBwdWJsaWMgX2VuYWJsZVBlc3Vkb0NvbXBvbmVudHMoKSB7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5QZXN1ZG9Db21wbmVudHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29tcG9uZW50cyA9IHRoaXMuUGVzdWRvQ29tcG5lbnRzIGFzIFJlY29yZDxzdHJpbmcsIFBlc3Vkb0NvbXBuZW50PjtcclxuICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnRzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudHNba2V5XS5TZXRWaXNpYmlsaXR5KHRydWUpO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIGxldCBFbmFibGVDb21tYW5kOlJlY29yZDxzdHJpbmcsYm9vbGVhbj49e307XHJcbiAgICAgICAgLy8gSWRBcnIuZm9yRWFjaChpZD0+e1xyXG4gICAgICAgIC8vICAgICBFbmFibGVDb21tYW5kW2lkKydWaXNpYmxlJ109dHJ1ZVxyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgLy8gRGVidWcoMykoXCJFbmFibGVQZXN1ZG9Db21wb25lbnRzXCIsRW5hYmxlQ29tbWFuZCk7XHJcbiAgICAgICAgLy8gdGhpcy5SZW5kZXI8YW55Pih0aGlzLkVuYWJsZVBlc3Vkb0NvbXBvbmVudHMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBJblBhcmFtZXRlcjogYW55XHJcblxyXG4gICAgcHVibGljIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLkluUGFyYW1ldGVyID0gUm91dGVyLk5hdmlnYXRlUGFyYW07XHJcbiAgICAgICAgUm91dGVyLlBhZ2VMb2FkKHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLkxvYWRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLkxvYWRlZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBlc3Vkb0NvbXBuZW50cyA9IHRoaXMuX2dldEFsbENvbXBvbmVudHMoKTtcclxuICAgICAgICB0aGlzLkJhY2t1cENvbXAoKTtcclxuICAgICAgICBsZXQgSWRBcnIgPSB0aGlzLl9sb2FkUGVzdWRvQ29tcG9uZW50cygpO1xyXG4gICAgICAgIHRoaXMuX2xvYWRFeHRlbmRzKCk7XHJcbiAgICAgICAgdGhpcy5fcGFnZUluaXRDb21wZXRlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfcGFnZUluaXRDb21wZXRlZCgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fZW5hYmxlUGVzdWRvQ29tcG9uZW50cygpO1xyXG4gICAgICAgIGxldCBjb21wb25lbnRzID0gdGhpcy5QZXN1ZG9Db21wbmVudHMgYXMgUmVjb3JkPHN0cmluZywgUGVzdWRvQ29tcG5lbnQ+O1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmVudHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgY29tcG9uZW50c1trZXldLl9vblJlYWR5KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLlJlYWR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlYWR5KCkgeyB9XHJcblxyXG4gICAgcHJpdmF0ZSBQZXN1ZG9Db21wb25lbnRCYWNrdXA6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fTtcclxuICAgIHByaXZhdGUgQmFja3VwQ29tcCgpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLlBlc3Vkb0NvbXBuZW50cykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuUGVzdWRvQ29tcG9uZW50QmFja3VwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QZXN1ZG9Db21wb25lbnRCYWNrdXBba2V5XSA9IEpTT04uc3RyaW5naWZ5KHRoaXMuUGVzdWRvQ29tcG5lbnRzW2tleV1bXCJkYXRhXCJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgRGVidWcoNSkodGhpcy5QZXN1ZG9Db21wb25lbnRCYWNrdXApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgUmVjb3ZlcnlDb21wKCkge1xyXG4gICAgICAgIERlYnVnKDUpKHRoaXMuUGVzdWRvQ29tcG9uZW50QmFja3VwKTtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLlBlc3Vkb0NvbXBuZW50cykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBlc3Vkb0NvbXBvbmVudEJhY2t1cFtrZXldKXtcclxuICAgICAgICAgICAgICAgIC8vQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QZXN1ZG9Db21wbmVudHNba2V5XVtcImRhdGFcIl0gPSBKU09OLnBhcnNlKHRoaXMuUGVzdWRvQ29tcG9uZW50QmFja3VwW2tleV0pOyBcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAvL0B0cy1pZ25vcmVcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZWNvdmVyeUZhaWxkLGtleTpcIixrZXksdGhpcy5QZXN1ZG9Db21wbmVudHNba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblVubG9hZCgpIHtcclxuICAgICAgICB0aGlzLlJlY292ZXJ5Q29tcCgpO1xyXG4gICAgICAgIFJvdXRlci5QYWdlVW5sb2FkKCk7XHJcbiAgICB9XHJcbn07Il19