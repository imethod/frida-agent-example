import { VM, InstPosition, VMAction, Options, MemoryAccessType, AnalysisType, RegisterAccessType, OperandType } from "./arm/frida-qbdi.js";


export class Qbdi{
    address: NativePointer
    constructor(address: NativePointer) { 
        this.address = address
        Module.load("/data/local/tmp/libQBDI64.so")

        let vm = new VM();
        vm.allocateVirtualStack(vm.getGPRState(), 0x100000);
        vm.addInstrumentedModuleFromAddr(this.address.toUInt32())
        
        let module = Process.findModuleByAddress(this.address)
        logd("modle base: " + module!.base)
        let user_data = {
            "module_base": module!.base,
            "module_name": module!.name
        }

        var icbk = vm.newInstCallback(function (vm: any, gpr: any, fpr: any, data: any) {
            let _user_data = data;
            var inst = vm.getInstAnalysis();
            // Display instruction dissassembly
            let log = "0x" + inst.address.toString(16) + " [" + inst.module + "!0x" + (inst.address - _user_data.module_base).toString(16) + "] " + inst.disassembly + "\t";

            console.log(log);
            return VMAction.CONTINUE;
        });

        vm.addCodeCB(InstPosition.PREINST as any, icbk, user_data);
        vm.call(this.address.toUInt32(), [42]);
    }
}