export  interface funInterface {
    address: NativePointer
    callbacks?: InvocationListenerCallbacks | InstructionProbeCallback | undefined
    replacement?: NativePointerValue | undefined
    data?: NativePointerValue | undefined

    hook(): void
    replace(replacement: NativePointerValue | undefined): void 
    
    destroy(): void 

}