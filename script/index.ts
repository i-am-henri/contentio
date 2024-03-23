#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import terminalLink from "terminal-link";
const version = "0.0.1";
console.log(`${chalk.green(`next-docs, version ${version}, maintained by programmers like you`)} \n`);
await inquirer.prompt({
    type: "list",
    message: "Are you using the app directory?",
    choices: ["yes", "no"],
    name: "app_directory",
}).then((data) => {
    console.log(data)
    if (data.app_directory == "no") {
        console.log(chalk.bgRed("Sorry, but we aren't supporting the pages direcory yet.\n"))
        console.log(`You can help us creating a supported version of this cli ${terminalLink("here", "https://github.com/i-am-henri/next-docs")}.`)
        process.exit(1)
    }
})