module.exports = (commit, occurences) => {
    console.log("Task: uppercase");
    
    for (const r of occurences) {
        const regex = new RegExp(r, "g")
        commit = commit.replace(regex, v => v.toUpperCase())
    }

    return commit
}