import { clsInitArray } from "../hook/link/initArray/clsInitArray";


setImmediate(() => main())

const main = () => {
    clsDebug.DEBUG = true
    var a = new clsInitArray(ptr(0x00000000));
}
