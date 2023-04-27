import { FunBase as FunBase } from "../../../base/funbase.js";

export class Dlopen_ext extends FunBase {
    hook(): void {
        super.hook({
            onEnter: function (args) {
                var pathptr = args[0];
                if (pathptr) {
                    this.path = (pathptr).readCString();
                    log("android_dlopen_ext:" + this.path);
                }
            },
            onLeave: function (retval) {
                logd("android_dlopen_ext end")
            }
        })
    }
}