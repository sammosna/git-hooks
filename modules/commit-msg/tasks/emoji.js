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
}

module.exports = (commit) => {

    const arr = commit.split(" ")
    let incipit = arr[0]
    arr.shift()

    const word = incipit.replace("\n", "").replace(":", "");

    if (Object.keys(gitmojis).includes(word)) {
        const newText = `${gitmojis[word]} ${word}`;
        incipit = incipit.replace(word, newText)
        if (!incipit.includes(`${newText}:`)) incipit = incipit.replace(newText, `${newText}:`)
    }

    return [incipit, ...arr].join(" ")



}