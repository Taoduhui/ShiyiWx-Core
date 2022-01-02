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
exports.Cookies = void 0;
var Middleware_1 = require("../../../../ShiyiFramework/ShiyiApi/Base/Middleware");
var Utils_1 = require("../../../../ShiyiFramework/Utils/Utils");
var Cookies = (function (_super) {
    __extends(Cookies, _super);
    function Cookies() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cookies.prototype.ProcessAction = function (data) {
        (0, Utils_1.SaveCookies)(data.cookies);
        return data;
    };
    return Cookies;
}(Middleware_1.ResponseMiddleware));
exports.Cookies = Cookies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29va2llcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvb2tpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQWlHO0FBQ2pHLDBEQUErRDtBQUcvRDtJQUE2QiwyQkFBa0I7SUFBL0M7O0lBS0EsQ0FBQztJQUphLCtCQUFhLEdBQXZCLFVBQXdCLElBQWtCO1FBQ3RDLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLEFBTEQsQ0FBNkIsK0JBQWtCLEdBSzlDO0FBTFksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNwb25zZU1pZGRsZXdhcmUsIFJlc3BvbnNlVHlwZSB9IGZyb20gXCJAUm9vdC9TaGl5aUZyYW1ld29yay9TaGl5aUFwaS9CYXNlL01pZGRsZXdhcmVcIjtcclxuaW1wb3J0IHsgU2F2ZUNvb2tpZXMgfSBmcm9tIFwiQFJvb3QvU2hpeWlGcmFtZXdvcmsvVXRpbHMvVXRpbHNcIjtcclxuaW1wb3J0IHsgQ3VzdG9tUmVzcERhdGFNb2RlbCB9IGZyb20gXCIuLi9BcGkuQ29uZmlnXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29va2llcyBleHRlbmRzIFJlc3BvbnNlTWlkZGxld2FyZXtcclxuICAgIHByb3RlY3RlZCBQcm9jZXNzQWN0aW9uKGRhdGE6IFJlc3BvbnNlVHlwZSk6IFJlc3BvbnNlVHlwZSB7XHJcbiAgICAgICAgU2F2ZUNvb2tpZXMoZGF0YS5jb29raWVzKTtcclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxufSJdfQ==