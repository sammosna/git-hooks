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


let message = "init: okok"

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

console.log("incipit", incipit);
console.log("arr.length", arr.length);

if (arr.length > 0 && incipit.slice(-1) !== ":") incipit += ":";

message = [incipit, ...arr].join(" ")

console.log("message", message);

