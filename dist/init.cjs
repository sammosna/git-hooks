#! /usr/bin/env node
'use strict';

var fs = require('fs');
var path = require('path');
require('node:path');
require('node:url');
var merge = require('deepmerge');
var child_process = require('child_process');
var url = require('url');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
const ALLOWED_RUNTIMES = ["bun", "node"];

const createPaths = (rootPath = process.cwd()) => {
    if (rootPath.includes("/node_modules/")) {
        console.log("Possibly postinstall script");
        rootPath = rootPath.split("node_modules")[0];
    }


    const gitPath = path.join(rootPath, "./.git/");
    const hooksPath = path.join(gitPath, "hooks");
    const smghrcPath = path.join(rootPath, ".git-hooks");

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

    if (fs.existsSync(smghrcPath)) {
        data = JSON.parse(
            fs.readFileSync(smghrcPath, { encoding: "utf-8" })
        );
    }

    const updated = merge(smgh, data);

    fs.writeFileSync(smghrcPath, JSON.stringify(updated, null, '\t'));
};

function isRuntimeAllowed(envString) {

    let allowed = false;

    for (const rt of ALLOWED_RUNTIMES) {
        if (envString.includes(rt)) allowed = true;
    }

    return allowed
}

const hookExist = (h) => {
    if (!fs.existsSync(h)) {
        fs.writeFileSync(h, "");
        child_process.execSync(`chmod +x ${h}`);
        console.log("Created", h);
    }
};

const hookUpdate = (h, newLines) => {
    console.log("hookUpdate");

    const rc = JSON.parse(fs.readFileSync(smghrcPath, "utf-8"));
    const data = fs.readFileSync(h, "utf-8");
    const lines = data.split("\n").filter(x => x) || [];

    const runtimePath = child_process.execSync(`which ${rc.runtime}`, { encoding: "utf-8" });

    const envString = `#! /usr/bin/env ${runtimePath}`;

    if (lines[0] && !isRuntimeAllowed(lines[0])) throw new Error("Runtime not supported")

    /** keep runtime path updated */
    lines[0] = envString;

    for (const nl of newLines) {
        if (!lines.includes(nl)) lines.push(nl);
    }

    fs.writeFileSync(h, lines.join("\n"), { encoding: 'utf8', flag: 'w' });
};

const hookPath$1 = path.join(gitPath, "hooks/commit-msg");

const init$1 = () => {
    console.log("commit init");
    
    hookExist(hookPath$1);

    hookUpdate(hookPath$1, [
        `const { commitMsg } = require("@sammosna/git-hooks")`,
        `commitMsg()`
    ]);
};

const hookPath = path.join(gitPath, "hooks/post-commit");

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
    const rc = JSON.parse(fs.readFileSync(smghrcPath, "utf-8"));
    if (!rc.checkUpdates) return

    const pj = JSON.parse(fs.readFileSync(path.resolve(path.dirname(url.fileURLToPath((typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('init.cjs', document.baseURI).href)))), "../package.json"), "utf-8"));
    const current = pj.version;
    console.log("current", current);
    const latest = await getLatestVersion();
    console.log("latest", latest);
    if (String(current) !== String(latest)) throw new Notification("UPDATE", "Please update to latest version")
};

if (!fs.existsSync(gitPath)) throw new Error("No .git folder")

if (!fs.existsSync(hooksPath)) fs.mkdirSync(hooksPath);

initSmghrc();
init$1();
init();

checkUpdates();
