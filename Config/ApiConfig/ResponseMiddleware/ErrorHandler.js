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
exports.ErrorHandler = exports.ResponseCode = void 0;
var Middleware_1 = require("../../../../ShiyiFramework/ShiyiApi/Base/Middleware");
exports.ResponseCode = {
    NetError: 9999,
    Notification: 9998,
    Ok: 1000,
    CodeInvalidParam: 1001,
    CodeUserExist: 1002,
    CodeUserNotExist: 1003,
    CodeInvalidPassword: 1004,
    CodeServerBusy: 1005,
    CodeNeedLogin: 1006,
    CodeInvalidToken: 1007,
    CodeHasRelation: 1008
};
var ErrorHandler = (function (_super) {
    __extends(ErrorHandler, _super);
    function ErrorHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorHandler.prototype.ProcessAction = function (data) {
        var body = data.data;
        if (body.notification) {
            var NotifyStr_1 = "";
            body.notification.forEach(function (value) {
                NotifyStr_1 += value + "\n";
            });
            wx.showModal({
                content: NotifyStr_1
            });
        }
        if (body.code != exports.ResponseCode.Ok) {
            if (body.code == exports.ResponseCode.CodeInvalidToken || body.code == exports.ResponseCode.CodeNeedLogin) {
                wx.showToast({ title: "登录信息失效,请重新启动程序", icon: "error", duration: 2000 });
            }
            else if (body.code == exports.ResponseCode.CodeServerBusy) {
                wx.showToast({ title: "服务繁忙", icon: "error", duration: 2000 });
            }
            else if (body.code == exports.ResponseCode.CodeInvalidParam) {
                wx.showToast({ title: "参数错误", icon: "error", duration: 2000 });
            }
            this.Block();
        }
        return data;
    };
    return ErrorHandler;
}(Middleware_1.ResponseMiddleware));
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXJyb3JIYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRXJyb3JIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRFQUFpRztBQUVwRixRQUFBLFlBQVksR0FBQztJQUN0QixRQUFRLEVBQUMsSUFBSTtJQUNiLFlBQVksRUFBQyxJQUFJO0lBQ2pCLEVBQUUsRUFBQyxJQUFJO0lBQ1AsZ0JBQWdCLEVBQUMsSUFBSTtJQUNyQixhQUFhLEVBQUMsSUFBSTtJQUNsQixnQkFBZ0IsRUFBQyxJQUFJO0lBQ3JCLG1CQUFtQixFQUFDLElBQUk7SUFDeEIsY0FBYyxFQUFDLElBQUk7SUFDbkIsYUFBYSxFQUFDLElBQUk7SUFDbEIsZ0JBQWdCLEVBQUMsSUFBSTtJQUNyQixlQUFlLEVBQUMsSUFBSTtDQUN2QixDQUFBO0FBRUQ7SUFBa0MsZ0NBQWtCO0lBQXBEOztJQTBCQSxDQUFDO0lBekJhLG9DQUFhLEdBQXZCLFVBQXdCLElBQWtCO1FBQ3RDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLElBQUksV0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUs7Z0JBQzNCLFdBQVMsSUFBRSxLQUFLLEdBQUMsSUFBSSxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDVCxPQUFPLEVBQUMsV0FBUzthQUNwQixDQUFDLENBQUE7U0FFTDtRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxvQkFBWSxDQUFDLEVBQUUsRUFBRTtZQUM5QixJQUFHLElBQUksQ0FBQyxJQUFJLElBQUUsb0JBQVksQ0FBQyxnQkFBZ0IsSUFBRSxJQUFJLENBQUMsSUFBSSxJQUFFLG9CQUFZLENBQUMsYUFBYSxFQUFDO2dCQUMvRSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUMsS0FBSyxFQUFDLGdCQUFnQixFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7YUFDckU7aUJBQUssSUFBRyxJQUFJLENBQUMsSUFBSSxJQUFFLG9CQUFZLENBQUMsY0FBYyxFQUFDO2dCQUM1QyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2FBQzNEO2lCQUFLLElBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxvQkFBWSxDQUFDLGdCQUFnQixFQUFDO2dCQUM5QyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVMLG1CQUFDO0FBQUQsQ0FBQyxBQTFCRCxDQUFrQywrQkFBa0IsR0EwQm5EO0FBMUJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzcG9uc2VNaWRkbGV3YXJlLCBSZXNwb25zZVR5cGUgfSBmcm9tIFwiQFJvb3QvU2hpeWlGcmFtZXdvcmsvU2hpeWlBcGkvQmFzZS9NaWRkbGV3YXJlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgUmVzcG9uc2VDb2RlPXtcclxuICAgIE5ldEVycm9yOjk5OTksXHJcbiAgICBOb3RpZmljYXRpb246OTk5OCxcclxuICAgIE9rOjEwMDAsXHJcbiAgICBDb2RlSW52YWxpZFBhcmFtOjEwMDEsXHJcbiAgICBDb2RlVXNlckV4aXN0OjEwMDIsXHJcbiAgICBDb2RlVXNlck5vdEV4aXN0OjEwMDMsXHJcbiAgICBDb2RlSW52YWxpZFBhc3N3b3JkOjEwMDQsXHJcbiAgICBDb2RlU2VydmVyQnVzeToxMDA1LFxyXG4gICAgQ29kZU5lZWRMb2dpbjoxMDA2LFxyXG4gICAgQ29kZUludmFsaWRUb2tlbjoxMDA3LFxyXG4gICAgQ29kZUhhc1JlbGF0aW9uOjEwMDhcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEVycm9ySGFuZGxlciBleHRlbmRzIFJlc3BvbnNlTWlkZGxld2FyZXtcclxuICAgIHByb3RlY3RlZCBQcm9jZXNzQWN0aW9uKGRhdGE6IFJlc3BvbnNlVHlwZSk6IFJlc3BvbnNlVHlwZSB7XHJcbiAgICAgICAgbGV0IGJvZHkgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgaWYgKGJvZHkubm90aWZpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIGxldCBOb3RpZnlTdHIgPSBcIlwiO1xyXG4gICAgICAgICAgICBib2R5Lm5vdGlmaWNhdGlvbi5mb3JFYWNoKHZhbHVlPT57XHJcbiAgICAgICAgICAgICAgICBOb3RpZnlTdHIrPXZhbHVlK1wiXFxuXCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50Ok5vdGlmeVN0clxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJvZHkuY29kZSAhPSBSZXNwb25zZUNvZGUuT2spIHtcclxuICAgICAgICAgICAgaWYoYm9keS5jb2RlPT1SZXNwb25zZUNvZGUuQ29kZUludmFsaWRUb2tlbnx8Ym9keS5jb2RlPT1SZXNwb25zZUNvZGUuQ29kZU5lZWRMb2dpbil7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOlwi55m75b2V5L+h5oGv5aSx5pWILOivt+mHjeaWsOWQr+WKqOeoi+W6j1wiLGljb246XCJlcnJvclwiLGR1cmF0aW9uOjIwMDB9KTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoYm9keS5jb2RlPT1SZXNwb25zZUNvZGUuQ29kZVNlcnZlckJ1c3kpe1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHt0aXRsZTpcIuacjeWKoee5geW/mVwiLGljb246XCJlcnJvclwiLGR1cmF0aW9uOjIwMDB9KTtcclxuICAgICAgICAgICAgfWVsc2UgaWYoYm9keS5jb2RlPT1SZXNwb25zZUNvZGUuQ29kZUludmFsaWRQYXJhbSl7XHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe3RpdGxlOlwi5Y+C5pWw6ZSZ6K+vXCIsaWNvbjpcImVycm9yXCIsZHVyYXRpb246MjAwMH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuQmxvY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbiAgICBcclxufSJdfQ==