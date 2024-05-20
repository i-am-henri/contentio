#!/usr/bin/env node

/*
    Contentio 2024
    This file the root file. All functions will be added to "commander" here.
*/

import { program } from "commander"
import init from "./actions/init/index.js";
import add from "./actions/add/index.js";
import check from "./actions/check/index.js";
import remove from "./actions/remove/index.js";

program.name('contentio')
  .description('CLI to add content to any nextjs application')
  .version('0.0.0');

program.command('init')
  .description('Init a first route, add the folder for your content and create a "(content)" tabgroup.')
  .action(async (str, options) => {
    await init()
  });

program.command('add')
  .description('Init a first route, add the folder for your content and create a "(content)" tabgroup.')
  .action(async (str, options) => {
    console.log(options)
    await add(options.args[0])
  });

program.command('check')
  .description("Checks your content folder, and if something isn't right, an error will be triggered. This Command checks also the head of the mdx file, and the types.")
  .action(async (str, options) => {
    await check()
  });

program.command('remove')
  .description('Init a first route, add the folder for your content and create a "(content)" tabgroup.')
  .action(async (str, options) => {
    await remove()
  });

program.parse();