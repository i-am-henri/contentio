/*
    Contentio 2024
    This file if for adding a new route to the nextjs project.
*/
import chalk from "chalk";
import checkConfig from "../../functions/check-config.js";
import { error } from "../../functions/error.js";
import prompts from "prompts";
/**
 * Add a new route to the project. The config file will be used to get the config.
 */
function addRoute(name: string) {
    
}

export default async function add(arg?: string) {
    // checks for the config file, if there is not a config file, an error will be triggered
    checkConfig(() => error({
        message: "Config not found."
    }))
    // welcome command
    console.log(`
${chalk.cyan("Contentio 2024")}

Add a new route.
${arg ? `\nAdding route "${arg}".` : ""}
    `)

    if (!arg) {
        // asking for the name of the new content route
        const name = await prompts({
            type: 'text',
            name: 'route',
            message: 'What is the name of your route?',
            validate: (value) => {
                // checks for special character and spaces
                const hasNoSpaces = /^\S*$/.test(value);
                const hasSpecialCharacters = /^[^\s\w]*$/.test(value);
                if (!hasNoSpaces) {
                    return "[i] Spaces in the file-name are not allowed.\n"
                } else if (hasSpecialCharacters) {
                    return "[i] special characters are not allowed.\n"
                }

                return true
            }
        });
        addRoute(name.route)
    } else {
        addRoute(arg)
    }
}