#! /usr/bin/env node

const path = require("path");
const fs = require("fs");
const { gitPath, smghrcPath } = require('../../inc/constants');
const child = require("child_process");
const { hookUpdate, hookExist } = require("../../inc/hooks");

const hookPath = path.join(gitPath, "hooks/pre-commit");

const init = () => {
    console.log("pre-commit init");

    hookExist(hookPath);

    hookUpdate(hookPath, [
        `const { preCommit } = require("@sammosna/git-hooks")`,
        `preCommit()`
    ])
}

const run = () => {
    console.log("RUN pre-commit");

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