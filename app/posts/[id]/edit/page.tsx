'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Post, User } from '@/types'
import { postsApi, usersApi } from '@/lib/api'
import toast from 'react-hot-toast'

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    authorId: '',
    published: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [post, usersData] = await Promise.all([
          postsApi.getById(params.id),
          usersApi.getAll()
        ])
        
        setFormData({
          title: post.title,
          content: post.content || '',
          authorId: post.authorId,
          published: post.published,
        })
        setUsers(usersData)
      } catch (error) {
        toast.error('Failed to fetch data')
      } finally {
        setFetchLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await postsApi.update(params.id, formData)
      toast.success('Post updated successfully')
      router.push(`/posts/${params.id}`)
    } catch (error) {
      toast.error('Failed to update post')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl">Loading post...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Post</h1>
        <Link href={`/posts/${params.id}`} className="text-blue-600 hover:text-blue-800">
          ← Back to Post
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter post title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write your post content here..."
          />
        </div>

        <div className="mb-4">
          <label htmlFor="authorId" className="block text-sm font-medium text-gray-700 mb-2">
            Author *
          </label>
          <select
            id="authorId"
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select an author</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name || user.email}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm font-medium text-gray-700">Published</span>
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Post'}
          </button>
          <Link
            href={`/posts/${params.id}`}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}