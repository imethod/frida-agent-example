
import { clsModuleBase } from "../base/moduleBase.js"
import { clsInitArray } from "./initArray/clsInitArray.js"


export class clsLink extends clsModuleBase {
    callInitArray: Array<clsInitArray>
    constructor(soName: string = "linker") {
        super(soName)
        this.callInitArray = new Array<clsInitArray>()
    }
    emnuInitArray(): void{
    }
    hook(): void {
        this.hookInitArray()
    }

    hookDlopen(): void { 
        logd("clsLink:hookDlopen")
        this.modle.enumerateSymbols().forEach(symbol => {
            if (symbol.name == "android_dlopen_ext") {
                logd("find android_dlopen_ext")
            }
        })
    }

    hookInitArray(): void {
        logd("clsLink:hookInitArray")
        this.modle.enumerateSymbols().forEach(symbol => {
            if (symbol.name == "_dl__ZL10call_arrayIPFviPPcS1_EEvPKcPT_jbS5_") {
                logd("find _dl__ZL10call_arrayIPFviPPcS1_EEvPKcPT_jbS5_")
                this.callInitArray.push(new clsInitArray(symbol.address))
            }
        })
    }
}


