import { ITarget, IuiOption } from "../IuiOption";

interface DataChangeCurrentTarget extends ITarget {
    dataset:{
        key:string;
    }
}

interface DataChangeDetail{
    value:string;
}

export interface DataChangeOption extends IuiOption{
    detail:DataChangeDetail;
    currentTarget:DataChangeCurrentTarget;
}