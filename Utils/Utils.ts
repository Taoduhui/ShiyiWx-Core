import { StorageKey } from "../Config/StorageConfig/Storage.Config";

export class KeyValuePair<T_K, T_V>{
    public Key: T_K;
    public Value: T_V;
    constructor(_key: T_K, _value: T_V) {
        this.Key = _key;
        this.Value = _value;
    }
}

export const nameof = <T>(name: keyof T) => name;

export class Guid {
    public static newGuid(): Guid {
        return new Guid('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            const r = Math.random() * 16 | 0;
            const v = (c == 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }));
    }
    public static get empty(): string {
        return '00000000-0000-0000-0000-000000000000';
    }
    public get empty(): string {
        return Guid.empty;
    }
    public static isValid(str: string): boolean {
        const validRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return validRegex.test(str);
    }
    private value: string = this.empty;
    constructor(value?: string) {
        if (value) {
            if (Guid.isValid(value)) {
                this.value = value;
            }
        }
    }
    public toString() {
        return this.value;
    }

    public toJSON(): string {
        return this.value;
    }
}

export class List {
    public static Insert<T>(src: Array<T>, item: T, index: number) {
        src.splice(index, 0, item);
        return src;
    }
    public static Remove<T>(src: Array<T>, index: number) {
        src.splice(index, 1);
        return src;
    }
    public static Add<T>(src: Array<T>, item: T) {
        src.push(item);
        return src;
    }
}

export function CreateRecordInstance(instance: any) {
    let ResRecord: Record<string, any> = {}
    type K_T = keyof typeof instance;
    let Proto = instance;
    while (Proto) {
        Object.keys(Proto).map(key => {
            if (!ResRecord[key]) {
                if (typeof Proto[key as K_T] === 'function') {
                    //@ts-ignore
                    ResRecord[key] = (Proto[key as K_T] as Function).bind(instance);
                } else {
                    //ResRecord[key] = Proto[key as K_T]
                }
            }
        })
        Proto = Object.getPrototypeOf(Proto);
    }
    return ResRecord;
}

export function ParseCookie(cookieStr: string): KeyValuePair<string, string> {
    let cookieStrArr: string[] = cookieStr.split('=');
    let key: string = cookieStrArr[0];
    let value: string = cookieStrArr[1].split(';')[0];
    return new KeyValuePair<string, string>(key, value);
}

export function SaveCookies(NewCookies: string[]) {
    if (NewCookies.length > 0) {
        let cookiesMap: Record<string, string> = {};
        if (wx.getStorageSync(StorageKey.Cookies)) {
            cookiesMap = JSON.parse(wx.getStorageSync(StorageKey.Cookies));
        }
        for (let i = 0; i < NewCookies.length; i++) {
            let cookie: KeyValuePair<string, string> = ParseCookie(NewCookies[i]);
            cookiesMap[cookie.Key] = cookie.Value;
        }
        wx.setStorageSync(StorageKey.Cookies, JSON.stringify(cookiesMap));
    }
}

export class TaskGroup {
    public TaskArray: Array<Task<any>> = new Array<Task<any>>();
    private CompleteCounter = 0;
    public Add(task: Task<any>) {
        this.TaskArray.push(task);
    }

    public Run(): Task<Array<Task<any>>> {
        let task = new Task<Array<Task<any>>>(() => {
            this.TaskArray.forEach((value) => {
                value.ContinueWith(() => {
                    this.CompleteCounter++;
                    if (this.CompleteCounter == this.TaskArray.length - 1) {
                        task.Continue(this.TaskArray);
                    }
                }).Run();
            })
        });
        return task;
    }
}


export function printCallStack() {
    var i = 0;
    var fun = arguments.callee;
    do {
        fun = fun.arguments.callee.caller;
        console.log(++i + ': ' + fun);
    } while (fun);
}


export class Task<ResultT = void>{
    protected ContinueAction?: (result: ResultT, task: Task<any>) => any;
    public Result!: ResultT;
    public IsCallbackTask: boolean = false;
    protected Root: Task<any>;
    protected Action?: (task: Task<ResultT>) => ResultT | void;
    protected NextTask!: Task<any>;

    constructor(action?: (task: Task<ResultT>) => ResultT | void, _IsCallbackTask?: boolean) {
        this.Action = action;
        this.IsCallbackTask = _IsCallbackTask ? _IsCallbackTask : false;
        this.Root = this;
    }

    public Run: () => Task<ResultT> = () => {
        if (this.Action) {
            let ActionResult = this.Action(this);
            if (ActionResult) {
                this.Result = ActionResult;
            }
        }
        if (!this.IsCallbackTask) {
            this._continue();
        }
        return this;
    }

    public static Run<ResultT>(action: (task: Task<ResultT>) => ResultT): Task<ResultT> {
        let task: Task<ResultT> = new Task<ResultT>(action);
        return task.Run();
    }

    public _continue(result?: ResultT): Task<ResultT> {
        if (result) {
            this.Result = result;
        }
        if (this.ContinueAction) {
            let ContinueResult = this.ContinueAction(this.Result, this.NextTask);
            this.NextTask.Result = ContinueResult;
            if (!this.NextTask.IsCallbackTask) {
                this.NextTask._continue();
            }
        }
        return this;
    }

    public Continue(result?: ResultT): Task<ResultT> {
        // if (!this.NextTask.IsCallbackTask) {
        //     console.warn(this.ContinueAction, "You call Continue,but has not set _IsCallbackTask as true");
        // }
        this.IsCallbackTask=true;
        return this._continue(result);
    }

    public ContinueWith<ContinueResult = void>(
        Action: (result: ResultT, task: Task<ContinueResult>) => ContinueResult | void,
        _IsCallbackTask?: boolean)
        : Task<ContinueResult> {
        this.ContinueAction = Action;
        this.NextTask = new Task<ContinueResult>();
        this.NextTask.Root = this.Root;
        this.NextTask.IsCallbackTask = _IsCallbackTask ? _IsCallbackTask : false;
        this.NextTask.Run = this.Root.Run.bind(this.Root);
        return this.NextTask;
    }

    public static PrintFlow(task: Task<any>) {
        let root = task.Root;
        let currentTask = root;
        while (currentTask) {
            currentTask = currentTask.NextTask;
        }
    }
}

export class AsyncGroup {
    private AsyncFuncMap: Map<string, (callback: (result: any) => void) => any>
    private ResultMap: Map<string, any> = new Map<string, any>();
    private CompletedCnt: number;

    //@ts-ignore
    private Complete: (result: Map<string, any>) => void;

    constructor(_asyncFuncMap: Map<string, (callback: (result: any) => void) => any>) {
        this.AsyncFuncMap = _asyncFuncMap;
        this.CompletedCnt = this.AsyncFuncMap.size;
    }

    public Run(): AsyncGroup {
        this.AsyncFuncMap.forEach((func, key) => {
            func((result) => {
                this.ResultMap.set(key, result);
                this.CheckComplete();
            });
        })
        return this;
    }

    public ContinueWith(callback: (result: Map<string, any>) => void): AsyncGroup {
        this.Complete = callback;
        return this;
    }

    private lock: boolean = false;
    private CheckComplete() {
        while (this.lock) { }
        this.lock = true;
        this.CompletedCnt--;
        if (this.CompletedCnt == 0) {
            this.Complete(this.ResultMap)
        }
        this.lock = false;
    }
}