'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { register } from '../utils/api'
import { ArrowLeft, UserPlus } from 'lucide-react'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const data = await register(name, email, password, phoneNumber)
      localStorage.setItem('token', data.token)
      router.push('/orders')
    } catch (err) {
      setError('Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="w-full max-w-md">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center text-primary hover:text-primary-light transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back
        </button>
        <div className="card">
          <div className="flex items-center justify-center mb-8">
            <UserPlus size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Create an account</h1>
          <p className="text-center text-gray-600 mb-8">Join us and start shipping</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="input-field"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (optional)
              </label>
              <input
                id="phoneNumber"
                type="tel"
                className="input-field"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="btn-primary w-full" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/" className="text-primary hover:text-primary-light font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

