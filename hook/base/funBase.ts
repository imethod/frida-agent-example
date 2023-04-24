
import { funInterface} from "../Interface/funInterface.js"

export class clsFunBase implements funInterface {
    address: NativePointer
    callbacks?: InvocationListenerCallbacks | InstructionProbeCallback | undefined
    replacement: NativePointerValue | undefined
    data?: NativePointerValue | undefined

    hook(): void {
        if (this.callbacks == undefined) {
            Interceptor.attach(this.address, {
                onEnter: function (args) {
                    log("onEnter: " + this.address)
                },
                onLeave: function (retval) {
                    log("onLeave: " + retval)
                }
            })
        } else {
            Interceptor.attach(this.address, this.callbacks, this.data)
        }
        Interceptor.flush() // flush the instruction cache
    }
    replace(replacement: NativePointerValue | undefined): void {
        this.replacement = replacement

        if (this.replacement != undefined) {
            Interceptor.replace(this.address, this.replacement)
        } else {
            log("replacement is undefined")
        }
    }
    constructor(address: NativePointer, callbacks?: InvocationListenerCallbacks | InstructionProbeCallback | undefined, data?: NativePointerValue | undefined) {

        this.address = address
        this.callbacks = callbacks
        this.data = data
    }

    destroy(): void {
        if (this.address != undefined) {
            Interceptor.revert(this.address)
        }
    }



}