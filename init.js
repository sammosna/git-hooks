#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const child = require("child_process");
const pm = require("./inc/pm")();
const version = require("./package.json").version;
const commitEmojiInit = require("./modules/commit-emoji/init");

if (fs.existsSync(path.join(process.cwd(), "./package.json"))) {
    console.log("> package.json found!")
    console.log("> Installing husky")

    // child.exec(`${pm} install husky --save-dev`, {}, () => {

    child.execSync(`${pm} install husky`)
    console.log("> husky installed");

    let package_json = JSON.parse(fs.readFileSync(path.join(process.cwd(), "./package.json"), "utf8"));

    if (!package_json.smgh) package_json.smgh = {};
    if (!process.env.husky_skip_init) child.execSync(`${pm} husky install`);


    package_json = commitEmojiInit(package_json)



    console.log("> Save package.json")
    fs.writeFileSync(path.join(process.cwd(), "./package.json"), JSON.stringify(package_json, null, 4));
    console.log("> Installation OK!")
    // });
} else {
    console.log("> package.json not found, please init your project with npm init");
}