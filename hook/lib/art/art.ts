import { Modulebase } from "../../base/modulebase.js";
import { RegisterNative } from "./jni/registernative.js";
export class Art extends Modulebase {
    registerNatives!: RegisterNative
    constructor(soName: string = "libart.so") {
        super(soName)
    }
    hook(): void {
        this.hookRegisterNative()
    }
    hookRegisterNative(): void {
        logd("Art:hookRegisterNative")
        this.modle.enumerateSymbols().forEach(symbol => {
            if (symbol.name.indexOf("art") >= 0 &&
                symbol.name.indexOf("JNI") >= 0 &&
                symbol.name.indexOf("RegisterNatives") >= 0 &&
                symbol.name.indexOf("CheckJNI") < 0) {
                this.registerNatives = new RegisterNative(symbol.address)
                this.registerNatives.hook()
            }
        })
    }
}