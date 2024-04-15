import chalk from "chalk";
import { existsSync } from "fs";
import inquirer from "inquirer";
import figlet from "figlet"
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
        process.exit(0)
    }

    // checking if you are on the root of your project
    if (!existsSync("./package.json") || !existsSync("./node_modules")) {
        console.log(chalk.red("[i] It looks like, you are not on the root of your project. Please navigate first to the root."))
        process.exit(0)
    }

    // checking if you are using nextjs by scanning the project for next.config.mjs file and the app-directory
    if (!(existsSync("./app") || existsSync("./src/app")) || !existsSync("./next.config.mjs")) {
        console.log(chalk.red("[i] We are not able to find a next.config.mjs file or the app direcory. Make sure, you are in the right folder."))
        process.exit(0)
    }
    
    // asking the user which name the route should have
    await inquirer.prompt({
        type: "input",
        message: "Which name should have the content route?",
        
    })
    
}