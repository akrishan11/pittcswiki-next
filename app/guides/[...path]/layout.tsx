import type { Metadata } from "next"
import { promises as fs } from "fs"
import path from "path"
import { getMDFrontMatter } from "@/utils/frontmatter-parser"

export async function generateMetadata({
  params,
}: {
  params: { path: string[] }
}): Promise<Metadata> {
  const curPath = decodeURIComponent(params.path.join("/"))

  const safeBasePath = path.resolve(process.cwd(), "data/guides")
  const safePath = path.resolve(safeBasePath, curPath)

  if (!safePath.startsWith(safeBasePath + path.sep)) {
    return { title: "Guide | Pitt CS Wiki" }
  }

  let frontmatterTitle: string | undefined

  let curFile: string | null = null

  if (!curPath.includes(".md")) {
    const mdPath = path.resolve(safeBasePath, curPath + ".md")
    const mdxPath = path.resolve(safeBasePath, curPath + ".mdx")

    try {
      if ((await fs.stat(mdPath)).isFile()) {
        curFile = await fs.readFile(mdPath, "utf-8")
      }
    } catch (e) {
      // ignore
    }

    if (!curFile) {
      try {
        if ((await fs.stat(mdxPath)).isFile()) {
          curFile = await fs.readFile(mdxPath, "utf-8")
        }
      } catch (e) {
        // ignore
      }
    }
  } else {
    try {
      curFile = await fs.readFile(safePath, "utf-8")
    } catch (e) {
      // ignore
    }
  }

  if (curFile) {
    frontmatterTitle = getMDFrontMatter(curFile).title
  } else {
    try {
      const indexPath = path.resolve(safePath, "index.md")

      if (indexPath.startsWith(safeBasePath + path.sep)) {
        const indexFile = await fs.readFile(indexPath, "utf-8")
        frontmatterTitle = getMDFrontMatter(indexFile).title
      }
    } catch (e) {
      // ignore
    }
  }

  const title = frontmatterTitle
    ? `${frontmatterTitle} | Pitt CS Wiki`
    : "Guide | Pitt CS Wiki"

  return { title }
}

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="max-w-2xl mx-auto">{children}</div>
    </>
  )
}
