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
exports.PesudoCompnent = exports.ShiyiCompUIBase = exports.ShiyiCompFuncBase = void 0;
var Task_1 = require("../Task/Task");
var ShiyiComponentExternBase = (function () {
    function ShiyiComponentExternBase() {
    }
    Object.defineProperty(ShiyiComponentExternBase.prototype, "Inst", {
        get: function () {
            return this.CompInstance;
        },
        enumerable: false,
        configurable: true
    });
    ShiyiComponentExternBase.prototype._init = function () {
        this._render = this.CompInstance.Render.bind(this.CompInstance);
        return this;
    };
    ShiyiComponentExternBase.prototype.Render = function (value) {
        this._render(value);
    };
    return ShiyiComponentExternBase;
}());
var ShiyiCompFuncBase = (function (_super) {
    __extends(ShiyiCompFuncBase, _super);
    function ShiyiCompFuncBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ShiyiCompFuncBase;
}(ShiyiComponentExternBase));
exports.ShiyiCompFuncBase = ShiyiCompFuncBase;
var ShiyiCompUIBase = (function (_super) {
    __extends(ShiyiCompUIBase, _super);
    function ShiyiCompUIBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShiyiCompUIBase.prototype._init = function () {
        _super.prototype._init.call(this);
        this.LoadGlobalUIConfig();
        return this;
    };
    ShiyiCompUIBase.prototype.LoadGlobalUIConfig = function () {
    };
    return ShiyiCompUIBase;
}(ShiyiComponentExternBase));
exports.ShiyiCompUIBase = ShiyiCompUIBase;
var PesudoCompnent = (function () {
    function PesudoCompnent(_ComponentId) {
        this.ComponentIdBackup = "";
        this.ComponentId = "";
        this.RegisteredGlobalBackWardBinding = {};
        this.RegisteredSelfBinding = {};
        this.ComponentId = _ComponentId;
        this.ComponentIdBackup = _ComponentId;
    }
    Object.defineProperty(PesudoCompnent.prototype, "Inst", {
        get: function () {
            return this.PageInstance;
        },
        enumerable: false,
        configurable: true
    });
    PesudoCompnent.prototype.AnimateTask = function (selector, keyFrames, duration) {
        var _this = this;
        return new Task_1.Task(function (task) {
            _this.animate(selector, keyFrames, duration, function () {
                task.Continue();
            });
        }, true);
    };
    PesudoCompnent.prototype.Init = function () {
        this.UI.CompInstance = this;
        this.Func.CompInstance = this;
        return this;
    };
    PesudoCompnent.prototype.SetVisibility = function (visible) {
        this.Render({
            "Visible": visible
        });
    };
    PesudoCompnent.prototype.Render = function (value) {
        var _this = this;
        var RealValue = {};
        Object.keys(value).forEach(function (key) {
            RealValue[_this.ComponentId + key] = value[key];
        });
        this._render(RealValue);
    };
    PesudoCompnent.prototype.BindGlobal = function (GlobalData, SelfDataKey, PreProcess) {
        this.Inst.BindGlobal(GlobalData, this.ComponentId + SelfDataKey, PreProcess);
    };
    PesudoCompnent.prototype.BindGlobalBackward = function (SelfDataKey, GlobalDataObj, PreProcess) {
        this.Inst.BindGlobalBackward(this.ComponentId + SelfDataKey, GlobalDataObj, PreProcess);
    };
    PesudoCompnent.prototype.BindGlobalTwoWay = function (SelfDataKey, GlobalDataObj, SelfToGlobalPreProcess, GlobalToSelfPreProcess) {
        this.BindGlobal(GlobalDataObj, SelfDataKey, GlobalToSelfPreProcess);
        this.BindGlobalBackward(SelfDataKey, GlobalDataObj, SelfToGlobalPreProcess);
    };
    PesudoCompnent.prototype.BindSelf = function (SrcKey, TargetKey, PreProcess) {
        this.Inst.BindSelf(this.ComponentId + SrcKey, this.ComponentId + TargetKey, PreProcess);
    };
    PesudoCompnent.prototype.BindSelfTwoWay = function (FirstData, SecData, FirstToSecPreProcess, SecToFirstPreProcess) {
        this.BindSelf(FirstData, SecData, FirstToSecPreProcess);
        this.BindSelf(SecData, FirstData, SecToFirstPreProcess);
    };
    PesudoCompnent.prototype.GetAllComponents = function () {
        var _this = this;
        var AllComps = {};
        var comps = this.PesudoCompnents;
        if (!comps) {
            return {};
        }
        Object.keys(comps).forEach(function (key) {
            comps[key].ComponentId = _this.ComponentIdBackup + comps[key].ComponentIdBackup;
            AllComps[comps[key].ComponentId] = comps[key];
            var subcomps = comps[key].GetAllComponents();
            Object.keys(subcomps).forEach(function (subkey) {
                AllComps[subkey] = subcomps[subkey];
            });
        });
        return AllComps;
    };
    PesudoCompnent.prototype._onReady = function () {
        this.UI._init().InitCustomData();
        this.Func._init().InitCustomData();
        this.Ready();
    };
    PesudoCompnent.prototype.Ready = function () { };
    return PesudoCompnent;
}());
exports.PesudoCompnent = PesudoCompnent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVzdWRvQ29tcG5lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQZXN1ZG9Db21wbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxxQ0FBb0M7QUFNcEM7SUFVSTtJQUVBLENBQUM7SUFWRCxzQkFBVywwQ0FBSTthQUFmO1lBRUksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBU00sd0NBQUssR0FBWjtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoRSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBSU0seUNBQU0sR0FBYixVQUE0QyxLQUFvQztRQUU1RSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFDTCwrQkFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUFFRDtJQUE4RSxxQ0FBK0I7SUFBN0c7O0lBQ0EsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQURELENBQThFLHdCQUF3QixHQUNyRztBQURxQiw4Q0FBaUI7QUFHdkM7SUFBNEUsbUNBQStCO0lBQTNHOztJQVVBLENBQUM7SUFUVSwrQkFBSyxHQUFaO1FBRUksaUJBQU0sS0FBSyxXQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ00sNENBQWtCLEdBQXpCO0lBRUEsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQVZELENBQTRFLHdCQUF3QixHQVVuRztBQVZxQiwwQ0FBZTtBQXlKckM7SUEwQkksd0JBQVksWUFBb0I7UUFqQnhCLHNCQUFpQixHQUFHLEVBQUUsQ0FBQztRQUN4QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQXFFeEIsb0NBQStCLEdB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aUIsQ0FBQztJQUN0QixxQkFBQztBQUFELENBQUMsQUE1SkQsSUE0SkM7QUE1SnFCLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR2xvYmFsRGF0YSB9IGZyb20gXCJAUm9vdC9HbG9iYWxEYXRhL0dsb2JhbERhdGFcIjtcclxuaW1wb3J0IHsgRGF0YSB9IGZyb20gXCIuLi9EYXRhL0RhdGFcIjtcclxuaW1wb3J0IHsgUGVzdWRvQ29tcG5lbnRTdGFjaywgU2hpeWlQYWdlQmFzZSB9IGZyb20gXCIuLi9TaGl5aVBhZ2UvQmFzZS9TaGl5aVBhZ2VCYXNlXCI7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vVGFzay9UYXNrXCI7XHJcbmltcG9ydCB7IERhdGFDaGFuZ2VPcHRpb24gfSBmcm9tIFwiLi4vVUkvTW9kZWwvRGF0YUNoYW5nZU1vZGVsL0RhdGFDaGFuZ2VNb2RlbFwiO1xyXG5pbXBvcnQgeyBJdWlPcHRpb24gfSBmcm9tIFwiLi4vVUkvTW9kZWwvSXVpT3B0aW9uXCI7XHJcbmltcG9ydCB7IFNoaXlpRGVidWcgfSBmcm9tIFwiLi4vVXRpbHMvVXRpbHNcIjtcclxuXHJcblxyXG5hYnN0cmFjdCBjbGFzcyBTaGl5aUNvbXBvbmVudEV4dGVybkJhc2U8Q29tcFQgZXh0ZW5kcyBQZXN1ZG9Db21wbmVudD4ge1xyXG4gICAgcHVibGljIENvbXBJbnN0YW5jZSE6IENvbXBUXHJcbiAgICBwdWJsaWMgZ2V0IEluc3QoKTogQ29tcFQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLkNvbXBJbnN0YW5jZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIF9yZW5kZXIhOiAodmFsdWU6IFJlY29yZDxzdHJpbmcsIGFueT4pID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBfaW5pdCgpOiBTaGl5aUNvbXBvbmVudEV4dGVybkJhc2U8Q29tcFQ+IHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9yZW5kZXIgPSB0aGlzLkNvbXBJbnN0YW5jZS5SZW5kZXIuYmluZCh0aGlzLkNvbXBJbnN0YW5jZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFic3RyYWN0IEluaXRDdXN0b21EYXRhKF9vcHRpb25zPzogUmVjb3JkPHN0cmluZywgYW55PiB8IHVuZGVmaW5lZCk6IHZvaWQ7XHJcblxyXG4gICAgcHVibGljIFJlbmRlcjxUIGV4dGVuZHMgUGVzdWRvQ29tcG5lbnREYXRhPih2YWx1ZTogUGFydGlhbDxSZWNvcmQ8a2V5b2YgVCwgYW55Pj4pOiB2b2lkIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9yZW5kZXIodmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU2hpeWlDb21wRnVuY0Jhc2U8Q29tcFQgZXh0ZW5kcyBQZXN1ZG9Db21wbmVudD4gZXh0ZW5kcyBTaGl5aUNvbXBvbmVudEV4dGVybkJhc2U8Q29tcFQ+IHtcclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNoaXlpQ29tcFVJQmFzZTxDb21wVCBleHRlbmRzIFBlc3Vkb0NvbXBuZW50PiBleHRlbmRzIFNoaXlpQ29tcG9uZW50RXh0ZXJuQmFzZTxDb21wVD4ge1xyXG4gICAgcHVibGljIF9pbml0KCk6IFNoaXlpQ29tcG9uZW50RXh0ZXJuQmFzZTxDb21wVD4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1cGVyLl9pbml0KCk7XHJcbiAgICAgICAgdGhpcy5Mb2FkR2xvYmFsVUlDb25maWcoKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBMb2FkR2xvYmFsVUlDb25maWcoKTogdm9pZCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGVzdWRvQ29tcG5lbnREYXRhIHtcclxuICAgIFRoZW1lOiBzdHJpbmc7XHJcbiAgICBWaXNpYmxlOiBib29sZWFuXHJcbn1cclxuXHJcbmludGVyZmFjZSBPYnNlcnZlclRhcmdldDxEYXRhVD4ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgUHJlUHJvY2Vzcz86ICh2YWx1ZTogRGF0YVQpID0+IGFueTtcclxufVxyXG5cclxuaW50ZXJmYWNlIE9ic2VydmVyQmFja3dhcmRUYXJnZXQ8RGF0YVQ+IHtcclxuICAgIFRhcmdldERhdGFPYmo6IERhdGE8YW55PjtcclxuICAgIFByZVByb2Nlc3M/OiAodmFsdWU6IERhdGFUKSA9PiBhbnk7XHJcbn1cclxuXHJcblxyXG5pbnRlcmZhY2UgS2V5RnJhbWUge1xyXG4gICAgLyoqIOWFs+mUruW4p+eahOWBj+enu++8jOiMg+WbtFswLTFdICovXHJcbiAgICBvZmZzZXQ/OiBudW1iZXJcclxuICAgIC8qKiDliqjnlLvnvJPliqjlh73mlbAgKi9cclxuICAgIGVhc2U/OiBzdHJpbmdcclxuICAgIC8qKiDln7rngrnkvY3nva7vvIzljbMgQ1NTIHRyYW5zZm9ybS1vcmlnaW4gKi9cclxuICAgIHRyYW5zZm9ybU9yaWdpbj86IHN0cmluZ1xyXG4gICAgLyoqIOiDjOaZr+minOiJsu+8jOWNsyBDU1MgYmFja2dyb3VuZC1jb2xvciAqL1xyXG4gICAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nXHJcbiAgICAvKiog5bqV6L655L2N572u77yM5Y2zIENTUyBib3R0b20gKi9cclxuICAgIGJvdHRvbT86IG51bWJlciB8IHN0cmluZ1xyXG4gICAgLyoqIOmrmOW6pu+8jOWNsyBDU1MgaGVpZ2h0ICovXHJcbiAgICBoZWlnaHQ/OiBudW1iZXIgfCBzdHJpbmdcclxuICAgIC8qKiDlt6bovrnkvY3nva7vvIzljbMgQ1NTIGxlZnQgKi9cclxuICAgIGxlZnQ/OiBudW1iZXIgfCBzdHJpbmdcclxuICAgIC8qKiDlrr3luqbvvIzljbMgQ1NTIHdpZHRoICovXHJcbiAgICB3aWR0aD86IG51bWJlciB8IHN0cmluZ1xyXG4gICAgLyoqIOS4jemAj+aYjuW6pu+8jOWNsyBDU1Mgb3BhY2l0eSAqL1xyXG4gICAgb3BhY2l0eT86IG51bWJlciB8IHN0cmluZ1xyXG4gICAgLyoqIOWPs+i+ueS9jee9ru+8jOWNsyBDU1MgcmlnaHQgKi9cclxuICAgIHJpZ2h0PzogbnVtYmVyIHwgc3RyaW5nXHJcbiAgICAvKiog6aG26L655L2N572u77yM5Y2zIENTUyB0b3AgKi9cclxuICAgIHRvcD86IG51bWJlciB8IHN0cmluZ1xyXG4gICAgLyoqIOWPmOaNouefqemYte+8jOWNsyBDU1MgdHJhbnNmb3JtIG1hdHJpeCAqL1xyXG4gICAgbWF0cml4PzogbnVtYmVyW11cclxuICAgIC8qKiDkuInnu7Tlj5jmjaLnn6npmLXvvIzljbMgQ1NTIHRyYW5zZm9ybSBtYXRyaXgzZCAqL1xyXG4gICAgbWF0cml4M2Q/OiBudW1iZXJbXVxyXG4gICAgLyoqIOaXi+i9rO+8jOWNsyBDU1MgdHJhbnNmb3JtIHJvdGF0ZSAqL1xyXG4gICAgcm90YXRlPzogbnVtYmVyXHJcbiAgICAvKiog5LiJ57u05peL6L2s77yM5Y2zIENTUyB0cmFuc2Zvcm0gcm90YXRlM2QgKi9cclxuICAgIHJvdGF0ZTNkPzogbnVtYmVyW11cclxuICAgIC8qKiBYIOaWueWQkeaXi+i9rO+8jOWNsyBDU1MgdHJhbnNmb3JtIHJvdGF0ZVggKi9cclxuICAgIHJvdGF0ZVg/OiBudW1iZXJcclxuICAgIC8qKiBZIOaWueWQkeaXi+i9rO+8jOWNsyBDU1MgdHJhbnNmb3JtIHJvdGF0ZVkgKi9cclxuICAgIHJvdGF0ZVk/OiBudW1iZXJcclxuICAgIC8qKiBaIOaWueWQkeaXi+i9rO+8jOWNsyBDU1MgdHJhbnNmb3JtIHJvdGF0ZVogKi9cclxuICAgIHJvdGF0ZVo/OiBudW1iZXJcclxuICAgIC8qKiDnvKnmlL7vvIzljbMgQ1NTIHRyYW5zZm9ybSBzY2FsZSAqL1xyXG4gICAgc2NhbGU/OiBudW1iZXJbXVxyXG4gICAgLyoqIOS4iee7tOe8qeaUvu+8jOWNsyBDU1MgdHJhbnNmb3JtIHNjYWxlM2QgKi9cclxuICAgIHNjYWxlM2Q/OiBudW1iZXJbXVxyXG4gICAgLyoqIFgg5pa55ZCR57yp5pS+77yM5Y2zIENTUyB0cmFuc2Zvcm0gc2NhbGVYICovXHJcbiAgICBzY2FsZVg/OiBudW1iZXJcclxuICAgIC8qKiBZIOaWueWQkee8qeaUvu+8jOWNsyBDU1MgdHJhbnNmb3JtIHNjYWxlWSAqL1xyXG4gICAgc2NhbGVZPzogbnVtYmVyXHJcbiAgICAvKiogWiDmlrnlkJHnvKnmlL7vvIzljbMgQ1NTIHRyYW5zZm9ybSBzY2FsZVogKi9cclxuICAgIHNjYWxlWj86IG51bWJlclxyXG4gICAgLyoqIOWAvuaWnO+8jOWNsyBDU1MgdHJhbnNmb3JtIHNrZXcgKi9cclxuICAgIHNrZXc/OiBudW1iZXJbXVxyXG4gICAgLyoqIFgg5pa55ZCR5YC+5pac77yM5Y2zIENTUyB0cmFuc2Zvcm0gc2tld1ggKi9cclxuICAgIHNrZXdYPzogbnVtYmVyXHJcbiAgICAvKiogWSDmlrnlkJHlgL7mlpzvvIzljbMgQ1NTIHRyYW5zZm9ybSBza2V3WSAqL1xyXG4gICAgc2tld1k/OiBudW1iZXJcclxuICAgIC8qKiDkvY3np7vvvIzljbMgQ1NTIHRyYW5zZm9ybSB0cmFuc2xhdGUgKi9cclxuICAgIHRyYW5zbGF0ZT86IEFycmF5PG51bWJlciB8IHN0cmluZz5cclxuICAgIC8qKiDkuInnu7TkvY3np7vvvIzljbMgQ1NTIHRyYW5zZm9ybSB0cmFuc2xhdGUzZCAqL1xyXG4gICAgdHJhbnNsYXRlM2Q/OiBBcnJheTxudW1iZXIgfCBzdHJpbmc+XHJcbiAgICAvKiogWCDmlrnlkJHkvY3np7vvvIzljbMgQ1NTIHRyYW5zZm9ybSB0cmFuc2xhdGVYICovXHJcbiAgICB0cmFuc2xhdGVYPzogbnVtYmVyIHwgc3RyaW5nXHJcbiAgICAvKiogWSDmlrnlkJHkvY3np7vvvIzljbMgQ1NTIHRyYW5zZm9ybSB0cmFuc2xhdGVZICovXHJcbiAgICB0cmFuc2xhdGVZPzogbnVtYmVyIHwgc3RyaW5nXHJcbiAgICAvKiogWiDmlrnlkJHkvY3np7vvvIzljbMgQ1NTIHRyYW5zZm9ybSB0cmFuc2xhdGVaICovXHJcbiAgICB0cmFuc2xhdGVaPzogbnVtYmVyIHwgc3RyaW5nXHJcbn1cclxuaW50ZXJmYWNlIENsZWFyQW5pbWF0aW9uT3B0aW9ucyB7XHJcbiAgICAvKiog5Z+654K55L2N572u77yM5Y2zIENTUyB0cmFuc2Zvcm0tb3JpZ2luICovXHJcbiAgICB0cmFuc2Zvcm1PcmlnaW4/OiBib29sZWFuXHJcbiAgICAvKiog6IOM5pmv6aKc6Imy77yM5Y2zIENTUyBiYWNrZ3JvdW5kLWNvbG9yICovXHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I/OiBib29sZWFuXHJcbiAgICAvKiog5bqV6L655L2N572u77yM5Y2zIENTUyBib3R0b20gKi9cclxuICAgIGJvdHRvbT86IGJvb2xlYW5cclxuICAgIC8qKiDpq5jluqbvvIzljbMgQ1NTIGhlaWdodCAqL1xyXG4gICAgaGVpZ2h0PzogYm9vbGVhblxyXG4gICAgLyoqIOW3pui+ueS9jee9ru+8jOWNsyBDU1MgbGVmdCAqL1xyXG4gICAgbGVmdD86IGJvb2xlYW5cclxuICAgIC8qKiDlrr3luqbvvIzljbMgQ1NTIHdpZHRoICovXHJcbiAgICB3aWR0aD86IGJvb2xlYW5cclxuICAgIC8qKiDkuI3pgI/mmI7luqbvvIzljbMgQ1NTIG9wYWNpdHkgKi9cclxuICAgIG9wYWNpdHk/OiBib29sZWFuXHJcbiAgICAvKiog5Y+z6L655L2N572u77yM5Y2zIENTUyByaWdodCAqL1xyXG4gICAgcmlnaHQ/OiBib29sZWFuXHJcbiAgICAvKiog6aG26L655L2N572u77yM5Y2zIENTUyB0b3AgKi9cclxuICAgIHRvcD86IGJvb2xlYW5cclxuICAgIC8qKiDlj5jmjaLnn6npmLXvvIzljbMgQ1NTIHRyYW5zZm9ybSBtYXRyaXggKi9cclxuICAgIG1hdHJpeD86IGJvb2xlYW5cclxuICAgIC8qKiDkuInnu7Tlj5jmjaLnn6npmLXvvIzljbMgQ1NTIHRyYW5zZm9ybSBtYXRyaXgzZCAqL1xyXG4gICAgbWF0cml4M2Q/OiBib29sZWFuXHJcbiAgICAvKiog5peL6L2s77yM5Y2zIENTUyB0cmFuc2Zvcm0gcm90YXRlICovXHJcbiAgICByb3RhdGU/OiBib29sZWFuXHJcbiAgICAvKiog5LiJ57u05peL6L2s77yM5Y2zIENTUyB0cmFuc2Zvcm0gcm90YXRlM2QgKi9cclxuICAgIHJvdGF0ZTNkPzogYm9vbGVhblxyXG4gICAgLyoqIFgg5pa55ZCR5peL6L2s77yM5Y2zIENTUyB0cmFuc2Zvcm0gcm90YXRlWCAqL1xyXG4gICAgcm90YXRlWD86IGJvb2xlYW5cclxuICAgIC8qKiBZIOaWueWQkeaXi+i9rO+8jOWNsyBDU1MgdHJhbnNmb3JtIHJvdGF0ZVkgKi9cclxuICAgIHJvdGF0ZVk/OiBib29sZWFuXHJcbiAgICAvKiogWiDmlrnlkJHml4vovazvvIzljbMgQ1NTIHRyYW5zZm9ybSByb3RhdGVaICovXHJcbiAgICByb3RhdGVaPzogYm9vbGVhblxyXG4gICAgLyoqIOe8qeaUvu+8jOWNsyBDU1MgdHJhbnNmb3JtIHNjYWxlICovXHJcbiAgICBzY2FsZT86IGJvb2xlYW5cclxuICAgIC8qKiDkuInnu7TnvKnmlL7vvIzljbMgQ1NTIHRyYW5zZm9ybSBzY2FsZTNkICovXHJcbiAgICBzY2FsZTNkPzogYm9vbGVhblxyXG4gICAgLyoqIFgg5pa55ZCR57yp5pS+77yM5Y2zIENTUyB0cmFuc2Zvcm0gc2NhbGVYICovXHJcbiAgICBzY2FsZVg/OiBib29sZWFuXHJcbiAgICAvKiogWSDmlrnlkJHnvKnmlL7vvIzljbMgQ1NTIHRyYW5zZm9ybSBzY2FsZVkgKi9cclxuICAgIHNjYWxlWT86IGJvb2xlYW5cclxuICAgIC8qKiBaIOaWueWQkee8qeaUvu+8jOWNsyBDU1MgdHJhbnNmb3JtIHNjYWxlWiAqL1xyXG4gICAgc2NhbGVaPzogYm9vbGVhblxyXG4gICAgLyoqIOWAvuaWnO+8jOWNsyBDU1MgdHJhbnNmb3JtIHNrZXcgKi9cclxuICAgIHNrZXc/OiBib29sZWFuXHJcbiAgICAvKiogWCDmlrnlkJHlgL7mlpzvvIzljbMgQ1NTIHRyYW5zZm9ybSBza2V3WCAqL1xyXG4gICAgc2tld1g/OiBib29sZWFuXHJcbiAgICAvKiogWSDmlrnlkJHlgL7mlpzvvIzljbMgQ1NTIHRyYW5zZm9ybSBza2V3WSAqL1xyXG4gICAgc2tld1k/OiBib29sZWFuXHJcbiAgICAvKiog5L2N56e777yM5Y2zIENTUyB0cmFuc2Zvcm0gdHJhbnNsYXRlICovXHJcbiAgICB0cmFuc2xhdGU/OiBib29sZWFuXHJcbiAgICAvKiog5LiJ57u05L2N56e777yM5Y2zIENTUyB0cmFuc2Zvcm0gdHJhbnNsYXRlM2QgKi9cclxuICAgIHRyYW5zbGF0ZTNkPzogYm9vbGVhblxyXG4gICAgLyoqIFgg5pa55ZCR5L2N56e777yM5Y2zIENTUyB0cmFuc2Zvcm0gdHJhbnNsYXRlWCAqL1xyXG4gICAgdHJhbnNsYXRlWD86IGJvb2xlYW5cclxuICAgIC8qKiBZIOaWueWQkeS9jeenu++8jOWNsyBDU1MgdHJhbnNmb3JtIHRyYW5zbGF0ZVkgKi9cclxuICAgIHRyYW5zbGF0ZVk/OiBib29sZWFuXHJcbiAgICAvKiogWiDmlrnlkJHkvY3np7vvvIzljbMgQ1NTIHRyYW5zZm9ybSB0cmFuc2xhdGVaICovXHJcbiAgICB0cmFuc2xhdGVaPzogYm9vbGVhblxyXG59XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGVzdWRvQ29tcG5lbnQge1xyXG5cclxuICAgIHB1YmxpYyBGdW5jITogU2hpeWlDb21wRnVuY0Jhc2U8UGVzdWRvQ29tcG5lbnQ+O1xyXG4gICAgcHVibGljIFVJITogU2hpeWlDb21wVUlCYXNlPFBlc3Vkb0NvbXBuZW50PjtcclxuICAgIHB1YmxpYyBQYWdlSW5zdGFuY2UhOiBTaGl5aVBhZ2VCYXNlO1xyXG4gICAgcHVibGljIGdldCBJbnN0KCk6IFNoaXlpUGFnZUJhc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlBhZ2VJbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBQZXN1ZG9Db21wbmVudHMhOiBQZXN1ZG9Db21wbmVudFN0YWNrO1xyXG4gICAgcHJpdmF0ZSBDb21wb25lbnRJZEJhY2t1cCA9IFwiXCI7XHJcbiAgICBwdWJsaWMgQ29tcG9uZW50SWQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgZGF0YSE6IFBlc3Vkb0NvbXBuZW50RGF0YTtcclxuICAgIHB1YmxpYyBhbmltYXRlITogKFxyXG4gICAgICAgIHNlbGVjdG9yOiBzdHJpbmcsXHJcbiAgICAgICAga2V5RnJhbWVzOiBLZXlGcmFtZVtdLFxyXG4gICAgICAgIGR1cmF0aW9uOiBudW1iZXIsXHJcbiAgICAgICAgY2FsbGJhY2s/OiAoKSA9PiB2b2lkXHJcbiAgICApID0+IHZvaWRcclxuICAgIHB1YmxpYyBjbGVhckFuaW1hdGlvbiE6IChcclxuICAgICAgICBzZWxlY3Rvcjogc3RyaW5nLFxyXG4gICAgICAgIG9wdGlvbnM/OiBDbGVhckFuaW1hdGlvbk9wdGlvbnMsXHJcbiAgICAgICAgY2FsbGJhY2s/OiAoKSA9PiB2b2lkXHJcbiAgICApID0+IHZvaWRcclxuXHJcbiAgICBwdWJsaWMgX3JlbmRlciE6ICh2YWx1ZTogUmVjb3JkPHN0cmluZywgYW55PikgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihfQ29tcG9uZW50SWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuQ29tcG9uZW50SWQgPSBfQ29tcG9uZW50SWQ7XHJcbiAgICAgICAgdGhpcy5Db21wb25lbnRJZEJhY2t1cCA9IF9Db21wb25lbnRJZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQW5pbWF0ZVRhc2soc2VsZWN0b3I6c3RyaW5nLGtleUZyYW1lczpLZXlGcmFtZVtdLGR1cmF0aW9uOm51bWJlcik6VGFzazx2b2lkPntcclxuICAgICAgICByZXR1cm4gbmV3IFRhc2soKHRhc2spPT57XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0ZShzZWxlY3RvcixrZXlGcmFtZXMsZHVyYXRpb24sKCk9PntcclxuICAgICAgICAgICAgICAgIHRhc2suQ29udGludWUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LHRydWUpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEluaXQoKTogUGVzdWRvQ29tcG5lbnQge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuVUkuQ29tcEluc3RhbmNlID0gdGhpcztcclxuICAgICAgICB0aGlzLkZ1bmMuQ29tcEluc3RhbmNlID0gdGhpcztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0VmlzaWJpbGl0eSh2aXNpYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5SZW5kZXI8UGVzdWRvQ29tcG5lbnREYXRhPih7XHJcbiAgICAgICAgICAgIFwiVmlzaWJsZVwiOiB2aXNpYmxlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIFJlbmRlcjxUIGV4dGVuZHMgUGVzdWRvQ29tcG5lbnREYXRhPih2YWx1ZTogUGFydGlhbDxSZWNvcmQ8a2V5b2YgVCwgYW55Pj4pOiB2b2lkIHtcclxuICAgICAgICBsZXQgUmVhbFZhbHVlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XHJcbiAgICAgICAgT2JqZWN0LmtleXModmFsdWUpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgUmVhbFZhbHVlW3RoaXMuQ29tcG9uZW50SWQgKyBrZXldID0gKHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIGFueT4pW2tleV07XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLl9yZW5kZXIoUmVhbFZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyNyZWdpb24g5pWw5o2u57uR5a6aXHJcbiAgICAvKipcclxuICAgICAqIOWFqOWxgOaVsOaNrue7keWumlxyXG4gICAgICogQHR5cGUge0dsb2JhbERhdGFUfSDlhajlsYDmlbDmja7nsbvlnotcclxuICAgICAqIEB0eXBlIHtUfSDpobXpnaLkuK3mtL7nlJ/oh6pQZXN1ZG9Db21wbmVudERhdGHnmoRkYXRh57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gR2xvYmFsRGF0YSDlhajlsYDmlbDmja5PYmplY3RcclxuICAgICAqIEBwYXJhbSBTZWxmRGF0YUtleSDoh6rouqvmlbDmja5LZXlcclxuICAgICAqIEBwYXJhbSBQcmVQcm9jZXNzIOmihOWkhOeQhuaWueW8j1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQmluZEdsb2JhbDxHbG9iYWxEYXRhVCwgVCBleHRlbmRzIFBlc3Vkb0NvbXBuZW50RGF0YT4oXHJcbiAgICAgICAgR2xvYmFsRGF0YTogRGF0YTxHbG9iYWxEYXRhVD4sXHJcbiAgICAgICAgU2VsZkRhdGFLZXk6IGtleW9mIFQsXHJcbiAgICAgICAgUHJlUHJvY2Vzcz86ICh2YWx1ZTogR2xvYmFsRGF0YVQpID0+IGFueSkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuSW5zdC5CaW5kR2xvYmFsPEdsb2JhbERhdGFULCBhbnk+KEdsb2JhbERhdGEsIHRoaXMuQ29tcG9uZW50SWQgKyBTZWxmRGF0YUtleSwgUHJlUHJvY2Vzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBSZWdpc3RlcmVkR2xvYmFsQmFja1dhcmRCaW5kaW5nOiBSZWNvcmQ8c3RyaW5nLCBBcnJheTxPYnNlcnZlckJhY2t3YXJkVGFyZ2V0PGFueT4+PiA9IHt9O1xyXG5cclxuICAgIHB1YmxpYyBCaW5kR2xvYmFsQmFja3dhcmQ8U2VsZkRhdGFULCBUIGV4dGVuZHMgUGVzdWRvQ29tcG5lbnREYXRhPihcclxuICAgICAgICBTZWxmRGF0YUtleToga2V5b2YgVCxcclxuICAgICAgICBHbG9iYWxEYXRhT2JqOiBEYXRhPGFueT4sXHJcbiAgICAgICAgUHJlUHJvY2Vzcz86ICh2YWx1ZTogU2VsZkRhdGFUKSA9PiBhbnkpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5JbnN0LkJpbmRHbG9iYWxCYWNrd2FyZDxhbnksIGFueT4odGhpcy5Db21wb25lbnRJZCArIFNlbGZEYXRhS2V5LCBHbG9iYWxEYXRhT2JqLCBQcmVQcm9jZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFqOWxgOaVsOaNruWPjOWQkee7keWumlxyXG4gICAgICogQHBhcmFtIFNlbGZEYXRhS2V5IOiHqui6q+aVsOaNrktleVxyXG4gICAgICogQHBhcmFtIEdsb2JhbERhdGFPYmog5YWo5bGA5pWw5o2uT2JqZWN0XHJcbiAgICAgKiBAcGFyYW0gU2VsZlRvR2xvYmFsUHJlUHJvY2VzcyDoh6rouqvmlbDmja7liLDlhajlsYDmlbDmja7nmoTpooTlpITnkIZcclxuICAgICAqIEBwYXJhbSBHbG9iYWxUb1NlbGZQcmVQcm9jZXNzIOWFqOWxgOaVsOaNruWIsOiHqui6q+aVsOaNrueahOmihOWkhOeQhlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQmluZEdsb2JhbFR3b1dheTxTZWxmRGF0YVQsIEdsb2JhbERhdGFULCBUIGV4dGVuZHMgUGVzdWRvQ29tcG5lbnREYXRhPihcclxuICAgICAgICBTZWxmRGF0YUtleToga2V5b2YgVCxcclxuICAgICAgICBHbG9iYWxEYXRhT2JqOiBEYXRhPEdsb2JhbERhdGFUPixcclxuICAgICAgICBTZWxmVG9HbG9iYWxQcmVQcm9jZXNzPzogKHZhbHVlOiBTZWxmRGF0YVQpID0+IEdsb2JhbERhdGFULFxyXG4gICAgICAgIEdsb2JhbFRvU2VsZlByZVByb2Nlc3M/OiAodmFsdWU6IEdsb2JhbERhdGFUKSA9PiBTZWxmRGF0YVQpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5CaW5kR2xvYmFsPEdsb2JhbERhdGFULCBUPihHbG9iYWxEYXRhT2JqLCBTZWxmRGF0YUtleSwgR2xvYmFsVG9TZWxmUHJlUHJvY2Vzcyk7XHJcbiAgICAgICAgdGhpcy5CaW5kR2xvYmFsQmFja3dhcmQ8U2VsZkRhdGFULCBUPihTZWxmRGF0YUtleSwgR2xvYmFsRGF0YU9iaiwgU2VsZlRvR2xvYmFsUHJlUHJvY2Vzcyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgUmVnaXN0ZXJlZFNlbGZCaW5kaW5nOiBSZWNvcmQ8c3RyaW5nLCBBcnJheTxPYnNlcnZlclRhcmdldDxhbnk+Pj4gPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdouaVsOaNruiHque7keWumlxyXG4gICAgICogQHR5cGUge1NyY0RhdGFUfSDmupDmlbDmja7nsbvlnotcclxuICAgICAqIEB0eXBlIHtUfSDpobXpnaLkuK3mtL7nlJ/oh6pQZXN1ZG9Db21wbmVudERhdGHnmoRkYXRh57G75Z6LXHJcbiAgICAgKiBAcGFyYW0gU3JjS2V5IOa6kOaVsOaNrktleVxyXG4gICAgICogQHBhcmFtIFRhcmdldEtleSDnm67moIfmlbDmja5LZXlcclxuICAgICAqIEBwYXJhbSBQcmVQcm9jZXNzIOmihOWkhOeQhuaWueW8j1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgQmluZFNlbGY8U3JjRGF0YVQsIFQgZXh0ZW5kcyBQZXN1ZG9Db21wbmVudERhdGE+KFNyY0tleToga2V5b2YgVCwgVGFyZ2V0S2V5OiBrZXlvZiBULCBQcmVQcm9jZXNzPzogKHZhbHVlOiBTcmNEYXRhVCkgPT4gYW55KSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5JbnN0LkJpbmRTZWxmPGFueSwgYW55Pih0aGlzLkNvbXBvbmVudElkICsgU3JjS2V5LCB0aGlzLkNvbXBvbmVudElkICsgVGFyZ2V0S2V5LCBQcmVQcm9jZXNzKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCaW5kU2VsZlR3b1dheTxGaXJzdERhdGFULCBTZWNEYXRhVCwgVCBleHRlbmRzIFBlc3Vkb0NvbXBuZW50RGF0YT4oXHJcbiAgICAgICAgRmlyc3REYXRhOiBrZXlvZiBULFxyXG4gICAgICAgIFNlY0RhdGE6IGtleW9mIFQsXHJcbiAgICAgICAgRmlyc3RUb1NlY1ByZVByb2Nlc3M/OiAodmFsdWU6IEZpcnN0RGF0YVQpID0+IFNlY0RhdGFULFxyXG4gICAgICAgIFNlY1RvRmlyc3RQcmVQcm9jZXNzPzogKHZhbHVlOiBTZWNEYXRhVCkgPT4gRmlyc3REYXRhVFxyXG4gICAgKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5CaW5kU2VsZjxGaXJzdERhdGFULCBUPihGaXJzdERhdGEsIFNlY0RhdGEsIEZpcnN0VG9TZWNQcmVQcm9jZXNzKTtcclxuICAgICAgICB0aGlzLkJpbmRTZWxmPFNlY0RhdGFULCBUPihTZWNEYXRhLCBGaXJzdERhdGEsIFNlY1RvRmlyc3RQcmVQcm9jZXNzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0QWxsQ29tcG9uZW50cygpOiBSZWNvcmQ8c3RyaW5nLCBQZXN1ZG9Db21wbmVudD4ge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxldCBBbGxDb21wczogUmVjb3JkPHN0cmluZywgUGVzdWRvQ29tcG5lbnQ+ID0ge307XHJcbiAgICAgICAgbGV0IGNvbXBzID0gdGhpcy5QZXN1ZG9Db21wbmVudHMgYXMgUmVjb3JkPHN0cmluZywgUGVzdWRvQ29tcG5lbnQ+O1xyXG4gICAgICAgIGlmICghY29tcHMpIHsgcmV0dXJuIHt9IH1cclxuICAgICAgICBPYmplY3Qua2V5cyhjb21wcykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBjb21wc1trZXldLkNvbXBvbmVudElkID0gdGhpcy5Db21wb25lbnRJZEJhY2t1cCArIGNvbXBzW2tleV0uQ29tcG9uZW50SWRCYWNrdXA7XHJcbiAgICAgICAgICAgIEFsbENvbXBzW2NvbXBzW2tleV0uQ29tcG9uZW50SWRdID0gY29tcHNba2V5XTtcclxuICAgICAgICAgICAgbGV0IHN1YmNvbXBzID0gY29tcHNba2V5XS5HZXRBbGxDb21wb25lbnRzKCk7XHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHN1YmNvbXBzKS5mb3JFYWNoKHN1YmtleSA9PiB7XHJcbiAgICAgICAgICAgICAgICBBbGxDb21wc1tzdWJrZXldID0gc3ViY29tcHNbc3Via2V5XTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBBbGxDb21wcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgX29uUmVhZHkoKSB7XHJcbiAgICAgICAgdGhpcy5VSS5faW5pdCgpLkluaXRDdXN0b21EYXRhKCk7XHJcbiAgICAgICAgdGhpcy5GdW5jLl9pbml0KCkuSW5pdEN1c3RvbURhdGEoKTtcclxuICAgICAgICB0aGlzLlJlYWR5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlYWR5KCkgeyB9XHJcbn0iXX0=