/*
    Contentio 2024
    This file if for adding a new route to the nextjs project.
*/
import chalk from "chalk";



export default async function add(path?: string) {
    // welcome command
    console.log(`
${chalk.cyan("Contentio 2024")}

Add a new route.
${path? `\nAdding route "${path}".`: ""}
    `)

    if (!path) {

    }
}