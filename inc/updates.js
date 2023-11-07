const fs = require("fs");
const path = require("path")
const { Notification } = require("./errors");
const { smghrcPath } = require("./constants");

const getLatestVersion = async () => {
    const resp = await fetch("https://api.github.com/repos/sammosna/git-hooks/tags")
    const tags = await resp.json()
    const latestVersion = tags[0].name
    return latestVersion.slice(1)
}


const checkUpdates = async () => {
    const rc = JSON.parse(fs.readFileSync(smghrcPath, "utf-8"))
    if (!rc.checkUpdates) return
    const pj = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../package.json")), "utf-8")
    const current = pj.version;
    console.log("current", current);
    const latest = await getLatestVersion()
    console.log("latest", latest);
    if (String(current) !== String(latest)) throw new Notification("UPDATE", "Please update to latest version")
}

module.exports = {
    checkUpdates
}