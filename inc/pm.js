/**
 * get package manager
 */
const pm = () => {
    if (process.env.PNPM_HOME || process.env.PNPM_PACKAGE_NAME) {
        return "pnpm";
    } else {
        return "npm";
    }
}

module.exports = pm;