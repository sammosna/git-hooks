#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const { init } = require("./modules/commit-msg");
const smghrcInit = require("./modules/smghrc-init")
const { hooksPath } = require("./inc/constants");

// const {pm, addDev, run} = require("./inc/pm");
// const isWorkspace = pm === "pnpm" && fs.existsSync(path.join(process.cwd(), "./pnpm-workspace.yaml"))

// if (fs.existsSync(path.join(process.cwd(), "./package.json"))) {
//     console.log("> package.json found!")
//     isWorkspace && console.log("> Workspace found")

//     console.log("> Installing husky")
//     let cmd = `${addDev} husky`
//     isWorkspace ? cmd += ` -w` : null
//     child.execSync(cmd)
//     child.execSync(`npm pkg set scripts.prepare="husky install"`)
//     console.log("> husky installed");


//     let package_json = JSON.parse(fs.readFileSync(path.join(process.cwd(), "./package.json"), "utf8"));

//     if (!package_json.smgh) package_json.smgh = {};
//     if (!process.env.husky_skip_init) child.execSync(`${run} husky install`);


//     package_json = commitEmojiInit(package_json)



//     console.log("> Save package.json")
//     fs.writeFileSync(path.join(process.cwd(), "./package.json"), JSON.stringify(package_json, null, 4));
//     console.log("> Installation OK!")
//     // });
// } else {
//     console.log("> package.json not found, please init your project with npm init");
// }

const gitPath = path.join(process.cwd(), "./.git/");

if (!fs.existsSync(gitPath)) throw new Error("No .git folder")

if (!fs.existsSync(hooksPath)) fs.mkdirSync(hooksPath);

init()
smghrcInit()