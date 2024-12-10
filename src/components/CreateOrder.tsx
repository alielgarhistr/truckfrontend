'use client'

import React, { useState } from 'react'
import { createOrder } from '../utils/api'
import { Package, CheckCircle, AlertCircle } from 'lucide-react'

const CreateOrder = () => {
  const [location, setLocation] = useState('')
  const [size, setSize] = useState('')
  const [weight, setWeight] = useState('')
  const [pickupTime, setPickupTime] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')
    try {
      await createOrder({ location, size, weight: parseFloat(weight), pickup_time: pickupTime })
      setSuccess('Order created successfully')
      // Reset form
      setLocation('')
      setSize('')
      setWeight('')
      setPickupTime('')
    } catch (err) {
      setError('Failed to create order')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="flex items-center justify-center mb-8">
            <Package size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Create a New Order</h1>
          <p className="text-center text-gray-600 mb-8">Fill in the details for your shipment</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center" role="alert">
                <AlertCircle size={20} className="mr-2" />
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center" role="alert">
                <CheckCircle size={20} className="mr-2" />
                <span className="block sm:inline">{success}</span>
              </div>
            )}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Location
              </label>
              <input
                id="location"
                type="text"
                required
                className="input-field"
                placeholder="123 Main St, City, Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">
                Package Size
              </label>
              <input
                id="size"
                type="text"
                required
                className="input-field"
                placeholder="Small, Medium, Large"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                required
                className="input-field"
                placeholder="0.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">
                Pickup Time
              </label>
              <input
                id="pickupTime"
                type="datetime-local"
                required
                className="input-field"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="btn-primary w-full" disabled={isLoading}>
                {isLoading ? 'Creating Order...' : 'Create Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateOrder

