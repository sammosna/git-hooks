const fs = require("fs")
const { smghrcPath } = require("../constants")

const smgh = {
    "$schema": "https://raw.githubusercontent.com/sammosna/git-hooks/inc/schemas/rc/v1.json"
}


module.exports = () => {
    if (!fs.existsSync(smghrcPath)) {
        fs.writeFileSync(smghrcPath, JSON.stringify(smgh));
    }
}