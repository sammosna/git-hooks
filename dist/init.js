#! /usr/bin/env node
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, resolve, dirname } from 'path';
import 'node:path';
import 'node:url';
import merge from 'deepmerge';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const ALLOWED_RUNTIMES = ["bun", "node"];

const createPaths = (rootPath = process.cwd()) => {
    if (rootPath.includes("/node_modules/")) {
        console.log("Possibly postinstall script");
        rootPath = rootPath.split("node_modules")[0];
    }


    const gitPath = join(rootPath, "./.git/");
    const hooksPath = join(gitPath, "hooks");
    const smghrcPath = join(rootPath, ".git-hooks");

    return {
        rootPath,
        gitPath,
        hooksPath,
        smghrcPath
    }
};

const {
    rootPath,
    gitPath,
    hooksPath,
    smghrcPath
} = createPaths();

const smgh = {
    "$schema": "https://raw.githubusercontent.com/sammosna/git-hooks/main/inc/schemas/rc/v1.json",
    runtime: "node",
    checkUpdates: true,
    modules: {
        "commit-msg": {
            tasks: {
                emoji: true,
                replace: [],
                uppercase: []
            }
        },
        "post-commit": {}
    }
};


var initSmghrc = () => {
    let data = {};

    if (existsSync(smghrcPath)) {
        data = JSON.parse(
            readFileSync(smghrcPath, { encoding: "utf-8" })
        );
    }

    const updated = merge(smgh, data);

    writeFileSync(smghrcPath, JSON.stringify(updated, null, '\t'));
};

function isRuntimeAllowed(envString) {

    let allowed = false;

    for (const rt of ALLOWED_RUNTIMES) {
        if (envString.includes(rt)) allowed = true;
    }

    return allowed
}

const hookExist = (h) => {
    if (!existsSync(h)) {
        writeFileSync(h, "");
        execSync(`chmod +x ${h}`);
        console.log("Created", h);
    }
};

const hookUpdate = (h, newLines) => {
    console.log("hookUpdate");

    const rc = JSON.parse(readFileSync(smghrcPath, "utf-8"));
    const data = readFileSync(h, "utf-8");
    const lines = data.split("\n").filter(x => x) || [];

    const runtimePath = execSync(`which ${rc.runtime}`, { encoding: "utf-8" });

    const envString = `#! /usr/bin/env ${runtimePath}`;

    if (lines[0] && !isRuntimeAllowed(lines[0])) throw new Error("Runtime not supported")

    /** keep runtime path updated */
    lines[0] = envString;

    for (const nl of newLines) {
        if (!lines.includes(nl)) lines.push(nl);
    }

    writeFileSync(h, lines.join("\n"), { encoding: 'utf8', flag: 'w' });
};

const hookPath$1 = join(gitPath, "hooks/commit-msg");

const init$1 = () => {
    console.log("commit init");
    
    hookExist(hookPath$1);

    hookUpdate(hookPath$1, [
        `const { commitMsg } = require("@sammosna/git-hooks")`,
        `commitMsg()`
    ]);
};

const hookPath = join(gitPath, "hooks/post-commit");

const init = () => {
    console.log("post-commit init");
    
    hookExist(hookPath);

    hookUpdate(hookPath, [
        `const { postCommit } = require("@sammosna/git-hooks")`,
        `postCommit()`
    ]);
};

class Notification extends Error {
    constructor(name, message) {
        super(message); // (1)
        this.name = `@sammosna/git-hooks: ${name}`;
        this.message = message;
        this.stack = null;
    }
}

const getLatestVersion = async () => {
    const resp = await fetch("https://api.github.com/repos/sammosna/git-hooks/tags");
    const tags = await resp.json();
    const latestVersion = tags[0].name;
    return latestVersion.slice(1)
};


const checkUpdates = async () => {
    const rc = JSON.parse(readFileSync(smghrcPath, "utf-8"));
    if (!rc.checkUpdates) return

    const pj = JSON.parse(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../package.json"), "utf-8"));
    const current = pj.version;
    console.log("current", current);
    const latest = await getLatestVersion();
    console.log("latest", latest);
    if (String(current) !== String(latest)) throw new Notification("UPDATE", "Please update to latest version")
};

if (!existsSync(gitPath)) throw new Error("No .git folder")

if (!existsSync(hooksPath)) mkdirSync(hooksPath);

initSmghrc();
init$1();
init();

checkUpdates();
