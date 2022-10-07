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
    ["cleanup", "🧹"],
];

module.exports = () => {

    const fs = require("fs");

    let message = fs.readFileSync(process.argv[2], "utf8");

    console.log("> husky-git-emoji parse")

    const arr = message.split(" ")
    let incipit = arr[0]
    arr.shift()

    gitmojis.every(([text, emoji]) => {
        if (incipit.replace("\n", "").replace(":", "") === text) {
            incipit = `${emoji} ${text}`
            return false
        }
        return true
    });

    arr.length > 0 && (incipit += ":");

    message = [incipit, ...arr].join(" ")

    fs.writeFileSync(process.argv[2], message)

}