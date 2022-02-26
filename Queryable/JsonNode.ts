// export enum JsonNodeType{
//     String,Number,Record,Array,Function
// }

// export const DefaultEmptyValue=[
//     "",0,{},[],()=>{}
// ]

// export class JsonNode<T>{
//     private Data:Record<string,any>|any;

//     public get o():Record<string,any>{
//         return this.Data;
//     }

//     public NodeKey:string="";
//     public ParentNode:JsonNode<any>|null = null;

//     constructor(data:Record<string,any>){
//         this.Data=data;
//     }

//     public static Ref(data:Record<string,any>){
//         return new JsonNode(data);
//     }

//     public IsNull():boolean{
//         if(!this.Data){
//             return this.Data===null || typeof this.Data == 'undefined';
//         }
//         return false;
//     }

//     public Set(value:any){
//         if(this.ParentNode){
//             this.ParentNode.o[this.NodeKey] = value;
//         }else{
//             this.Data=value;
//         }
//     }

//     public Get<T>(Key:string,DefaultValue?:any):JsonNode<T>{
//         let ChildNode = JsonNode.Ref(this.Data[Key])
//         if(DefaultValue&&ChildNode.IsNull()){
//             ChildNode.Set(DefaultValue);
//         }
//         return ChildNode;
//     }

//     public get Value():Record<string,any>|string|number{
//         return this.Data;
//     }
// }