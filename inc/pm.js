/**
 * get package manager
 */
const pm = () => {
    if (process.env.PNPM_HOME) {
        return "pnpm";
    } else {
        return "npm";
    }
}

module.exports = pm;