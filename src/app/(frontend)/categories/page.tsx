import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'

export const metadata = { title: 'Categories' }

export default async function CategoriesPage() {
  const payload = await getPayloadClient()

  const { docs: categories } = await payload.find({
    collection: 'categories',
    sort: 'title',
    limit: 100,
  })

  const counts = await Promise.all(
    categories.map((c) =>
      payload.count({
        collection: 'posts',
        where: {
          categories: { equals: c.id },
          _status: { equals: 'published' },
        },
      }),
    ),
  )

  return (
    <main className="wrap">
      <Link href="/" className="back">
        ← Back to home
      </Link>
      <h1>Categories</h1>

      {categories.length === 0 ? (
        <p>No categories yet.</p>
      ) : (
        <div className="grid">
          {categories.map((category, i) => {
            const total = counts[i].totalDocs
            return (
              <Link key={category.id} href={`/categories/${category.slug}`} className="card">
                <div className="imageWrap">
                  {category.url ? (
                    <Image
                      src={category.url}
                      alt={category.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      unoptimized
                    />
                  ) : (
                    <div className="placeholder">No image</div>
                  )}
                </div>
                <div className="body">
                  <h2 className="title">{category.title}</h2>
                  <span className="count">
                    {total} {total === 1 ? 'post' : 'posts'}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      <style>{`
        .wrap { max-width: 1100px; margin: 0 auto; padding: 2rem 1rem; }
        .wrap h1 { margin-bottom: 1.5rem; }
        .back { display: inline-block; margin-bottom: 1rem; color: #8ab4ff; font-size: .9rem; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.5rem; }
        .card { display: flex; flex-direction: column; border: 1px solid #2a2a2a; border-radius: 12px; overflow: hidden; background: #151515; transition: transform .2s, border-color .2s; }
        .card:hover { transform: translateY(-4px); border-color: #555; }
        .imageWrap { position: relative; aspect-ratio: 4 / 3; background: #222; }
        .placeholder { display: grid; place-items: center; height: 100%; color: #777; }
        .body { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.1rem; }
        .title { font-size: 1.1rem; margin: 0; }
        .count { font-size: .8rem; color: #888; }
      `}</style>
    </main>
  )
}
