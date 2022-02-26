import { PesudoCompnent, PesudoCompnentData } from "@Root/ShiyiFramework/ShiyiPesudoCompnent/PesudoCompnent";
import { Debug } from "@Root/ShiyiFramework/Utils/Utils";

export interface SampleCompData extends PesudoCompnentData{
    SampleData:string;
}

export class SampleComp extends PesudoCompnent{
    public data:SampleCompData={
        SampleData: "SampleComp",
        Theme: "",
        Visible: false
    }

    public SampleFunc(){
        Debug(3)("Sample")
        this.Render<SampleCompData>({
            "SampleData":"SampleComp Clicked"
        })
    }
}