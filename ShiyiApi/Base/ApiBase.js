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
exports.ApiBase = void 0;
var Utils_1 = require("../../Utils/Utils");
var Api_Config_1 = require("../../../ShiyiFramework/Config/ApiConfig/Api.Config");
var ApiBase = (function (_super) {
    __extends(ApiBase, _super);
    function ApiBase(_Url, _ReqModel, _RespModel, _Responed) {
        var _this = _super.call(this, function (task) {
            var Body = {
                method: _this.ReqModel.GetMethod(),
                url: _this.Url,
                data: _this.ReqModel.GetBody(),
                header: _this.ReqModel.GetHeader(),
            };
            for (var i = 0; i < Api_Config_1.CustomRequestMiddleware.length; i++) {
                var res = Api_Config_1.CustomRequestMiddleware[i].Process(Body);
                if (res) {
                    Body = res;
                }
                else {
                    return;
                }
            }
            for (var i = 0; i < _this.RequestMiddlewareGroup.length; i++) {
                var res = _this.RequestMiddlewareGroup[i].Process(Body);
                if (res) {
                    Body = res;
                }
                else {
                    return;
                }
            }
            wx.request({
                method: Body.method,
                url: Body.url,
                data: Body.data,
                header: Body.header,
                success: function (res) {
                    var CustomData;
                    for (var i = 0; i < Api_Config_1.CustomResponseMiddleware.length; i++) {
                        var CustomData_1 = Api_Config_1.CustomResponseMiddleware[i].Process(res);
                        if (CustomData_1 == null) {
                            return;
                        }
                    }
                    for (var i = 0; i < _this.ResponseMiddlewareGroup.length; i++) {
                        var CustomData_2 = _this.ResponseMiddlewareGroup[i].Process(res);
                        if (CustomData_2 == null) {
                            return;
                        }
                    }
                    var RespData = res.data;
                    _this.RespModel.StatusCode = res.statusCode;
                    var ParsedData = _this.RespModel.Parse(RespData);
                    _this.Responed(ParsedData);
                    task._continue(ParsedData);
                },
                fail: function (res) {
                    wx.showToast({
                        title: '网络错误',
                        icon: 'error',
                        duration: 2000
                    });
                    console.log({
                        Url: _this.Url,
                        Msg: res
                    });
                }
            });
        }, true) || this;
        _this.Host = Api_Config_1.Host;
        _this.Url = "";
        _this.RequestMiddlewareGroup = [];
        _this.ResponseMiddlewareGroup = [];
        _this.Url = _this.Host + _Url;
        _this.ReqModel = _ReqModel;
        _this.RespModel = _RespModel;
        _this.Responed = _Responed;
        return _this;
    }
    ApiBase.prototype.Exec = function () {
        this.Run();
        return this;
    };
    ;
    return ApiBase;
}(Utils_1.Task));
exports.ApiBase = ApiBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFwaUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXlDO0FBSXpDLCtFQUFnSjtBQWVoSjtJQUFxRCwyQkFBYTtJQWU5RCxpQkFDSSxJQUFZLEVBQ1osU0FBMkIsRUFDM0IsVUFBNkIsRUFDN0IsU0FBbUM7UUFKdkMsWUFLSSxrQkFBTSxVQUFDLElBQUk7WUFDUCxJQUFJLElBQUksR0FBZTtnQkFDbkIsTUFBTSxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO2dCQUNqQyxHQUFHLEVBQUUsS0FBSSxDQUFDLEdBQUc7Z0JBQ2IsSUFBSSxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO2dCQUM3QixNQUFNLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7YUFDcEMsQ0FBQTtZQUVELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxvQ0FBdUIsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7Z0JBQzdDLElBQUksR0FBRyxHQUFHLG9DQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbkQsSUFBRyxHQUFHLEVBQUM7b0JBQ0gsSUFBSSxHQUFHLEdBQUcsQ0FBQztpQkFDZDtxQkFBSTtvQkFDRCxPQUFPO2lCQUNWO2FBQ0o7WUFDRCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFDakQsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkQsSUFBRyxHQUFHLEVBQUM7b0JBQ0gsSUFBSSxHQUFHLEdBQUcsQ0FBQztpQkFDZDtxQkFBSTtvQkFDRCxPQUFPO2lCQUNWO2FBQ0o7WUFFRCxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNQLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUNiLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE9BQU8sRUFBRSxVQUFBLEdBQUc7b0JBQ1IsSUFBSSxVQUE4QixDQUFDO29CQUNuQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMscUNBQXdCLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO3dCQUM5QyxJQUFJLFlBQVUsR0FBRyxxQ0FBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBbUIsQ0FBQyxDQUFDO3dCQUMxRSxJQUFHLFlBQVUsSUFBRSxJQUFJLEVBQUM7NEJBQ2hCLE9BQU87eUJBQ1Y7cUJBQ0o7b0JBQ0QsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7d0JBQ2xELElBQUksWUFBVSxHQUFHLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBbUIsQ0FBQyxDQUFDO3dCQUM5RSxJQUFHLFlBQVUsSUFBRSxJQUFJLEVBQUM7NEJBQ2hCLE9BQU87eUJBQ1Y7cUJBQ0o7b0JBQ0QsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQTZCLENBQUM7b0JBQ2pELEtBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7b0JBQzNDLElBQUksVUFBVSxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUMvQyxLQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUMvQixDQUFDO2dCQUNELElBQUksRUFBRSxVQUFBLEdBQUc7b0JBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQzt3QkFDVCxLQUFLLEVBQUMsTUFBTTt3QkFDWixJQUFJLEVBQUMsT0FBTzt3QkFDWixRQUFRLEVBQUMsSUFBSTtxQkFDaEIsQ0FBQyxDQUFBO29CQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUM7d0JBQ1IsR0FBRyxFQUFFLEtBQUksQ0FBQyxHQUFHO3dCQUNiLEdBQUcsRUFBRSxHQUFHO3FCQUNYLENBQUMsQ0FBQztnQkFDUCxDQUFDO2FBQ0osQ0FBQyxDQUFBO1FBQ04sQ0FBQyxFQUFDLElBQUksQ0FBQyxTQU1WO1FBdkZNLFVBQUksR0FBVyxpQkFBSSxDQUFDO1FBQ3BCLFNBQUcsR0FBVyxFQUFFLENBQUM7UUFHakIsNEJBQXNCLEdBQTBCLEVBQUUsQ0FBQztRQUNuRCw2QkFBdUIsR0FBMkIsRUFBRSxDQUFDO1FBNkV4RCxLQUFJLENBQUMsR0FBRyxHQUFHLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQzVCLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO1FBQzVCLEtBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDOztJQUU5QixDQUFDO0lBTU0sc0JBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFBQSxDQUFDO0lBQ04sY0FBQztBQUFELENBQUMsQUFsR0QsQ0FBcUQsWUFBSSxHQWtHeEQ7QUFsR3FCLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuLi8uLi9VdGlscy9VdGlsc1wiO1xyXG5pbXBvcnQgVXRpbHMgPSByZXF1aXJlKFwiLi4vLi4vVXRpbHMvVXRpbHNcIik7XHJcbmltcG9ydCB7IFJlcXVlc3RNb2RlbEJhc2UgfSBmcm9tIFwiLi9SZXF1ZXN0TW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7ICBSZXNwb25zZURhdGFNb2RlbEJhc2UsIFJlc3BvbnNlRXhjZXB0aW9uSGFuZGxlciwgUmVzcG9uc2VNb2RlbEJhc2UgfSBmcm9tIFwiLi9SZXNwb25zZU1vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBDdXN0b21SZXF1ZXN0TWlkZGxld2FyZSwgQ3VzdG9tUmVzcERhdGFNb2RlbCwgQ3VzdG9tUmVzcG9uc2VNaWRkbGV3YXJlLCBIb3N0IH0gZnJvbSBcIkBSb290L1NoaXlpRnJhbWV3b3JrL0NvbmZpZy9BcGlDb25maWcvQXBpLkNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBSZXF1ZXN0TWlkZGxld2FyZSwgUmVzcG9uc2VNaWRkbGV3YXJlLCBSZXNwb25zZVR5cGUgfSBmcm9tIFwiLi9NaWRkbGV3YXJlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVzZXRCb2R5e1xyXG4gICAgbWV0aG9kOiBcIk9QVElPTlNcIiB8IFwiR0VUXCIgfCBcIkhFQURcIiB8IFwiUE9TVFwiIHwgXCJQVVRcIiB8IFwiREVMRVRFXCIgfCBcIlRSQUNFXCIgfCBcIkNPTk5FQ1RcIiAsXHJcbiAgICB1cmw6IHN0cmluZyxcclxuICAgIGRhdGE6IFJlY29yZDxzdHJpbmcsYW55PixcclxuICAgIGhlYWRlcjogUmVjb3JkPHN0cmluZyxhbnk+LFxyXG59XHJcblxyXG4vKipcclxuICogU2hpeWlBcGnpnIDnu6fmib/oh6pBcGlCYXNlXHJcbiAqIOe7p+aJv0FwaUJhc2Xku4XpnIDopoHlrZDnsbvph43lhpnmnoTpgKDlh73mlbBcclxuICog5bCG55u45bqU55qETW9kZWzku6Xlj4rnu5PmnZ/kuovku7bkvKDlhaVBcGlCYXNlXHJcbiAqIOinhuaDheWGteWPr+mAieaYr+WQpuS8oOWFpeWklumDqOeahOe7k+adn+S6i+S7tue7meWtkOexuyovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcGlCYXNlPFJlc3VsdFQgPSBhbnk+IGV4dGVuZHMgVGFzazxSZXN1bHRUPiB7XHJcbiAgICBwdWJsaWMgSG9zdDogc3RyaW5nID0gSG9zdDtcclxuICAgIHB1YmxpYyBVcmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgUmVxTW9kZWw6IFJlcXVlc3RNb2RlbEJhc2U7XHJcbiAgICBwdWJsaWMgUmVzcE1vZGVsOiBSZXNwb25zZU1vZGVsQmFzZTtcclxuICAgIHB1YmxpYyBSZXF1ZXN0TWlkZGxld2FyZUdyb3VwOkFycmF5PFJlcXVlc3RNaWRkbGV3YXJlPj1bXTtcclxuICAgIHB1YmxpYyBSZXNwb25zZU1pZGRsZXdhcmVHcm91cDpBcnJheTxSZXNwb25zZU1pZGRsZXdhcmU+PVtdO1xyXG4gICAgcHVibGljIFJlc3BvbmVkOiAobW9kZWw6IFJlc3VsdFQpID0+IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIF9Vcmwg6K+35rGC55qEVXJs77yMaHR0cHM6Ly9kb21pYW46cG9ydCArIFtfVXJsXVxyXG4gICAgICogQHBhcmFtIF9SZXFNb2RlbCBSZXF1ZXN0TW9kZWzvvIzlrprkuYnkuoZSZXF1ZXN05omA6ZyA5pWw5o2uXHJcbiAgICAgKiBAcGFyYW0gX1Jlc3BNb2RlbCBSZXNwb25zZU1vZGVs77yM5a6a5LmJ5LqGUmVzcG9uc2XlpITnkIbmlbDmja7nmoTmlrnms5VcclxuICAgICAqIEBwYXJhbSBfUmVzcG9uZWQg6K+35rGC5a6M5oiQ5ZCO55qE5aSE55CG5LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIF9Vcmw6IHN0cmluZyxcclxuICAgICAgICBfUmVxTW9kZWw6IFJlcXVlc3RNb2RlbEJhc2UsXHJcbiAgICAgICAgX1Jlc3BNb2RlbDogUmVzcG9uc2VNb2RlbEJhc2UsXHJcbiAgICAgICAgX1Jlc3BvbmVkOiAobW9kZWw6IFJlc3VsdFQpID0+IHZvaWQpIHtcclxuICAgICAgICBzdXBlcigodGFzaykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgQm9keTpSZXF1c2V0Qm9keSA9IHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogdGhpcy5SZXFNb2RlbC5HZXRNZXRob2QoKSxcclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy5VcmwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLlJlcU1vZGVsLkdldEJvZHkoKSxcclxuICAgICAgICAgICAgICAgIGhlYWRlcjogdGhpcy5SZXFNb2RlbC5HZXRIZWFkZXIoKSxcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxDdXN0b21SZXF1ZXN0TWlkZGxld2FyZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSBDdXN0b21SZXF1ZXN0TWlkZGxld2FyZVtpXS5Qcm9jZXNzKEJvZHkpO1xyXG4gICAgICAgICAgICAgICAgaWYocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICBCb2R5ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5SZXF1ZXN0TWlkZGxld2FyZUdyb3VwLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcyA9IHRoaXMuUmVxdWVzdE1pZGRsZXdhcmVHcm91cFtpXS5Qcm9jZXNzKEJvZHkpO1xyXG4gICAgICAgICAgICAgICAgaWYocmVzKXtcclxuICAgICAgICAgICAgICAgICAgICBCb2R5ID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogQm9keS5tZXRob2QsXHJcbiAgICAgICAgICAgICAgICB1cmw6IEJvZHkudXJsLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogQm9keS5kYXRhLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiBCb2R5LmhlYWRlcixcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IEN1c3RvbURhdGE6Q3VzdG9tUmVzcERhdGFNb2RlbDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPEN1c3RvbVJlc3BvbnNlTWlkZGxld2FyZS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IEN1c3RvbURhdGEgPSBDdXN0b21SZXNwb25zZU1pZGRsZXdhcmVbaV0uUHJvY2VzcyhyZXMgYXMgUmVzcG9uc2VUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoQ3VzdG9tRGF0YT09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTx0aGlzLlJlc3BvbnNlTWlkZGxld2FyZUdyb3VwLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgQ3VzdG9tRGF0YSA9IHRoaXMuUmVzcG9uc2VNaWRkbGV3YXJlR3JvdXBbaV0uUHJvY2VzcyhyZXMgYXMgUmVzcG9uc2VUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoQ3VzdG9tRGF0YT09bnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFJlc3BEYXRhID0gcmVzLmRhdGEgYXMgUmVzcG9uc2VEYXRhTW9kZWxCYXNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmVzcE1vZGVsLlN0YXR1c0NvZGUgPSByZXMuc3RhdHVzQ29kZTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgUGFyc2VkRGF0YSA9IHRoaXMuUmVzcE1vZGVsLlBhcnNlKFJlc3BEYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuUmVzcG9uZWQoUGFyc2VkRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFzay5fY29udGludWUoUGFyc2VkRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTon572R57uc6ZSZ6K+vJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjonZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjoyMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVybDogdGhpcy5VcmwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE1zZzogcmVzXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSx0cnVlKTtcclxuICAgICAgICB0aGlzLlVybCA9IHRoaXMuSG9zdCArIF9Vcmw7XHJcbiAgICAgICAgdGhpcy5SZXFNb2RlbCA9IF9SZXFNb2RlbDtcclxuICAgICAgICB0aGlzLlJlc3BNb2RlbCA9IF9SZXNwTW9kZWw7XHJcbiAgICAgICAgdGhpcy5SZXNwb25lZCA9IF9SZXNwb25lZDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiafooYxSZXF1ZXN0Ki9cclxuICAgIHB1YmxpYyBFeGVjKCk6IEFwaUJhc2U8UmVzdWx0VD4ge1xyXG4gICAgICAgIHRoaXMuUnVuKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG59Il19