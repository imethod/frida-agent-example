
import { Modulebase } from "../../base/modulebase.js"
import { Initarray } from "./initArray/InitArray.js"
import { Dlopen } from "./loadlibrary/dlopen.js"
import { Dlopen_ext } from "./loadlibrary/dlopen_ext.js"

export class Link extends Modulebase {
    initArray!: Initarray
    dlopen!: Dlopen
    dlopen_ext!: Dlopen_ext
    constructor(soName: string = "linker64") {
        if (Process.arch == "arm") {
            soName = "linker"
        }
        super(soName)

        this.newLoadLibrary()
        this.newInitArray()
    }
    emnuInitArray(): void{
    }
    hook(): void {
        this.initArray.hook()
        this.dlopen.hook()
        this.dlopen_ext.hook()
    }

    newLoadLibrary(): void { 
        logd("clsLink:hookDlopen")
        this.modle.enumerateExports().forEach(symbol => {
            if (symbol.name == "__loader_dlopen") {
                logd("find __loader_dlopen")
                this.dlopen = new Dlopen(symbol.address)
            }
            if (symbol.name == ("__loader_android_dlopen_ext")) {
                logd("find __loader_android_dlopen_ext")
                this.dlopen_ext = new Dlopen_ext(symbol.address)
            }
        })
    }

    newInitArray(): void {
        logd("clsLink:hookInitArray")
        this.modle.enumerateSymbols().forEach(symbol => {
            if (Process.arch == "arm") {
                //__dl__ZL10call_arrayIPFviPPcS1_EEvPKcPT_jbS5_
                if (symbol.name == "__dl__ZL10call_arrayIPFviPPcS1_EEvPKcPT_jbS5_") {
                    this.initArray = new Initarray(symbol.address)

                    log("find __dl__ZL10call_arrayIPFviPPcS1_EEvPKcPT_jbS5_")
                }

            } else {
            if (symbol.name == "__dl__ZL10call_arrayIPFviPPcS1_EEvPKcPT_mbS5_") {
                this.initArray = new Initarray(symbol.address)

                log("find __dl__ZL10call_arrayIPFviPPcS1_EEvPKcPT_mbS5_")
            }

             }

           
        })
    }
}


