
import React from 'react'
import './styles.css'
import Link from 'next/link'

export const metadata = {
  description: 'A modern blog about web development and technology.',
  title: 'My Blog | Explore Ideas & Knowledge',
}

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <header className="siteHeader">
          <div className="headerInner">

            <Link href="/" className="logo">
              My<span>Blog.</span>
            </Link>

            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/posts">Posts</Link>
              <Link href="/categories">Categories</Link>
            </nav>

            <Link href="/posts" className="headerBtn">
              Explore Blog →
            </Link>

          </div>
        </header>

        <main>{children}</main>

        <style>{`
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background: #090b18;
            color: #fff;
            font-family: Arial, Helvetica, sans-serif;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          .siteHeader {
            position: sticky;
            top: 0;
            z-index: 100;
            background: rgba(9, 11, 24, 0.88);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid #ffffff15;
          }

          .headerInner {
            max-width: 1200px;
            margin: 0 auto;
            padding: 17px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 25px;
          }

          .logo {
            font-size: 25px;
            font-weight: 800;
            letter-spacing: -1px;
            color: #fff;
          }

          .logo span {
            background: linear-gradient(
              90deg, #a78bfa, #60a5fa, #f472b6
            );
            color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
          }

          .nav {
            display: flex;
            align-items: center;
            gap: 35px;
            font-size: 14px;
          }

          .nav a {
            color: #a5a8bc;
            transition: color .3s;
            position: relative;
          }

          .nav a:hover {
            color: #fff;
          }

          .nav a::after {
            content: '';
            position: absolute;
            bottom: -7px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #a78bfa, #60a5fa);
            transition: width .3s;
          }

          .nav a:hover::after {
            width: 100%;
          }

          .headerBtn {
            padding: 11px 18px;
            border-radius: 9px;
            background: linear-gradient(100deg, #7c3aed, #2563eb);
            color: #fff;
            font-size: 13px;
            font-weight: 600;
            transition: .3s;
            white-space: nowrap;
          }

          .headerBtn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px #6338d755;
          }

          @media (max-width: 600px) {
            .headerInner {
              padding: 15px;
              flex-wrap: wrap;
              gap: 15px;
            }

            .logo {
              font-size: 22px;
            }

            .nav {
              order: 3;
              width: 100%;
              justify-content: center;
              gap: 25px;
              padding-top: 10px;
              border-top: 1px solid #ffffff12;
            }

            .headerBtn {
              padding: 9px 13px;
              font-size: 12px;
            }
          }

          @media (max-width: 360px) {
            .nav {
              gap: 17px;
              font-size: 13px;
            }
          }
        `}</style>
      </body>
    </html>
  )
}
