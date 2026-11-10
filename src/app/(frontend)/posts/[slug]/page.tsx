
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayloadClient } from '@/lib/payload'
import Image from 'next/image'
import Link from 'next/link'
import type { Media, Category, User } from '@/payload-types'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  return {
    title: docs[0]?.title || 'Post Not Found',
    description: docs[0]?.excerpt,
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      _status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
  })

  const post = docs[0]

  if (!post) notFound()

  const cover =
    typeof post.coverImage === 'object'
      ? (post.coverImage as Media)
      : null

  const imageUrl = cover?.url

  const categories = Array.isArray(post.categories)
    ? post.categories
    : []

  const author =
    typeof post.author === 'object'
      ? (post.author as User)
      : null

  return (
    <main className="postPage">

      <article className="articleContainer">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/posts">Posts</Link>
          <span>/</span>
          <span className="current">{post.title}</span>
        </div>

        {/* Article Header */}
        <header className="articleHeader">

          <div className="categoryTags">
            {categories.map((category, index) => {
              const categoryData =
                typeof category === 'object'
                  ? (category as Category)
                  : null

              return categoryData ? (
                <span key={categoryData.id || index} className="categoryTag">
                  {categoryData.title}
                </span>
              ) : null
            })}
          </div>

          <h1>{post.title}</h1>

          {post.excerpt && (
            <p className="articleExcerpt">
              {post.excerpt}
            </p>
          )}

          <div className="articleMeta">
            {author && (
              <span>✍️ {author.name || author.email}</span>
            )}

            {post.publishedAt && (
              <span>
                📅{' '}
                {new Date(post.publishedAt).toLocaleDateString(
                  'en-IN',
                  {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  }
                )}
              </span>
            )}
          </div>

        </header>

        {/* Cover Image */}
        {imageUrl && (
          <div className="coverImage">
            <Image
              src={imageUrl}
              alt={cover?.alt || post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1000px"
              style={{ objectFit: 'cover' }}
              unoptimized
            />
          </div>
        )}

        {/* Rich Text Content */}
        <div className="articleContent">
          <RichText data={post.content} />
        </div>

        {/* Back Button */}
        <div className="articleFooter">
          <Link href="/posts" className="backButton">
            ← Back to All Posts
          </Link>
        </div>

      </article>

      <style>{`
        .postPage {
          min-height: 100vh;
          padding: 35px 7% 80px;
          color: #fff;
          background:
            radial-gradient(ellipse at 10% 5%, #49247740, transparent 40%),
            radial-gradient(ellipse at 90% 15%, #124b9240, transparent 40%),
            #090b18;
        }

        .articleContainer {
          max-width: 900px;
          margin: 0 auto;
        }

        .breadcrumb {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 45px;
          color: #9296aa;
          font-size: 13px;
        }

        .breadcrumb a {
          color: #a78bfa;
          transition: color .3s;
        }

        .breadcrumb a:hover {
          color: #fff;
        }

        .current {
          color: #a5a8bc;
        }

        .articleHeader {
          text-align: center;
          margin-bottom: 40px;
        }

        .categoryTags {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 25px;
        }

        .categoryTag {
          padding: 7px 15px;
          border-radius: 25px;
          background: #8b5cf622;
          border: 1px solid #a78bfa55;
          color: #c4b5fd;
          font-size: 12px;
          font-weight: 600;
        }

        .articleHeader h1 {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -1.5px;
          margin: 0 0 22px;
          background: linear-gradient(
            90deg, #fff, #c4b5fd, #60a5fa
          );
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        .articleExcerpt {
          max-width: 700px;
          margin: 0 auto 25px;
          color: #a5a8bc;
          font-size: 17px;
          line-height: 1.8;
        }

        .articleMeta {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 25px;
          color: #9296aa;
          font-size: 13px;
        }

        .coverImage {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #ffffff20;
          background: #17192c;
          margin-bottom: 45px;
        }

        .articleContent {
          color: #c4c7d6;
          font-size: 16px;
          line-height: 1.9;
          overflow-wrap: anywhere;
        }

        .articleContent h1,
        .articleContent h2,
        .articleContent h3,
        .articleContent h4 {
          color: #fff;
          line-height: 1.4;
          margin-top: 35px;
          margin-bottom: 15px;
        }

        .articleContent h2 {
          font-size: 27px;
        }

        .articleContent h3 {
          font-size: 22px;
        }

        .articleContent p {
          margin: 0 0 20px;
        }

        .articleContent a {
          color: #a78bfa;
          text-decoration: underline;
        }

        .articleContent ul,
        .articleContent ol {
          padding-left: 25px;
          margin-bottom: 22px;
        }

        .articleContent li {
          margin-bottom: 8px;
        }

        .articleContent blockquote {
          margin: 25px 0;
          padding: 18px 25px;
          border-left: 4px solid #8b5cf6;
          background: #ffffff08;
          border-radius: 0 12px 12px 0;
          color: #c4b5fd;
        }

        .articleContent pre {
          overflow-x: auto;
          padding: 20px;
          border-radius: 12px;
          background: #15182a;
          border: 1px solid #ffffff15;
        }

        .articleContent code {
          color: #c4b5fd;
          background: #ffffff0d;
          padding: 3px 6px;
          border-radius: 4px;
        }

        .articleContent img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
        }

        .articleFooter {
          border-top: 1px solid #ffffff18;
          margin-top: 55px;
          padding-top: 30px;
        }

        .backButton {
          display: inline-block;
          padding: 13px 22px;
          border-radius: 9px;
          color: #fff;
          background: linear-gradient(100deg, #7c3aed, #2563eb);
          font-weight: 600;
          transition: .3s;
        }

        .backButton:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px #6338d755;
        }

        @media (max-width: 768px) {
          .postPage {
            padding: 25px 5% 60px;
          }

          .breadcrumb {
            margin-bottom: 30px;
          }

          .articleHeader h1 {
            letter-spacing: -1px;
          }

          .articleExcerpt {
            font-size: 15px;
          }

          .coverImage {
            border-radius: 13px;
            margin-bottom: 30px;
          }

          .articleContent {
            font-size: 15px;
          }

          .articleContent h2 {
            font-size: 23px;
          }
        }
      `}</style>

    </main>
  )
}
