// Contentio 2024
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getMarkdown, type FrontMatter } from './changelog'
import { Metadata } from 'next'
import z from "zod"
import matter from 'gray-matter'

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata | undefined> {
    const raw = await getMarkdown(params.slug)
    const frontmatter = matter(raw).data as FrontMatter
    return {
        title: frontmatter.title,
    }
}

export default async function Page({
  params
}: { params: { slug: string } }) {
    const raw = await getMarkdown(params.slug)
    const data = matter(raw)
    return <MDXRemote source={data.content}  />
}