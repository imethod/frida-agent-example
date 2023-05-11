import { Modulebase } from "../../base/modulebase.js";

export class SecShell extends Modulebase {
    constructor(soName: string = "libSecShell.so") {
        super(soName)
    }

    hook(): void {

    }
}