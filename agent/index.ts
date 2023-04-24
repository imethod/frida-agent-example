import { clsLink } from "../hook/link/clsLink.js"
import "../agent/logger.js"

setTimeout(() => main(),500)

const main = () => {
    log("main")
    setDebug(true)
    var a = new clsLink()
    a.hook()
}
