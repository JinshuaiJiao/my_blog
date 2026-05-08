import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const SITE_URL = process.env.SITE_URL || 'https://my-blog.example.com'
const SITE_TITLE = "EvenKnow 的技术博客"
const SITE_DESC = '专注 Vue3 / React / TypeScript，深度实践 AI Agent + MCP 工作流。'

const escapeXml = (s = '') => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;')

const main = async () => {
  const postsRaw = await readFile(path.join(root, 'public/data/posts.json'), 'utf8')
  const posts = JSON.parse(postsRaw)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 20)

  const items = posts.map((p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/post/${p.id}</link>
      <guid isPermaLink="true">${SITE_URL}/post/${p.id}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <author>${escapeXml(p.author)}</author>
      <category>${escapeXml(p.category)}</category>
      <description><![CDATA[${p.excerpt}]]></description>
    </item>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>zh-CN</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>
`

  const outDir = path.join(root, 'public')
  await writeFile(path.join(outDir, 'rss.xml'), xml, 'utf8')
  console.log(`Generated rss.xml with ${posts.length} items`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
