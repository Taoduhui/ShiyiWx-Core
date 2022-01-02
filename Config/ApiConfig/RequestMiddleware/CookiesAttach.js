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
exports.CookiesAttach = void 0;
var Middleware_1 = require("../../../../ShiyiFramework/ShiyiApi/Base/Middleware");
var Storage_Config_1 = require("../../StorageConfig/Storage.Config");
var CookiesAttach = (function (_super) {
    __extends(CookiesAttach, _super);
    function CookiesAttach() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CookiesAttach.prototype.ProcessAction = function (data) {
        var cookies = this.GetCookies();
        if (cookies != "") {
            data.header["cookie"] = cookies;
        }
        return data;
    };
    CookiesAttach.prototype.GetCookies = function () {
        var cookies = "";
        if (wx.getStorageSync(Storage_Config_1.StorageKey.Cookies)) {
            var cookiesMap = JSON.parse(wx.getStorageSync(Storage_Config_1.StorageKey.Cookies));
            var keys = Object.keys(cookiesMap);
            for (var i = 0; i < keys.length; i++) {
                cookies += keys[i] + "=" + cookiesMap[keys[i]] + ";";
            }
        }
        return cookies;
    };
    return CookiesAttach;
}(Middleware_1.RequestMiddleware));
exports.CookiesAttach = CookiesAttach;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29va2llc0F0dGFjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvb2tpZXNBdHRhY2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNEVBQWtGO0FBQ2xGLHFFQUFnRTtBQUVoRTtJQUFtQyxpQ0FBaUI7SUFBcEQ7O0lBb0JBLENBQUM7SUFuQmEscUNBQWEsR0FBdkIsVUFBd0IsSUFBaUI7UUFDckMsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hDLElBQUksT0FBTyxJQUFJLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVPLGtDQUFVLEdBQWxCO1FBQ0ksSUFBSSxPQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLElBQUksRUFBRSxDQUFDLGNBQWMsQ0FBQywyQkFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZDLElBQUksVUFBVSxHQUEyQixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsMkJBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNGLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFrQixDQUFDO1lBQ3BELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ3hEO1NBQ0o7UUFDRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBcEJELENBQW1DLDhCQUFpQixHQW9CbkQ7QUFwQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1c2V0Qm9keSB9IGZyb20gXCJAUm9vdC9TaGl5aUZyYW1ld29yay9TaGl5aUFwaS9CYXNlL0FwaUJhc2VcIjtcclxuaW1wb3J0IHsgUmVxdWVzdE1pZGRsZXdhcmUgfSBmcm9tIFwiQFJvb3QvU2hpeWlGcmFtZXdvcmsvU2hpeWlBcGkvQmFzZS9NaWRkbGV3YXJlXCI7XHJcbmltcG9ydCB7IFN0b3JhZ2VLZXkgfSBmcm9tIFwiLi4vLi4vU3RvcmFnZUNvbmZpZy9TdG9yYWdlLkNvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvb2tpZXNBdHRhY2ggZXh0ZW5kcyBSZXF1ZXN0TWlkZGxld2FyZXtcclxuICAgIHByb3RlY3RlZCBQcm9jZXNzQWN0aW9uKGRhdGE6IFJlcXVzZXRCb2R5KTogUmVxdXNldEJvZHkge1xyXG4gICAgICAgIGxldCBjb29raWVzOiBzdHJpbmcgPSB0aGlzLkdldENvb2tpZXMoKTtcclxuICAgICAgICBpZiAoY29va2llcyAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGRhdGEuaGVhZGVyW1wiY29va2llXCJdID0gY29va2llcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgR2V0Q29va2llcygpIHtcclxuICAgICAgICBsZXQgY29va2llczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBpZiAod3guZ2V0U3RvcmFnZVN5bmMoU3RvcmFnZUtleS5Db29raWVzKSkge1xyXG4gICAgICAgICAgICBsZXQgY29va2llc01hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IEpTT04ucGFyc2Uod3guZ2V0U3RvcmFnZVN5bmMoU3RvcmFnZUtleS5Db29raWVzKSk7XHJcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMoY29va2llc01hcCkgYXMgQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb29raWVzICs9IGtleXNbaV0gKyBcIj1cIiArIGNvb2tpZXNNYXBba2V5c1tpXV0gKyBcIjtcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29va2llcztcclxuICAgIH1cclxufSJdfQ==