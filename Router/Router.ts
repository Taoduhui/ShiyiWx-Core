import { PageName, DirectoryName, PageMap } from "../Config/RouterConfig/Router.Config";
import { ShiyiPageBase } from "../ShiyiPage/Base/ShiyiPageBase";
import { Task } from "../Task/Task";
import { Debug } from "../Utils/Utils";


export interface PageMapItem {
    name: PageName|DirectoryName,
    children: Array<PageMapItem>,
    isDir?:boolean,
}

interface WaitForBackTask{
    task:Task<any>,
    pageInstance:ShiyiPageBase|undefined
}

export class Router {
    public static TryGetMapPath(name: PageName, CurrentPath: string, map: Array<PageMapItem>): string {
        for (let i = 0; i < map.length; i++) {
            let a = CurrentPath + "/" +(map[i].isDir?DirectoryName[map[i].name]:PageName[map[i].name]);
            let Res = Router.TryGetMapPath(name, CurrentPath + "/" +(map[i].isDir?DirectoryName[map[i].name]:PageName[map[i].name]), map[i].children);
            if (Res) {
                return Res;
            }
            if (map[i].name == name && !map[i].isDir) {
                return CurrentPath + "/" +(map[i].isDir?DirectoryName[map[i].name]:PageName[map[i].name]) + "/" + PageName[map[i].name];
            }
        }
        return "";
    }

    private static GetPagePath(name: PageName): string {
        let Path = Router.TryGetMapPath(name, "/pages", PageMap);
        if (Path) {
            return Path;
        } else {
            return "/pages/" + PageName[name] + "/" + PageName[name];
        } 
    }

    public static PageStacks: Array<ShiyiPageBase> = new Array<ShiyiPageBase>();

    private static RegisteredDataObservers: Map<ShiyiPageBase, Array<(page: ShiyiPageBase) => void>>
        = new Map<ShiyiPageBase, Array<(page: ShiyiPageBase) => void>>();
    
    private static WaitForBackTaskStacks:Array<WaitForBackTask>=new Array<WaitForBackTask>();

    public static PageLoad(page: ShiyiPageBase): void {
        if(Router.WaitForBackTaskStacks.length>0&&!Router.WaitForBackTaskStacks[Router.WaitForBackTaskStacks.length-1].pageInstance){
            Router.WaitForBackTaskStacks[Router.WaitForBackTaskStacks.length-1].pageInstance=page;
        }
        Router.PageStacks.push(page);
        Debug(5)("PageLoaded",page)
    }

    public static NavigatebackParam:Record<string,any>={};
    public static PageUnload(): void {
        let Observers = Router.RegisteredDataObservers.get(Router.CurrentPage);
        if (Observers) {
            for (let Notification of Observers) {
                Notification(Router.CurrentPage)
            }
        }
        let page = Router.PageStacks.pop();
        Debug(5)("PageUnload",page)
        if(page){
            if(Router.WaitForBackTaskStacks[Router.WaitForBackTaskStacks.length-1].pageInstance==page){
                Router.WaitForBackTaskStacks[Router.WaitForBackTaskStacks.length-1].task.Continue(Router.NavigatebackParam);
                Router.WaitForBackTaskStacks.pop();
            }
        }
        Router.NavigatebackParam={};
    }

    /**
     * 绑定指定页面Unloaded事件
     * @param page 要绑定的页面
     * @param notification Unload时处理函数
     */
    public static RegisterPageUnLoaded(page: ShiyiPageBase,notification:(page: ShiyiPageBase) => void): void {
        let Observers = Router.RegisteredDataObservers.get(page);
        if (!Observers) {
            Observers = new Array<(page: ShiyiPageBase) => void>();
        }
        Observers.push(notification);
        Router.RegisteredDataObservers.set(page, Observers);
    }

    public static NavigateParam: any
    public static NavigateTo(name: PageName, param?: any): Task<any> {
        Router.NavigateParam = param ? param : undefined;
        
        wx.navigateTo({
            url: Router.GetPagePath(name)
        });
        let task = new Task(()=>{},true);
        Router.WaitForBackTaskStacks.push({
            task:task,
            pageInstance:undefined
        })
        return task;
    }

    public static NavigateBack(Param?:any) {
        Router.NavigatebackParam=Param;
        wx.navigateBack();
    }

    public static readonly CurrentPage: ShiyiPageBase;
    public get CurrentPage(): ShiyiPageBase {
        return Router.PageStacks[Router.PageStacks.length - 1];
    }
}
