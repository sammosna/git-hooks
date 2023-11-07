#! /usr/bin/env node

import { join } from "path";
import fs from "fs";
import { gitPath, smghrcPath } from '../../inc/constants.js';
import { hookUpdate, hookExist } from "../../inc/hooks.js";

const hookPath = join(gitPath, "hooks/post-commit");

export const init = () => {
    console.log("post-commit init");
    
    hookExist(hookPath);

    hookUpdate(hookPath, [
        `const { postCommit } = require("@sammosna/git-hooks")`,
        `postCommit()`
    ])
}

export const run = () => {
    console.log("post-commit run");

    // const rc = JSON.parse(fs.readFileSync(smghrcPath, "utf-8"))
    // const tasks = rc.modules["post-commit"].tasks

    // fs.writeFileSync(process.argv[2], message)

}
