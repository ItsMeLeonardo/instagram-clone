import axios from 'axios'

export const api = axios.create({
  baseURL: typeof window === 'undefined' ? `${process.env.BASE_URL}/api` : '/api',

  // baseURL: '/api',
})
