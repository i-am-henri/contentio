import chalk from "chalk";

export default async function add(path?: string) {
    console.log(`
${chalk.cyan("Contentio 2024")}

Add a new route.
${path? `\nAdding route ${path}.`: ""}
    `)

}