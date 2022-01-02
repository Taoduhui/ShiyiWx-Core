import { PesudoCompnent, PesudoCompnentData } from "@Root/ShiyiFramework/ShiyiPesudoCompnent/PesudoCompnent";

export interface SampleCompData extends PesudoCompnentData{
    SampleData:string;
}

export class SampleComp extends PesudoCompnent{
    public data:SampleCompData={
        SampleData: "SampleComp",
        Theme: ""
    }

    public SampleFunc(){
        console.log("Sample")
        this.Render<SampleCompData>({
            "SampleData":"SampleComp Clicked"
        })
    }
}