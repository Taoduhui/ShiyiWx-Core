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
var Task_1 = require("../../Task/Task");
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
            for (var i = 0; i < _this.RequestMiddlewareGroup.length; i++) {
                var res = _this.RequestMiddlewareGroup[i].Process(Body);
                if (res) {
                    Body = res;
                }
                else {
                    return;
                }
            }
            for (var i = 0; i < Api_Config_1.CustomRequestMiddleware.length; i++) {
                var res = Api_Config_1.CustomRequestMiddleware[i].Process(Body);
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
                    for (var i = 0; i < _this.ResponseMiddlewareGroup.length; i++) {
                        var CustomData_1 = _this.ResponseMiddlewareGroup[i].Process(res);
                        if (CustomData_1 == null) {
                            return;
                        }
                    }
                    for (var i = 0; i < Api_Config_1.CustomResponseMiddleware.length; i++) {
                        var CustomData_2 = Api_Config_1.CustomResponseMiddleware[i].Process(res);
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
                    (0, Utils_1.Debug)(3)({
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
}(Task_1.Task));
exports.ApiBase = ApiBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFwaUJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkNBQTBDO0FBSTFDLCtFQUFnSjtBQUVoSix3Q0FBdUM7QUFjdkM7SUFBcUQsMkJBQWE7SUFlOUQsaUJBQ0ksSUFBWSxFQUNaLFNBQTJCLEVBQzNCLFVBQTZCLEVBQzdCLFNBQW1DO1FBSnZDLFlBS0ksa0JBQU0sVUFBQyxJQUFJO1lBQ1AsSUFBSSxJQUFJLEdBQWU7Z0JBQ25CLE1BQU0sRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtnQkFDakMsR0FBRyxFQUFFLEtBQUksQ0FBQyxHQUFHO2dCQUNiLElBQUksRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDN0IsTUFBTSxFQUFFLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO2FBQ3BDLENBQUE7WUFHRCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFDakQsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkQsSUFBRyxHQUFHLEVBQUM7b0JBQ0gsSUFBSSxHQUFHLEdBQUcsQ0FBQztpQkFDZDtxQkFBSTtvQkFDRCxPQUFPO2lCQUNWO2FBQ0o7WUFJRCxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsb0NBQXVCLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUFDO2dCQUM3QyxJQUFJLEdBQUcsR0FBRyxvQ0FBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELElBQUcsR0FBRyxFQUFDO29CQUNILElBQUksR0FBRyxHQUFHLENBQUM7aUJBQ2Q7cUJBQUk7b0JBQ0QsT0FBTztpQkFDVjthQUNKO1lBR0QsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDUCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztnQkFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixPQUFPLEVBQUUsVUFBQSxHQUFHO29CQUNSLElBQUksVUFBOEIsQ0FBQztvQkFDbkMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7d0JBQ2xELElBQUksWUFBVSxHQUFHLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBbUIsQ0FBQyxDQUFDO3dCQUM5RSxJQUFHLFlBQVUsSUFBRSxJQUFJLEVBQUM7NEJBQ2hCLE9BQU87eUJBQ1Y7cUJBQ0o7b0JBQ0QsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLHFDQUF3QixDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQzt3QkFDOUMsSUFBSSxZQUFVLEdBQUcscUNBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQW1CLENBQUMsQ0FBQzt3QkFDMUUsSUFBRyxZQUFVLElBQUUsSUFBSSxFQUFDOzRCQUNoQixPQUFPO3lCQUNWO3FCQUNKO29CQUNELElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUE2QixDQUFDO29CQUNqRCxLQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDO29CQUMzQyxJQUFJLFVBQVUsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtvQkFDL0MsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDL0IsQ0FBQztnQkFDRCxJQUFJLEVBQUUsVUFBQSxHQUFHO29CQUNMLEVBQUUsQ0FBQyxTQUFTLENBQUM7d0JBQ1QsS0FBSyxFQUFDLE1BQU07d0JBQ1osSUFBSSxFQUFDLE9BQU87d0JBQ1osUUFBUSxFQUFDLElBQUk7cUJBQ2hCLENBQUMsQ0FBQTtvQkFDRixJQUFBLGFBQUssRUFBQyxDQUFDLENBQUMsQ0FBQzt3QkFDTCxHQUFHLEVBQUUsS0FBSSxDQUFDLEdBQUc7d0JBQ2IsR0FBRyxFQUFFLEdBQUc7cUJBQ1gsQ0FBQyxDQUFDO2dCQUNQLENBQUM7YUFDSixDQUFDLENBQUE7UUFDTixDQUFDLEVBQUMsSUFBSSxDQUFDLFNBTVY7UUE1Rk0sVUFBSSxHQUFXLGlCQUFJLENBQUM7UUFDcEIsU0FBRyxHQUFXLEVBQUUsQ0FBQztRQUdqQiw0QkFBc0IsR0FBMEIsRUFBRSxDQUFDO1FBQ25ELDZCQUF1QixHQUEyQixFQUFFLENBQUM7UUFrRnhELEtBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDNUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDMUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUM7UUFDNUIsS0FBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7O0lBRTlCLENBQUM7SUFNTSxzQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUFBLENBQUM7SUFDTixjQUFDO0FBQUQsQ0FBQyxBQXZHRCxDQUFxRCxXQUFJLEdBdUd4RDtBQXZHcUIsMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWJ1ZyB9IGZyb20gXCIuLi8uLi9VdGlscy9VdGlsc1wiO1xyXG5pbXBvcnQgVXRpbHMgPSByZXF1aXJlKFwiLi4vLi4vVXRpbHMvVXRpbHNcIik7XHJcbmltcG9ydCB7IFJlcXVlc3RNb2RlbEJhc2UgfSBmcm9tIFwiLi9SZXF1ZXN0TW9kZWxCYXNlXCI7XHJcbmltcG9ydCB7ICBSZXNwb25zZURhdGFNb2RlbEJhc2UsIFJlc3BvbnNlRXhjZXB0aW9uSGFuZGxlciwgUmVzcG9uc2VNb2RlbEJhc2UgfSBmcm9tIFwiLi9SZXNwb25zZU1vZGVsQmFzZVwiO1xyXG5pbXBvcnQgeyBDdXN0b21SZXF1ZXN0TWlkZGxld2FyZSwgQ3VzdG9tUmVzcERhdGFNb2RlbCwgQ3VzdG9tUmVzcG9uc2VNaWRkbGV3YXJlLCBIb3N0IH0gZnJvbSBcIkBSb290L1NoaXlpRnJhbWV3b3JrL0NvbmZpZy9BcGlDb25maWcvQXBpLkNvbmZpZ1wiO1xyXG5pbXBvcnQgeyBSZXF1ZXN0TWlkZGxld2FyZSwgUmVzcG9uc2VNaWRkbGV3YXJlLCBSZXNwb25zZVR5cGUgfSBmcm9tIFwiLi9NaWRkbGV3YXJlXCI7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vLi4vVGFzay9UYXNrXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVzZXRCb2R5e1xyXG4gICAgbWV0aG9kOiBcIk9QVElPTlNcIiB8IFwiR0VUXCIgfCBcIkhFQURcIiB8IFwiUE9TVFwiIHwgXCJQVVRcIiB8IFwiREVMRVRFXCIgfCBcIlRSQUNFXCIgfCBcIkNPTk5FQ1RcIiAsXHJcbiAgICB1cmw6IHN0cmluZyxcclxuICAgIGRhdGE6IFJlY29yZDxzdHJpbmcsYW55PixcclxuICAgIGhlYWRlcjogUmVjb3JkPHN0cmluZyxhbnk+LFxyXG59XHJcblxyXG4vKipcclxuICogU2hpeWlBcGnpnIDnu6fmib/oh6pBcGlCYXNlXHJcbiAqIOe7p+aJv0FwaUJhc2Xku4XpnIDopoHlrZDnsbvph43lhpnmnoTpgKDlh73mlbBcclxuICog5bCG55u45bqU55qETW9kZWzku6Xlj4rnu5PmnZ/kuovku7bkvKDlhaVBcGlCYXNlXHJcbiAqIOinhuaDheWGteWPr+mAieaYr+WQpuS8oOWFpeWklumDqOeahOe7k+adn+S6i+S7tue7meWtkOexuyovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBcGlCYXNlPFJlc3VsdFQgPSBhbnk+IGV4dGVuZHMgVGFzazxSZXN1bHRUPiB7XHJcbiAgICBwdWJsaWMgSG9zdDogc3RyaW5nID0gSG9zdDtcclxuICAgIHB1YmxpYyBVcmw6IHN0cmluZyA9IFwiXCI7Ly/lrozmlbRVcmxcclxuICAgIHB1YmxpYyBSZXFNb2RlbDogUmVxdWVzdE1vZGVsQmFzZTtcclxuICAgIHB1YmxpYyBSZXNwTW9kZWw6IFJlc3BvbnNlTW9kZWxCYXNlO1xyXG4gICAgcHVibGljIFJlcXVlc3RNaWRkbGV3YXJlR3JvdXA6QXJyYXk8UmVxdWVzdE1pZGRsZXdhcmU+PVtdO1xyXG4gICAgcHVibGljIFJlc3BvbnNlTWlkZGxld2FyZUdyb3VwOkFycmF5PFJlc3BvbnNlTWlkZGxld2FyZT49W107XHJcbiAgICBwdWJsaWMgUmVzcG9uZWQ6IChtb2RlbDogUmVzdWx0VCkgPT4gdm9pZDtcclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gX1VybCDor7fmsYLnmoRVcmzvvIxodHRwczovL2RvbWlhbjpwb3J0ICsgW19VcmxdXHJcbiAgICAgKiBAcGFyYW0gX1JlcU1vZGVsIFJlcXVlc3RNb2RlbO+8jOWumuS5ieS6hlJlcXVlc3TmiYDpnIDmlbDmja5cclxuICAgICAqIEBwYXJhbSBfUmVzcE1vZGVsIFJlc3BvbnNlTW9kZWzvvIzlrprkuYnkuoZSZXNwb25zZeWkhOeQhuaVsOaNrueahOaWueazlVxyXG4gICAgICogQHBhcmFtIF9SZXNwb25lZCDor7fmsYLlrozmiJDlkI7nmoTlpITnkIbkuovku7ZcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgX1VybDogc3RyaW5nLFxyXG4gICAgICAgIF9SZXFNb2RlbDogUmVxdWVzdE1vZGVsQmFzZSxcclxuICAgICAgICBfUmVzcE1vZGVsOiBSZXNwb25zZU1vZGVsQmFzZSxcclxuICAgICAgICBfUmVzcG9uZWQ6IChtb2RlbDogUmVzdWx0VCkgPT4gdm9pZCkge1xyXG4gICAgICAgIHN1cGVyKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBCb2R5OlJlcXVzZXRCb2R5ID0ge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiB0aGlzLlJlcU1vZGVsLkdldE1ldGhvZCgpLFxyXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLlVybCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuUmVxTW9kZWwuR2V0Qm9keSgpLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyOiB0aGlzLlJlcU1vZGVsLkdldEhlYWRlcigpLFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyNyZWdpb24gXCLkuKrkvZNBcGnkuK3pl7Tku7ZcIlxyXG4gICAgICAgICAgICBmb3IobGV0IGk9MDtpPHRoaXMuUmVxdWVzdE1pZGRsZXdhcmVHcm91cC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLlJlcXVlc3RNaWRkbGV3YXJlR3JvdXBbaV0uUHJvY2VzcyhCb2R5KTtcclxuICAgICAgICAgICAgICAgIGlmKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgQm9keSA9IHJlcztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIC8vI3JlZ2lvbiBcIuWFqOWxgOS4remXtOS7tlwiXHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8Q3VzdG9tUmVxdWVzdE1pZGRsZXdhcmUubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVzID0gQ3VzdG9tUmVxdWVzdE1pZGRsZXdhcmVbaV0uUHJvY2VzcyhCb2R5KTtcclxuICAgICAgICAgICAgICAgIGlmKHJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgQm9keSA9IHJlcztcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyNlbmRyZWdpb25cclxuXHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBCb2R5Lm1ldGhvZCxcclxuICAgICAgICAgICAgICAgIHVybDogQm9keS51cmwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBCb2R5LmRhdGEsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXI6IEJvZHkuaGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgQ3VzdG9tRGF0YTpDdXN0b21SZXNwRGF0YU1vZGVsO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8dGhpcy5SZXNwb25zZU1pZGRsZXdhcmVHcm91cC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IEN1c3RvbURhdGEgPSB0aGlzLlJlc3BvbnNlTWlkZGxld2FyZUdyb3VwW2ldLlByb2Nlc3MocmVzIGFzIFJlc3BvbnNlVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKEN1c3RvbURhdGE9PW51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8Q3VzdG9tUmVzcG9uc2VNaWRkbGV3YXJlLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgQ3VzdG9tRGF0YSA9IEN1c3RvbVJlc3BvbnNlTWlkZGxld2FyZVtpXS5Qcm9jZXNzKHJlcyBhcyBSZXNwb25zZVR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihDdXN0b21EYXRhPT1udWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgUmVzcERhdGEgPSByZXMuZGF0YSBhcyBSZXNwb25zZURhdGFNb2RlbEJhc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SZXNwTW9kZWwuU3RhdHVzQ29kZSA9IHJlcy5zdGF0dXNDb2RlO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBQYXJzZWREYXRhID0gdGhpcy5SZXNwTW9kZWwuUGFyc2UoUmVzcERhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5SZXNwb25lZChQYXJzZWREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrLl9jb250aW51ZShQYXJzZWREYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOifnvZHnu5zplJnor68nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOidlcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOjIwMDBcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIERlYnVnKDMpKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVXJsOiB0aGlzLlVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXNnOiByZXNcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LHRydWUpO1xyXG4gICAgICAgIHRoaXMuVXJsID0gdGhpcy5Ib3N0ICsgX1VybDtcclxuICAgICAgICB0aGlzLlJlcU1vZGVsID0gX1JlcU1vZGVsO1xyXG4gICAgICAgIHRoaXMuUmVzcE1vZGVsID0gX1Jlc3BNb2RlbDtcclxuICAgICAgICB0aGlzLlJlc3BvbmVkID0gX1Jlc3BvbmVkO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJp+ihjFJlcXVlc3QqL1xyXG4gICAgcHVibGljIEV4ZWMoKTogQXBpQmFzZTxSZXN1bHRUPiB7XHJcbiAgICAgICAgdGhpcy5SdW4oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbn0iXX0=