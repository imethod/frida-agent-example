import { Link } from "../hook/lib/linker/linker.js"
import "../agent/logger.js"
import { Art } from "../hook/lib/art/art.js"
import { Qbdi } from "../trace/qbdi/qbdi.js"
import { DumpSo } from "../dump/dumpso.js"
import { FunBase } from "../hook/base/funbase.js"
import { link } from "fs"


setImmediate(() => main())

const main = () => {
    logd("main")
    setDebug(true)
    var link = new Link()
    //link.hook()
    //var art = new Art()
    link.initProc.hook({
        onEnter: function (args) {
            logd("call_init_proc arg1: " + args[1])
            var module = Process.findModuleByAddress((this.context as ArmCpuContext).r5)
            logd("module: " + module!.name + " " + module!.base)
            var fun_C0E58 = new FunBase(module!.base.add(0xBF696F50 - 0xBF5D6000))
            fun_C0E58.replace(new NativeCallback(function () {
                fun_C0E58.destroy();
                var qbdi = new Qbdi(module!.base.add(0xBF696F50 - 0xBF5D6000), this.context as ArmCpuContext)

                return ptr(0)
            }, 'pointer', [])
            )
            
        },
        onLeave: function (retval) {
        }
    })

    
    link.initArray.hook({
        onEnter: function (args) {
            logd("call_array arg1: " + args[1])
            logd("call_array arg3: " + args[3].readCString())
            if (!args[1].isNull()) {
                var name = args[3].readCString()
                if (name!.indexOf("libSecShell.so") != -1) {
                    let initarry: NativePointer = args[1]
                    
                    initarry = initarry.add(Process.pointerSize * args[2].toUInt32() - Process.pointerSize - Process.pointerSize)
                    let initFunc = initarry.readPointer()
                    logd("initFunc: " + initFunc + " " + DebugSymbol.fromAddress(initFunc))

                    var image = 0xBF5E7721 - 0x11721
                    var module = Process.findModuleByAddress(initFunc)

                    //

                    // logd("module: " + module!.name + " " + module!.base)
                    // var qbdi = new Qbdi(module!.base.add(0xBF623D5d  -0xBF5E7721 + 0x11721))

                    //dump so
                     var dumpSo = new DumpSo("libSecShell.so", "/data/local/tmp")
                    // dumpSo.dump()


                    
                    // var decodeStr = new FunBase(module!.base.add(0xBF5E8825 - image))
                    // decodeStr.hook({
                    //     onEnter: function (args) {
                    //         this.arg0 = args[0]
                    //         this.lr = (this.context as ArmCpuContext).lr
                    //     },
                    //     onLeave: function (retval) {
                    //         logd("0xBF5E8824: lr:" + this.lr.sub(module!.base).add(image)+"  " + this.arg0.readCString())
                    //     }
                    // })

                    // var decodeStr1 = new FunBase(module!.base.add(0xBF5E8B95 - image))
                    // decodeStr1.hook({
                    //     onEnter: function (args) {
                    //         this.arg0 = args[0]
                    //         this.lr = (this.context as ArmCpuContext).lr
                    //     }, 
                    //     onLeave: function (retval) {
                    //         logd("0xBF5E8B94: lr:" + this.lr.sub(module!.base).add(image) + "  " + this.arg0.readCString())
                    //     }
                    // })

                    // //BF5EA2C8

                    // var decodeStr2 = new FunBase(module!.base.add(0xBF5EA2C9 - image))
                    // decodeStr2.hook({
                    //     onEnter: function (args) {
                    //     },
                    //     onLeave: function (retval) {
                    //         logd("0xBF5EA2C9: r0:" + (this.context as ArmCpuContext).r0)
                    //     }
                    // })

                    // var decodeStr3 = new FunBase(module!.base.add(0xBF66EED9 - image))
                    // decodeStr3.hook({
                    //     onEnter: function (args) {
                    //         this.arg0 = args[0]
                    //         logd("0xBF66EED9: r0:" + args[2].readCString())
                    //     },
                    //     onLeave: function (retval) {
                    //         logd("0xBF66EED9: r0:" + this.arg0.readCString())
                    //     }
                    // })
                    
                    //logd("module: " + module!.name + " " + module!.base)
                    
                }
               
            }
        },
        onLeave: function (retval) {
            log("call_array end")
            
        }
    })
}
