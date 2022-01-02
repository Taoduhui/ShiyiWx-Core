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
    WxApi.GetCity = function () {
        var key = 'KCLBZ-7OHWW-KK7RT-R4O7E-5NSBH-ASBV7';
        var referer = '儿童早期发展评测';
        var hotCitys = '';
        wx.navigateTo({
            url: "plugin://citySelector/index?key=".concat(key, "&referer=").concat(referer, "&hotCitys=").concat(hotCitys),
        });
        var citySelector = requirePlugin('citySelector');
        console.log(citySelector);
        var a = citySelector.getCity();
        console.log(a);
        return a;
    };
    return WxApi;
}());
exports.WxApi = WxApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3hBcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXeEFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBc0M7QUFFdEM7SUFBQTtJQXlCQSxDQUFDO0lBeEJpQixXQUFLLEdBQW5CO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxZQUFJLENBQVMsVUFBQyxJQUFJO1lBQzdCLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ0wsT0FBTyxFQUFFLFVBQUMsR0FBRztvQkFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsQ0FBQzthQUNKLENBQUMsQ0FBQTtRQUNOLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNULE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFYSxhQUFPLEdBQXJCO1FBQ0ksSUFBTSxHQUFHLEdBQUcscUNBQXFDLENBQUM7UUFDbEQsSUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQzNCLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1YsR0FBRyxFQUFFLDBDQUFtQyxHQUFHLHNCQUFZLE9BQU8sdUJBQWEsUUFBUSxDQUFFO1NBQ3hGLENBQUMsQ0FBQTtRQUNGLElBQUksWUFBWSxHQUFHLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0wsWUFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF6Qlksc0JBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4uL1V0aWxzL1V0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV3hBcGkge1xyXG4gICAgcHVibGljIHN0YXRpYyBMb2dpbigpOiBUYXNrPHN0cmluZz4ge1xyXG4gICAgICAgIGxldCB0YXNrID0gbmV3IFRhc2s8c3RyaW5nPigodGFzaykgPT4ge1xyXG4gICAgICAgICAgICB3eC5sb2dpbih7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFzay5Db250aW51ZShyZXMuY29kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBHZXRDaXR5KCkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9ICdLQ0xCWi03T0hXVy1LSzdSVC1SNE83RS01TlNCSC1BU0JWNyc7IC8vIOS9v+eUqOWcqOiFvuiur+S9jee9ruacjeWKoeeUs+ivt+eahGtleVxyXG4gICAgICAgIGNvbnN0IHJlZmVyZXIgPSAn5YS/56ul5pep5pyf5Y+R5bGV6K+E5rWLJzsgLy8g6LCD55So5o+S5Lu255qEYXBw55qE5ZCN56ewXHJcbiAgICAgICAgY29uc3QgaG90Q2l0eXMgPSAnJzsgLy8g55So5oi36Ieq5a6a5LmJ55qE55qE54Ot6Zeo5Z+O5biCXHJcbiAgICAgICAgd3gubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICAgIHVybDogYHBsdWdpbjovL2NpdHlTZWxlY3Rvci9pbmRleD9rZXk9JHtrZXl9JnJlZmVyZXI9JHtyZWZlcmVyfSZob3RDaXR5cz0ke2hvdENpdHlzfWAsXHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgY2l0eVNlbGVjdG9yID0gcmVxdWlyZVBsdWdpbignY2l0eVNlbGVjdG9yJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coY2l0eVNlbGVjdG9yKTtcclxuICAgICAgICBsZXQgYSA9IGNpdHlTZWxlY3Rvci5nZXRDaXR5KCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYSk7XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcbn0iXX0=