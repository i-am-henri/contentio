import { existsSync } from "fs";

export default function Folder(): "src" | "app" {
    if (existsSync("./src")) {
        return (
            "src"
        )
    }
    return "app"
}