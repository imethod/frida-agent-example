import { FunBase } from "../../../base/funbase.js"
import { Initfunc } from "./InitFunc.js"

export class Initarray extends FunBase {
    initArray: Map<string, Initfunc[]>
    soName: string = ""

    constructor(ptr: NativePointer) {
        super(ptr)
        this.initArray = new Map<string, Initfunc[]>()
    }
    hook(): void {
        let thisObj = this
        Interceptor.attach(this.address, {
            onEnter: function (args) {
                logd("call_array arg1: " + args[1])
                logd("call_array arg3: " + args[3].readCString())
                var initFuncs: Initfunc[] = []
                if (!args[1].isNull()) {
                    var name = args[3].readCString()
                    let initarry: NativePointer = args[1]
                    while (1) {
                        let initFunc = initarry.readPointer()
                        if (initFunc.isNull()) {
                            break
                        }
                        initFuncs.push(new Initfunc(initFunc))
                        logd("initFunc: " + initFunc)
                        initarry = initarry.add(Process.pointerSize)
                    }
                    thisObj.addInit(name!, initFuncs )
                } else {
                    var name = args[3].readCString()
                    thisObj.addInit(name!, initFuncs)
                }
            },
            onLeave: function (retval) {
                log("call_array end")
            }
        });
        Interceptor.flush(); // flush the instruction cache
    }
    private addInit(name: string,item: Initfunc[]): void {
        this.initArray.set(name, item)
    }

}