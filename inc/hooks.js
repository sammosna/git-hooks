const path = require("path");
const fs = require("fs");
const child = require("child_process");

const hookExist = (h) => {
    if (!fs.existsSync(h)) {
        fs.writeFileSync(h, "");
        child.execSync(`chmod +x ${h}`);
        console.log("Created", h);
    }
}

const hookUpdate = (h, newLines) => {
    console.log("hookUpdate");
    const data = fs.readFileSync(h, "utf-8");
    const lines = data.split("\n").filter(x => x) || []

    if (lines[0] && lines[0] !== "#! /usr/bin/env node") throw new Error("SHould be node")

    for (const nl of [
        "#! /usr/bin/env node",
        ...newLines]
    ) {
        if (!lines.includes(nl)) lines.push(nl)
    }


    // if (!lines.length) {
    //     console.log("NEW FILE");
    //     delete lines[0]
    //     lines.push("#! /usr/bin/env node")
    //     lines.push(`const { commitMsg } = require("@sammosna/git-hooks")`)
    //     lines.push("commitMsg()")
    // }

    // console.log("lines", lines);

    // console.log("data", data);

    fs.writeFileSync(h, lines.join("\n"), { encoding: 'utf8', flag: 'w' })
}


module.exports = {
    hookExist,
    hookUpdate
}