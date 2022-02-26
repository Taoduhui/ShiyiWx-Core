import { StorageKey } from "../Config/StorageConfig/Storage.Config";
import { DebugLevel } from "../Config/UtilsConfig/Utils.Config";

export class KeyValuePair<T_K, T_V>{
    public Key: T_K;
    public Value: T_V;
    constructor(_key: T_K, _value: T_V) {
        this.Key = _key;
        this.Value = _value;
    }
}


// var consolelog:any;

export function Debug(level:number):(...arg:any)=>any{
    //@ts-ignore
    if (DebugLevel == 0) {
        return (..._:any)=>{};
    } else if (level <= DebugLevel) {
        return console.log;
    }
    return (..._:any)=>{};
}

// export function EnableShiyiDebug() {
//     consolelog = console.log;
//     console.log = (...arg:any)=>{
        
//     };

//     // console.log = (function (oriLogFunc) {
//     //     return function () {
//     //         //if (!Config.isProduct) {
//     //             try {
//     //                 oriLogFunc.call(console, ...arguments);
//     //             } catch (e) {
//     //                 console.error('console.log error', e);
//     //             }
//     //         //}
//     //     }
//     // })(console.log);
//     // console.log("test console.log");
// }

export function ShiyiDebug(level: number, ...args: any) {
    if (level == 0) {
        return;
    } else if (level <= DebugLevel) {
        Debug(3)( args)
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