
import { Modulebase } from "../../base/modulebase.js"
import { Initarray } from "./initArray/InitArray.js"
import { Dlopen } from "./loadlibrary/dlopen.js"
import { Dlopen_ext } from "./loadlibrary/dlopen_ext.js"

export class Link extends Modulebase {
    initArray!: Initarray
    dlopen!: Dlopen
    dlopen_ext!: Dlopen_ext
    constructor(soName: string = "linker64") {
        super(soName)
    }
    emnuInitArray(): void{
    }
    hook(): void {
        this.hookLoadLibrary()
        this.hookInitArray()
    }

    hookLoadLibrary(): void { 
        logd("clsLink:hookDlopen")
        this.modle.enumerateExports().forEach(symbol => {
            if (symbol.name == "__loader_dlopen") {
                logd("find __loader_dlopen")
                this.dlopen = new Dlopen(symbol.address)
                this.dlopen.hook()
            }
            if (symbol.name == ("__loader_android_dlopen_ext")) {
                logd("find __loader_android_dlopen_ext")
                this.dlopen_ext = new Dlopen_ext(symbol.address)
                this.dlopen_ext.hook()
            }
        })
    }

    hookInitArray(): void {
        logd("clsLink:hookInitArray")
        this.modle.enumerateSymbols().forEach(symbol => {
            if (symbol.name == "__dl__ZL10call_arrayIPFviPPcS1_EEvPKcPT_mbS5_") {
                log("find __dl__ZL10call_arrayIPFviPPcS1_EEvPKcPT_mbS5_")
                this.initArray = new Initarray(symbol.address)
                this.initArray.hook()
            }
        })
    }
}


