'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User } from '@/types'
import { usersApi } from '@/lib/api'
import toast from 'react-hot-toast'

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await usersApi.getById(params.id)
        setFormData({
          name: user.name || '',
          email: user.email,
        })
      } catch (error) {
        toast.error('Failed to fetch user')
      } finally {
        setFetchLoading(false)
      }
    }

    fetchUser()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await usersApi.update(params.id, formData)
      toast.success('User updated successfully')
      router.push(`/users/${params.id}`)
    } catch (error) {
      toast.error('Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl">Loading user...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit User</h1>
        <Link href={`/users/${params.id}`} className="text-blue-600 hover:text-blue-800">
          ← Back to User
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter user name"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update User'}
          </button>
          <Link
            href={`/users/${params.id}`}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}