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
exports.Default = exports.StorageData = exports.Data = exports.GetSetData = void 0;
var Router_1 = require("../Router/Router");
var Utils_1 = require("../Utils/Utils");
var GetSetData = (function () {
    function GetSetData(data, _getFunc, _setFunc) {
        this.data = data;
        this._getFunc = _getFunc;
        this._setFunc = _setFunc;
    }
    GetSetData.prototype.Get = function () {
        if (this._getFunc) {
            return this._getFunc(this.data);
        }
        return this.data;
    };
    GetSetData.prototype.Set = function (data) {
        if (this._setFunc) {
            this.data = this._setFunc(data);
            return;
        }
        this.data = data;
    };
    return GetSetData;
}());
exports.GetSetData = GetSetData;
var Data = (function (_super) {
    __extends(Data, _super);
    function Data(data, _getFunc, _setFunc) {
        var _this = _super.call(this, data, _getFunc, _setFunc) || this;
        _this.RegisteredBindding = [];
        _this.RegisteredGlobalBinding = new Map();
        _this.DataKey = Utils_1.Guid.newGuid().toString();
        return _this;
    }
    Data.prototype.Set = function (data, IsGlobalNotification) {
        var _this = this;
        if (data != this.data) {
            (0, Utils_1.Debug)(3)("Data Updated", "ObserverNotify:", data);
            _super.prototype.Set.call(this, data);
            this.RegisteredBindding.forEach(function (page) {
                page.ObserverNotify(_this.DataKey, data);
            });
            if (!IsGlobalNotification) {
                this.RegisteredGlobalBinding.forEach(function (PreProcess, TargetData) {
                    TargetData.Set(PreProcess ? PreProcess(data) : data, true);
                });
            }
        }
    };
    Data.prototype.RemoveBindding = function (page) {
        if (this.RegisteredBindding.indexOf(page) >= 0) {
            this.RegisteredBindding.splice(this.RegisteredBindding.indexOf(page), 1);
        }
    };
    Data.prototype.Bind = function (page) {
        if (this.RegisteredBindding.indexOf(page) < 0) {
            Router_1.Router.RegisterPageUnLoaded(page, this.PageUnload.bind(this));
            page.ObserverNotify(this.DataKey, this.Get());
            this.RegisteredBindding.push(page);
        }
        return this.DataKey;
    };
    Data.prototype.BindToGlobal = function (TargetData, PreProcess) {
        this.RegisteredGlobalBinding.set(TargetData, PreProcess);
    };
    Data.prototype.PageUnload = function (page) {
        this.RemoveBindding(page);
    };
    return Data;
}(GetSetData));
exports.Data = Data;
var StorageData = (function (_super) {
    __extends(StorageData, _super);
    function StorageData(data, storageKey, _getFunc, _setFunc) {
        var _this = _super.call(this, data, _getFunc, _setFunc) || this;
        _this.StorageKey = storageKey;
        return _this;
    }
    StorageData.prototype.Get = function () {
        var data;
        data = wx.getStorageSync(this.StorageKey);
        if (data) {
            if (this._getFunc) {
                return this._getFunc(data);
            }
            return data;
        }
        else {
            this.Set(this.data);
            return this.data;
        }
    };
    StorageData.prototype.Set = function (data) {
        var _this = this;
        if (this._setFunc) {
            data = this._setFunc(data);
        }
        wx.setStorageSync(this.StorageKey, data);
        this.RegisteredBindding.forEach(function (page) {
            page.ObserverNotify(_this.DataKey, data);
        });
    };
    return StorageData;
}(Data));
exports.StorageData = StorageData;
function Default(data, DefaultData) {
    if (data) {
        return data;
    }
    else {
        return DefaultData;
    }
}
exports.Default = Default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTBDO0FBRTFDLHdDQUF5RDtBQUd6RDtJQUlJLG9CQUFZLElBQVcsRUFBRSxRQUFpQyxFQUFFLFFBQWlDO1FBRXpGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFDTSx3QkFBRyxHQUFWO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ00sd0JBQUcsR0FBVixVQUFXLElBQVc7UUFFbEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4QlksZ0NBQVU7QUEwQnZCO0lBQWlDLHdCQUFpQjtJQUs5QyxjQUFZLElBQVcsRUFBRSxRQUFpQyxFQUFFLFFBQWlDO1FBQTdGLFlBQ0ksa0JBQU0sSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLENBQUMsU0FFbEM7UUFMUyx3QkFBa0IsR0FBeUIsRUFBRSxDQUFDO1FBd0NqRCw2QkFBdUIsR0FBd0QsSUFBSSxHQUFHLEVBQWtELENBQUM7UUFwQzVJLEtBQUksQ0FBQyxPQUFPLEdBQUcsWUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFD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LENBQUM7U0FDZjthQUFJO1lBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BCO0lBRUwsQ0FBQztJQUVNLHlCQUFHLEdBQVYsVUFBVyxJQUFXO1FBQXRCLGlCQVFDO1FBUEcsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUI7UUFDRCxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7WUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FBQyxBQS9CRCxDQUF3QyxJQUFJLEdBK0IzQztBQS9CWSxrQ0FBVztBQWlDeEIsU0FBZ0IsT0FBTyxDQUFJLElBQU0sRUFBQyxXQUFhO0lBQzNDLElBQUcsSUFBSSxFQUFDO1FBQ0osT0FBTyxJQUFJLENBQUM7S0FDZjtTQUFJO1FBQ0QsT0FBTyxXQUFXLENBQUM7S0FDdEI7QUFDTCxDQUFDO0FBTkQsMEJBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiLi4vUm91dGVyL1JvdXRlclwiO1xyXG5pbXBvcnQgeyBTaGl5aVBhZ2VCYXNlIH0gZnJvbSBcIi4uL1NoaXlpUGFnZS9CYXNlL1NoaXlpUGFnZUJhc2VcIjtcclxuaW1wb3J0IHsgRGVidWcsIEd1aWQsIFNoaXlpRGVidWcgfSBmcm9tIFwiLi4vVXRpbHMvVXRpbHNcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgR2V0U2V0RGF0YTxEYXRhVD57XHJcbiAgICBwcm90ZWN0ZWQgZGF0YTogRGF0YVQ7XHJcbiAgICBwcm90ZWN0ZWQgX2dldEZ1bmM/OiAoZGF0YTogRGF0YVQpID0+IERhdGFUO1xyXG4gICAgcHJvdGVjdGVkIF9zZXRGdW5jPzogKGRhdGE6IERhdGFUKSA9PiBEYXRhVDtcclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IERhdGFULCBfZ2V0RnVuYz86IChkYXRhOiBEYXRhVCkgPT4gRGF0YVQsIF9zZXRGdW5jPzogKGRhdGE6IERhdGFUKSA9PiBEYXRhVCkge1xyXG5cclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMuX2dldEZ1bmMgPSBfZ2V0RnVuYztcclxuICAgICAgICB0aGlzLl9zZXRGdW5jID0gX3NldEZ1bmM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgR2V0KCk6IERhdGFUIHtcclxuICAgICAgICBpZiAodGhpcy5fZ2V0RnVuYykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RnVuYyh0aGlzLmRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldChkYXRhOiBEYXRhVCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2V0RnVuYykge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLl9zZXRGdW5jKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhPERhdGFUPiBleHRlbmRzIEdldFNldERhdGE8RGF0YVQ+e1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBEYXRhS2V5OiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgUmVnaXN0ZXJlZEJpbmRkaW5nOiBBcnJheTxTaGl5aVBhZ2VCYXNlPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IERhdGFULCBfZ2V0RnVuYz86IChkYXRhOiBEYXRhVCkgPT4gRGF0YVQsIF9zZXRGdW5jPzogKGRhdGE6IERhdGFUKSA9PiBEYXRhVCkge1xyXG4gICAgICAgIHN1cGVyKGRhdGEsIF9nZXRGdW5jLCBfc2V0RnVuYyk7XHJcbiAgICAgICAgdGhpcy5EYXRhS2V5ID0gR3VpZC5uZXdHdWlkKCkudG9TdHJpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0KGRhdGE6IERhdGFULCBJc0dsb2JhbE5vdGlmaWNhdGlvbj86IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoZGF0YSAhPSB0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgRGVidWcoMykoXCJEYXRhIFVwZGF0ZWRcIiwgXCJPYnNlcnZlck5vdGlmeTpcIiwgZGF0YSwpXHJcbiAgICAgICAgICAgIHN1cGVyLlNldChkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5SZWdpc3RlcmVkQmluZGRpbmcuZm9yRWFjaChwYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIHBhZ2UuT2JzZXJ2ZXJOb3RpZnkodGhpcy5EYXRhS2V5LCBkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICghSXNHbG9iYWxOb3RpZmljYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVnaXN0ZXJlZEdsb2JhbEJpbmRpbmcuZm9yRWFjaCgoUHJlUHJvY2VzcywgVGFyZ2V0RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIFRhcmdldERhdGEuU2V0KFByZVByb2Nlc3MgPyBQcmVQcm9jZXNzKGRhdGEpIDogZGF0YSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZW1vdmVCaW5kZGluZyhwYWdlOiBTaGl5aVBhZ2VCYXNlKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlJlZ2lzdGVyZWRCaW5kZGluZy5pbmRleE9mKHBhZ2UpID49IDApIHtcclxuICAgICAgICAgICAgdGhpcy5SZWdpc3RlcmVkQmluZGRpbmcuc3BsaWNlKHRoaXMuUmVnaXN0ZXJlZEJpbmRkaW5nLmluZGV4T2YocGFnZSksIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIEJpbmQocGFnZTogU2hpeWlQYWdlQmFzZSk6IHN0cmluZyB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLlJlZ2lzdGVyZWRCaW5kZGluZy5pbmRleE9mKHBhZ2UpIDwgMCkge1xyXG4gICAgICAgICAgICBSb3V0ZXIuUmVnaXN0ZXJQYWdlVW5Mb2FkZWQocGFnZSwgdGhpcy5QYWdlVW5sb2FkLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICBwYWdlLk9ic2VydmVyTm90aWZ5KHRoaXMuRGF0YUtleSwgdGhpcy5HZXQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVnaXN0ZXJlZEJpbmRkaW5nLnB1c2gocGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLkRhdGFLZXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdGVyZWRHbG9iYWxCaW5kaW5nOiBNYXA8RGF0YTxhbnk+LCB1bmRlZmluZWQgfCAoKHZhbHVlOiBEYXRhVCkgPT4gYW55KT4gPSBuZXcgTWFwPERhdGE8YW55PiwgdW5kZWZpbmVkIHwgKCh2YWx1ZTogRGF0YVQpID0+IGFueSk+KCk7XHJcbiAgICBwdWJsaWMgQmluZFRvR2xvYmFsPFRhcmdldERhdGFUPihUYXJnZXREYXRhOiBEYXRhPFRhcmdldERhdGFUPiwgUHJlUHJvY2Vzcz86ICh2YWx1ZTogRGF0YVQpID0+IFRhcmdldERhdGFUKSB7XHJcblxyXG4gICAgICAgIHRoaXMuUmVnaXN0ZXJlZEdsb2JhbEJpbmRpbmcuc2V0KFRhcmdldERhdGEsIFByZVByb2Nlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYWdlVW5sb2FkKHBhZ2U6IFNoaXlpUGFnZUJhc2UpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5SZW1vdmVCaW5kZGluZyhwYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VEYXRhPERhdGFUPiBleHRlbmRzIERhdGE8RGF0YVQ+e1xyXG4gICAgcHJvdGVjdGVkIFN0b3JhZ2VLZXk6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IERhdGFULCBzdG9yYWdlS2V5OiBzdHJpbmcsIF9nZXRGdW5jPzogKGRhdGE6IERhdGFUKSA9PiBEYXRhVCwgX3NldEZ1bmM/OiAoZGF0YTogRGF0YVQpID0+IGFueSkge1xyXG4gICAgICAgIHN1cGVyKGRhdGEsIF9nZXRGdW5jLCBfc2V0RnVuYyk7XHJcbiAgICAgICAgdGhpcy5TdG9yYWdlS2V5ID0gc3RvcmFnZUtleTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0KCk6IERhdGFUIHtcclxuICAgICAgICBsZXQgZGF0YTogRGF0YVQ7XHJcbiAgICAgICAgZGF0YSA9IHd4LmdldFN0b3JhZ2VTeW5jKHRoaXMuU3RvcmFnZUtleSk7XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2dldEZ1bmMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRGdW5jKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLlNldCh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldChkYXRhOiBEYXRhVCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9zZXRGdW5jKSB7XHJcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLl9zZXRGdW5jKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyh0aGlzLlN0b3JhZ2VLZXksIGRhdGEpO1xyXG4gICAgICAgIHRoaXMuUmVnaXN0ZXJlZEJpbmRkaW5nLmZvckVhY2gocGFnZSA9PiB7XHJcbiAgICAgICAgICAgIHBhZ2UuT2JzZXJ2ZXJOb3RpZnkodGhpcy5EYXRhS2V5LCBkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERlZmF1bHQ8VD4oZGF0YTpULERlZmF1bHREYXRhOlQpOlR7XHJcbiAgICBpZihkYXRhKXtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiBEZWZhdWx0RGF0YTtcclxuICAgIH1cclxufVxyXG5cclxuIl19