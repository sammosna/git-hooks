#! /usr/bin/env node

const fs = require("fs");
const { init } = require("./modules/commit-msg");
const smghrcInit = require("./modules/smghrc-init")
const { hooksPath, gitPath } = require("./inc/constants");


if (!fs.existsSync(gitPath)) throw new Error("No .git folder")

if (!fs.existsSync(hooksPath)) fs.mkdirSync(hooksPath);

init()
smghrcInit()