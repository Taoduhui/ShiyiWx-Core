"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WxApi = void 0;
var Task_1 = require("../Task/Task");
var WxApi = (function () {
    function WxApi() {
    }
    WxApi.Login = function () {
        var task = new Task_1.Task(function (task) {
            wx.login({
                success: function (res) {
                    task.Continue(res.code);
                }
            });
        }, true);
        return task;
    };
    WxApi.GetSystemInfo = function () {
        var task = new Task_1.Task(function (task) {
            wx.getSystemInfo({
                success: function (res) {
                    task.Continue(res);
                }
            });
        }, true);
        return task;
    };
    return WxApi;
}());
exports.WxApi = WxApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3hBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXeEFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBb0M7QUFFcEM7SUFBQTtJQXVCQSxDQUFDO0lBckJpQixXQUFLLEdBQW5CO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFJLENBQVMsVUFBQyxJQUFJO1lBQzdCLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ0wsT0FBTyxFQUFFLFVBQUMsR0FBRztvQkFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsQ0FBQzthQUNKLENBQUMsQ0FBQTtRQUNOLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNULE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFYSxtQkFBYSxHQUEzQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksV0FBSSxDQUErQixVQUFDLElBQUk7WUFDbkQsRUFBRSxDQUFDLGFBQWEsQ0FBQztnQkFDYixPQUFPLEVBQUMsVUFBQyxHQUFHO29CQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3RCLENBQUM7YUFDSixDQUFDLENBQUE7UUFDTixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDUixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2Qlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL1Rhc2svVGFza1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFd4QXBpIHtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIExvZ2luKCk6IFRhc2s8c3RyaW5nPiB7XHJcbiAgICAgICAgbGV0IHRhc2sgPSBuZXcgVGFzazxzdHJpbmc+KCh0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgIHd4LmxvZ2luKHtcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0YXNrLkNvbnRpbnVlKHJlcy5jb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LCB0cnVlKTtcclxuICAgICAgICByZXR1cm4gdGFzaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFN5c3RlbUluZm8oKTpUYXNrPFdlY2hhdE1pbmlwcm9ncmFtLlN5c3RlbUluZm8+e1xyXG4gICAgICAgIGxldCB0YXNrID0gbmV3IFRhc2s8V2VjaGF0TWluaXByb2dyYW0uU3lzdGVtSW5mbz4oKHRhc2spPT57XHJcbiAgICAgICAgICAgIHd4LmdldFN5c3RlbUluZm8oe1xyXG4gICAgICAgICAgICAgICAgc3VjY2VzczoocmVzKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRhc2suQ29udGludWUocmVzKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2Nyb2xsVmlld0NvbnRleHR7XHJcbiAgICBzY3JvbGxFbmFibGVkOmJvb2xlYW47XHJcbiAgICBib3VuY2VzOmJvb2xlYW47XHJcbiAgICBzaG93U2Nyb2xsYmFyOmJvb2xlYW47XHJcbiAgICBwYWdpbmdFbmFibGVkOmJvb2xlYW47XHJcbiAgICBmYXN0RGVjZWxlcmF0aW9uOmJvb2xlYW47XHJcbiAgICBkZWNlbGVyYXRpb25EaXNhYmxlZDpib29sZWFuO1xyXG4gICAgc2Nyb2xsVG86KHBhcmFtOntcclxuICAgICAgICB0b3A6bnVtYmVyLFxyXG4gICAgICAgIGxlZnQ6bnVtYmVyLFxyXG4gICAgICAgIHZlbG9jaXR5Om51bWJlcixcclxuICAgICAgICBkdXJhdGlvbjpudW1iZXIsXHJcbiAgICAgICAgYW5pbWF0ZWQ6Ym9vbGVhblxyXG4gICAgfSk9Pnt9O1xyXG4gICAgc2Nyb2xsSW50b1ZpZXc6KHNlbGVjdG9yOnN0cmluZyk9Pnt9XHJcbn0iXX0=