const gitmojis = [
    ["revert", "โณ"],
    ["build", "๐ฆ"],
    ["ci", "๐ค"],
    ["docs", "๐"],
    ["feat", "๐"],
    ["fix", "๐จ"],
    ["perf", "โก"],
    ["refactor", "๐ง"],
    ["style", "๐"],
    ["test", "โ"],
    ["tada", "๐"],
    ["ver", "๐"],
    ["wip", "๐ง"],
    ["try", "๐ก"],
    ["chore", "๐งช"],
    ["update", "โฌ๏ธ "],
    ["clean", "๐งน"],
    ["cleanup", "๐งน"],
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