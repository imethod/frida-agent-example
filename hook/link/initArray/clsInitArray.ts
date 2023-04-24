
import { log } from "../../../agent/logger"
import { clsFunBase } from "../../base/funBase"
import { clsInitFunc } from "./clsInitFunc"

export class clsInitArray extends clsFunBase  {
    initArray: Array<clsInitFunc>
    soName: string

    constructor(ptr: NativePointer, soName: string) {
        super(ptr)
        this.soName = soName
        this.initArray = new Array<clsInitFunc>()

    }
    hook(): void {
        let thisObj = this
        Interceptor.attach(this.address, {
            onEnter: function (args) {
                if (args[1]) {
                    log("call_array: " + args[1])
                    var aryItor: NativePointer = args[1]
                    while (1) {
                        var func: NativePointer = aryItor.readPointer()
                        if (!func.isNull()) {
                            log("func: " + func)
                            thisObj.addInit(new clsInitFunc(func))
                        } else {
                            break
                        }
                        aryItor = aryItor.add(Process.pointerSize)
                    }
                } else {
                    log("call_array is null")
                }
            },
            onLeave: function (retval) {
                log("call_array end")
                thisObj.destroy()
            }
        });
        Interceptor.flush(); // flush the instruction cache
    }
    private addInit(init: clsInitFunc): void {
        this.initArray.push(init)
    }
   
}