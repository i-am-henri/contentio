/*
    Contentio 2024
    This file if for adding a new route to the nextjs project.
*/
import chalk from "chalk";
import checkConfig from "../../functions/check-config.js";
import { error } from "../../functions/error.js";


export default async function add(path?: string) {
    checkConfig(() => error({
        message: "Config not found."
    }))
    // welcome command
    console.log(`
${chalk.cyan("Contentio 2024")}

Add a new route.
${path? `\nAdding route "${path}".`: ""}
    `)

    if (!path) {

    }
}