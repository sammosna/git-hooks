import { readFileSync, readdirSync } from "fs";
import { basename, dirname, resolve } from "path";
import { Notification } from "./errors.js";
import { smghrcPath } from "./constants.js";
import { fileURLToPath } from "url";

const getLatestVersion = async () => {
    const resp = await fetch("https://api.github.com/repos/sammosna/git-hooks/tags")
    const tags = await resp.json()
    const latestVersion = tags[0].name
    return latestVersion.slice(1)
}


export const checkUpdates = async () => {
    const rc = JSON.parse(readFileSync(smghrcPath, "utf-8"))
    if (!rc.checkUpdates) return

    const pj = JSON.parse(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../package.json"), "utf-8"))
    const current = pj.version;
    console.log("current", current);
    const latest = await getLatestVersion()
    console.log("latest", latest);
    if (String(current) !== String(latest)) throw new Notification("UPDATE", "Please update to latest version")
}
