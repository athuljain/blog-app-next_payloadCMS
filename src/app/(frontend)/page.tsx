
import Link from 'next/link'

export default function Home() {
  return (
    <main className="wrap">
      <section className="hero">
        <div className="heroBadge">
          ✨ Explore ideas. Learn something new.
        </div>

        <h1>
          Discover Stories,
          <br />
          <span>Ideas & Knowledge.</span>
        </h1>

        <p>
          Explore articles about web development, modern technologies,
          Next.js and Payload CMS. Learn, build and grow with us.
        </p>

        <div className="heroLinks">
          <Link href="/posts" className="btn primary">
            Explore Articles →
          </Link>

          <Link href="/categories" className="btn secondary">
            Browse Categories
          </Link>
        </div>

        <div className="heroInfo">
          <span>💻 Web Development</span>
          <span>🚀 Next.js</span>
          <span>🎨 Technology</span>
        </div>
      </section>

      <style>{`
        .wrap {
          min-height: 100vh;
          padding: 0 7%;
          color: #fff;
          background:
            radial-gradient(ellipse at 10% 10%, #49247755, transparent 40%),
            radial-gradient(ellipse at 90% 20%, #124b9250, transparent 40%),
            #090b18;
          overflow: hidden;
        }

        .hero {
          text-align: center;
          padding: 100px 0 85px;
        }

        .heroBadge {
          display: inline-block;
          padding: 10px 20px;
          border: 1px solid #ffffff25;
          background: #ffffff0c;
          border-radius: 30px;
          color: #d9c5ff;
          font-size: 14px;
          margin-bottom: 30px;
        }

        .hero h1 {
          font-size: clamp(2.7rem, 6vw, 5rem);
          line-height: 1.12;
          letter-spacing: -2px;
          font-weight: 800;
          margin: 0;
        }

        .hero h1 span {
          background: linear-gradient(
            90deg, #a78bfa, #60a5fa, #f472b6, #fb923c
          );
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        .hero p {
          max-width: 650px;
          margin: 25px auto 35px;
          color: #a5a8bc;
          font-size: 17px;
          line-height: 1.8;
        }

        .heroLinks {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 15px 27px;
          border-radius: 10px;
          font-weight: 600;
          transition: .3s;
          text-decoration: none;
        }

        .btn:hover {
          transform: translateY(-4px);
        }

        .primary {
          color: white;
          background: linear-gradient(100deg, #7c3aed, #2563eb);
          box-shadow: 0 8px 30px #6338d755;
        }

        .secondary {
          color: #fff;
          border: 1px solid #ffffff35;
          background: #ffffff0b;
        }

        .heroInfo {
          display: flex;
          justify-content: center;
          gap: 28px;
          flex-wrap: wrap;
          margin-top: 45px;
          color: #b9bbcd;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .wrap {
            padding: 0 5%;
          }

          .hero {
            padding: 75px 0 55px;
          }

          .heroInfo {
            gap: 15px;
          }
        }
      `}</style>
    </main>
  )
}
