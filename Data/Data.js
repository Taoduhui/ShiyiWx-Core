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
exports.StorageData = exports.Data = exports.GetSetData = void 0;
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
        _super.prototype.Set.call(this, data);
        this.RegisteredBindding.forEach(function (page) {
            page.ObserverNotify(_this.DataKey, data);
        });
        if (!IsGlobalNotification) {
            this.RegisteredGlobalBinding.forEach(function (PreProcess, TargetData) {
                TargetData.Set(PreProcess ? PreProcess(data) : data, true);
            });
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
        var data = wx.getStorageSync(this.StorageKey);
        if (data) {
            if (this._getFunc) {
                return this._getFunc(data);
            }
        }
        return data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTBDO0FBRTFDLHdDQUFzQztBQUd0QztJQUlJLG9CQUFZLElBQVUsRUFBQyxRQUE2QixFQUFDLFFBQTZCO1FBQzlFLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzdCLENBQUM7SUFDTSx3QkFBRyxHQUFWO1FBQ0ksSUFBRyxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQ2IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBQ00sd0JBQUcsR0FBVixVQUFXLElBQVU7UUFDakIsSUFBRyxJQUFJLENBQUMsUUFBUSxFQUFDO1lBQ2IsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUF0QlksZ0NBQVU7QUF3QnZCO0lBQWlDLHdCQUFpQjtJQUs5QyxjQUFZLElBQVUsRUFBQyxRQUE2QixFQUFDLFFBQTZCO1FBQWxGLFlBQ0ksa0JBQU0sSUFBSSxFQUFDLFFBQVEsRUFBQyxRQUFRLENBQUMsU0FFaEM7UUFMUyx3QkFBa0IsR0FBc0IsRUFBRSxDQUFDO1FBbUM5Qyw2QkFBdUIsR0FBK0MsSUFBSSxHQUFHLEVBQTRDLENBQUM7UUEvQjdILEtBQUksQ0FBQyxPQUFPLEdBQUMsWUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFD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QztTQUM1QjtRQUNELEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBMUJELENBQXdDLElBQUksR0EwQjNDO0FBMUJZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIi4uL1JvdXRlci9Sb3V0ZXJcIjtcclxuaW1wb3J0IHsgU2hpeWlQYWdlQmFzZSB9IGZyb20gXCIuLi9TaGl5aVBhZ2UvQmFzZS9TaGl5aVBhZ2VCYXNlXCI7XHJcbmltcG9ydCB7IEd1aWQgfSBmcm9tIFwiLi4vVXRpbHMvVXRpbHNcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgR2V0U2V0RGF0YTxEYXRhVD57XHJcbiAgICBwcm90ZWN0ZWQgZGF0YTpEYXRhVDtcclxuICAgIHByb3RlY3RlZCBfZ2V0RnVuYz86KGRhdGE6RGF0YVQpPT5EYXRhVDtcclxuICAgIHByb3RlY3RlZCBfc2V0RnVuYz86KGRhdGE6RGF0YVQpPT5EYXRhVDtcclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6RGF0YVQsX2dldEZ1bmM/OihkYXRhOkRhdGFUKT0+RGF0YVQsX3NldEZ1bmM/OihkYXRhOkRhdGFUKT0+RGF0YVQpe1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5fZ2V0RnVuYyA9IF9nZXRGdW5jO1xyXG4gICAgICAgIHRoaXMuX3NldEZ1bmMgPSBfc2V0RnVuYztcclxuICAgIH1cclxuICAgIHB1YmxpYyBHZXQoKTpEYXRhVHtcclxuICAgICAgICBpZih0aGlzLl9nZXRGdW5jKXtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEZ1bmModGhpcy5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXQoZGF0YTpEYXRhVCl7XHJcbiAgICAgICAgaWYodGhpcy5fc2V0RnVuYyl7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YT10aGlzLl9zZXRGdW5jKGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEYXRhPERhdGFUPiBleHRlbmRzIEdldFNldERhdGE8RGF0YVQ+e1xyXG5cclxuICAgIHB1YmxpYyByZWFkb25seSBEYXRhS2V5OnN0cmluZztcclxuICAgIHByb3RlY3RlZCBSZWdpc3RlcmVkQmluZGRpbmc6QXJyYXk8U2hpeWlQYWdlQmFzZT49W107XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YTpEYXRhVCxfZ2V0RnVuYz86KGRhdGE6RGF0YVQpPT5EYXRhVCxfc2V0RnVuYz86KGRhdGE6RGF0YVQpPT5EYXRhVCl7XHJcbiAgICAgICAgc3VwZXIoZGF0YSxfZ2V0RnVuYyxfc2V0RnVuYyk7XHJcbiAgICAgICAgdGhpcy5EYXRhS2V5PUd1aWQubmV3R3VpZCgpLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldChkYXRhOkRhdGFULElzR2xvYmFsTm90aWZpY2F0aW9uPzpib29sZWFuKXtcclxuICAgICAgICBzdXBlci5TZXQoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5SZWdpc3RlcmVkQmluZGRpbmcuZm9yRWFjaChwYWdlPT57XHJcbiAgICAgICAgICAgIHBhZ2UuT2JzZXJ2ZXJOb3RpZnkodGhpcy5EYXRhS2V5LGRhdGEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKCFJc0dsb2JhbE5vdGlmaWNhdGlvbil7XHJcbiAgICAgICAgICAgIHRoaXMuUmVnaXN0ZXJlZEdsb2JhbEJpbmRpbmcuZm9yRWFjaCgoUHJlUHJvY2VzcyxUYXJnZXREYXRhKT0+e1xyXG4gICAgICAgICAgICAgICAgVGFyZ2V0RGF0YS5TZXQoUHJlUHJvY2Vzcz9QcmVQcm9jZXNzKGRhdGEpOmRhdGEsdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZW1vdmVCaW5kZGluZyhwYWdlOlNoaXlpUGFnZUJhc2Upe1xyXG4gICAgICAgIGlmKHRoaXMuUmVnaXN0ZXJlZEJpbmRkaW5nLmluZGV4T2YocGFnZSk+PTApe1xyXG4gICAgICAgICAgICB0aGlzLlJlZ2lzdGVyZWRCaW5kZGluZy5zcGxpY2UodGhpcy5SZWdpc3RlcmVkQmluZGRpbmcuaW5kZXhPZihwYWdlKSwxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBCaW5kKHBhZ2U6U2hpeWlQYWdlQmFzZSk6c3RyaW5ne1xyXG4gICAgICAgIGlmKHRoaXMuUmVnaXN0ZXJlZEJpbmRkaW5nLmluZGV4T2YocGFnZSk8MCl7XHJcbiAgICAgICAgICAgIFJvdXRlci5SZWdpc3RlclBhZ2VVbkxvYWRlZChwYWdlLHRoaXMuUGFnZVVubG9hZC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgcGFnZS5PYnNlcnZlck5vdGlmeSh0aGlzLkRhdGFLZXksdGhpcy5HZXQoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmVnaXN0ZXJlZEJpbmRkaW5nLnB1c2gocGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLkRhdGFLZXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdGVyZWRHbG9iYWxCaW5kaW5nOk1hcDxEYXRhPGFueT4sdW5kZWZpbmVkfCgodmFsdWU6RGF0YVQpPT5hbnkpPj1uZXcgTWFwPERhdGE8YW55Pix1bmRlZmluZWR8KCh2YWx1ZTpEYXRhVCk9PmFueSk+KCk7XHJcbiAgICBwdWJsaWMgQmluZFRvR2xvYmFsPFRhcmdldERhdGFUPihUYXJnZXREYXRhOkRhdGE8VGFyZ2V0RGF0YVQ+LFByZVByb2Nlc3M/Oih2YWx1ZTpEYXRhVCk9PlRhcmdldERhdGFUKXtcclxuICAgICAgICB0aGlzLlJlZ2lzdGVyZWRHbG9iYWxCaW5kaW5nLnNldChUYXJnZXREYXRhLFByZVByb2Nlc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYWdlVW5sb2FkKHBhZ2U6U2hpeWlQYWdlQmFzZSk6dm9pZHtcclxuICAgICAgICB0aGlzLlJlbW92ZUJpbmRkaW5nKHBhZ2UpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3RvcmFnZURhdGE8RGF0YVQ+IGV4dGVuZHMgRGF0YTxEYXRhVD57XHJcbiAgICBwcm90ZWN0ZWQgU3RvcmFnZUtleTpzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhOkRhdGFULHN0b3JhZ2VLZXk6c3RyaW5nLF9nZXRGdW5jPzooZGF0YTpEYXRhVCk9PkRhdGFULF9zZXRGdW5jPzooZGF0YTpEYXRhVCk9PkRhdGFUKXtcclxuICAgICAgICBzdXBlcihkYXRhLF9nZXRGdW5jLF9zZXRGdW5jKTtcclxuICAgICAgICB0aGlzLlN0b3JhZ2VLZXk9c3RvcmFnZUtleTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0KCk6RGF0YVQge1xyXG4gICAgICAgIGxldCBkYXRhOkRhdGFUID0gd3guZ2V0U3RvcmFnZVN5bmModGhpcy5TdG9yYWdlS2V5KTtcclxuICAgICAgICBpZihkYXRhKXtcclxuICAgICAgICAgICAgaWYodGhpcy5fZ2V0RnVuYyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RnVuYyhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0KGRhdGE6RGF0YVQpe1xyXG4gICAgICAgIGlmKHRoaXMuX3NldEZ1bmMpe1xyXG4gICAgICAgICAgICBkYXRhPXRoaXMuX3NldEZ1bmMoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKHRoaXMuU3RvcmFnZUtleSxkYXRhKTtcclxuICAgICAgICB0aGlzLlJlZ2lzdGVyZWRCaW5kZGluZy5mb3JFYWNoKHBhZ2U9PntcclxuICAgICAgICAgICAgcGFnZS5PYnNlcnZlck5vdGlmeSh0aGlzLkRhdGFLZXksZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=