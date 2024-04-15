#!/usr/bin/env node

/*
    Welcome to the source code. Please describe your code well and if your done please create a pull request. Thanks!
*/
import {program} from "commander"
import chalk from "chalk";
import inquirer from "inquirer";
import terminalLink from "terminal-link";
import fs, { writeFileSync } from "fs";
import { exec, execSync } from "child_process";
import { generateScriptTemplate } from "./templates/script.js";
import { generatePageTemplate } from "./templates/page.js";
// @ifdef DEBUG
console.log('Debugging is enabled.');
// @endif

// @ifdef PRODUCTION
console.log('This code runs in production.');
// @endif
/**The version of the CLI, please update this on a new version!*/
const version = "0.1.1";

// prints the version, and the name of this cli in the console, in a bold style
console.log(`${chalk.bold(`next-docs, version ${version}`)} \n`);

// checks if you on the root of your project
await inquirer.prompt({
    name: "root",
    type: "confirm",
    message: "Are you on the root of your project? (do you see a package.json or similar file?):",
}).then((data) => {
    if (data.root == false) {
        console.log(chalk.bgRed("\n\nYou have to be on the root of your next project. Try to navigate to the root."))
        process.exit(1)
    }
})

// checks if you using the app directory in next, if not: the cli will return an error and stops
await inquirer.prompt({
    type: "confirm",
    message: "Are you using the app directory?",
    name: "app_directory",
}).then((data) => {
    if (data.app_directory == false) {
        console.log(chalk.bgRed("\n\nSorry, but we aren't supporting the pages direcory yet."))
        console.log(`You can help us by creating a supported version of this cli ${terminalLink("here", "https://github.com/i-am-henri/next-docs")}.`)
        process.exit(1)
    }
})
// checking if a package.json exists, if not you aren't on the root
fs.access("./package.json", fs.constants.F_OK, (err) => {
    if (err) {
        console.log(chalk.bgRed("\nWe can't find a package.json file, please check if you are on the root of your project."))
        process.exit(1)
    }
    // the file exists
});
// checking if the app dir exists
fs.access("./app", fs.constants.F_OK, (err) => {
    if (err) {
        console.log(chalk.bgRed("\nWe can't find the app directory, please check if you are on the root of your project."))
        process.exit(1)
    }
    // the app folder exists
});

// checks which language you are using. If Js: an error will occure, templates are not ready yet
await inquirer.prompt({
    type: "confirm",
    name: "language",
    message: "Are you using Typescipt?"
}).then(async (data) => {
    if (data.language == false) {
        console.log(chalk.bgRed("[system] we aren't supporting Javascript yet."))
        if (!terminalLink.isSupported) {
            console.log(`You can help us by creating a supported version of this CLI on github: https://github.com/i-am-henri/next-docs.`)
            process.exit(1)
        }
        console.log(`You can help us by creating a supported version of this cli ${terminalLink("here", "https://github.com/i-am-henri/next-docs")}.`)
        process.exit(1)
    }
})

// asking which name the content folder should have. 
await inquirer.prompt({
    type: "list",
    name: "content_folder",
    message: "What name should the content folder has?",
    choices: ["content", "markdown", "blog", "other"]
}).then(async (data) => {
    if (data.content_folder == "other") {
        await inquirer.prompt({
            type: "input",
            message: "The name of the folder which contains the content:",
            name: "content_folder_name"
        }).then((data) => {
            if (!fs.existsSync(`./${data.content_folder_name}`)) {
                fs.mkdirSync(`./${data.content_folder_name}`);
            }
        })
        return
    }
    if (!fs.existsSync(`./${data.content_folder}`)) {
        fs.mkdirSync(`./${data.content_folder}`);
    }
    console.log(chalk.green("[system] folder created"))
})

// checks if the folder already exists
if (!fs.existsSync("./app/(content)")) {
    fs.mkdirSync("./app/(content)");
    console.log(chalk.green("[system] tabgroup-folder 'content' created"))
} else {
    console.log(chalk.green("[system] tabgroup-folder existing"))
}

/**
 * Generate the folders and add the scripts.
 * Please provide the name for the scripts.
 * @param name string
 */
async function createFiles(name: string) {
    // generate the folders
    fs.mkdirSync("./app/(content)/" + name + "/[...slug]", {
        recursive: true
    })
    const pagePath = process.cwd() + "/app/(content)/" + name + "/[...slug]/page.tsx"
    const scriptPath = process.cwd() + "/app/(content)/" + name + "/[...slug]/" + name + ".ts"

    // generate the script file
    fs.writeFile(scriptPath, generateScriptTemplate(name), (err) => {
        if (err) console.log(err)
    })
    // generate the page file
    fs.writeFile(pagePath, generatePageTemplate(name), (err) => {
        if (err) console.log(err)
    })
}

/**
 * Asking for the name of the route folder.
 * @param route number
 */
async function addRoutes(route: number,) {
    await inquirer.prompt({
        type: "input",
        name: "add_route",
        message: `Add a new route name by typing the name in (${route + 1}. tabgroup): `
    }).then(async (data) => createFiles(data.add_route))
}

// asking if you want to add more routes than only 1
await inquirer.prompt({
    type: "list",
    choices: [
        "yes",
        "no"
    ],
    message: "Do you want to add more routes than 1?",
    name: "more_than_one_route"
}).then(async (data) => {
    if (data.more_than_one_route == "no") {
        // asking for a single content route
        await inquirer.prompt({
            type: "input",
            name: "route",
            message: "What should the name of the content route be?"
        }).then(async (data: {
            route: string
        }) => createFiles(data.route))
        return
    }
    // adding more than one route
    await inquirer.prompt({
        type: "number",
        message: "How much routes do you want to add?",
        name: "route_quantity"
    }).then(async (data: {
        route_quantity: number
    }) => addRoutes(data.route_quantity))
})
// TODO: installing the next-mdx-remote package


// end "scene"
console.log(chalk.green("All files and next-mdx-remote were succesfully added. Happy hacking!"))
// TODO: remove this line when adding support for the installation in this cli
console.log(chalk.green("Please install now the package 'next-mdx-remote'."))
// Terminallink isn't supported, using fallback text instead
if (!terminalLink.isSupported) {
    console.log("If you like this project, please consider helping on github: https://github.com/i-am-henri/next-content")
    process.exit(0)
}
console.log(`If you like this project, please consider helping ${terminalLink("here", "https://github.com/i-am-henri/next-content")}.`)