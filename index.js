const { run: commitMsg } = require("./modules/commit-msg/index")
const { run: postCommit } = require("./modules/post-commit/index")

module.exports = {
    commitMsg,
    postCommit
}