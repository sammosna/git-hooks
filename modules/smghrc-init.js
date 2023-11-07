import { existsSync, readFileSync, writeFileSync } from "fs";
import { smghrcPath } from "../inc/constants.js";
import merge from 'deepmerge';

const smgh = {
    "$schema": "https://raw.githubusercontent.com/sammosna/git-hooks/main/inc/schemas/rc/v1.json",
    runtime: "node",
    checkUpdates: true,
    modules: {
        "commit-msg": {
            tasks: {
                emoji: true,
                replace: [],
                uppercase: []
            }
        },
        "post-commit": {}
    }
}


export default () => {
    let data = {}

    if (existsSync(smghrcPath)) {
        data = JSON.parse(
            readFileSync(smghrcPath, { encoding: "utf-8" })
        )
    }

    const updated = merge(smgh, data);

    writeFileSync(smghrcPath, JSON.stringify(updated, null, '\t'));
}