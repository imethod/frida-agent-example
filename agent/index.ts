import { Link } from "../hook/lib/linker/linker.js"
import "../agent/logger.js"
import { Art } from "../hook/lib/art/art.js"

setImmediate(() => main())

const main = () => {
    logd("main")
    setDebug(true)
    var a = new Link()
    var b = new Art()
    a.hook()
    b.hook()
}
