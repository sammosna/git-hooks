import { existsSync, writeFileSync, readFileSync } from "fs";
import { execSync } from "child_process";
import { smghrcPath } from "./constants.js"
import { isRuntimeAllowed } from "./utils.js";

export const hookExist = (h) => {
    if (!existsSync(h)) {
        writeFileSync(h, "");
        execSync(`chmod +x ${h}`);
        console.log("Created", h);
    }
}

export const hookUpdate = (h, newLines) => {
    console.log("hookUpdate");

    const rc = JSON.parse(readFileSync(smghrcPath, "utf-8"))
    const data = readFileSync(h, "utf-8");
    const lines = data.split("\n").filter(x => x) || []

    const runtimePath = execSync(`which ${rc.runtime}`, { encoding: "utf-8" });

    const envString = `#! /usr/bin/env ${runtimePath}`

    if (lines[0] && !isRuntimeAllowed(lines[0])) throw new Error("Runtime not supported")

    /** keep runtime path updated */
    lines[0] = envString

    for (const nl of newLines) {
        if (!lines.includes(nl)) lines.push(nl)
    }

    writeFileSync(h, lines.join("\n"), { encoding: 'utf8', flag: 'w' })
}
