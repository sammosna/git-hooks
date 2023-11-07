#! /usr/bin/env node

const fs = require("fs");
const { init: initCommitMsg } = require("./modules/commit-msg");
const { init: initPrepareCommitMsg } = require("./modules/prepare-commit-msg");
const { init: initPreCommit } = require("./modules/pre-commit");
const smghrcInit = require("./modules/smghrc-init")
const { hooksPath, gitPath } = require("./inc/constants");


if (!fs.existsSync(gitPath)) throw new Error("No .git folder")

if (!fs.existsSync(hooksPath)) fs.mkdirSync(hooksPath);

// initPreCommit()
// initPrepareCommitMsg()
initCommitMsg()
smghrcInit()