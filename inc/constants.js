const path = require("path");

const ALLOWED_RUNTIMES = ["bun", "node"]

const createPaths = (rootPath = process.cwd()) => {
    if (rootPath.includes("/node_modules/")) {
        console.log("Possibly postinstall script");
        rootPath = rootPath.split("node_modules")[0]
    }


    const gitPath = path.join(rootPath, "./.git/");
    const hooksPath = path.join(gitPath, "hooks")
    const smghrcPath = path.join(rootPath, ".git-hooks");

    return {
        rootPath,
        gitPath,
        hooksPath,
        smghrcPath
    }
}


module.exports = {
    ALLOWED_RUNTIMES,
    createPaths,
    ...createPaths()
}