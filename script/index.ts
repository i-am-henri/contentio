#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import terminalLink from "terminal-link";
import fs from "fs";
import ora from 'ora';
import path from "path";
import { execSync } from "child_process";
import { z } from "zod";

/**the version of the CLI, please update this*/
const version = "0.0.1";

console.log(`${chalk.bgWhite(`next-docs, version ${version}`)} \n`);

// checks if you on the root of your project
await inquirer.prompt({
    name: "root",
    type: "confirm",
    message: "Are you on the root of your project? (do you see a package.json file):",
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
        console.log(`You can help us creating a supported version of this cli ${terminalLink("here", "https://github.com/i-am-henri/next-docs")}.`)
        console.log('(https://github.com/i-am-henri/next-docs)')
        process.exit(1)
    }
    const filePath = path.join("./package.json");

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log(chalk.bgRed("We can't find a package.json file, please check if you are on the root of your project."))
            process.exit(1)
        }
        // the file exists
    });
})

// creating a spinner to show a loading state
const spinner = ora('add the tab group "content"\n').start();

// path to the app directory
const app_path = path.join("./app")

// checks if the folder already exists
if (!fs.existsSync("./app/(content)")) {
    fs.mkdirSync("./app/(content)");
}
// all done, stopping the spinner
spinner.stop()

async function addRoute(route?: number) {
    await inquirer.prompt({
        type: "input",
        name: "add_route",
        message: "Add a new route name by typing the name in."
    })
}

await inquirer.prompt({
    type: "list",
    choices: [
        "yes",
        "no"
    ],
    message: "Do you want to add more routes than 1?",
    name: "more_tham_one_route"
}).then(async (data) => {
    if (data.more_tham_one_route == "no") {
        // asking for a single content route
        await inquirer.prompt({
            type: "input",
            name: "route",
            message: "What should the name of the content route be?"
        })
    }
    await inquirer.prompt({
        type: "number",
        message: "How much routes do you want to add?",
        name: "route_quantity"
    }).then(async (data) => {
        const parseSchema = z.object({
            route_quantity: z.number()
        }).safeParse(data)
        if (!parseSchema.success) {
            console.log(chalk.bgRed("We had an error: we wasn't able to parse the provided number."))
            process.exit(0)
        }
        const { route_quantity } = parseSchema.data
        console.log(data)
        for (let i = 0; i < route_quantity.toString().length; i++) {
            await addRoute()
        }
    })
})




setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
    spinner.stop()
}, 1000);