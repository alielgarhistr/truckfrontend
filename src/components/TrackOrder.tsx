'use client'

import React, { useState, useEffect } from 'react'
import { getOrders, getOrder } from '../utils/api'
import { Truck, Package, AlertCircle } from 'lucide-react'

const TrackOrder = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setIsLoading(true)
    try {
      const data = await getOrders()
      setOrders(data.orders)
    } catch (err) {
      setError('Failed to fetch orders')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOrderSelect = async (orderId) => {
    setIsLoading(true)
    try {
      const data = await getOrder(orderId)
      setSelectedOrder(data.order)
      setError('')
    } catch (err) {
      setError('Failed to fetch order details')
      setSelectedOrder(null)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-primary text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="page-container">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="flex items-center justify-center mb-8">
            <Truck size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-center mb-2">Track Your Order</h1>
          <p className="text-center text-gray-600 mb-8">Select an order to view its details</p>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center mb-4" role="alert">
              <AlertCircle size={20} className="mr-2" />
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="space-y-4">
            <label htmlFor="orderSelect" className="block text-sm font-medium text-gray-700 mb-1">
              Select Order
            </label>
            <select
              id="orderSelect"
              className="input-field"
              onChange={(e) => handleOrderSelect(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Choose an order</option>
              {orders.map((order) => (
                <option key={order.id} value={order.id}>
                  Order #{order.id} - {order.location}
                </option>
              ))}
            </select>
          </div>
          {selectedOrder && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order ID</p>
                  <p className="text-lg font-semibold">#{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-lg font-semibold">{selectedOrder.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Size</p>
                  <p className="text-lg font-semibold">{selectedOrder.size}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Weight</p>
                  <p className="text-lg font-semibold">{selectedOrder.weight} kg</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Pickup Time</p>
                  <p className="text-lg font-semibold">{new Date(selectedOrder.pickup_time).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-lg font-semibold text-primary">{selectedOrder.status || 'Processing'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrackOrder

