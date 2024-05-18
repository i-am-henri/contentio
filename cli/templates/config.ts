
export const generateConfigTemplate = ({
    route,
    contentDir,
    useContentTabGroup
}: {
    route: string,
    contentDir: string,
    useContentTabGroup: boolean
}): string => {
    return `{
    "routes": [
        {
            "name": "${route}"
        }
    ],
    "contentDir": "${contentDir}",
    "useTabGroupe": ${useContentTabGroup}
}`}