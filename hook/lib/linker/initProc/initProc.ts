import { FunBase } from "../../../base/funbase.js"

export class InitProc extends FunBase {
    soName: string = ""

    constructor(ptr: NativePointer) {
        super(ptr)
    }
    hook(callbacks?: InvocationListenerCallbacks | InstructionProbeCallback | undefined, data?: NativePointerValue | undefined): void {
        if (callbacks) {
            super.hook(callbacks, data)
            return
        }
        let thisObj = this
        Interceptor.attach(this.address, {
            onEnter: function (args) {
            },
            onLeave: function (retval) {
            }
        });


        Interceptor.flush(); // flush the instruction cache
    }

}