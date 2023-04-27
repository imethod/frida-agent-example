import { FunBase } from "../../../base/funbase.js"

export class Initfunc extends FunBase {
    constructor(ptr: NativePointer) {
        super(ptr)
    }
    hook(): void {
        Interceptor.attach(this.address, {
            onEnter: function (args) {
                console.log("initFunc is call: " + this.address)
                
            },
            onLeave: function (retval) {
                console.log("initFunc is end: " + this.address)
            }
        })
        Interceptor.flush() // flush the instruction cache
    }
}