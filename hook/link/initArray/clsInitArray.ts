
import { clsFunBase } from "../../base/funBase.js"
import { clsInitFunc } from "./clsInitFunc.js"

export class clsInitArray extends clsFunBase  {
    initArray: Array<clsInitFunc>
    soName: string =""

    constructor(ptr: NativePointer) {
        super(ptr)
        this.initArray = new Array<clsInitFunc>()

    }
    hook(): void {
        let thisObj = this
        Interceptor.attach(this.address, {
            onEnter: function (args) {
                if (args[1]) {
                    hexdump(args[1])
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