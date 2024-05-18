import fs from "node:fs"
/**
 * Checking if the config file is in the project. If not, a custom error can be triggered or "false" will be returned.
 * @returns boolean 
 */
export default async function CeckConfig(customError?: () => void): Promise<true | false | void> {
    const file = await fs.promises.readFile("./config.contentio.json")
    if (!file && customError) {
        customError()
        process.exit(1)
    } else if (!file) {
        return false
    }
    return true
}