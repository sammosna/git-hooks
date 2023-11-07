#! /usr/bin/env node

const path = require("path");
const fs = require("fs");
const { gitPath, smghrcPath } = require('../../inc/constants');
const { hookUpdate, hookExist } = require("../../inc/hooks");

const hookPath = path.join(gitPath, "hooks/post-commit");

const init = () => {
    console.log("post-commit init");
    
    hookExist(hookPath);

    hookUpdate(hookPath, [
        `const { postCommit } = require("@sammosna/git-hooks")`,
        `postCommit()`
    ])
}

const run = () => {
    console.log("post-commit run");

    // const rc = JSON.parse(fs.readFileSync(smghrcPath, "utf-8"))
    // const tasks = rc.modules["post-commit"].tasks

    // let message = fs.readFileSync(process.argv[2], "utf8");

    // if (tasks.emoji) message = emoji(message)
    // if (tasks.replace) message = replace(message, tasks.replace)
    // if (tasks.uppercase) message = uppercase(message, tasks.uppercase)

    // fs.writeFileSync(process.argv[2], message)

}


module.exports = {
    init,
    run
}