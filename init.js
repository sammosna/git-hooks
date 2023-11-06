#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const { init } = require("./modules/commit-msg");
const smghrcInit = require("./modules/smghrc-init")
const { hooksPath } = require("./inc/constants");


const gitPath = path.join(process.cwd(), "./.git/");

if (!fs.existsSync(gitPath)) throw new Error("No .git folder")

if (!fs.existsSync(hooksPath)) fs.mkdirSync(hooksPath);

init()
smghrcInit()