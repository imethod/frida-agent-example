
class clsDebug{
    static  DEBUG:boolean
    
    static log(msg: string){
        console.log(msg)
    }
    static debug(msg: string) {
        if (clsDebug.DEBUG) {
            console.debug(msg)
        }
    }
}