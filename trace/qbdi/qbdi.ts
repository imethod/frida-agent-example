import { InstPosition, Options, VM } from "./arm/frida-qbdi.js";
import { VMAction } from "./arm/frida-qbdi.js";

export class Qbdi{
    address: NativePointer
    constructor(address: NativePointer) { 
        this.address = address
        Module.load("/data/local/tmp/libQBDI.so");
        let user_data = {
            "module_base": 13
        }
        let vm = new VM();
        //Options.OPT_DISABLE_LOCAL_MONITOR = 1<<24;
        //Options.OPT_BYPASS_PAUTH = 1<<25;
        //Options.OPT_ENABLE_BTI = 1<<26;

        vm.allocateVirtualStack(vm.getGPRState(), 0x100000);
        vm.addInstrumentedModuleFromAddr(this.address.toUInt32())

        var icbk = vm.newInstCallback(function (vm: any, gpr: any, fpr: any, data: any) { 
            var inst = vm.getInstAnalysis();
            if (inst.mnemonic.search("XOR")) {
                return VMAction.CONTINUE;
            }
            gpr.dump(); // Display context
            console.log("0x" + inst.address.toString(16) + " " + inst.disassembly); // Display instruction dissassembly
            return VMAction.CONTINUE;
        });

        vm.addCodeCB(InstPosition.POSTINST as any, icbk, NULL);
        vm.call(this.address.toUInt32());
    }
}