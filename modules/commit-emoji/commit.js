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

    let incipit = message.split(" ")

    gitmojis.forEach([text, emoji] => {
        incipit = incipit.replace(`${text}:`, `${emoji} ${text}:`)
    });

    fs.writeFileSync(process.argv[2], message)

}