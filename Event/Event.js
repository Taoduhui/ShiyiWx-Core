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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEvent = exports.Event = void 0;
var Router_1 = require("../Router/Router");
var Event = (function () {
    function Event(EventName, EventData) {
        this.Stop = false;
        this.EventName = EventName;
        this.EventData = EventData;
    }
    Event.prototype.Run = function (_IncludeComponent) {
        return __awaiter(this, void 0, void 0, function () {
            var i, Page_1;
            return __generator(this, function (_a) {
                for (i = Router_1.Router.PageStacks.length - 1; i >= 0; i--) {
                    Page_1 = Router_1.Router.PageStacks[i];
                    Page_1.EventHandler(this);
                    if (this.Stop) {
                        break;
                    }
                }
                return [2];
            });
        });
    };
    Event.prototype.Catch = function () {
        this.Stop = true;
    };
    Event.prototype.Pass = function () {
        this.Stop = false;
    };
    return Event;
}());
exports.Event = Event;
var CustomEvent = (function (_super) {
    __extends(CustomEvent, _super);
    function CustomEvent(EventName, EventData) {
        return _super.call(this, EventName, EventData) || this;
    }
    return CustomEvent;
}(Event));
exports.CustomEvent = CustomEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFFMUM7SUFJSSxlQUFZLFNBQWdCLEVBQUUsU0FBNEI7UUFEbkQsU0FBSSxHQUFXLEtBQUssQ0FBQztRQUV4QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRVksbUJBQUcsR0FBaEIsVUFBaUIsaUJBQTBCOzs7O2dCQUN2QyxLQUFRLENBQUMsR0FBQyxlQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztvQkFDdEMsU0FBTyxlQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxNQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFBO29CQUN2QixJQUFHLElBQUksQ0FBQyxJQUFJLEVBQUM7d0JBQ1QsTUFBTTtxQkFDVDtpQkFDSjs7OztLQUNKO0lBRU0scUJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxvQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUNMLFlBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLHNCQUFLO0FBNEJsQjtJQUF3QywrQkFBSztJQUN6QyxxQkFBWSxTQUFnQixFQUFFLFNBQWU7ZUFDekMsa0JBQU0sU0FBUyxFQUFDLFNBQVMsQ0FBQztJQUM5QixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBd0MsS0FBSyxHQUk1QztBQUpZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIi4uL1JvdXRlci9Sb3V0ZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFdmVudCB7XHJcbiAgICBwdWJsaWMgRXZlbnROYW1lOnN0cmluZztcclxuICAgIHB1YmxpYyBFdmVudERhdGE6UmVjb3JkPHN0cmluZyxhbnk+O1xyXG4gICAgcHVibGljIFN0b3A6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gICAgY29uc3RydWN0b3IoRXZlbnROYW1lOnN0cmluZywgRXZlbnREYXRhOlJlY29yZDxzdHJpbmcsYW55Pil7XHJcbiAgICAgICAgdGhpcy5FdmVudE5hbWUgPSBFdmVudE5hbWU7XHJcbiAgICAgICAgdGhpcy5FdmVudERhdGEgPSBFdmVudERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIFJ1bihfSW5jbHVkZUNvbXBvbmVudD86Ym9vbGVhbil7XHJcbiAgICAgICAgZm9yKGxldCBpPVJvdXRlci5QYWdlU3RhY2tzLmxlbmd0aC0xO2k+PTA7aS0tKXtcclxuICAgICAgICAgICAgbGV0IFBhZ2UgPSBSb3V0ZXIuUGFnZVN0YWNrc1tpXTtcclxuICAgICAgICAgICAgUGFnZS5FdmVudEhhbmRsZXIodGhpcylcclxuICAgICAgICAgICAgaWYodGhpcy5TdG9wKXtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDYXRjaCgpe1xyXG4gICAgICAgIHRoaXMuU3RvcCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhc3MoKXtcclxuICAgICAgICB0aGlzLlN0b3AgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEN1c3RvbUV2ZW50PERhdGFUPiBleHRlbmRzIEV2ZW50e1xyXG4gICAgY29uc3RydWN0b3IoRXZlbnROYW1lOnN0cmluZywgRXZlbnREYXRhOkRhdGFUKXtcclxuICAgICAgICBzdXBlcihFdmVudE5hbWUsRXZlbnREYXRhKTtcclxuICAgIH1cclxufSJdfQ==