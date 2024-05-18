import fs from "node:fs"
/**
 * Checking if the config file is in the project. If not, a custom error can be triggered or "false" will be returned.
 * @returns boolean 
 */
export default async function checkConfig(customError?: (err?: any) => void): Promise<true | false | void> {
    const file = await fs.promises.readFile("./config.contentio.json").catch((err) => {
        if (err && customError) {
            customError(err)
            process.exit(1)
        }
        if (err) return false
    })
    if (!file && customError) {
        customError()
        process.exit(1)
    } else if (!file) {
        return false
    }
    return true
}