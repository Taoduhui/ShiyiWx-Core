import { PageMapItem } from "@Root/ShiyiFramework/Router/Router";

export enum PageName {
    index, Exam, AddChild, UserInfo,Evaluation,ModifyChild
}

export enum DirectoryName {
    ChildrenManager, UserInfoManager
}

/**
 * 仅嵌套目录需要在此定义
 */
export const PageMap: Array<PageMapItem> = [
    {
        name: DirectoryName.ChildrenManager,
        children: [{
            name: PageName.AddChild,
            children: []
        },{
            name:PageName.ModifyChild,
            children:[]
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
]