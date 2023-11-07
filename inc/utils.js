import { ALLOWED_RUNTIMES } from "./constants.js";

export function isRuntimeAllowed(envString) {

    let allowed = false

    for (const rt of ALLOWED_RUNTIMES) {
        if (envString.includes(rt)) allowed = true
    }

    return allowed
}

