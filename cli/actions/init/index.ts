/*
    Contentio 2024
    Init a new project with Contentio.
*/
import chalk from "chalk";
import { existsSync, mkdirSync, writeFile, writeFileSync } from "fs";
import ora from "ora"
import prompts from "prompts"
import terminalLink from "terminal-link";
import Folder from "../../functions/src-folder.js";
import { generateScriptTemplate } from "../../templates/script.js";
import { generatePageTemplate } from "../../templates/page.js";
import { generateConfigTemplate } from "../../templates/config.js";
import { error } from "../../functions/error.js";
import checkConfig from "../../functions/check-config.js";
import { exec } from "child_process";
/*
    Init a new project with contentio. This is the init command.
    This command creates a config.contentio.json file on the root of your project. 
    Then all of the config will be used for the next content-route.
*/
export default async function init() {
    const conf = await checkConfig()
    if (conf) error({
        message: "You already init contentio. Do you want to remove it? => npx contentio remove"
    })
    console.log(`
${chalk.cyan("Contentio 2024")}

Init a new Contentio project with the cli.
    `)
    // warn the user to use a supported version of nextjs
    console.warn(chalk.yellow("[i] You must use NextJs version 13 or higher! Route-groups are not supported in lower versions."))

    // checking if you are on the root of your project
    if (!existsSync("./package.json") || !existsSync("./node_modules")) {
        error({
            message: "It looks like, you are not on the root of your project. Please navigate first to the root."
        })
    }

    // checking if you are using nextjs by scanning the project for next.config.mjs file and the app-directory
    if (!(existsSync("./app") || existsSync("./src/app")) || !existsSync("./next.config.mjs") || existsSync("./next.config.js")) {
        error({
            message: "We are not able to find a next.config.mjs file or the app direcory. Make sure, you are in the right folder."
        })
    }

    // checking if you're using typescript
    if (!existsSync("./tsconfig.json")) {
        error({message: `At the time, we are not supporting Javascript, please use Typescript instead. If you want, you can help us, creating a supported version of this cli on github " + terminalLinkSupported ? terminalLink("here", "https://git.new/contentio") : "(https://git.new/contentio)" + ".")`})
    }

    // asking for the name of the route
    const response = await prompts({
        type: 'text',
        name: 'route',
        message: 'What is the name of your route?',
        validate: (value) => {
            // checks for special character and spaces
            const hasNoSpaces = /^\S*$/.test(value);
            const hasSpecialCharacters = /^[^\s\w]*$/.test(value);
            if (!hasNoSpaces) {
                return "[i] Spaces in the folder-name are not allowed.\n"
            } else if (hasSpecialCharacters) {
                return "[i] special characters are not allowed."
            }

            return true
        }
    });

    const spinner = ora().start()
    spinner.text = "creating the necessary folders..."

    // creating the route-groupe folder
    const folder = Folder() === "app" ? "app" : "src/app";

    const route = response.route;
    const path = folder === "app"
        ? `./app/(content)/${route}/[slug]`
        : `./src/app/(content)/${route}/[slug]`;
    const scriptPath = path + `/${route}.ts`
    const pagePath = path + `/page.tsx`
    const configPath = `./config.contentio.json`

    // create the folder with all parent folders
    mkdirSync(path, { recursive: true });

    // creating the folder for the content
    mkdirSync("./content/" + route, { recursive: true })

    // adding content to the 2 folders.
    spinner.text = "writing the content to the files..."
    writeFileSync(scriptPath, generateScriptTemplate(response.route))
    writeFileSync(pagePath, generatePageTemplate(response.route))
    writeFileSync(configPath, generateConfigTemplate({
        route: response.route,
        contentDir: "content",
        useContentTabGroup: true
    }))

    spinner.text = "installing the required dependencys with npm"
    
    // installing the required dependencys
    exec("npm i next-remote-mdx gray-matter", (err) => {
        if (err) error({
            message: err.message
        })
    })

    // stop the loading spinner, all files are created now
    spinner.stop()

    console.log(chalk.green("all done => want to help? https://git.new/contentio"))
}