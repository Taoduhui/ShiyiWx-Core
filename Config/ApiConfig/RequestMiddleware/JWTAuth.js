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
exports.JWTAuth = void 0;
var GlobalData_1 = require("../../../../GlobalData/GlobalData");
var Middleware_1 = require("../../../../ShiyiFramework/ShiyiApi/Base/Middleware");
var JWTAuth = (function (_super) {
    __extends(JWTAuth, _super);
    function JWTAuth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JWTAuth.prototype.ProcessAction = function (data) {
        var Token = GlobalData_1.GlobalData.Token.Get();
        if (Token) {
            data.header["Authorization"] = "Bearer " + Token;
        }
        data.header["Content-Type"] = "application/json";
        return data;
    };
    return JWTAuth;
}(Middleware_1.RequestMiddleware));
exports.JWTAuth = JWTAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSldUQXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkpXVEF1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMERBQXlEO0FBRXpELDRFQUFrRjtBQUVsRjtJQUE2QiwyQkFBaUI7SUFBOUM7O0lBU0EsQ0FBQztJQVJhLCtCQUFhLEdBQXZCLFVBQXdCLElBQWlCO1FBQ3JDLElBQUksS0FBSyxHQUFHLHVCQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ25DLElBQUcsS0FBSyxFQUFDO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQ2xEO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBQyxrQkFBa0IsQ0FBQztRQUMvQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsY0FBQztBQUFELENBQUMsQUFURCxDQUE2Qiw4QkFBaUIsR0FTN0M7QUFUWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdsb2JhbERhdGEgfSBmcm9tIFwiQFJvb3QvR2xvYmFsRGF0YS9HbG9iYWxEYXRhXCI7XHJcbmltcG9ydCB7IFJlcXVzZXRCb2R5IH0gZnJvbSBcIkBSb290L1NoaXlpRnJhbWV3b3JrL1NoaXlpQXBpL0Jhc2UvQXBpQmFzZVwiO1xyXG5pbXBvcnQgeyBSZXF1ZXN0TWlkZGxld2FyZSB9IGZyb20gXCJAUm9vdC9TaGl5aUZyYW1ld29yay9TaGl5aUFwaS9CYXNlL01pZGRsZXdhcmVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBKV1RBdXRoIGV4dGVuZHMgUmVxdWVzdE1pZGRsZXdhcmV7XHJcbiAgICBwcm90ZWN0ZWQgUHJvY2Vzc0FjdGlvbihkYXRhOiBSZXF1c2V0Qm9keSk6IFJlcXVzZXRCb2R5IHtcclxuICAgICAgICBsZXQgVG9rZW4gPSBHbG9iYWxEYXRhLlRva2VuLkdldCgpO1xyXG4gICAgICAgIGlmKFRva2VuKXtcclxuICAgICAgICAgICAgZGF0YS5oZWFkZXJbXCJBdXRob3JpemF0aW9uXCJdPVwiQmVhcmVyIFwiICsgVG9rZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEuaGVhZGVyW1wiQ29udGVudC1UeXBlXCJdPVwiYXBwbGljYXRpb24vanNvblwiO1xyXG4gICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfVxyXG59Il19