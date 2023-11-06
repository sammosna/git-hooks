#! /usr/bin/env node

const path = require("path");
const fs = require("fs");
const { gitPath, smghrcPath } = require('../../inc/constants');
const emoji = require("./tasks/emoji");
const child = require("child_process");
const replace = require("./tasks/replace");
const uppercase = require("./tasks/uppercase");
const { hookUpdate, hookExist } = require("../../inc/hooks");

const hookPath = path.join(gitPath, "hooks/commit-msg");

const init = () => {
    console.log("commit init");
    
    hookExist(hookPath);

    hookUpdate(hookPath, [
        `const { commitMsg } = require("@sammosna/git-hooks")`,
        `commitMsg()`
    ])
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