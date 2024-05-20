import chalk from "chalk"
import prompts, { Choice } from "prompts";
import checkConfig from "../../functions/check-config";
import getConfig from "../../functions/get-config";
import fs, { rm, rmdir } from "node:fs"
import Folder from "../../functions/src-folder";
import { error } from "../../functions/error";

/*
    Contentio 2024
    This file is for removing a route from the project.
*/

export default async function remove() {
    console.log(`
${chalk.cyan("Contentio 2024")}

Remove a single route or the cli from your project.`)
    checkConfig(() => error({
        message: "No config found!"
    }))
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
    console.log(removeSelect.remove_select)
    // remove the choosen things
    if (removeSelect.remove_select == 0) {
        const confirmChoice = await prompts({
            type: 'confirm',
            name: 'confirm_select',
            message: 'We would also remove the content folder. Are you sure to remove Contentio?',
        });
        // removes all of the folders in the content tabgroupe which are also in the conf
        conf.routes.forEach((route) => {
            rmdir("./" + Folder() + "/(content)/" + route.name, (err) => {
                if (err) error({
                    message: err.message
                })
            })
        })
        console.log(chalk.green("[i] Removed all of the tabgroups."))
        rm("./config.contentio.json", (err) => {
            if (err) error({
                message: err.message
            })
        })
        console.log(chalk.green("[i] Removed the config."))
        console.log(`
${chalk.green("Sucess. Contentio is successfully removed from your nextjs project.")}
        `)

        process.exit(0)
    }
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