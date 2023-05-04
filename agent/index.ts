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
    link.dlopen_ext.hook({
        onEnter: function (args) {
            var pathptr = args[0];
            if (pathptr) {
                this.path = (pathptr).readCString();
                thisObj.loadModule.push(this.path);
                log("dlopen:" + this.path);
            }
        },
        onLeave: function (retval) { 
            if (this.path.indexOf("libshell-super.2019.so") != -1) {
                logd("dlopen:" + this.path);
                var qbdi = new Qbdi(retval.add(0x28fb9))
            }

        }
    })
}
