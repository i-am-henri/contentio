import chalk from "chalk";

export default async function Help() {
    return (`
${chalk.cyan("Contentio 2024")}

${chalk.bold("Want help?:")}
- visit our website with the docs: https://contentio.vercel.app
- read the instructions below:

Contentio commands:
- init (Init a new project, this creats a new content route and the config file)
- add (Add a content route)
- check (Checks your markdown files for type errors)
- remove (Remove a single content route or the entire cli from your project)
    `)
}