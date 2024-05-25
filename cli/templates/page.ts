/**
 * Generate the template for the page.tsx file.
 * Please provide the name of the route-name!
 * @param name string
 */
export const generatePageTemplate = (name: string): string => {
    return `// Contentio 2024
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMarkdown, type FrontMatter } from './wow'
import { Metadata } from 'next'
import z from "zod"
import matter from 'gray-matter'

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata | undefined> {
    const raw = await getMarkdown(params.slug[0])
    const frontmatter = matter(raw).data as FrontMatter
    return {
        title: frontmatter.title,
    }
}

export default async function Page({
  params
}: { params: { slug: string } }) {
    const raw = await getMarkdown(params.slug[0])
    const data = matter(raw)
    return <MDXRemote source={data.content}  />
}`}