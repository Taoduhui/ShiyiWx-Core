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
exports.SampleComp = void 0;
var PesudoCompnent_1 = require("../../../ShiyiFramework/ShiyiPesudoCompnent/PesudoCompnent");
var SampleComp = (function (_super) {
    __extends(SampleComp, _super);
    function SampleComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = {
            SampleData: "SampleComp",
            Theme: ""
        };
        return _this;
    }
    SampleComp.prototype.SampleFunc = function () {
        console.log("Sample");
        this.Render({
            "SampleData": "SampleComp Clicked"
        });
    };
    return SampleComp;
}(PesudoCompnent_1.PesudoCompnent));
exports.SampleComp = SampleComp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2FtcGxlQ29tcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNhbXBsZUNvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMEZBQTZHO0FBTTdHO0lBQWdDLDhCQUFjO0lBQTlDO1FBQUEscUVBWUM7UUFYVSxVQUFJLEdBQWdCO1lBQ3ZCLFVBQVUsRUFBRSxZQUFZO1lBQ3hCLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQTs7SUFRTCxDQUFDO0lBTlUsK0JBQVUsR0FBakI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQWlCO1lBQ3hCLFlBQVksRUFBQyxvQkFBb0I7U0FDcEMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FBQyxBQVpELENBQWdDLCtCQUFjLEdBWTdDO0FBWlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQZXN1ZG9Db21wbmVudCwgUGVzdWRvQ29tcG5lbnREYXRhIH0gZnJvbSBcIkBSb290L1NoaXlpRnJhbWV3b3JrL1NoaXlpUGVzdWRvQ29tcG5lbnQvUGVzdWRvQ29tcG5lbnRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2FtcGxlQ29tcERhdGEgZXh0ZW5kcyBQZXN1ZG9Db21wbmVudERhdGF7XHJcbiAgICBTYW1wbGVEYXRhOnN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFNhbXBsZUNvbXAgZXh0ZW5kcyBQZXN1ZG9Db21wbmVudHtcclxuICAgIHB1YmxpYyBkYXRhOlNhbXBsZUNvbXBEYXRhPXtcclxuICAgICAgICBTYW1wbGVEYXRhOiBcIlNhbXBsZUNvbXBcIixcclxuICAgICAgICBUaGVtZTogXCJcIlxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTYW1wbGVGdW5jKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTYW1wbGVcIilcclxuICAgICAgICB0aGlzLlJlbmRlcjxTYW1wbGVDb21wRGF0YT4oe1xyXG4gICAgICAgICAgICBcIlNhbXBsZURhdGFcIjpcIlNhbXBsZUNvbXAgQ2xpY2tlZFwiXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSJdfQ==