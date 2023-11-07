import { join } from "path";
import { basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const ALLOWED_RUNTIMES = ["bun", "node"]

export const createPaths = (rootPath = process.cwd()) => {
    if (rootPath.includes("/node_modules/")) {
        console.log("Possibly postinstall script");
        rootPath = rootPath.split("node_modules")[0]
    }


    const gitPath = join(rootPath, "./.git/");
    const hooksPath = join(gitPath, "hooks")
    const smghrcPath = join(rootPath, ".git-hooks");

    return {
        rootPath,
        gitPath,
        hooksPath,
        smghrcPath
    }
}

export const {
    rootPath,
    gitPath,
    hooksPath,
    smghrcPath
} = createPaths()