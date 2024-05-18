import checkConfig from "../../functions/check-config.js";
import getConfig from "../../functions/get-config.js";
import chalk from "chalk"
/*
    Contentio 2024
    This file is for checking the Markdown files.
*/
export default async function check() {
    console.log(`
${chalk.cyan("Contentio 2024")}
    
${chalk.italic(chalk.redBright("[i] This command is under construction."))}

Want to help?: https://git.new/contentio`)
    process.exit(0)
}