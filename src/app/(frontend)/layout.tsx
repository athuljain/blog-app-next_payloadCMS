import React from 'react'
import './styles.css'
import Link from 'next/link'
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <header className="siteHeader">
          <div className="headerInner">
            <Link href="/" className="logo">
              My Blog
            </Link>
            <nav className="nav">
              <Link href="/">Home</Link>
              <Link href="/posts">Posts</Link>
              <Link href="/categories">Categories</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>

        <style>{`
          body { margin: 0; }
          a { color: inherit; text-decoration: none; }
          .siteHeader { position: sticky; top: 0; z-index: 10; background: rgba(15,15,15,.9); backdrop-filter: blur(8px); border-bottom: 1px solid #2a2a2a; }
          .headerInner { max-width: 1100px; margin: 0 auto; padding: 1rem; display: flex; justify-content: space-between; align-items: center; }
          .logo { font-size: 1.3rem; font-weight: 700; }
          .nav { display: flex; gap: 1.5rem; font-size: .95rem; }
          .nav a { color: #bbb; transition: color .2s; }
          .nav a:hover { color: #fff; }
         
        `}</style>
      </body>
    </html>
  )
}
