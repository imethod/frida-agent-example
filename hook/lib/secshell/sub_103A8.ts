import { FunBase } from "../../base/funbase";

export class sub_103A8 extends FunBase {
    constructor(ptr: NativePointer) {
        super(ptr)
    }
    hook(callbacks?: InvocationListenerCallbacks | InstructionProbeCallback | undefined, data?: NativePointerValue | undefined): void {
        super.hook({
            onEnter: function (args) {
                log("onEnter: " + this.address)
            },
            onLeave: function (retval) {
                log("onLeave: " + retval)
            }
        })
    }
}