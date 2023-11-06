const fs = require("fs")
const { smghrcPath } = require("../inc/constants")

const smgh = {
    "$schema": "https://raw.githubusercontent.com/sammosna/git-hooks/main/inc/schemas/rc/v1.json",
    modules: {
        "commit-msg": {
            tasks: {
                emoji: true,
                replace: [],
                uppercase: []
            }
        }
    }
}


module.exports = () => {
    if (!fs.existsSync(smghrcPath)) {
        fs.writeFileSync(smghrcPath, JSON.stringify(smgh, null, '\t'));
    }
}