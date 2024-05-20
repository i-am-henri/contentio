import chalk from "chalk";

export default async function help() {
    console.log(`
${chalk.cyan("Contentio 2024")}

${chalk.bold("Want help?:")}
- visit our website with the docs: ${chalk.cyan("https://contentio.vercel.app")}
- read the instructions below:

${chalk.bold("Contentio commands:")}
- init (Init a new project, this creats a new content route and the config file)
- add (Add a content route)
- check (Checks your markdown files for type errors)
- remove (Remove a single content route or the entire cli from your project)
    `)
}