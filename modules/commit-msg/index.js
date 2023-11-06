#! /usr/bin/env node

const path = require("path");
const fs = require("fs");
const { gitPath, smghrcPath } = require('../../inc/constants');
const emoji = require("./tasks/emoji");
const child = require("child_process");
const replace = require("./tasks/replace");
const uppercase = require("./tasks/uppercase");

const hookPath = path.join(gitPath, "hooks/commit-msg");

const init = () => {
    console.log("commit init");
    if (!fs.existsSync(hookPath)) {
        fs.writeFileSync(hookPath, "");
        child.execSync(`chmod +x ${hookPath}`);
        console.log("Created commit-msg");
    }

    const data = fs.readFileSync(hookPath, "utf-8");
    const lines = data.split("\n").filter(x => x) || []

    // if (lines[0] !== "" && lines[0] !== "#! /usr/bin/env node") throw new Error("SHould be node")

    if (!lines.length) {
        console.log("NEW FILE");
        delete lines[0]
        lines.push("#! /usr/bin/env node")
        lines.push(`const { commitMsg } = require("@sammosna/git-hooks")`)
        lines.push("commitMsg()")
    }

    console.log("lines", lines);

    console.log("data", data);

    fs.writeFileSync(hookPath, lines.join("\n"), { encoding: 'utf8', flag: 'w' })
    console.log("hookPath", hookPath);
}

const run = () => {
    console.log("Commit-msg run 2");

    const rc = JSON.parse(fs.readFileSync(smghrcPath, "utf-8"))
    const tasks = rc.modules["commit-msg"].tasks

    let message = fs.readFileSync(process.argv[2], "utf8");

    if (tasks.emoji) message = emoji(message)
    if (tasks.replace) message = replace(message, tasks.replace)
    if (tasks.uppercase) message = uppercase(message, tasks.uppercase)

    fs.writeFileSync(process.argv[2], message)

}


module.exports = {
    init,
    run
}