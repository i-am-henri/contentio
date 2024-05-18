import chalk from "chalk"
import { terminalLinkSupported } from "./link.js"
import terminalLink from "terminal-link"

export function error({
    message,
    code
}: {
    message: string,
    code?: number
}) {
    console.error(`
${chalk.red(`[error] ${message}`)}
    
Because of this error, the program won't be continued.
Do you think it's a bug? Please create an issue ${chalk.blue(`${terminalLinkSupported? terminalLink("here", "https://git.new/contentio"): "here: https://git.new/contentio"}`)}.
`)
    process.exit(1)
}