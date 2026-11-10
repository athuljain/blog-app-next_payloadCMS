
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)

  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  return {
    title: docs[0]?.title
      ? `${docs[0].title} | My Blog`
      : 'Category | My Blog',
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug: rawSlug } = await params
  const slug = decodeURIComponent(rawSlug)

  const payload = await getPayloadClient()

  // Get category
  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const category = docs[0]

  if (!category) notFound()

  // Get published posts in this category
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      categories: { equals: category.id },
      _status: { equals: 'published' },
    },
    sort: '-publishedAt',
    depth: 1,
    limit: 24,
  })

  return (
    <main className="categoryPage">

      {/* Hero Section */}
      <section className="categoryHero">

        <Link href="/categories" className="backLink">
          <span>←</span> All Categories
        </Link>

        <div className="heroBadge">
          ✨ EXPLORE TOPIC
        </div>

        <h1>
          {category.title}
        </h1>

        <p className="heroDescription">
          Explore articles, ideas, and useful information
          related to {category.title}.
        </p>

        <div className="categoryStats">
          <div className="statItem">
            <span className="statNumber">{posts.length}</span>
            <span className="statLabel">
              {posts.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>

          <div className="statDivider" />

          <div className="statItem">
            <span className="statNumber">01</span>
            <span className="statLabel">Category</span>
          </div>
        </div>

      </section>

      {/* Posts Section */}
      <section className="postsSection">

        <div className="sectionHeader">
          <div>
            <span className="sectionLabel">LATEST CONTENT</span>
            <h2>Articles in this category</h2>
          </div>

          <span className="postCount">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="emptyState">
            <div className="emptyIcon">✦</div>
            <h3>No articles yet</h3>
            <p>
              There are no published posts in this category.
              Check back later for new content.
            </p>

            <Link href="/categories" className="exploreButton">
              Explore Categories →
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
                        <span>✦</span>
                        <p>No image available</p>
                      </div>
                    )}

                    <span className="imageBadge">
                      ARTICLE
                    </span>

                  </div>

                  <div className="postContent">

                    <h3>{post.title}</h3>

                    {post.excerpt && (
                      <p className="excerpt">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="readMore">
                      Read Article
                      <span>→</span>
                    </div>

                  </div>

                </Link>
              )
            })}

          </div>
        )}

      </section>

      {/* Back Section */}
      <div className="bottomNavigation">
        <Link href="/categories">
          ← Browse All Categories
        </Link>
      </div>

      <style>{`

        .categoryPage {
          min-height: 100vh;
          padding: 0 20px 70px;
          background:
            radial-gradient(
              circle at 15% 5%,
              rgba(91, 45, 145, 0.20),
              transparent 35%
            ),
            radial-gradient(
              circle at 85% 20%,
              rgba(30, 90, 170, 0.16),
              transparent 35%
            ),
            #090b18;
          color: #fff;
        }

        /* Hero */

        .categoryHero {
          max-width: 1100px;
          margin: 0 auto;
          padding: 45px 0 55px;
          text-align: center;
        }

        .backLink {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #a5a5c4;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 35px;
          transition: color 0.3s;
        }

        .backLink:hover {
          color: #fff;
        }

        .heroBadge {
          display: inline-block;
          padding: 9px 17px;
          border: 1px solid rgba(170, 120, 255, 0.3);
          background: rgba(135, 80, 220, 0.12);
          border-radius: 30px;
          color: #c7a6ff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          margin-bottom: 22px;
        }

        .categoryHero h1 {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 1.15;
          margin: 0 0 18px;
          background: linear-gradient(
            90deg,
            #ffffff,
            #c9a8ff,
            #7dbbff
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          overflow-wrap: anywhere;
        }

        .heroDescription {
          max-width: 600px;
          margin: 0 auto;
          color: #a6a7bd;
          font-size: 16px;
          line-height: 1.8;
        }

        /* Stats */

        .categoryStats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 35px;
          margin-top: 35px;
        }

        .statItem {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .statNumber {
          font-size: 25px;
          font-weight: 700;
          color: #fff;
        }

        .statLabel {
          font-size: 12px;
          color: #898ba7;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .statDivider {
          height: 38px;
          width: 1px;
          background: rgba(255,255,255,0.15);
        }

        /* Posts Section */

        .postsSection {
          max-width: 1100px;
          margin: 0 auto;
        }

        .sectionHeader {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 15px;
          margin-bottom: 28px;
        }

        .sectionLabel {
          color: #a987ff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .sectionHeader h2 {
          font-size: clamp(22px, 4vw, 30px);
          margin: 9px 0 0;
          color: #fff;
        }

        .postCount {
          color: #aaaac0;
          font-size: 13px;
          padding: 8px 14px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 25px;
          white-space: nowrap;
        }

        /* Post Cards */

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
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 17px;
          background: rgba(255,255,255,0.035);
          text-decoration: none;
          color: #fff;
          transition: transform 0.3s, border-color 0.3s,
            background 0.3s;
        }

        .postCard:hover {
          transform: translateY(-7px);
          border-color: rgba(160, 115, 255, 0.55);
          background: rgba(255,255,255,0.06);
        }

        .imageWrap {
          position: relative;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #171a2d;
        }

        .imageWrap img {
          transition: transform 0.5s;
        }

        .postCard:hover .imageWrap img {
          transform: scale(1.06);
        }

        .imageBadge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 1;
          padding: 6px 11px;
          border-radius: 20px;
          background: rgba(10, 10, 25, 0.8);
          color: #d2baff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          backdrop-filter: blur(10px);
        }

        .imagePlaceholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #777994;
        }

        .imagePlaceholder span {
          font-size: 35px;
          color: #a987ff;
        }

        .imagePlaceholder p {
          font-size: 13px;
        }

        .postContent {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .postContent h3 {
          font-size: 20px;
          line-height: 1.4;
          margin: 0 0 12px;
          font-weight: 700;
        }

        .excerpt {
          color: #a3a5bb;
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .readMore {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 22px;
          color: #b99aff;
          font-size: 13px;
          font-weight: 600;
        }

        .readMore span {
          transition: transform 0.3s;
        }

        .postCard:hover .readMore span {
          transform: translateX(5px);
        }

        /* Empty State */

        .emptyState {
          text-align: center;
          padding: 65px 20px;
          border: 1px dashed rgba(255,255,255,0.15);
          border-radius: 18px;
          background: rgba(255,255,255,0.025);
        }

        .emptyIcon {
          font-size: 40px;
          color: #a987ff;
          margin-bottom: 15px;
        }

        .emptyState h3 {
          font-size: 23px;
          margin: 0 0 10px;
        }

        .emptyState p {
          color: #a3a5bb;
          line-height: 1.7;
          max-width: 450px;
          margin: 0 auto 25px;
          font-size: 14px;
        }

        .exploreButton {
          display: inline-block;
          padding: 12px 22px;
          border-radius: 9px;
          background: linear-gradient(90deg, #7544d5, #397de0);
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: opacity 0.3s;
        }

        .exploreButton:hover {
          opacity: 0.85;
        }

        /* Bottom Navigation */

        .bottomNavigation {
          max-width: 1100px;
          margin: 45px auto 0;
          padding-top: 25px;
          border-top: 1px solid rgba(255,255,255,0.09);
        }

        .bottomNavigation a {
          color: #aaaac0;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s;
        }

        .bottomNavigation a:hover {
          color: #c7a6ff;
        }

        /* Responsive */

        @media (max-width: 768px) {
          .categoryPage {
            padding-left: 16px;
            padding-right: 16px;
          }

          .categoryHero {
            padding: 30px 0 40px;
          }

          .categoryHero h1 {
            letter-spacing: -1px;
          }

          .postsGrid {
            grid-template-columns: 1fr;
          }

          .sectionHeader {
            align-items: start;
          }
        }

        @media (max-width: 480px) {
          .categoryStats {
            gap: 22px;
          }

          .sectionHeader {
            flex-direction: column;
            align-items: start;
          }

          .postCount {
            align-self: start;
          }
        }

      `}</style>

    </main>
  )
}
