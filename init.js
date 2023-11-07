#! /usr/bin/env node

import { existsSync, mkdirSync } from "fs";
import { hooksPath, gitPath } from "./inc/constants.js";

import initSmghrc from "./modules/smghrc-init.js";
import { init as initCommitMsg } from "./modules/commit-msg/index.js";
import { init as initPostCommit } from "./modules/post-commit/index.js";
import { checkUpdates } from "./inc/updates.js";


if (!existsSync(gitPath)) throw new Error("No .git folder")

if (!existsSync(hooksPath)) mkdirSync(hooksPath);

initSmghrc()
initCommitMsg()
initPostCommit()

checkUpdates()