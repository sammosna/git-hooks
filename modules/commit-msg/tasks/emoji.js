const gitmojis = {
    build: "📦",
    chore: "🧪",
    ci: "🤖",
    clean: "🧹",
    cleanup: "🧹",
    docs: "📖",
    edit: "✏️",
    feat: "🚀",
    fix: "🔨",
    init: "🎉",
    merge: "🔀",
    perf: "⚡",
    refactor: "🚧",
    revert: "⏳",
    style: "💄",
    tada: "🎉",
    test: "✅",
    try: "💡",
    update: "⬆️",
    ver: "🕒",
    wip: "🚧",
}

export default (commit) => {

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