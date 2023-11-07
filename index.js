const { run: commitMsg } = require("./modules/commit-msg/index")
const { run: prepareCommitMsg } = require("./modules/prepare-commit-msg/index")
const { run: preCommit } = require("./modules/pre-commit/index")

module.exports = {
    preCommit,
    prepareCommitMsg,
    commitMsg
}