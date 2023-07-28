import { VM, InstPosition, VMAction, Options, MemoryAccessType, AnalysisType, RegisterAccessType, OperandType, GPRState, SyncDirection, VMEvent } from "./arm/frida-qbdi.js";


export class Qbdi {
    address: NativePointer
    constructor(address: NativePointer, context: ArmCpuContext) {
        this.address = address
        Module.load("/data/local/tmp/libQBDI.so")

        let vm = new VM();

        var state = vm.getGPRState();
        state.synchronizeContext(context, SyncDirection.FRIDA_TO_QBDI); // set up QBDI's context
        var stack = vm.allocateVirtualStack(state, 0x10000); // allocate a virtual stack
        

        let module = Process.findModuleByAddress(this.address)
        logd("modle base: " + module!.base)
        var image = 0xBF5E7721 - 0x11721
        let user_data = {
            "module_base": module!.base,
            "module_image": image,
            "module_name": module!.name
        }
        vm.addInstrumentedModuleFromAddr(this.address.toUInt32())
        vm.addInstrumentedRange(module!.base.sub(0xbf679000 -image).toUInt32(), module!.base.add(0xbf698000 -image).toUInt32())
        var icbk = vm.newInstCallback(function (vm: VM, gpr: GPRState, fpr: any, data: any) {
            let _user_data = data;
            var inst = vm.getInstAnalysis();
            // Display instruction dissassembly

            let log = "0x" + inst.address.toString(16) + " [" + "!0x" + (inst.address - _user_data.module_base + _user_data.module_image).toString(16) + "] " + " [" + inst.module + "!0x" + (inst.address - _user_data.module_base).toString(16) + "] " + inst.disassembly + "\t";

            let log1 = "pc:" + gpr.getRegister("pc") + "  " + "lr:" + gpr.getRegister("lr")!.sub(_user_data.module_base - _user_data.module_image) + "\t" + "  " + "r2:" + gpr.getRegister("r2") + "\t" + "r3:" + gpr.getRegister("r3") + "\t";
            console.log(log1);
            console.log(log);
            console.log(hexdump(gpr.getRegister("sp")!));
            return VMAction.CONTINUE;
        });
        vm.addCodeCB(0, icbk, user_data);

        vm.run(context.pc.toInt32(), context.lr.toInt32())
    }
}