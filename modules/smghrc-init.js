const fs = require("fs")
const { smghrcPath } = require("../inc/constants");
const merge = require('deepmerge')

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


module.exports = () => {
    let data = {}

    if (fs.existsSync(smghrcPath)) {
        data = JSON.parse(
            fs.readFileSync(smghrcPath, { encoding: "utf-8" })
        )
    }

    const updated = merge(smgh, data);

    fs.writeFileSync(smghrcPath, JSON.stringify(updated, null, '\t'));
}