import { FunBase as Funbase } from "../../../base/funbase.js";

export class Dlopen extends Funbase {
    hook(): void {
        super.hook({
            onEnter: function (args) {
                var pathptr = args[0];
                if (pathptr) {
                    this.path = (pathptr).readCString();
                    log("dlopen:"+this.path);
                }
            },
            onLeave: function (retval) {
                logd("dlopen end")
            }
        })
    }
}