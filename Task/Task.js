"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.TaskGroup = void 0;
var TaskGroup = (function () {
    function TaskGroup() {
        this.TaskArray = new Array();
        this.CompleteCounter = 0;
    }
    TaskGroup.prototype.Add = function (task) {
        this.TaskArray.push(task);
    };
    TaskGroup.prototype.AllTask = function () {
        var _this = this;
        var task = new Task(function () {
            _this.TaskArray.forEach(function (value) {
                value.ContinueWith(function () {
                    _this.CompleteCounter++;
                    if (_this.CompleteCounter == _this.TaskArray.length) {
                        task.Continue(_this.TaskArray);
                    }
                }).Run();
            });
        }, true);
        return task;
    };
    return TaskGroup;
}());
exports.TaskGroup = TaskGroup;
var Task = (function () {
    function Task(action, _IsCallbackTask) {
        var _this = this;
        this.IsCallbackTask = false;
        this.Run = function () {
            if (_this.Action) {
                var ActionResult = _this.Action(_this);
                if (ActionResult) {
                    _this.Result = ActionResult;
                }
            }
            if (!_this.IsCallbackTask) {
                _this._continue();
            }
            return _this;
        };
        this.Action = action;
        this.IsCallbackTask = _IsCallbackTask ? _IsCallbackTask : false;
        this.Root = this;
    }
    Task.Group = function (TaskGroupObj) {
        var group = new TaskGroup();
        Object.keys(TaskGroupObj).forEach(function (key) {
            group.Add(TaskGroupObj[key]);
        });
        var group_task = new Task(function (task) {
            group.AllTask().ContinueWith(function () {
                task.Continue(TaskGroupObj);
            }).Run();
        }, true);
        return group_task;
    };
    Task.Delay = function (ms) {
        return new Task(function (task) {
            setTimeout(function () {
                task.Continue();
            }, ms);
        }, true);
    };
    Task.Run = function (action) {
        var task = new Task(action);
        return task.Run();
    };
    Task.prototype._continue = function (result) {
        if (result) {
            this.Result = result;
        }
        if (this.ContinueAction) {
            var ContinueResult = this.ContinueAction(this.Result, this.NextTask);
            this.NextTask.Result = ContinueResult;
            if (!this.NextTask.IsCallbackTask) {
                this.NextTask._continue();
            }
        }
        return this;
    };
    Task.prototype.Continue = function (result) {
        this.IsCallbackTask = true;
        return this._continue(result);
    };
    Task.prototype.ContinueWith = function (Action, _IsCallbackTask) {
        this.ContinueAction = Action;
        this.NextTask = new Task();
        this.NextTask.Root = this.Root;
        this.NextTask.IsCallbackTask = _IsCallbackTask ? _IsCallbackTask : false;
        this.NextTask.Run = this.Root.Run.bind(this.Root);
        return this.NextTask;
    };
    Task.prototype.ContinueWithTask = function (NextTask) {
        return this.ContinueWith(function (_, task) {
            NextTask.ContinueWith(function (result) {
                task.Continue(result);
            }).Run();
        }, true);
    };
    Task.prototype.Delay = function (ms) {
        return this.ContinueWithTask(Task.Delay(ms));
    };
    Task.PrintFlow = function (task) {
        var root = task.Root;
        var currentTask = root;
        while (currentTask) {
            currentTask = currentTask.NextTask;
        }
    };
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRhc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7SUFBQTtRQUNXLGNBQVMsR0FBcUIsSUFBSSxLQUFLLEVBQWEsQ0FBQztRQUNwRCxvQkFBZSxHQUFHLENBQUMsQ0FBQztJQWtCaEMsQ0FBQztJQWpCVSx1QkFBRyxHQUFWLFVBQVcsSUFBZTtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sMkJBQU8sR0FBZDtRQUFBLGlCQVlDO1FBWEcsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQW1CO1lBQ2xDLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSztnQkFDekIsS0FBSyxDQUFDLFlBQVksQ0FBQztvQkFDZixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3ZCLElBQUksS0FBSSxDQUFDLGVBQWUsSUFBSSxLQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTt3QkFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ2pDO2dCQUNMLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDUixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBcEJZLDhCQUFTO0FBdUJ0QjtJQVFJLGNBQVksTUFBZ0QsRUFBRSxlQUF5QjtRQUF2RixpQkFJQztRQVRNLG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBZ0NoQyxRQUFHLEdBQXdCO1lBQzlCLElBQUksS0FBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixJQUFJLFlBQVksR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxDQUFDO2dCQUNy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LENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN6RSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRU0sK0JBQWdCLEdBQXZCLFVBQ0ksUUFBOEI7UUFFOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQUMsQ0FBQyxFQUFDLElBQUk7WUFDNUIsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFDLE1BQU07Z0JBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDYixDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFFWixDQUFDO0lBRU0sb0JBQUssR0FBWixVQUFhLEVBQVM7UUFDbEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFYSxjQUFTLEdBQXZCLFVBQXdCLElBQWU7UUFDbkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDdkIsT0FBTyxXQUFXLEVBQUU7WUFDaEIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBQ0wsV0FBQztBQUFELENBQUMsQUFsSEQsSUFrSEM7QUFsSFksb0JBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVGFza0dyb3VwIHtcclxuICAgIHB1YmxpYyBUYXNrQXJyYXk6IEFycmF5PFRhc2s8YW55Pj4gPSBuZXcgQXJyYXk8VGFzazxhbnk+PigpO1xyXG4gICAgcHJpdmF0ZSBDb21wbGV0ZUNvdW50ZXIgPSAwO1xyXG4gICAgcHVibGljIEFkZCh0YXNrOiBUYXNrPGFueT4pIHtcclxuICAgICAgICB0aGlzLlRhc2tBcnJheS5wdXNoKHRhc2spO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBbGxUYXNrKCk6IFRhc2s8QXJyYXk8VGFzazxhbnk+Pj4ge1xyXG4gICAgICAgIGxldCB0YXNrID0gbmV3IFRhc2s8QXJyYXk8VGFzazxhbnk+Pj4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLlRhc2tBcnJheS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUuQ29udGludWVXaXRoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlQ291bnRlcisrO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLkNvbXBsZXRlQ291bnRlciA9PSB0aGlzLlRhc2tBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFzay5Db250aW51ZSh0aGlzLlRhc2tBcnJheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSkuUnVuKCk7IFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGFzazxSZXN1bHRUID0gdm9pZD57XHJcbiAgICBwcm90ZWN0ZWQgQ29udGludWVBY3Rpb24/OiAocmVzdWx0OiBSZXN1bHRULCB0YXNrOiBUYXNrPGFueT4pID0+IGFueTtcclxuICAgIHB1YmxpYyBSZXN1bHQhOiBSZXN1bHRUO1xyXG4gICAgcHVibGljIElzQ2FsbGJhY2tUYXNrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgUm9vdDogVGFzazxhbnk+O1xyXG4gICAgcHJvdGVjdGVkIEFjdGlvbj86ICh0YXNrOiBUYXNrPFJlc3VsdFQ+KSA9PiBSZXN1bHRUIHwgdm9pZDtcclxuICAgIHByb3RlY3RlZCBOZXh0VGFzayE6IFRhc2s8YW55PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihhY3Rpb24/OiAodGFzazogVGFzazxSZXN1bHRUPikgPT4gUmVzdWx0VCB8IHZvaWQsIF9Jc0NhbGxiYWNrVGFzaz86IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLkFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICB0aGlzLklzQ2FsbGJhY2tUYXNrID0gX0lzQ2FsbGJhY2tUYXNrID8gX0lzQ2FsbGJhY2tUYXNrIDogZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb290ID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIEdyb3VwPFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLFRhc2s8YW55Pj4+KFRhc2tHcm91cE9iajpUKTpUYXNrPFQ+e1xyXG4gICAgICAgIGxldCBncm91cCA9IG5ldyBUYXNrR3JvdXAoKTtcclxuICAgICAgICBPYmplY3Qua2V5cyhUYXNrR3JvdXBPYmopLmZvckVhY2goa2V5PT57XHJcbiAgICAgICAgICAgIGdyb3VwLkFkZChUYXNrR3JvdXBPYmpba2V5XSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBsZXQgZ3JvdXBfdGFzayA9IG5ldyBUYXNrPFQ+KCh0YXNrKT0+e1xyXG4gICAgICAgICAgICBncm91cC5BbGxUYXNrKCkuQ29udGludWVXaXRoKCgpPT57XHJcbiAgICAgICAgICAgICAgICB0YXNrLkNvbnRpbnVlKFRhc2tHcm91cE9iailcclxuICAgICAgICAgICAgfSkuUnVuKCk7XHJcbiAgICAgICAgfSx0cnVlKTtcclxuICAgICAgICByZXR1cm4gZ3JvdXBfdGFzaztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIERlbGF5KG1zOm51bWJlcik6VGFzazx2b2lkPntcclxuICAgICAgICByZXR1cm4gbmV3IFRhc2s8dm9pZD4oKHRhc2spPT57XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PntcclxuICAgICAgICAgICAgICAgIHRhc2suQ29udGludWUoKTtcclxuICAgICAgICAgICAgfSxtcyk7XHJcbiAgICAgICAgfSx0cnVlKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSdW46ICgpID0+IFRhc2s8UmVzdWx0VD4gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuQWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGxldCBBY3Rpb25SZXN1bHQgPSB0aGlzLkFjdGlvbih0aGlzKTtcclxuICAgICAgICAgICAgaWYgKEFjdGlvblJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZXN1bHQgPSBBY3Rpb25SZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLklzQ2FsbGJhY2tUYXNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRpbnVlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgUnVuPFJlc3VsdFQ+KGFjdGlvbjogKHRhc2s6IFRhc2s8UmVzdWx0VD4pID0+IFJlc3VsdFQpOiBUYXNrPFJlc3VsdFQ+IHtcclxuICAgICAgICBsZXQgdGFzazogVGFzazxSZXN1bHRUPiA9IG5ldyBUYXNrPFJlc3VsdFQ+KGFjdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHRhc2suUnVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIF9jb250aW51ZShyZXN1bHQ/OiBSZXN1bHRUKTogVGFzazxSZXN1bHRUPiB7XHJcbiAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICB0aGlzLlJlc3VsdCA9IHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuQ29udGludWVBY3Rpb24pIHtcclxuICAgICAgICAgICAgbGV0IENvbnRpbnVlUmVzdWx0ID0gdGhpcy5Db250aW51ZUFjdGlvbih0aGlzLlJlc3VsdCwgdGhpcy5OZXh0VGFzayk7XHJcbiAgICAgICAgICAgIHRoaXMuTmV4dFRhc2suUmVzdWx0ID0gQ29udGludWVSZXN1bHQ7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5OZXh0VGFzay5Jc0NhbGxiYWNrVGFzaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5OZXh0VGFzay5fY29udGludWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWbnuiwg+exu1Rhc2vkuK0gVGFza+aJp+ihjOWujOavleaXtuiwg+eUqFxyXG4gICAgICogQHBhcmFtIHJlc3VsdCBUYXNr5omn6KGM57uT5p6cXHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgcHVibGljIENvbnRpbnVlKHJlc3VsdD86IFJlc3VsdFQpOiBUYXNrPFJlc3VsdFQ+IHtcclxuICAgICAgICAvLyBpZiAoIXRoaXMuTmV4dFRhc2suSXNDYWxsYmFja1Rhc2spIHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS53YXJuKHRoaXMuQ29udGludWVBY3Rpb24sIFwiWW91IGNhbGwgQ29udGludWUsYnV0IGhhcyBub3Qgc2V0IF9Jc0NhbGxiYWNrVGFzayBhcyB0cnVlXCIpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLklzQ2FsbGJhY2tUYXNrID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29udGludWUocmVzdWx0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ29udGludWVXaXRoPENvbnRpbnVlUmVzdWx0ID0gdm9pZD4oXHJcbiAgICAgICAgQWN0aW9uOiAocmVzdWx0OiBSZXN1bHRULCB0YXNrOiBUYXNrPENvbnRpbnVlUmVzdWx0PikgPT4gQ29udGludWVSZXN1bHQgfCB2b2lkLFxyXG4gICAgICAgIF9Jc0NhbGxiYWNrVGFzaz86IGJvb2xlYW4pXHJcbiAgICAgICAgOiBUYXNrPENvbnRpbnVlUmVzdWx0PiB7XHJcbiAgICAgICAgdGhpcy5Db250aW51ZUFjdGlvbiA9IEFjdGlvbjtcclxuICAgICAgICB0aGlzLk5leHRUYXNrID0gbmV3IFRhc2s8Q29udGludWVSZXN1bHQ+KCk7XHJcbiAgICAgICAgdGhpcy5OZXh0VGFzay5Sb290ID0gdGhpcy5Sb290O1xyXG4gICAgICAgIHRoaXMuTmV4dFRhc2suSXNDYWxsYmFja1Rhc2sgPSBfSXNDYWxsYmFja1Rhc2sgPyBfSXNDYWxsYmFja1Rhc2sgOiBmYWxzZTtcclxuICAgICAgICB0aGlzLk5leHRUYXNrLlJ1biA9IHRoaXMuUm9vdC5SdW4uYmluZCh0aGlzLlJvb3QpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLk5leHRUYXNrO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDb250aW51ZVdpdGhUYXNrPENvbnRpbnVlUmVzdWx0ID0gdm9pZD4oXHJcbiAgICAgICAgTmV4dFRhc2s6IFRhc2s8Q29udGludWVSZXN1bHQ+KVxyXG4gICAgICAgIDogVGFzazxDb250aW51ZVJlc3VsdD4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkNvbnRpbnVlV2l0aCgoXyx0YXNrKT0+e1xyXG4gICAgICAgICAgICBOZXh0VGFzay5Db250aW51ZVdpdGgoKHJlc3VsdCk9PntcclxuICAgICAgICAgICAgICAgIHRhc2suQ29udGludWUocmVzdWx0KTtcclxuICAgICAgICAgICAgfSkuUnVuKCk7XHJcbiAgICAgICAgfSx0cnVlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRGVsYXkobXM6bnVtYmVyKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5Db250aW51ZVdpdGhUYXNrKFRhc2suRGVsYXkobXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFByaW50Rmxvdyh0YXNrOiBUYXNrPGFueT4pIHtcclxuICAgICAgICBsZXQgcm9vdCA9IHRhc2suUm9vdDtcclxuICAgICAgICBsZXQgY3VycmVudFRhc2sgPSByb290O1xyXG4gICAgICAgIHdoaWxlIChjdXJyZW50VGFzaykge1xyXG4gICAgICAgICAgICBjdXJyZW50VGFzayA9IGN1cnJlbnRUYXNrLk5leHRUYXNrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=