import chalk from "chalk";
import { existsSync, mkdirSync, writeFile, writeFileSync } from "fs";
import inquirer from "inquirer";
import figlet from "figlet"
import ora from "ora"
import prompts from "prompts"
import { terminalLinkSupported } from "../../functions/link.js";
import terminalLink from "terminal-link";
import Folder from "../../functions/src-folder.js";
import { generateScriptTemplate } from "../../templates/script.js";
import { generatePageTemplate } from "../../templates/page.js";
import { generateConfigTemplate } from "../../templates/config.js";
/*
    Init a new project with contentio. This is the init command.
    This command creates a contentio.json file on the root of your project. 
    Then all of the config will be used for the next content-route.
*/
export default async function init() {
    // warn the user to use a supported version of nextjs
    console.warn(chalk.yellow("[i] You must use NextJs version 13 or higher! Route-groups are not supported in lower versions."))

    // checking if a config file exists
    if (existsSync("./contentio.json")) {
        // the config file exists, the programm will be stopped
        console.log(chalk.green("[i] We found a config file, the programm will be stopped, if you want to edit the config, please change the values in your json file."))
        process.exit(1)
    }

    // checking if you are on the root of your project
    if (!existsSync("./package.json") || !existsSync("./node_modules")) {
        console.log(chalk.red("[i] It looks like, you are not on the root of your project. Please navigate first to the root."))
        process.exit(1)
    }

    // checking if you are using nextjs by scanning the project for next.config.mjs file and the app-directory
    if (!(existsSync("./app") || existsSync("./src/app")) || !existsSync("./next.config.mjs")) {
        console.log(chalk.red("[i] We are not able to find a next.config.mjs file or the app direcory. Make sure, you are in the right folder."))
        process.exit(1)
    }

    // checking if you're using typescript
    if (!existsSync("./tsconfig.json")) {
        console.log(chalk.red("[i] At the time, we are not supporting Javascript, please use Typescript instead. If you want, you can help us, creating a supported version of this cli on github " + terminalLinkSupported ? terminalLink("here", "https://github.com/i-am-henri/contentio") : "(https://github.com/i-am-henri/contentio)" + "."))
        process.exit(1)
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
    mkdirSync(path, { recursive: true });

    // creating the folder for the content
    mkdirSync("./content", {recursive: true})

    // adding content to the 2 folders.
    spinner.text = "writing the content to the files..."
    writeFileSync(scriptPath, generateScriptTemplate(response.route))
    writeFileSync(pagePath, generatePageTemplate(response.route))
    writeFileSync("./contentio.json", generateConfigTemplate(response.route))
    
    spinner.stop()

    spinner.text = "creating the config file"


    console.log(chalk.green("all done"))

}