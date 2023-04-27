import { Moduleinterface as Moduleinterface } from "../Interface/moduleInterface.js"
export class Modulebase implements Moduleinterface {
    soName: string
    modle!: Module 
    constructor(soName: string) {
        this.soName = soName
        logd("clsModuleBase")
        Process.enumerateModules().forEach(modle => { 
            if (modle.name == this.soName) {
                this.modle = modle
                log("find modle: " + soName)
            }
        })
    }

    hook(): void{
        
    }
    destroy(): void {
    }
}