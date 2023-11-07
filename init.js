#! /usr/bin/env node

const fs = require("fs");
const { hooksPath, gitPath } = require("./inc/constants");

const initSmghrc = require("./modules/smghrc-init")
const { init: initCommitMsg } = require("./modules/commit-msg");
const { init: initPostCommit } = require("./modules/post-commit");
const { checkUpdates } = require("./inc/updates");


if (!fs.existsSync(gitPath)) throw new Error("No .git folder")

if (!fs.existsSync(hooksPath)) fs.mkdirSync(hooksPath);

initSmghrc()
initCommitMsg()
initPostCommit()

checkUpdates()