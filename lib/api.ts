import { User, Post, CreateUserData, CreatePostData } from '@/types'

const API_BASE = '/api'

// Users API
export const usersApi = {
  async getAll(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/users`)
    if (!res.ok) throw new Error('Failed to fetch users')
    return res.json()
  },

  async getById(id: string): Promise<User> {
    const res = await fetch(`${API_BASE}/users/${id}`)
    if (!res.ok) throw new Error('Failed to fetch user')
    return res.json()
  },

  async create(data: CreateUserData): Promise<User> {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create user')
    return res.json()
  },

  async update(id: string, data: Partial<CreateUserData>): Promise<User> {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update user')
    return res.json()
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete user')
  },
}

// Posts API
export const postsApi = {
  async getAll(): Promise<Post[]> {
    const res = await fetch(`${API_BASE}/posts`)
    if (!res.ok) throw new Error('Failed to fetch posts')
    return res.json()
  },

  async getById(id: string): Promise<Post> {
    const res = await fetch(`${API_BASE}/posts/${id}`)
    if (!res.ok) throw new Error('Failed to fetch post')
    return res.json()
  },

  async create(data: CreatePostData): Promise<Post> {
    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create post')
    return res.json()
  },

  async update(id: string, data: Partial<CreatePostData>): Promise<Post> {
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to update post')
    return res.json()
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete post')
  },
}