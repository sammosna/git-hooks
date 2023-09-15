#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const child = require("child_process");
const { run } = require("../../inc/pm");
const version = require("../../package.json").version;


module.exports = (package_json) => {

    
    child.execSync(`${run} husky set .husky/commit-msg "pnpm smgh-commit \\$1"`)
    
    // child.execSync(`git add .husky/commit-msg`)
    // child.execSync(`git commit -m "chore: husky commit-msg added"`)

    // if (
    //     !package_json.smgh.commit_emoji_version
    //     || package_json.smgh.commit_emoji_version !== version
    //     || !fs.existsSync(path.join(process.cwd(), ".husky", "commit-msg"))
    // ) {
    //     console.log("> commit-emoji init");

    //     // REMOVING OLD VERSION

    //     // if file does not exist, create it
    //     if (!fs.existsSync(path.join(process.cwd(), ".husky", "commit-msg"))) {
    //         fs.writeFileSync(path.join(process.cwd(), ".husky", "commit-msg"), "");
    //     }

    //     const content = fs.readFileSync(path.join(process.cwd(), ".husky", "commit-msg"), "utf8").split("\n");
    //     const newcontent = content.filter(line => !line.includes("# smgh-commit-emoji")).join("\n");
    //     fs.writeFileSync(path.join(process.cwd(), ".husky", "commit-msg"), newcontent);

    //     child.execSync(`${pm} husky add .husky/commit-msg 'npx smgh-commit $1 # smgh-commit-emoji-${version}'`);

    //     package_json.smgh.commit_emoji_version = version
    // }

    return package_json;

}