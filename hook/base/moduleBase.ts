import { moduleInterface } from "../Interface/moduleInterface.js"
export class clsModuleBase implements moduleInterface {
    soName: string
    modle!: Module 
    constructor(soName: string) {
        this.soName = soName
        log("clsModuleBase")
        Process.enumerateModules().forEach(module => {
            if (module.name == this.soName) {
                
                this.modle = module
               
            }
            logd("module: " + module.name)
        })
    }

    hook(): void{
        
    }
    destroy(): void {
    }
}