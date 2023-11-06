const path = require("path");

const rootPath = process.cwd();
const gitPath = path.join(rootPath, "./.git/");
const hooksPath = path.join(gitPath, "hooks")
const smghrcPath = path.join(rootPath, ".git-hooks");

module.exports = {
    rootPath,
    gitPath,
    hooksPath,
    smghrcPath
}