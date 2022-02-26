export class List<T>{

    private Data:Array<T>=[];

    public get o():Array<T>{
        return this.Data;
    }

    constructor(data?:Array<T>){
        this.Data = data?data:[];
    }

    public First(){
        return this.Data[0];
    }

    public Reverse(){
        return  List.Ref(this.Clone().o.reverse());
    }

    public Clone(){
        return List.New(this.o);
    }

    public At(index:number){
        return this.o[index];
    }

    public Set(index:number,item:T){
        return this.o[index]=item;
    }

    public Distinct(selector:(item:T)=>any){
        let temp=new List<any>();
        let result = new List<T>();
        this.Data.forEach(value=>{
            let key =  selector(value);
            if(!temp.Contains(key)){
                result.Add(value);
                temp.Add(key);
            }
        })
        return result;
    }

    public static Ref<T>(data:Array<T>):List<T>{
        return new List(data);
    }

    public static New<T>(data:Array<T>):List<T>{
        let NewData:Array<T>=[];
        data.forEach(item =>{
            NewData.push(item);
        })
        return new List<T>(NewData);
    }

    public Add(item:T){
        this.Data.push(item);
        return this;
    }

    public AddRange(OtherList:List<T>){
        this.Data = this.Data.concat(OtherList.o);
        return this;
    }

    public get ForEach(){
        return this.o.forEach
    }

    public Insert(index:number,item:T){
        this.Data.splice(index,0,item);
        return this;
    }

    public ToArray(){
        return this.o;
    }

    public Remove(item:T){
        this.Data.splice(this.Data.indexOf(item),1);
        return this;
    }

    public RemoveAt(index:number){
        this.Data.splice(index,0);
        return this;
    }

    public Where(selector:(value:T)=>boolean){
        let Result:List<T> = new List<T>();
        this.Data.forEach(value=>{
            if(selector(value)){
                Result.Add(value);
            }
        })
        return Result;
    }

    public Select<S_T>(selector:(item:T)=>S_T){
        let Result:List<S_T> = new List<S_T>();
        this.Data.forEach(value=>{
            Result.Add(selector(value));
        })
        return Result;
    }

    public Contains(item:T){
        return this.Data.indexOf((item))>=0;
    }

    public Count(item?:T){
        if(item){
            let cnt=0;
            this.Data.forEach(i=>{
                if(i==item){
                    cnt++;
                }
            })
            return cnt;
        }
        return this.Data.length;
    }

    public Single(selector:(value:T)=>boolean):null|T{
        let result = null;
        this.Data.forEach(item=>{
            if(selector(item)){
                result = item;
            }
        })
        return result;
    }



    public ConvertAll<OutputT>(convertor:(item:T)=>OutputT):List<OutputT>{
        let Result:List<OutputT>=new List<OutputT>();
        this.Data.forEach(item=>{
            Result.Add(convertor(item));
        })
        return Result;
    }

    public Skip(num:number){
        this.o.splice(0,num);
        return this;
    }

    public Take(num:number){
        return List.New(this.o.splice(0,num))
    }

    
}