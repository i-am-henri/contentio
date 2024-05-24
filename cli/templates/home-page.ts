/**
 * Generate the template for the page.tsx file.
 */
export const generatePageTemplate = (): string => {
    return `// Contentio 2024
import { MDXRemote, compileMDX } from 'next-mdx-remote/rsc'
import { getMarkdown } from './[slug]'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata | undefined> {
    const raw = await getMarkdown(params.slug[0])
    // please insert here your frontmatter data, which you expect
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
}`}