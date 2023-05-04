import { FunBase } from "../../../base/funbase.js"

export class Initfunc extends FunBase {
    constructor(ptr: NativePointer) {
        super(ptr)
    }
    hook(callbacks?: InvocationListenerCallbacks | InstructionProbeCallback | undefined, data?: NativePointerValue | undefined): void {
        if (callbacks) {
            super.hook(callbacks, data)
            return
        }
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