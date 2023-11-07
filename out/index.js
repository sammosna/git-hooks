// modules/commit-msg/index.js
import {join as join2} from "path";
import {readFileSync as readFileSync2, writeFileSync as writeFileSync2} from "fs";

// inc/constants.js
import {join} from "path";
var createPaths = (rootPath = process.cwd()) => {
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
  };
};
var {
  rootPath,
  gitPath,
  hooksPath,
  smghrcPath
} = createPaths();

// modules/commit-msg/tasks/emoji.js
var gitmojis = {
  init: "\uD83C\uDF89",
  revert: "\u23F3",
  build: "\uD83D\uDCE6",
  ci: "\uD83E\uDD16",
  docs: "\uD83D\uDCD6",
  feat: "\uD83D\uDE80",
  fix: "\uD83D\uDD28",
  perf: "\u26A1",
  refactor: "\uD83D\uDEA7",
  style: "\uD83D\uDC84",
  test: "\u2705",
  tada: "\uD83C\uDF89",
  ver: "\uD83D\uDD52",
  wip: "\uD83D\uDEA7",
  try: "\uD83D\uDCA1",
  chore: "\uD83E\uDDEA",
  update: "\u2B06\uFE0F ",
  clean: "\uD83E\uDDF9",
  cleanup: "\uD83E\uDDF9"
};
var emoji_default = (commit) => {
  const arr = commit.split(" ");
  let incipit = arr[0];
  arr.shift();
  const word = incipit.replace("\n", "").replace(":", "");
  if (Object.keys(gitmojis).includes(word)) {
    const newText = `${gitmojis[word]} ${word}`;
    incipit = incipit.replace(word, newText);
    if (!incipit.includes(`${newText}:`))
      incipit = incipit.replace(newText, `${newText}:`);
  }
  return [incipit, ...arr].join(" ");
};

// modules/commit-msg/index.js
import child from "child_process";

// modules/commit-msg/tasks/replace.js
var replace_default = (commit, occurences) => {
  console.log("Task: replace");
  for (const [s, r] of occurences) {
    const regex = new RegExp(s, "g");
    commit = commit.replace(regex, r);
  }
  return commit;
};

// modules/commit-msg/tasks/uppercase.js
var uppercase_default = (commit, occurences) => {
  console.log("Task: uppercase");
  for (const r of occurences) {
    const regex = new RegExp(r, "g");
    commit = commit.replace(regex, (v) => v.toUpperCase());
  }
  return commit;
};

// inc/hooks.js
import {existsSync, writeFileSync, readFileSync} from "fs";
import {execSync} from "child_process";

// modules/commit-msg/index.js
var hookPath = join2(gitPath, "hooks/commit-msg");
var run = () => {
  console.log("Commit-msg run 2");
  const rc = JSON.parse(readFileSync2(smghrcPath, "utf-8"));
  const tasks = rc.modules["commit-msg"].tasks;
  let message = readFileSync2(process.argv[2], "utf8");
  if (tasks.emoji)
    message = emoji_default(message);
  if (tasks.replace)
    message = replace_default(message, tasks.replace);
  if (tasks.uppercase)
    message = uppercase_default(message, tasks.uppercase);
  writeFileSync2(process.argv[2], message);
};
// modules/post-commit/index.js
import {join as join3} from "path";
import fs from "fs";
var hookPath2 = join3(gitPath, "hooks/post-commit");
var run2 = () => {
  console.log("post-commit run");
};
export {
  run2 as postCommit,
  run as commitMsg
};
