import { log } from "../../agent/logger";
import { funInterface as InterfaceFun } from "../Interface/funInterface";
import { moduleInterface } from "../Interface/moduleInterface";


export class clsModuleBase implements moduleInterface {
    soName: string
    modle: Module
    constructor(soName: string) {
        this.soName = soName
        this.modle = Module.load(soName)
    }

    hook(): void{
        
    }
    destroy(): void {
    }
}