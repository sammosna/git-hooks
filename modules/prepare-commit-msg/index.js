#! /usr/bin/env node

const path = require("path");
const fs = require("fs");
const { gitPath, smghrcPath } = require('../../inc/constants');
const child = require("child_process");
const { hookUpdate, hookExist } = require("../../inc/hooks");

const hookPath = path.join(gitPath, "hooks/prepare-commit-msg");

const init = () => {
    console.log("prepare-commit-msg init");

    hookExist(hookPath);

    hookUpdate(hookPath, [
        `const { prepareCommitMsg } = require("@sammosna/git-hooks")`,
        `prepareCommitMsg()`
    ])
}

const run = () => {
    console.log("RUN prepare-commit-msg");

    console.log("process.argv", process.argv);

    // const rc = JSON.parse(fs.readFileSync(smghrcPath, "utf-8"))
    // const tasks = rc.modules["commit-msg"].tasks

    let message = fs.readFileSync(process.argv[2], "utf8");
    console.log("message pre", message);
    
    // if (tasks.emoji) message = emoji(message)
    // if (tasks.replace) message = replace(message, tasks.replace)
    // if (tasks.uppercase) message = uppercase(message, tasks.uppercase)
    
    // message = "PRECOMMIT HOOK MSG"
    
    // fs.writeFileSync(process.argv[2], message)
    // console.log("message post", message);
    
}


module.exports = {
    init,
    run
}