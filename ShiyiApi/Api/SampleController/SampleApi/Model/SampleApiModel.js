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
exports.SampleRespModel = exports.SampleReqModel = void 0;
var ErrorHandler_1 = require("../../../../../../ShiyiFramework/Config/ApiConfig/ResponseMiddleware/ErrorHandler");
var RequestModelBase_1 = require("../../../../Base/RequestModelBase");
var ResponseModelBase_1 = require("../../../../Base/ResponseModelBase");
var SampleReqModel = (function (_super) {
    __extends(SampleReqModel, _super);
    function SampleReqModel(id) {
        var _this = _super.call(this) || this;
        _this.Id = id;
        return _this;
    }
    SampleReqModel.prototype.GetMethod = function () {
        return "GET";
    };
    SampleReqModel.prototype.GetBody = function () {
        return {
            id: this.Id,
        };
    };
    return SampleReqModel;
}(RequestModelBase_1.RequestModelBase));
exports.SampleReqModel = SampleReqModel;
var SampleRespModel = (function (_super) {
    __extends(SampleRespModel, _super);
    function SampleRespModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.IsOk = false;
        return _this;
    }
    SampleRespModel.prototype.Parse = function (data) {
        this.IsOk = data.code == ErrorHandler_1.ResponseCode.Ok;
        return this;
    };
    return SampleRespModel;
}(ResponseModelBase_1.ResponseModelBase));
exports.SampleRespModel = SampleRespModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FtcGxlQXBpTW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTYW1wbGVBcGlNb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzR0FBcUc7QUFDckcsc0VBQXFFO0FBQ3JFLHdFQUErRjtBQUcvRjtJQUFvQyxrQ0FBZ0I7SUFFaEQsd0JBQVksRUFBUztRQUFyQixZQUNJLGlCQUFPLFNBRVY7UUFERyxLQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQzs7SUFDakIsQ0FBQztJQUNNLGtDQUFTLEdBQWhCO1FBQ0ksT0FBTyxLQUFLLENBQUE7SUFDcEIsQ0FBQztJQUNVLGdDQUFPLEdBQWQ7UUFDSSxPQUFPO1lBQ0gsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ2QsQ0FBQztJQUNOLENBQUM7SUFFTCxxQkFBQztBQUFELENBQUMsQUFmRCxDQUFvQyxtQ0FBZ0IsR0FlbkQ7QUFmWSx3Q0FBYztBQXFCM0I7SUFBcUMsbUNBQWlCO0lBQXREO1FBQUEscUVBUUM7UUFOVSxVQUFJLEdBQVcsS0FBSyxDQUFDOztJQU1oQyxDQUFDO0lBTFUsK0JBQUssR0FBWixVQUFhLElBQXVCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSwyQkFBWSxDQUFDLEVBQUUsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUwsc0JBQUM7QUFBRCxDQUFDLEFBUkQsQ0FBcUMscUNBQWlCLEdBUXJEO0FBUlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNwb25zZUNvZGUgfSBmcm9tIFwiQFJvb3QvU2hpeWlGcmFtZXdvcmsvQ29uZmlnL0FwaUNvbmZpZy9SZXNwb25zZU1pZGRsZXdhcmUvRXJyb3JIYW5kbGVyXCI7XHJcbmltcG9ydCB7IFJlcXVlc3RNb2RlbEJhc2UgfSBmcm9tIFwiLi4vLi4vLi4vLi4vQmFzZS9SZXF1ZXN0TW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7ICBSZXNwb25zZURhdGFNb2RlbEJhc2UsIFJlc3BvbnNlTW9kZWxCYXNlIH0gZnJvbSBcIi4uLy4uLy4uLy4uL0Jhc2UvUmVzcG9uc2VNb2RlbEJhc2VcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU2FtcGxlUmVxTW9kZWwgZXh0ZW5kcyBSZXF1ZXN0TW9kZWxCYXNlIHtcclxuICAgIHByaXZhdGUgSWQ6bnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoaWQ6bnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLklkID0gaWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgR2V0TWV0aG9kKCk6IFwiT1BUSU9OU1wiIHwgXCJHRVRcIiB8IFwiSEVBRFwiIHwgXCJQT1NUXCIgfCBcIlBVVFwiIHwgXCJERUxFVEVcIiB8IFwiVFJBQ0VcIiB8IFwiQ09OTkVDVFwiICB7XHJcbiAgICAgICAgcmV0dXJuIFwiR0VUXCJcclxufVxyXG4gICAgcHVibGljIEdldEJvZHkoKTogUmVjb3JkPHN0cmluZywgYW55PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6IHRoaXMuSWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2FtcGxlQXBpUmVzcERhdGEgZXh0ZW5kcyBSZXNwb25zZURhdGFNb2RlbEJhc2V7XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU2FtcGxlUmVzcE1vZGVsIGV4dGVuZHMgUmVzcG9uc2VNb2RlbEJhc2Uge1xyXG5cclxuICAgIHB1YmxpYyBJc09rOmJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBQYXJzZShkYXRhOiBTYW1wbGVBcGlSZXNwRGF0YSkge1xyXG4gICAgICAgIHRoaXMuSXNPayA9IGRhdGEuY29kZSA9PSBSZXNwb25zZUNvZGUuT2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBcclxufSJdfQ==