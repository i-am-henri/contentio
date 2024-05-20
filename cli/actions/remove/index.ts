import chalk from "chalk"
import prompts, { Choice } from "prompts";
import checkConfig from "../../functions/check-config";
import getConfig from "../../functions/get-config";

/*
    Contentio 2024
    This file is for removing a route from the project.
*/
export default async function remove() {
    console.log(`
${chalk.cyan("Contentio 2024")}

Remove a single route or the cli from your project.`)
    checkConfig()
    const conf = await getConfig()
    // asking for the name of the route
    const removeSelect = await prompts({
        type: 'select',
        name: 'remove_select',
        message: 'What do you want to remove?',
        choices: [
            {
                title: "Remove the entire cli",
                description: "Removes the entire cli from your app. This cannot be undone!",
            },
            {
                title: "Only a single route",
                description: "Removed only a single route, the configuration and the other routes will be remaining. This cannot be undone!"
            }
        ]
    });
    let arr: Choice[] = []
    conf.routes.forEach((route) => {
        arr.push({
            title: route.name
        })
    })
    const removeRoute = await prompts({
        type: 'select',
        name: 'remove_route',
        message: 'Which route do you want to remove?',
        choices: arr
    });

    process.exit(0)
}