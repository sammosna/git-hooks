const path = require("path");
const fs = require("fs");
const child = require("child_process");
const { smghrcPath, ALLOWED_RUNTIMES } = require("./constants");
const { isRuntimeAllowed } = require("./utils");

const hookExist = (h) => {
    if (!fs.existsSync(h)) {
        fs.writeFileSync(h, "");
        child.execSync(`chmod +x ${h}`);
        console.log("Created", h);
    }
}

const hookUpdate = (h, newLines) => {
    console.log("hookUpdate");

    const rc = JSON.parse(fs.readFileSync(smghrcPath, "utf-8"))
    const data = fs.readFileSync(h, "utf-8");
    const lines = data.split("\n").filter(x => x) || []

    const runtimePath = child.execSync(`which ${rc.runtime}`, { encoding: "utf-8" });

    const envString = `#! /usr/bin/env ${runtimePath}`

    if (lines[0] && !isRuntimeAllowed(lines[0])) throw new Error("Runtime not supported")

    /** keep runtime path updated */
    lines[0] = envString

    for (const nl of newLines) {
        if (!lines.includes(nl)) lines.push(nl)
    }

    fs.writeFileSync(h, lines.join("\n"), { encoding: 'utf8', flag: 'w' })
}


module.exports = {
    hookExist,
    hookUpdate
}