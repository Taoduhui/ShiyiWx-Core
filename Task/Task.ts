export class TaskGroup {
    public TaskArray: Array<Task<any>> = new Array<Task<any>>();
    private CompleteCounter = 0;
    public Add(task: Task<any>) {
        this.TaskArray.push(task);
    }

    public AllTask(): Task<Array<Task<any>>> {
        let task = new Task<Array<Task<any>>>(() => {
            this.TaskArray.forEach((value) => {
                value.ContinueWith(() => {
                    this.CompleteCounter++;
                    if (this.CompleteCounter == this.TaskArray.length) {
                        task.Continue(this.TaskArray);
                    }
                }).Run(); 
            })
        },true);
        return task;
    }
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

    public static Group<T extends Record<string,Task<any>>>(TaskGroupObj:T):Task<T>{
        let group = new TaskGroup();
        Object.keys(TaskGroupObj).forEach(key=>{
            group.Add(TaskGroupObj[key]);
        })
        let group_task = new Task<T>((task)=>{
            group.AllTask().ContinueWith(()=>{
                task.Continue(TaskGroupObj)
            }).Run();
        },true);
        return group_task;
    }

    public static Delay(ms:number):Task<void>{
        return new Task<void>((task)=>{
            setTimeout(()=>{
                task.Continue();
            },ms);
        },true)
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

    /**
     * 回调类Task中 Task执行完毕时调用
     * @param result Task执行结果
     * @returns 
     */
    public Continue(result?: ResultT): Task<ResultT> {
        // if (!this.NextTask.IsCallbackTask) {
        //     console.warn(this.ContinueAction, "You call Continue,but has not set _IsCallbackTask as true");
        // }
        this.IsCallbackTask = true;
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

    public ContinueWithTask<ContinueResult = void>(
        NextTask: Task<ContinueResult>)
        : Task<ContinueResult> {
        return this.ContinueWith((_,task)=>{
            NextTask.ContinueWith((result)=>{
                task.Continue(result);
            }).Run();
        },true);
        
    }

    public Delay(ms:number){
        return this.ContinueWithTask(Task.Delay(ms));
    }

    public static PrintFlow(task: Task<any>) {
        let root = task.Root;
        let currentTask = root;
        while (currentTask) {
            currentTask = currentTask.NextTask;
        }
    }
}
