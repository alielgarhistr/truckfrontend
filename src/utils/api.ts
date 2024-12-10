import axios, { AxiosError } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

interface LoginResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

interface RegisterResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
    phone_number: string
  }
}

interface Order {
  id: number
  location: string
  size: string
  weight: number
  pickup_time: string
  status?: string
}

interface CreateOrderResponse {
  message: string
  order: Order
}

interface GetOrdersResponse {
  message: string
  orders: Order[]
}

interface GetOrderResponse {
  message: string
  order: Order
}

const handleApiError = (error: AxiosError): never => {
  if (error.response) {
    throw new Error(error.response.data.message || 'An error occurred')
  }
  throw error
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', { email, password })
    return response.data
  } catch (error) {
    return handleApiError(error as AxiosError)
  }
}

export const register = async (name: string, email: string, password: string, phone_number: string): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/register', { name, email, password, phone_number })
    return response.data
  } catch (error) {
    return handleApiError(error as AxiosError)
  }
}

export const createOrder = async (orderData: Omit<Order, 'id' | 'status'>): Promise<CreateOrderResponse> => {
  try {
    const response = await api.post<CreateOrderResponse>('/orders', orderData)
    return response.data
  } catch (error) {
    return handleApiError(error as AxiosError)
  }
}

export const getOrders = async (): Promise<GetOrdersResponse> => {
  try {
    const response = await api.get<GetOrdersResponse>('/orders')
    return response.data
  } catch (error) {
    return handleApiError(error as AxiosError)
  }
}

export const getOrder = async (id: number): Promise<GetOrderResponse> => {
  try {
    const response = await api.get<GetOrderResponse>(`/orders/${id}`)
    return response.data
  } catch (error) {
    return handleApiError(error as AxiosError)
  }
}

export default api

