'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import CreateOrder from '../components/CreateOrder'
import TrackOrder from '../components/TrackOrder'

const Orders = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
    }
  }, [router])

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CreateOrder />
        <TrackOrder />
      </div>
    </Layout>
  )
}

export default Orders

