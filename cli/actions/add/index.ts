/*
    Contentio 2024
    This file if for adding a new route to the nextjs project.
*/
import chalk from "chalk";
import checkConfig from "../../functions/check-config.js";
import { error } from "../../functions/error.js";
import prompts from "prompts";
import getConfig from "../../functions/get-config.js";
import { config } from "../../types/config.js";
import fs, { mkdirSync, writeFile, writeFileSync } from "node:fs"
import Folder from "../../functions/src-folder.js";
import { generateScriptTemplate } from "../../templates/script.js";
import { generatePageTemplate } from "../../templates/page.js";
import { generateConfigTemplate } from "../../templates/config.js";

/**
 * Add a new route to the project. The config file will be used to get the config.
 */
async function addRoute(name: string) {
    const conf: config = await getConfig()
    if (!conf) error({
        message: "Content of config not found."
    })
    // creating the route-groupe folder
    const folder = Folder() === "app" ? "app" : "src/app";

    const route = name;
    const path = folder === "app"
        ? `./app/(content)/${route}/[slug]`
        : `./src/app/(content)/${route}/[slug]`;
    const scriptPath = path + `/${route}.ts`
    const pagePath = path + `/page.tsx`
    const configPath = `./config.contentio.json`

    // create the folder with all parent folders
    mkdirSync(path, { recursive: true });

    // creating the folder for the content
    mkdirSync("./content/" + name, { recursive: true })

    // adding content to the 2 folders.
    
    writeFile(pagePath, generatePageTemplate(name), (err) => {
        if (err) error({
            message: err.message
        })
    })
    writeFile(configPath, generateConfigTemplate({
        route: route,
        contentDir: "content",
        useContentTabGroup: true
    }), (err) => {
        if (err) error({
            message: err.message
        })
    })
    mkdirSync("./content/" + route, { recursive: true })

    conf.routes.push({
        name
    })
    writeFile(scriptPath, JSON.stringify(conf), (err) => {
        if (err) error({
            message: err.message
        })
    })
    writeFile(pagePath, JSON.stringify(conf), (err) => {
        if (err) error({
            message: err.message
        })
    })
}

export default async function add(arg?: string) {
    // checks for the config file, if there is not a config file, an error will be triggered
    await checkConfig(() => error({
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
        await addRoute(name.route)
    } else {
        await addRoute(arg)
    }
}