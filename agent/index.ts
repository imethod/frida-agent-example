import { Link } from "../hook/lib/linker/linker.js"
import "../agent/logger.js"
import { Art } from "../hook/lib/art/art.js"
import { Qbdi } from "../trace/qbdi/qbdi.js"


setImmediate(() => main())

const main = () => {
    logd("main")
    setDebug(true)
    var link = new Link()
    var art = new Art()
    let thisObj = link.dlopen
    link.initArray.hook({
        onEnter: function (args) {
            logd("call_array arg1: " + args[1])
            logd("call_array arg3: " + args[3].readCString())
            if (!args[1].isNull()) {
                var name = args[3].readCString()
                if (name!.indexOf("libshell-super.2019.so") != -1) {
                    let initarry: NativePointer = args[1]

                    initarry = initarry.add(Process.pointerSize * args[2].toUInt32() - Process.pointerSize - Process.pointerSize)
                    let initFunc = initarry.readPointer()
                    logd("initFunc: " + initFunc + " " + DebugSymbol.fromAddress(initFunc))
                    let module = Process.findModuleByAddress(initFunc)
                    logd("module: " + module!.name + " " + module!.base)
                    var qbdi = new Qbdi(module!.base.add(0x24A61))
                }
               
            }
        },
        onLeave: function (retval) {
            log("call_array end")
        }
    })
}
