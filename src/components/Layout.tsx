import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        <nav style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link 
            href="/" 
            style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold',
              color: `rgb(var(--primary))`,
              textDecoration: 'none'
            }}
          >
            DeliverEase
          </Link>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link
              href="/"
              style={{
                color: router.pathname === '/' 
                  ? `rgb(var(--primary))` 
                  : `rgba(var(--foreground), 0.7)`,
                textDecoration: 'none',
                fontWeight: router.pathname === '/' ? '600' : '400',
                transition: 'color 0.2s ease'
              }}
            >
              Login
            </Link>
            <Link
              href="/register"
              style={{
                color: router.pathname === '/register' 
                  ? `rgb(var(--primary))` 
                  : `rgba(var(--foreground), 0.7)`,
                textDecoration: 'none',
                fontWeight: router.pathname === '/register' ? '600' : '400',
                transition: 'color 0.2s ease'
              }}
            >
              Register
            </Link>
            <Link
              href="/orders"
              style={{
                color: router.pathname === '/orders' 
                  ? `rgb(var(--primary))` 
                  : `rgba(var(--foreground), 0.7)`,
                textDecoration: 'none',
                fontWeight: router.pathname === '/orders' ? '600' : '400',
                transition: 'color 0.2s ease'
              }}
            >
              Orders
            </Link>
          </div>
        </nav>
      </header>
      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  )
}

export default Layout

