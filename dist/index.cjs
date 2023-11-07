'use strict';

var path = require('path');
var fs = require('fs');
require('node:path');
require('node:url');
require('child_process');

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

const gitmojis = {
    init: "🎉",
    revert: "⏳",
    build: "📦",
    ci: "🤖",
    docs: "📖",
    feat: "🚀",
    fix: "🔨",
    perf: "⚡",
    refactor: "🚧",
    style: "💄",
    test: "✅",
    tada: "🎉",
    ver: "🕒",
    wip: "🚧",
    try: "💡",
    chore: "🧪",
    update: "⬆️ ",
    clean: "🧹",
    cleanup: "🧹",
};

var emoji = (commit) => {

    const arr = commit.split(" ");
    let incipit = arr[0];
    arr.shift();

    const word = incipit.replace("\n", "").replace(":", "");

    if (Object.keys(gitmojis).includes(word)) {
        const newText = `${gitmojis[word]} ${word}`;
        incipit = incipit.replace(word, newText);
        if (!incipit.includes(`${newText}:`)) incipit = incipit.replace(newText, `${newText}:`);
    }

    return [incipit, ...arr].join(" ")



};

var replace = (commit, occurences) => {
    console.log("Task: replace");

    for (const [s, r] of occurences) {
        const regex = new RegExp(s, "g");
        commit = commit.replace(regex, r);
    }

    return commit
};

var uppercase = (commit, occurences) => {
    console.log("Task: uppercase");
    
    for (const r of occurences) {
        const regex = new RegExp(r, "g");
        commit = commit.replace(regex, v => v.toUpperCase());
    }

    return commit
};

path.join(gitPath, "hooks/commit-msg");

const run$1 = () => {
    console.log("Commit-msg run 2");

    const rc = JSON.parse(fs.readFileSync(smghrcPath, "utf-8"));
    const tasks = rc.modules["commit-msg"].tasks;

    let message = fs.readFileSync(process.argv[2], "utf8");

    if (tasks.emoji) message = emoji(message);
    if (tasks.replace) message = replace(message, tasks.replace);
    if (tasks.uppercase) message = uppercase(message, tasks.uppercase);

    fs.writeFileSync(process.argv[2], message);

};

path.join(gitPath, "hooks/post-commit");

const run = () => {
    console.log("post-commit run");

    // const rc = JSON.parse(fs.readFileSync(smghrcPath, "utf-8"))
    // const tasks = rc.modules["post-commit"].tasks

    // fs.writeFileSync(process.argv[2], message)

};

exports.commitMsg = run$1;
exports.postCommit = run;
