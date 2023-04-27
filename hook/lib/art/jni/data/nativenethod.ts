export class NativeMethod{
    name: string
    signature: string
    fnPtr: NativePointer
    constructor(name: string, signature: string, fnPtr: NativePointer) {
        this.name = name
        this.signature = signature
        this.fnPtr = fnPtr
    }
}