const gitmojis = [
    ["revert", "⏳"],
    ["build", "📦"],
    ["ci", "🤖"],
    ["docs", "📖"],
    ["feat", "🚀"],
    ["fix", "🔨"],
    ["perf", "⚡"],
    ["refactor", "🚧"],
    ["style", "💄"],
    ["test", "✅"],
    ["tada", "🎉"],
    ["ver", "🕒"],
    ["wip", "🚧"],
    ["try", "💡"],
    ["chore", "🧪"],
    ["update", "⬆️ "],
    ["clean", "🧹"],
];

module.exports = () => {

    const fs = require("fs");

    let message = fs.readFileSync(process.argv[2], "utf8");

    console.log("> husky-git-emoji parse")

    const arr = message.split(" ")
    let incipit = arr[0]
    arr.shift()

    gitmojis.forEach(([text, emoji]) => {
        incipit = incipit.replace(`${text}`, `${emoji} ${text}`)
    });

    message = [incipit, ...arr].join(" ")

    fs.writeFileSync(process.argv[2], message)

}