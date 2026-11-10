
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'

export const metadata = {
  title: 'All Posts | My Blog',
}

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
    <main className="postsPage">

      <section className="postsHero">
        <span className="badge">✨ EXPLORE OUR BLOG</span>

        <h1>
          Discover Our <span>Articles.</span>
        </h1>

        <p>
          Explore tutorials, insights and ideas about web development,
          modern technologies, Next.js and Payload CMS.
        </p>

        <div className="postCount">
          <span>{posts.length}</span> Published Articles
        </div>
      </section>

      <section className="postsSection">

        <div className="sectionHeader">
          <div>
            <span className="sectionTag">LATEST CONTENT</span>
            <h2>All Posts</h2>
            <p>Explore our latest articles and tutorials.</p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="emptyState">
            <div className="emptyIcon">📝</div>
            <h2>No posts published yet</h2>
            <p>New articles will appear here. Stay tuned!</p>
            <Link href="/" className="backBtn">
              ← Back to Home
            </Link>
          </div>
        ) : (
          <div className="postsGrid">
            {posts.map((post) => {
              const cover =
                typeof post.coverImage === 'object'
                  ? (post.coverImage as Media)
                  : null

              const imageUrl =
                cover?.sizes?.card?.url || cover?.url

              return (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="postCard"
                >
                  <div className="imageWrap">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={cover?.alt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />
                    ) : (
                      <div className="imagePlaceholder">
                        📖
                      </div>
                    )}

                    <span className="imageLabel">
                      ARTICLE
                    </span>
                  </div>

                  <div className="postBody">
                    <h2>{post.title}</h2>

                    {post.excerpt && (
                      <p className="excerpt">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="readMore">
                      Read Article <span>→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

      </section>

      <style>{`
        .postsPage {
          min-height: 100vh;
          padding: 0 7%;
          color: #fff;
          background:
            radial-gradient(ellipse at 10% 5%, #49247740, transparent 40%),
            radial-gradient(ellipse at 90% 15%, #124b9240, transparent 40%),
            #090b18;
        }

        .postsHero {
          text-align: center;
          padding: 75px 0 65px;
        }

        .badge {
          display: inline-block;
          padding: 9px 18px;
          border: 1px solid #ffffff25;
          background: #ffffff0c;
          border-radius: 30px;
          color: #d9c5ff;
          font-size: 12px;
          letter-spacing: 1px;
        }

        .postsHero h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          letter-spacing: -2px;
          margin: 25px 0 15px;
        }

        .postsHero h1 span {
          background: linear-gradient(
            90deg, #a78bfa, #60a5fa, #f472b6
          );
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        .postsHero > p {
          max-width: 620px;
          margin: 0 auto;
          color: #a5a8bc;
          font-size: 16px;
          line-height: 1.8;
        }

        .postCount {
          margin-top: 25px;
          color: #a5a8bc;
          font-size: 14px;
        }

        .postCount span {
          color: #c4b5fd;
          font-weight: 700;
          font-size: 17px;
        }

        .postsSection {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 0 80px;
        }

        .sectionHeader {
          margin-bottom: 30px;
        }

        .sectionTag {
          color: #a78bfa;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .sectionHeader h2 {
          font-size: 30px;
          margin: 10px 0;
        }

        .sectionHeader p {
          color: #9296aa;
          margin: 0;
          font-size: 14px;
        }

        .postsGrid {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(280px, 1fr)
          );
          gap: 25px;
        }

        .postCard {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #ffffff18;
          border-radius: 16px;
          background: #ffffff08;
          transition: transform .3s, border-color .3s;
        }

        .postCard:hover {
          transform: translateY(-7px);
          border-color: #a78bfa88;
          background: #ffffff0d;
        }

        .imageWrap {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #17192c;
        }

        .imageWrap img {
          transition: transform .4s;
        }

        .postCard:hover .imageWrap img {
          transform: scale(1.06);
        }

        .imagePlaceholder {
          height: 100%;
          display: grid;
          place-items: center;
          font-size: 45px;
          background: linear-gradient(
            135deg, #48237c, #174b8a
          );
        }

        .imageLabel {
          position: absolute;
          top: 15px;
          left: 15px;
          padding: 6px 12px;
          border-radius: 20px;
          background: #090b18cc;
          color: #c4b5fd;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          backdrop-filter: blur(8px);
        }

        .postBody {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 22px;
        }

        .postBody h2 {
          font-size: 19px;
          line-height: 1.4;
          margin: 0 0 12px;
          color: #fff;
        }

        .excerpt {
          color: #a5a8bc;
          font-size: 14px;
          line-height: 1.8;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .readMore {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: auto;
          padding-top: 22px;
          color: #a78bfa;
          font-size: 14px;
          font-weight: 600;
        }

        .readMore span {
          transition: transform .3s;
        }

        .postCard:hover .readMore span {
          transform: translateX(5px);
        }

        .emptyState {
          text-align: center;
          padding: 70px 20px;
          border: 1px solid #ffffff18;
          border-radius: 18px;
          background: #ffffff08;
        }

        .emptyIcon {
          font-size: 45px;
          margin-bottom: 15px;
        }

        .emptyState h2 {
          font-size: 24px;
        }

        .emptyState p {
          color: #a5a8bc;
          margin-bottom: 25px;
        }

        .backBtn {
          display: inline-block;
          padding: 12px 20px;
          border-radius: 9px;
          color: #fff;
          background: linear-gradient(100deg, #7c3aed, #2563eb);
        }

        @media (max-width: 768px) {
          .postsPage {
            padding: 0 5%;
          }

          .postsHero {
            padding: 60px 0 45px;
          }

          .postsGrid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .sectionHeader h2 {
            font-size: 26px;
          }
        }
      `}</style>
    </main>
  )
}
