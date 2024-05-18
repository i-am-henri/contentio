
export const generateConfigTemplate = (route: string): string => {
    return `{
    "routes": [
        {
            "name": "${route}"
        }
    ]
}`}