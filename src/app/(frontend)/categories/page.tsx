
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadClient } from '@/lib/payload'

export const metadata = {
  title: 'Categories | My Blog',
}

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

  const totalPosts = counts.reduce(
    (total, count) => total + count.totalDocs,
    0,
  )

  return (
    <main className="categoriesPage">

      {/* Hero Section */}
      <section className="categoriesHero">

        <span className="badge">
          ✨ EXPLORE TOPICS
        </span>

        <h1>
          Browse <span>Categories.</span>
        </h1>

        <p>
          Discover articles by topic. Explore your interests,
          learn new skills and find something interesting to read.
        </p>

        <div className="categoryStats">
          <div className="statItem">
            <span>{categories.length}</span>
            <p>Categories</p>
          </div>

          <div className="statDivider" />

          <div className="statItem">
            <span>{totalPosts}</span>
            <p>Published Posts</p>
          </div>
        </div>

      </section>

      {/* Categories Section */}
      <section className="categoriesSection">

        <div className="sectionHeader">
          <div>
            <span className="sectionTag">
              FIND YOUR INTEREST
            </span>

            <h2>All Categories</h2>

            <p>
              Choose a category to explore related articles.
            </p>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="emptyState">
            <div className="emptyIcon">📂</div>

            <h2>No categories yet</h2>

            <p>
              Categories will appear here once they are created.
            </p>

            <Link href="/" className="backBtn">
              ← Back to Home
            </Link>
          </div>
        ) : (
          <div className="categoriesGrid">

            {categories.map((category, i) => {
              const total = counts[i].totalDocs

              return (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="categoryCard"
                >

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
                      <div className="placeholder">
                        📚
                      </div>
                    )}

                    <div className="imageOverlay" />

                    <span className="imageLabel">
                      CATEGORY {String(i + 1).padStart(2, '0')}
                    </span>

                  </div>

                  <div className="cardBody">

                    <div>
                      <h2>{category.title}</h2>

                      <span className="count">
                        {total} {total === 1 ? 'post' : 'posts'}
                      </span>
                    </div>

                    <div className="arrowIcon">
                      →
                    </div>

                  </div>

                </Link>
              )
            })}

          </div>
        )}

      </section>

      <style>{`
        .categoriesPage {
          min-height: 100vh;
          padding: 0 7%;
          color: #fff;
          background:
            radial-gradient(ellipse at 10% 5%, #49247740, transparent 40%),
            radial-gradient(ellipse at 90% 15%, #124b9240, transparent 40%),
            #090b18;
        }

        /* Hero */

        .categoriesHero {
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

        .categoriesHero h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          letter-spacing: -2px;
          margin: 25px 0 15px;
        }

        .categoriesHero h1 span {
          background: linear-gradient(
            90deg, #a78bfa, #60a5fa, #f472b6
          );
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        .categoriesHero > p {
          max-width: 620px;
          margin: 0 auto;
          color: #a5a8bc;
          font-size: 16px;
          line-height: 1.8;
        }

        /* Stats */

        .categoryStats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 35px;
          margin-top: 35px;
        }

        .statItem span {
          display: block;
          color: #c4b5fd;
          font-size: 25px;
          font-weight: 800;
        }

        .statItem p {
          margin: 5px 0 0;
          color: #9296aa;
          font-size: 13px;
        }

        .statDivider {
          width: 1px;
          height: 40px;
          background: #ffffff25;
        }

        /* Categories */

        .categoriesSection {
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

        .categoriesGrid {
          display: grid;
          grid-template-columns: repeat(
            auto-fill,
            minmax(250px, 1fr)
          );
          gap: 25px;
        }

        .categoryCard {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #ffffff18;
          border-radius: 16px;
          background: #ffffff08;
          transition: transform .3s, border-color .3s;
        }

        .categoryCard:hover {
          transform: translateY(-7px);
          border-color: #a78bfa88;
          background: #ffffff0d;
        }

        .imageWrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #17192c;
        }

        .imageWrap img {
          transition: transform .4s;
        }

        .categoryCard:hover .imageWrap img {
          transform: scale(1.07);
        }

        .placeholder {
          display: grid;
          place-items: center;
          height: 100%;
          font-size: 45px;
          background: linear-gradient(
            135deg, #48237c, #174b8a
          );
        }

        .imageOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top, #090b18a8, transparent 60%
          );
          pointer-events: none;
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

        .cardBody {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding: 20px;
        }

        .cardBody h2 {
          font-size: 19px;
          margin: 0 0 9px;
          color: #fff;
        }

        .count {
          color: #a5a8bc;
          font-size: 13px;
        }

        .arrowIcon {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: #8b5cf622;
          color: #c4b5fd;
          font-size: 20px;
          transition: .3s;
        }

        .categoryCard:hover .arrowIcon {
          background: linear-gradient(100deg, #7c3aed, #2563eb);
          color: #fff;
          transform: translateX(4px);
        }

        /* Empty State */

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

        /* Responsive */

        @media (max-width: 768px) {
          .categoriesPage {
            padding: 0 5%;
          }

          .categoriesHero {
            padding: 60px 0 45px;
          }

          .categoriesGrid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .sectionHeader h2 {
            font-size: 26px;
          }

          .categoryStats {
            gap: 25px;
          }
        }
      `}</style>

    </main>
  )
}
