/**
 * get package manager
 */
// const pm = () => {
//     if (process.env.PNPM_HOME || process.env.PNPM_PACKAGE_NAME) {
//         return "pnpm";
//     } else {
//         return "npm";
//     }
// }

// class PackageManager {
//     constructor() {
//         this.pm = this.#which()
//     }

//     #which() {
//         if (process.env.PNPM_HOME || process.env.PNPM_PACKAGE_NAME) return "pnpm"
//         return "npm"
//     }

//     addDev() {
//         switch (this.pm) {
//             case "pnpm":
//                 return "pnpm add -D"
//             case "npm":
//                 return "npm install --save-dev"

//             default:
//                 break;
//         }
//     }
// }


export function PM() {
    const o = {}
    if (process.env.PNPM_HOME || process.env.PNPM_PACKAGE_NAME) {
        o.pm = "pnpm"
        o.addDev = "pnpm add -D"
        o.run = "pnpm"
        return o
    }

    o.pm = "npm"
    o.addDev = "npm install --save-dev"
    o.run = "npm"
    return o
}