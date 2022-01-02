"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageMap = exports.DirectoryName = exports.PageName = void 0;
var PageName;
(function (PageName) {
    PageName[PageName["index"] = 0] = "index";
    PageName[PageName["Exam"] = 1] = "Exam";
    PageName[PageName["AddChild"] = 2] = "AddChild";
    PageName[PageName["UserInfo"] = 3] = "UserInfo";
    PageName[PageName["Evaluation"] = 4] = "Evaluation";
    PageName[PageName["ModifyChild"] = 5] = "ModifyChild";
})(PageName = exports.PageName || (exports.PageName = {}));
var DirectoryName;
(function (DirectoryName) {
    DirectoryName[DirectoryName["ChildrenManager"] = 0] = "ChildrenManager";
    DirectoryName[DirectoryName["UserInfoManager"] = 1] = "UserInfoManager";
})(DirectoryName = exports.DirectoryName || (exports.DirectoryName = {}));
exports.PageMap = [
    {
        name: DirectoryName.ChildrenManager,
        children: [{
                name: PageName.AddChild,
                children: []
            }, {
                name: PageName.ModifyChild,
                children: []
            }],
        isDir: true,
    }, {
        name: DirectoryName.UserInfoManager,
        children: [{
                name: PageName.UserInfo,
                children: []
            }],
        isDir: true
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGVyLkNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJvdXRlci5Db25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsSUFBWSxRQUVYO0FBRkQsV0FBWSxRQUFRO0lBQ2hCLHlDQUFLLENBQUE7SUFBRSx1Q0FBSSxDQUFBO0lBQUUsK0NBQVEsQ0FBQTtJQUFFLCtDQUFRLENBQUE7SUFBQyxtREFBVSxDQUFBO0lBQUMscURBQVcsQ0FBQTtBQUMxRCxDQUFDLEVBRlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFFbkI7QUFFRCxJQUFZLGFBRVg7QUFGRCxXQUFZLGFBQWE7SUFDckIsdUVBQWUsQ0FBQTtJQUFFLHVFQUFlLENBQUE7QUFDcEMsQ0FBQyxFQUZXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBRXhCO0FBS1ksUUFBQSxPQUFPLEdBQXVCO0lBQ3ZDO1FBQ0ksSUFBSSxFQUFFLGFBQWEsQ0FBQyxlQUFlO1FBQ25DLFFBQVEsRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUTtnQkFDdkIsUUFBUSxFQUFFLEVBQUU7YUFDZixFQUFDO2dCQUNFLElBQUksRUFBQyxRQUFRLENBQUMsV0FBVztnQkFDekIsUUFBUSxFQUFDLEVBQUU7YUFDZCxDQUFDO1FBQ0YsS0FBSyxFQUFFLElBQUk7S0FDZCxFQUFFO1FBQ0MsSUFBSSxFQUFFLGFBQWEsQ0FBQyxlQUFlO1FBQ25DLFFBQVEsRUFBRSxDQUFDO2dCQUNQLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUTtnQkFDdkIsUUFBUSxFQUFFLEVBQUU7YUFDZixDQUFDO1FBQ0YsS0FBSyxFQUFFLElBQUk7S0FDZDtDQUNKLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYWdlTWFwSXRlbSB9IGZyb20gXCJAUm9vdC9TaGl5aUZyYW1ld29yay9Sb3V0ZXIvUm91dGVyXCI7XHJcblxyXG5leHBvcnQgZW51bSBQYWdlTmFtZSB7XHJcbiAgICBpbmRleCwgRXhhbSwgQWRkQ2hpbGQsIFVzZXJJbmZvLEV2YWx1YXRpb24sTW9kaWZ5Q2hpbGRcclxufVxyXG5cclxuZXhwb3J0IGVudW0gRGlyZWN0b3J5TmFtZSB7XHJcbiAgICBDaGlsZHJlbk1hbmFnZXIsIFVzZXJJbmZvTWFuYWdlclxyXG59XHJcblxyXG4vKipcclxuICog5LuF5bWM5aWX55uu5b2V6ZyA6KaB5Zyo5q2k5a6a5LmJXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgUGFnZU1hcDogQXJyYXk8UGFnZU1hcEl0ZW0+ID0gW1xyXG4gICAge1xyXG4gICAgICAgIG5hbWU6IERpcmVjdG9yeU5hbWUuQ2hpbGRyZW5NYW5hZ2VyLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICBuYW1lOiBQYWdlTmFtZS5BZGRDaGlsZCxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFtdXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIG5hbWU6UGFnZU5hbWUuTW9kaWZ5Q2hpbGQsXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOltdXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgaXNEaXI6IHRydWUsXHJcbiAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogRGlyZWN0b3J5TmFtZS5Vc2VySW5mb01hbmFnZXIsXHJcbiAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgIG5hbWU6IFBhZ2VOYW1lLlVzZXJJbmZvLFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW11cclxuICAgICAgICB9XSxcclxuICAgICAgICBpc0RpcjogdHJ1ZVxyXG4gICAgfVxyXG5dIl19