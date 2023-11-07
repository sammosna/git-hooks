#! /usr/bin/env node

import { join } from "path";
import { readFileSync, writeFileSync } from "fs";
import { gitPath, smghrcPath } from '../../inc/constants.js';
import emoji from "./tasks/emoji.js";
import child from "child_process";
import replace from "./tasks/replace.js";
import uppercase from "./tasks/uppercase.js";
import { hookUpdate, hookExist } from "../../inc/hooks.js";

const hookPath = join(gitPath, "hooks/commit-msg");

export const init = () => {
    console.log("commit init");
    
    hookExist(hookPath);

    hookUpdate(hookPath, [
        `const { commitMsg } = require("@sammosna/git-hooks")`,
        `commitMsg()`
    ])
}

export const run = () => {
    console.log("Commit-msg run 2");

    const rc = JSON.parse(readFileSync(smghrcPath, "utf-8"))
    const tasks = rc.modules["commit-msg"].tasks

    let message = readFileSync(process.argv[2], "utf8");

    if (tasks.emoji) message = emoji(message)
    if (tasks.replace) message = replace(message, tasks.replace)
    if (tasks.uppercase) message = uppercase(message, tasks.uppercase)

    writeFileSync(process.argv[2], message)

}
