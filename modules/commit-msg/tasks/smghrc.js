const fs = require("fs")
const { smghrcPath } = require("../../../inc/constants")

module.exports = (commit) => {
    if (!fs.existsSync(smghrcPath)) return commit
    console.log("FOUND SMGHRC");
    const data = fs.readFileSync(smghrcPath, "utf-8")
    const rc = JSON.parse(data)

    if (rc.replace) {
        for (const [s, r] of rc.replace) {
            const regex = new RegExp(s, "g")
            commit = commit.replace(regex, r)
        }
    }

    if (rc.uppercase) {
        for (const r of rc.uppercase) {
            const regex = new RegExp(r, "g")
            commit = commit.replace(regex, v => v.toUpperCase())
        }
    }

    return commit
}