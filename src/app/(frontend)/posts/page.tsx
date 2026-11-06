import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'

export const metadata = { title: 'All Posts' }

export default async function PostsPage() {
  const payload = await getPayloadClient()
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
    limit: 50,
  })

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem' }}>All Posts</h1>

      {posts.length === 0 ? (
        <p>No posts published yet.</p>
      ) : (
        <div className="grid">
          {posts.map((post) => {
            const cover = typeof post.coverImage === 'object' ? (post.coverImage as Media) : null
            const imageUrl = cover?.sizes?.card?.url || cover?.url
            return (
              <Link key={post.id} href={`/posts/${post.slug}`} className="card">
                <div className="imageWrap">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={cover?.alt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  )}
                </div>
                <div className="body">
                  <h2 className="title">{post.title}</h2>
                  {post.excerpt && <p className="excerpt">{post.excerpt}</p>}
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <style>{`
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .card { display: flex; flex-direction: column; border: 1px solid #2a2a2a; border-radius: 12px; overflow: hidden; background: #151515; transition: transform .2s, border-color .2s; }
        .card:hover { transform: translateY(-4px); border-color: #555; }
        .imageWrap { position: relative; aspect-ratio: 16 / 9; background: #222; }
        .body { padding: 1rem 1.1rem 1.2rem; display: flex; flex-direction: column; gap: .5rem; }
        .title { font-size: 1.2rem; margin: 0; line-height: 1.3; }
        .excerpt { margin: 0; color: #aaa; font-size: .9rem; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </main>
  )
}
