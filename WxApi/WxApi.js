"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WxApi = void 0;
var Utils_1 = require("../Utils/Utils");
var WxApi = (function () {
    function WxApi() {
    }
    WxApi.Login = function () {
        var task = new Utils_1.Task(function (task) {
            wx.login({
                success: function (res) {
                    task.Continue(res.code);
                }
            });
        }, true);
        return task;
    };
    return WxApi;
}());
exports.WxApi = WxApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3hBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXeEFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBc0M7QUFFdEM7SUFBQTtJQVlBLENBQUM7SUFWaUIsV0FBSyxHQUFuQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksWUFBSSxDQUFTLFVBQUMsSUFBSTtZQUM3QixFQUFFLENBQUMsS0FBSyxDQUFDO2dCQUNMLE9BQU8sRUFBRSxVQUFDLEdBQUc7b0JBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLENBQUM7YUFDSixDQUFDLENBQUE7UUFDTixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL1V0aWxzL1V0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV3hBcGkge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTG9naW4oKTogVGFzazxzdHJpbmc+IHtcclxuICAgICAgICBsZXQgdGFzayA9IG5ldyBUYXNrPHN0cmluZz4oKHRhc2spID0+IHtcclxuICAgICAgICAgICAgd3gubG9naW4oe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhc2suQ29udGludWUocmVzLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgfVxyXG59Il19