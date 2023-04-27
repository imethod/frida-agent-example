export class logger {
    static debug: boolean = false

    static setDebug = (debug: boolean): void => {
        logger.debug = debug
    }
    static getDebug = (): boolean => {
        return logger.debug
    }

    static log = (msg: string): void => {
        console.log(msg)
    }
    static loge = (msg: string): void => {

        console.error(msg)
    }
    static logd = (msg: string): void => {

        if (logger.debug) {
            console.warn(msg);
        } 
    }
}

declare global {
    var log: (msg: string) => void
    var loge: (msg: string) => void
    var logd: (msg: string) => void
    var setDebug: (debug: boolean) => void
    var getDebug: () => boolean

    var debug: boolean
    var logColor: any
}

globalThis.log = logger.log
globalThis.logd = logger.logd
globalThis.loge = logger.loge
globalThis.setDebug = logger.setDebug
globalThis.getDebug = logger.getDebug
