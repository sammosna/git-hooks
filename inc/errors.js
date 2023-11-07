export class Notification extends Error {
    constructor(name, message) {
        super(message); // (1)
        this.name = `@sammosna/git-hooks: ${name}`
        this.message = message;
        this.stack = null
    }
}