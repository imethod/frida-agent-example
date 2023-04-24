import { log } from "console"
import { clsModuleBase } from "../base/moduleBase.js"
import { clsInitArray } from "./initArray/clsInitArray"

class clsLink extends clsModuleBase {
    callInitArray: Array<clsInitArray>
    constructor(soName: string) {
        super(soName)
        this.callInitArray = new Array<clsInitArray>()
    }
    emnuInitArray(): void{
    }
    hook(): void {
        this.hookInitArray()
    }

    hookInitArray(): void {
        log("clsLink:hookInitArray")
        this.modle.enumerateSymbols().forEach(symbol => {
            if (symbol.name == "_dl__ZL10call_arrayIPFviPPcS1_EEvPKcPT_jbS5_") {
                
                log("find _dl__ZL10call_arrayIPFviPPcS1_EEvPKcPT_jbS5_")
                this.callInitArray.push(new clsInitArray(symbol.address, this.soName))
            }
        }
    }
}