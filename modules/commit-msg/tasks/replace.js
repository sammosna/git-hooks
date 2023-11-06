module.exports = (commit, occurences) => {
    console.log("Task: replace");

    for (const [s, r] of occurences) {
        const regex = new RegExp(s, "g")
        commit = commit.replace(regex, r)
    }

    return commit
}