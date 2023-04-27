import { FunBase } from "../../../base/funbase.js";
import { NativeMethod } from "./data/nativenethod.js";

export class RegisterNative extends FunBase{
    nativeMethods: NativeMethod[]
    constructor(addr:NativePointer){
        super(addr)
        this.nativeMethods = []
    }
    hook() {
        let thisObj = this
        Interceptor.attach(this.address, {
            onEnter: function (args) {
                console.log("[RegisterNatives] method_count:", args[3]);
                let java_class = args[1];
                let class_name = Java.vm.tryGetEnv().getClassName(java_class);
                //console.log(class_name);

                let methods_ptr = args[2];

                let method_count = args[3].toUInt32();
                for (let i = 0; i < method_count; i++) {
                    let name_ptr = (methods_ptr.add(i * Process.pointerSize * 3)).readPointer();
                    let sig_ptr = (methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize)).readPointer();
                    let fnPtr_ptr = (methods_ptr.add(i * Process.pointerSize * 3 + Process.pointerSize * 2)).readPointer();

                    let name = (name_ptr).readCString();
                    let sig = (sig_ptr).readCString();
                    let symbol = DebugSymbol.fromAddress(fnPtr_ptr)
                    thisObj.nativeMethods.push(new NativeMethod(name!, sig!, fnPtr_ptr))

                    console.log("[RegisterNatives] java_class:", class_name, "name:", name, "sig:", sig, "fnPtr:", fnPtr_ptr, " fnOffset:", symbol, " callee:", DebugSymbol.fromAddress(this.returnAddress));
                }
            },
            onLeave: function (retval) {
            }
        });
    }
}