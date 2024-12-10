'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { login } from '../utils/api'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const data = await login(email, password)
      localStorage.setItem('token', data.token)
      router.push('/orders')
    } catch (err) {
      setError('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="card">
        <h1 style={{ color: `rgb(var(--primary))`, textAlign: 'center', marginBottom: '1rem' }}>Welcome back</h1>
        <p style={{ textAlign: 'center', color: `rgba(var(--foreground), 0.7)`, marginBottom: '2rem' }}>Sign in to your account</p>
        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ backgroundColor: `rgba(var(--secondary), 0.1)`, color: `rgb(var(--secondary))`, padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: `rgba(var(--foreground), 0.7)` }}>
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', color: `rgba(var(--foreground), 0.7)` }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: `rgba(var(--foreground), 0.7)` }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: `rgb(var(--primary))`, textDecoration: 'none' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

