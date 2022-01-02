"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var Router_Config_1 = require("../Config/RouterConfig/Router.Config");
var Utils_1 = require("../Utils/Utils");
var Router = (function () {
    function Router() {
    }
    Router.TryGetMapPath = function (name, CurrentPath, map) {
        for (var i = 0; i < map.length; i++) {
            var a = CurrentPath + "/" + (map[i].isDir ? Router_Config_1.DirectoryName[map[i].name] : Router_Config_1.PageName[map[i].name]);
            var Res = Router.TryGetMapPath(name, CurrentPath + "/" + (map[i].isDir ? Router_Config_1.DirectoryName[map[i].name] : Router_Config_1.PageName[map[i].name]), map[i].children);
            if (Res) {
                return Res;
            }
            if (map[i].name == name && !map[i].isDir) {
                return CurrentPath + "/" + (map[i].isDir ? Router_Config_1.DirectoryName[map[i].name] : Router_Config_1.PageName[map[i].name]) + "/" + Router_Config_1.PageName[map[i].name];
            }
        }
        return "";
    };
    Router.GetPagePath = function (name) {
        var Path = Router.TryGetMapPath(name, "/pages", Router_Config_1.PageMap);
        if (Path) {
            return Path;
        }
        else {
            return "/pages/" + Router_Config_1.PageName[name] + "/" + Router_Config_1.PageName[name];
        }
    };
    Router.PageLoad = function (page) {
        if (Router.WaitForBackTaskStacks.length > 0 && !Router.WaitForBackTaskStacks[Router.WaitForBackTaskStacks.length - 1].pageInstance) {
            Router.WaitForBackTaskStacks[Router.WaitForBackTaskStacks.length - 1].pageInstance = page;
        }
        Router.PageStacks.push(page);
    };
    Router.PageUnload = function () {
        var e_1, _a;
        var Observers = Router.RegisteredDataObservers.get(Router.CurrentPage);
        if (Observers) {
            try {
                for (var Observers_1 = __values(Observers), Observers_1_1 = Observers_1.next(); !Observers_1_1.done; Observers_1_1 = Observers_1.next()) {
                    var Notification = Observers_1_1.value;
                    Notification(Router.CurrentPage);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (Observers_1_1 && !Observers_1_1.done && (_a = Observers_1.return)) _a.call(Observers_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        var page = Router.PageStacks.pop();
        if (page) {
            if (Router.WaitForBackTaskStacks[Router.WaitForBackTaskStacks.length - 1].pageInstance == page) {
                Router.WaitForBackTaskStacks[Router.WaitForBackTaskStacks.length - 1].task.Continue();
                Router.WaitForBackTaskStacks.pop();
            }
        }
    };
    Router.RegisterPageUnLoaded = function (page, notification) {
        var Observers = Router.RegisteredDataObservers.get(page);
        if (!Observers) {
            Observers = new Array();
        }
        Observers.push(notification);
        Router.RegisteredDataObservers.set(page, Observers);
    };
    Router.NavigateTo = function (name, param) {
        Router.NavigateParam = param ? param : undefined;
        wx.navigateTo({
            url: Router.GetPagePath(name)
        });
        var task = new Utils_1.Task(function () { }, true);
        Router.WaitForBackTaskStacks.push({
            task: task,
            pageInstance: undefined
        });
        return task;
    };
    Router.NavigateBack = function () {
        wx.navigateBack();
    };
    Object.defineProperty(Router.prototype, "CurrentPage", {
        get: function () {
            return Router.PageStacks[Router.PageStacks.length - 1];
        },
        enumerable: false,
        configurable: true
    });
    Router.PageStacks = new Array();
    Router.RegisteredDataObservers = new Map();
    Router.WaitForBackTaskStacks = new Array();
    return Router;
}());
exports.Router = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQXdGO0FBRXhGLHdDQUFzQztBQWF0QztJQUFBO0lBNkZBLENBQUM7SUE1RmlCLG9CQUFhLEdBQTNCLFVBQTRCLElBQWMsRUFBRSxXQUFtQixFQUFFLEdBQXVCO1FBQ3BGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxHQUFHLFdBQVcsR0FBRyxHQUFHLEdBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQSw2QkFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUEsd0JBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzRixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxXQUFXLEdBQUcsR0FBRyxHQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUEsNkJBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFBLHdCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFJLElBQUksR0FBRyxFQUFFO2dCQUNMLE9BQU8sR0FBRyxDQUFDO2FBQ2Q7WUFDRCxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtnQkFDdEMsT0FBTyxXQUFXLEdBQUcsR0FBRyxHQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQSxDQUFDLENBQUEsNkJBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFBLHdCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLHdCQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNIO1NBQ0o7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFYyxrQkFBVyxHQUExQixVQUEyQixJQUFjO1FBQ3JDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSx1QkFBTyxDQUFDLENBQUM7UUFDekQsSUFBSSxJQUFJLEVBQUU7WUFDTixPQUFPLElBQUksQ0FBQztTQUNmO2FBQU07WUFDSCxPQUFPLFNBQVMsR0FBRyx3QkFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyx3QkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVEO0lBQ0wsQ0FBQztJQVdhLGVBQVEsR0FBdEIsVUFBdUIsSUFBbUI7UUFDdEMsSUFBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsTUFBTSxHQUFDLENBQUMsSUFBRSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBQztZQUN4SCxNQUFNLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDO1NBQ3pGO1FBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVhLGlCQUFVLEdBQXhCOztRQUNJLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksU0FBUyxFQUFFOztnQkFDWCxLQUF5QixJQUFBLGNBQUEsU0FBQSxTQUFTLENBQUEsb0NBQUEsMkRBQUU7b0JBQS9CLElBQUksWUFBWSxzQkFBQTtvQkFDakIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtpQkFDbkM7Ozs7Ozs7OztTQUNKO1FBQ0QsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNuQyxJQUFHLElBQUksRUFBQztZQUNKLElBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxJQUFFLElBQUksRUFBQztnQkFDdEYsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNwRixNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDdEM7U0FDSjtJQUNMLENBQUM7SUFPYSwyQkFBb0IsR0FBbEMsVUFBbUMsSUFBbUIsRUFBQyxZQUEwQztRQUM3RixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDWixTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQWlDLENBQUM7U0FDMUQ7UUFDRCxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdCLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFHYSxpQkFBVSxHQUF4QixVQUF5QixJQUFjLEVBQUUsS0FBVztRQUNoRCxNQUFNLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFakQsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNWLEdBQUcsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztTQUNoQyxDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksR0FBRyxJQUFJLFlBQUksQ0FBQyxjQUFLLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDO1lBQzlCLElBQUksRUFBQyxJQUFJO1lBQ1QsWUFBWSxFQUFDLFNBQVM7U0FDekIsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVhLG1CQUFZLEdBQTFCO1FBQ0ksRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFHRCxzQkFBVywrQkFBVzthQUF0QjtZQUNJLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzRCxDQUFDOzs7T0FBQTtJQXBFYSxpQkFBVSxHQUF5QixJQUFJLEtBQUssRUFBaUIsQ0FBQztJQUU3RCw4QkFBdUIsR0FDaEMsSUFBSSxHQUFHLEVBQXVELENBQUM7SUFJdEQsNEJBQXFCLEdBQXdCLElBQUksS0FBSyxFQUFtQixDQUFDO0lBOEQ3RixhQUFDO0NBQUEsQUE3RkQsSUE2RkM7QUE3Rlksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdlTmFtZSwgRGlyZWN0b3J5TmFtZSwgUGFnZU1hcCB9IGZyb20gXCIuLi9Db25maWcvUm91dGVyQ29uZmlnL1JvdXRlci5Db25maWdcIjtcclxuaW1wb3J0IHsgU2hpeWlQYWdlQmFzZSB9IGZyb20gXCIuLi9TaGl5aVBhZ2UvQmFzZS9TaGl5aVBhZ2VCYXNlXCI7XHJcbmltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi4vVXRpbHMvVXRpbHNcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUGFnZU1hcEl0ZW0ge1xyXG4gICAgbmFtZTogUGFnZU5hbWV8RGlyZWN0b3J5TmFtZSxcclxuICAgIGNoaWxkcmVuOiBBcnJheTxQYWdlTWFwSXRlbT4sXHJcbiAgICBpc0Rpcj86Ym9vbGVhbixcclxufVxyXG5cclxuaW50ZXJmYWNlIFdhaXRGb3JCYWNrVGFza3tcclxuICAgIHRhc2s6VGFzayxcclxuICAgIHBhZ2VJbnN0YW5jZTpTaGl5aVBhZ2VCYXNlfHVuZGVmaW5lZFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUm91dGVyIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgVHJ5R2V0TWFwUGF0aChuYW1lOiBQYWdlTmFtZSwgQ3VycmVudFBhdGg6IHN0cmluZywgbWFwOiBBcnJheTxQYWdlTWFwSXRlbT4pOiBzdHJpbmcge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWFwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhID0gQ3VycmVudFBhdGggKyBcIi9cIiArKG1hcFtpXS5pc0Rpcj9EaXJlY3RvcnlOYW1lW21hcFtpXS5uYW1lXTpQYWdlTmFtZVttYXBbaV0ubmFtZV0pO1xyXG4gICAgICAgICAgICBsZXQgUmVzID0gUm91dGVyLlRyeUdldE1hcFBhdGgobmFtZSwgQ3VycmVudFBhdGggKyBcIi9cIiArKG1hcFtpXS5pc0Rpcj9EaXJlY3RvcnlOYW1lW21hcFtpXS5uYW1lXTpQYWdlTmFtZVttYXBbaV0ubmFtZV0pLCBtYXBbaV0uY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICBpZiAoUmVzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChtYXBbaV0ubmFtZSA9PSBuYW1lICYmICFtYXBbaV0uaXNEaXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBDdXJyZW50UGF0aCArIFwiL1wiICsobWFwW2ldLmlzRGlyP0RpcmVjdG9yeU5hbWVbbWFwW2ldLm5hbWVdOlBhZ2VOYW1lW21hcFtpXS5uYW1lXSkgKyBcIi9cIiArIFBhZ2VOYW1lW21hcFtpXS5uYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBHZXRQYWdlUGF0aChuYW1lOiBQYWdlTmFtZSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IFBhdGggPSBSb3V0ZXIuVHJ5R2V0TWFwUGF0aChuYW1lLCBcIi9wYWdlc1wiLCBQYWdlTWFwKTtcclxuICAgICAgICBpZiAoUGF0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gUGF0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCIvcGFnZXMvXCIgKyBQYWdlTmFtZVtuYW1lXSArIFwiL1wiICsgUGFnZU5hbWVbbmFtZV07XHJcbiAgICAgICAgfSBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFBhZ2VTdGFja3M6IEFycmF5PFNoaXlpUGFnZUJhc2U+ID0gbmV3IEFycmF5PFNoaXlpUGFnZUJhc2U+KCk7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgUmVnaXN0ZXJlZERhdGFPYnNlcnZlcnM6IE1hcDxTaGl5aVBhZ2VCYXNlLCBBcnJheTwocGFnZTogU2hpeWlQYWdlQmFzZSkgPT4gdm9pZD4+XHJcbiAgICAgICAgPSBuZXcgTWFwPFNoaXlpUGFnZUJhc2UsIEFycmF5PChwYWdlOiBTaGl5aVBhZ2VCYXNlKSA9PiB2b2lkPj4oKTtcclxuICAgIFxyXG5cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgV2FpdEZvckJhY2tUYXNrU3RhY2tzOkFycmF5PFdhaXRGb3JCYWNrVGFzaz49bmV3IEFycmF5PFdhaXRGb3JCYWNrVGFzaz4oKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFBhZ2VMb2FkKHBhZ2U6IFNoaXlpUGFnZUJhc2UpOiB2b2lkIHtcclxuICAgICAgICBpZihSb3V0ZXIuV2FpdEZvckJhY2tUYXNrU3RhY2tzLmxlbmd0aD4wJiYhUm91dGVyLldhaXRGb3JCYWNrVGFza1N0YWNrc1tSb3V0ZXIuV2FpdEZvckJhY2tUYXNrU3RhY2tzLmxlbmd0aC0xXS5wYWdlSW5zdGFuY2Upe1xyXG4gICAgICAgICAgICBSb3V0ZXIuV2FpdEZvckJhY2tUYXNrU3RhY2tzW1JvdXRlci5XYWl0Rm9yQmFja1Rhc2tTdGFja3MubGVuZ3RoLTFdLnBhZ2VJbnN0YW5jZT1wYWdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBSb3V0ZXIuUGFnZVN0YWNrcy5wdXNoKHBhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgUGFnZVVubG9hZCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgT2JzZXJ2ZXJzID0gUm91dGVyLlJlZ2lzdGVyZWREYXRhT2JzZXJ2ZXJzLmdldChSb3V0ZXIuQ3VycmVudFBhZ2UpO1xyXG4gICAgICAgIGlmIChPYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgTm90aWZpY2F0aW9uIG9mIE9ic2VydmVycykge1xyXG4gICAgICAgICAgICAgICAgTm90aWZpY2F0aW9uKFJvdXRlci5DdXJyZW50UGFnZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFnZSA9IFJvdXRlci5QYWdlU3RhY2tzLnBvcCgpO1xyXG4gICAgICAgIGlmKHBhZ2Upe1xyXG4gICAgICAgICAgICBpZihSb3V0ZXIuV2FpdEZvckJhY2tUYXNrU3RhY2tzW1JvdXRlci5XYWl0Rm9yQmFja1Rhc2tTdGFja3MubGVuZ3RoLTFdLnBhZ2VJbnN0YW5jZT09cGFnZSl7XHJcbiAgICAgICAgICAgICAgICBSb3V0ZXIuV2FpdEZvckJhY2tUYXNrU3RhY2tzW1JvdXRlci5XYWl0Rm9yQmFja1Rhc2tTdGFja3MubGVuZ3RoLTFdLnRhc2suQ29udGludWUoKTtcclxuICAgICAgICAgICAgICAgIFJvdXRlci5XYWl0Rm9yQmFja1Rhc2tTdGFja3MucG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5HlrprmjIflrprpobXpnaJVbmxvYWRlZOS6i+S7tlxyXG4gICAgICogQHBhcmFtIHBhZ2Ug6KaB57uR5a6a55qE6aG16Z2iXHJcbiAgICAgKiBAcGFyYW0gbm90aWZpY2F0aW9uIFVubG9hZOaXtuWkhOeQhuWHveaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFJlZ2lzdGVyUGFnZVVuTG9hZGVkKHBhZ2U6IFNoaXlpUGFnZUJhc2Usbm90aWZpY2F0aW9uOihwYWdlOiBTaGl5aVBhZ2VCYXNlKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IE9ic2VydmVycyA9IFJvdXRlci5SZWdpc3RlcmVkRGF0YU9ic2VydmVycy5nZXQocGFnZSk7XHJcbiAgICAgICAgaWYgKCFPYnNlcnZlcnMpIHtcclxuICAgICAgICAgICAgT2JzZXJ2ZXJzID0gbmV3IEFycmF5PChwYWdlOiBTaGl5aVBhZ2VCYXNlKSA9PiB2b2lkPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYnNlcnZlcnMucHVzaChub3RpZmljYXRpb24pO1xyXG4gICAgICAgIFJvdXRlci5SZWdpc3RlcmVkRGF0YU9ic2VydmVycy5zZXQocGFnZSwgT2JzZXJ2ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIE5hdmlnYXRlUGFyYW06IGFueVxyXG4gICAgcHVibGljIHN0YXRpYyBOYXZpZ2F0ZVRvKG5hbWU6IFBhZ2VOYW1lLCBwYXJhbT86IGFueSk6IFRhc2s8dm9pZD4ge1xyXG4gICAgICAgIFJvdXRlci5OYXZpZ2F0ZVBhcmFtID0gcGFyYW0gPyBwYXJhbSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBcclxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgICAgdXJsOiBSb3V0ZXIuR2V0UGFnZVBhdGgobmFtZSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgdGFzayA9IG5ldyBUYXNrKCgpPT57fSx0cnVlKTtcclxuICAgICAgICBSb3V0ZXIuV2FpdEZvckJhY2tUYXNrU3RhY2tzLnB1c2goe1xyXG4gICAgICAgICAgICB0YXNrOnRhc2ssXHJcbiAgICAgICAgICAgIHBhZ2VJbnN0YW5jZTp1bmRlZmluZWRcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiB0YXNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgTmF2aWdhdGVCYWNrKCkge1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlQmFjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQ3VycmVudFBhZ2U6IFNoaXlpUGFnZUJhc2U7XHJcbiAgICBwdWJsaWMgZ2V0IEN1cnJlbnRQYWdlKCk6IFNoaXlpUGFnZUJhc2Uge1xyXG4gICAgICAgIHJldHVybiBSb3V0ZXIuUGFnZVN0YWNrc1tSb3V0ZXIuUGFnZVN0YWNrcy5sZW5ndGggLSAxXTtcclxuICAgIH1cclxufVxyXG4iXX0=