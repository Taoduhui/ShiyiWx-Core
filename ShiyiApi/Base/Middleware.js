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
exports.ResponseMiddleware = exports.RequestMiddleware = exports.Middleware = void 0;
var Middleware = (function () {
    function Middleware() {
        this.IsBlocked = false;
    }
    Middleware.prototype.Process = function (data) {
        var res = this.ProcessAction(data);
        if (this.IsBlocked) {
            return null;
        }
        return res;
    };
    Middleware.prototype.Block = function () {
        this.IsBlocked = true;
    };
    return Middleware;
}());
exports.Middleware = Middleware;
var RequestMiddleware = (function (_super) {
    __extends(RequestMiddleware, _super);
    function RequestMiddleware() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RequestMiddleware.prototype.Process = function (data) {
        var res = _super.prototype.Process.call(this, data);
        return res == null ? res : res;
    };
    return RequestMiddleware;
}(Middleware));
exports.RequestMiddleware = RequestMiddleware;
var ResponseMiddleware = (function (_super) {
    __extends(ResponseMiddleware, _super);
    function ResponseMiddleware() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResponseMiddleware.prototype.Process = function (data) {
        var res = _super.prototype.Process.call(this, data);
        return res == null ? res : res;
    };
    return ResponseMiddleware;
}(Middleware));
exports.ResponseMiddleware = ResponseMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV0E7SUFBQTtRQUVZLGNBQVMsR0FBRyxLQUFLLENBQUM7SUFlOUIsQ0FBQztJQVhVLDRCQUFPLEdBQWQsVUFBZSxJQUF5QjtRQUNwQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRVMsMEJBQUssR0FBZjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQnFCLGdDQUFVO0FBbUJoQztJQUFnRCxxQ0FBVTtJQUExRDs7SUFNQSxDQUFDO0lBSlUsbUNBQU8sR0FBZCxVQUFlLElBQWlCO1FBQzVCLElBQUksR0FBRyxHQUFHLGlCQUFNLE9BQU8sWUFBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBa0IsQ0FBQztJQUNsRCxDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBTkQsQ0FBZ0QsVUFBVSxHQU16RDtBQU5xQiw4Q0FBaUI7QUFRdkM7SUFBaUQsc0NBQVU7SUFBM0Q7O0lBUUEsQ0FBQztJQUxVLG9DQUFPLEdBQWQsVUFDSSxJQUFrQjtRQUNsQixJQUFJLEdBQUcsR0FBRyxpQkFBTSxPQUFPLFlBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQW1CLENBQUM7SUFDbkQsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxBQVJELENBQWlELFVBQVUsR0FRMUQ7QUFScUIsZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ3VzdG9tUmVzcERhdGFNb2RlbCB9IGZyb20gXCJAUm9vdC9TaGl5aUZyYW1ld29yay9Db25maWcvQXBpQ29uZmlnL0FwaS5Db25maWdcIjtcclxuaW1wb3J0IHsgUmVxdXNldEJvZHkgfSBmcm9tIFwiLi9BcGlCYXNlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlc3BvbnNlVHlwZSBleHRlbmRzIFdlY2hhdE1pbmlwcm9ncmFtLlJlcXVlc3RTdWNjZXNzQ2FsbGJhY2tSZXN1bHQ8XHJcbiAgICBzdHJpbmcgfFxyXG4gICAgV2VjaGF0TWluaXByb2dyYW0uSUFueU9iamVjdCB8XHJcbiAgICBBcnJheUJ1ZmZlclxyXG4+e1xyXG4gICAgZGF0YTpDdXN0b21SZXNwRGF0YU1vZGVsXHJcbn1cclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNaWRkbGV3YXJlIHtcclxuXHJcbiAgICBwcml2YXRlIElzQmxvY2tlZCA9IGZhbHNlO1xyXG5cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBQcm9jZXNzQWN0aW9uKGRhdGE6IFJlY29yZDxzdHJpbmcsIGFueT4pOiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG5cclxuICAgIHB1YmxpYyBQcm9jZXNzKGRhdGE6IFJlY29yZDxzdHJpbmcsIGFueT4pOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgbnVsbCB7XHJcbiAgICAgICAgbGV0IHJlcyA9IHRoaXMuUHJvY2Vzc0FjdGlvbihkYXRhKTtcclxuICAgICAgICBpZiAodGhpcy5Jc0Jsb2NrZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIEJsb2NrKCkge1xyXG4gICAgICAgIHRoaXMuSXNCbG9ja2VkID0gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlcXVlc3RNaWRkbGV3YXJlIGV4dGVuZHMgTWlkZGxld2FyZSB7XHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgUHJvY2Vzc0FjdGlvbihkYXRhOiBSZXF1c2V0Qm9keSk6IFJlcXVzZXRCb2R5O1xyXG4gICAgcHVibGljIFByb2Nlc3MoZGF0YTogUmVxdXNldEJvZHkpOiBSZXF1c2V0Qm9keSB8IG51bGwge1xyXG4gICAgICAgIGxldCByZXMgPSBzdXBlci5Qcm9jZXNzKGRhdGEpO1xyXG4gICAgICAgIHJldHVybiByZXMgPT0gbnVsbCA/IHJlcyA6IHJlcyBhcyBSZXF1c2V0Qm9keTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlc3BvbnNlTWlkZGxld2FyZSBleHRlbmRzIE1pZGRsZXdhcmUge1xyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IFByb2Nlc3NBY3Rpb24oXHJcbiAgICAgICAgZGF0YTogUmVzcG9uc2VUeXBlKTogUmVzcG9uc2VUeXBlO1xyXG4gICAgcHVibGljIFByb2Nlc3MoXHJcbiAgICAgICAgZGF0YTogUmVzcG9uc2VUeXBlKTogUmVzcG9uc2VUeXBlfCBudWxsIHtcclxuICAgICAgICBsZXQgcmVzID0gc3VwZXIuUHJvY2VzcyhkYXRhKTtcclxuICAgICAgICByZXR1cm4gcmVzID09IG51bGwgPyByZXMgOiByZXMgYXMgUmVzcG9uc2VUeXBlO1xyXG4gICAgfVxyXG59Il19