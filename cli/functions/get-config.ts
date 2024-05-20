import fs from "node:fs"
import { config } from "../types/config"
/**
 * Returns the config from the config.contentio.json file as parsed JSON.
 */
export default async function getConfig(): Promise<config> {
    // ! expect config to be existing, please check first, if the config is existing with the checkConfig() function !
    const conf = await fs.promises.readFile("./config.contentio.json")

    // returns the json
    return JSON.parse(conf.toString())
}