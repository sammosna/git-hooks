const { ALLOWED_RUNTIMES } = require("./constants");

function isRuntimeAllowed(envString) {

    let allowed = false

    for (const rt of ALLOWED_RUNTIMES) {
        if (envString.includes(rt)) allowed = true
    }
  
    return allowed
  }


module.exports = {
    isRuntimeAllowed
}