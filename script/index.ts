#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import terminalLink from "terminal-link";
import fs from "fs";
import ora from "ora"
import path from "path";
import { execSync } from "child_process";
import { z } from "zod";

/**the version of the CLI, please update this on a new version*/
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
        console.log(`You can help us by creating a supported version of this cli ${terminalLink("here", "https://github.com/i-am-henri/next-docs")}.`)
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
await inquirer.prompt({
    type: "confirm",
    name: "language",
    message: "Are you using Typescipt?"
}).then(async (data) => {
    if (data.language == false) {
        console.log(chalk.bgRed("We aren't supporting Javascript yet."))
        console.log(`You can help us by creating a supported version of this cli ${terminalLink("here", "https://github.com/i-am-henri/next-docs")}.`)
        console.log('(https://github.com/i-am-henri/next-docs)')
        process.exit(1)
    }
})
await inquirer.prompt({
    type: "list",
    name: "content_folder",
    message: "What name should the content folder has?",
    choices: ["content", "markdown", "blog", "other"]
}).then(async (data) => {
    if (data.content_folder == "other") {
        await inquirer.prompt({
            type: "input",
            message: "The name of the folder which contains the content:",
            name: "content_folder_name"
        }).then((data) => {
            if (!fs.existsSync(`./${data.content_folder_name}`)) {
                fs.mkdirSync(`./${data.content_folder_name}`);
            }
            console.log(chalk.bgGreen("Folder created"))
        })
    }
    if (!fs.existsSync(`./${data.content_folder}`)) {
        fs.mkdirSync(`./${data.content_folder}`);
    }
    console.log(chalk.bgGreen("Folder created"))
})

// path to the app directory
const app_path = path.join("./app")

// checks if the folder already exists
if (!fs.existsSync("./app/(content)")) {
    fs.mkdirSync("./app/(content)");
}
console.log(chalk.bgGreen("tabgroup folder created"))

async function addRoute(route: number,) {
    await inquirer.prompt({
        type: "input",
        name: "add_route",
        message: `Add a new route name by typing the name in (${route + 1}. tabgroup): `
    }).then(async (data) => {
        // add a new route to the content tab group
        if (!fs.existsSync("./app/(content)/" + data.add_route)) {
            fs.mkdirSync("./app/(content)/" + data.add_route);
        }
        fs.mkdirSync("./app/(content)/" + data.add_route + "/[...slug]");
        const route_path = path.join("./app/(content)/" + data.add_route)

        fs.writeFile(`./app/(cotent)/${data.add_route}/[...slug]/${data.add_route}.ts`, `
        // file added by next-docs
        import { compileMDX } from "next-mdx-remote/rsc";
        import { notFound } from "next/navigation";
        import fs from "node:fs"
        export async function getMarkdown(slug: string): Promise<string> {
          let raw: string = ""
          await fs.promises.readFile("content/blog/" + slug + ".mdx", 'utf-8').then((data) => {
            raw = data;
          }).catch((err) => {
            console.log(err.code)
            if (err.code == "ENOENT") notFound()
          })
          if (raw == "") {
            notFound()
          }
          return raw
        }
        `, (err) => {
            // handle an error
        })
        fs.writeFile(`./app/(cotent)/${data.add_route}/[...slug]/page.tsx`, `
        // file added by next-docs
        import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc'
        import { getMarkdown } from './${data.add_route}'
        import { Metadata } from 'next'

        export async function generateMetadata({
          params,
        }: { params: { slug: string } }): Promise<Metadata | undefined> {
          const raw = await getMarkdown(params.slug[0])
          const { content, frontmatter } = await compileMDX<{ title: string, date: string, description: string, }>({
            source: raw,
            options: { parseFrontmatter: true },
          })
          return {
            title: frontmatter.title,
            description: frontmatter.description,
          }
        }

        export default async function Page({
          params
        }: { params: { slug: string } }) {
          const raw = await getMarkdown(params.slug[0])
          const withoutFrontmatter: string = raw.replace(/---[\s\S]*?---/, '');
          return <MDXRemote source={withoutFrontmatter} />
        }
        `, (err) => {
            // handle an error
        })
    })
}

await inquirer.prompt({
    type: "list",
    choices: [
        "yes",
        "no"
    ],
    message: "Do you want to add more routes than 1?",
    name: "more_than_one_route"
}).then(async (data) => {
    if (data.more_than_one_route == "no") {
        // asking for a single content route
        await inquirer.prompt({
            type: "input",
            name: "route",
            message: "What should the name of the content route be?"
        }).then(async (data) => {

        })
        return
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
            await addRoute(i)
        }
    })
})

