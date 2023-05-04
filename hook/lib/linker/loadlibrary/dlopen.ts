import { FunBase as Funbase } from "../../../base/funbase.js";

export class Dlopen extends Funbase {
    loadModule!: string[]
    constructor(address: NativePointer) { 
        super(address)
        this.loadModule = []
    }
    hook(callbacks?: InvocationListenerCallbacks | InstructionProbeCallback | undefined, data?: NativePointerValue | undefined): void {
        if (callbacks) {
            super.hook(callbacks, data)
            return
        }
        let thisObj = this
        super.hook({
            onEnter: function (args) {
                var pathptr = args[0];
                if (pathptr) {
                    this.path = (pathptr).readCString();
                    thisObj.loadModule.push(this.path);
                    log("dlopen:"+this.path);
                }
            },
            onLeave: function (retval) {
                logd("dlopen end")
            }
        }, callbacks)
    }
}