import Link from 'next/link'

export default async function Home() {
  return (
    <main className="wrap">
      <section className="hero">
        <h1>Welcome to My Blog</h1>
        <p>Articles about web development, Next.js and Payload CMS.</p>
        <div className="heroLinks">
          <Link href="/posts" className="btn primary">
            All Posts
          </Link>
          <Link href="/categories" className="btn">
            Browse Categories
          </Link>
        </div>
      </section>

      <div className="sectionHead">
        {/* <h2>Latest Posts</h2> */}
        <Link href="/posts">View all →</Link>
      </div>

      <style>{`
       .hero { text-align: center; padding: 3rem 0 2.5rem; }
.hero h1 { font-size: 2.6rem; margin: 0 0 .5rem; }
.hero p { color: #aaa; margin: 0 0 1.5rem; }
.heroLinks { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.btn { padding: .6rem 1.4rem; border-radius: 8px; border: 1px solid #444; }
.btn:hover { border-color: #888; }
.btn.primary { background: #fff; color: #111; border-color: #fff; }
.sectionHead { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem; }
.sectionHead h2 { margin: 0; }
.sectionHead a { color: #8ab4ff; font-size: .9rem; }
      `}</style>
    </main>
  )
}
