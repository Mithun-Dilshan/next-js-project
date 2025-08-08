'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User } from '@/types'
import { usersApi } from '@/lib/api'
import toast from 'react-hot-toast'
import { Edit, Mail, Calendar, FileText } from 'lucide-react'

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await usersApi.getById(params.id)
        setUser(data)
      } catch (error) {
        toast.error('Failed to fetch user')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl">Loading user...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">User not found</h2>
        <Link href="/users" className="text-blue-600 hover:text-blue-800">
          ← Back to Users
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/users" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Users
        </Link>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {user.name || 'Unnamed User'}
          </h1>
          <Link
            href={`/users/${user.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Edit size={20} />
            Edit User
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">User Information</h2>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gray-500" />
                <span className="text-gray-700">{user.email}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-gray-500" />
                <span className="text-gray-700">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-gray-500" />
                <span className="text-gray-700">
                  {user.posts?.length || 0} posts
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Posts</h2>
              <Link
                href={`/posts/create?authorId=${user.id}`}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-sm"
              >
                Create Post
              </Link>
            </div>
            
            {user.posts && user.posts.length > 0 ? (
              <div className="space-y-4">
                {user.posts.map((post) => (
                  <div key={post.id} className="border-l-4 border-blue-500 pl-4">
                    <Link 
                      href={`/posts/${post.id}`}
                      className="text-lg font-medium text-blue-600 hover:text-blue-800"
                    >
                      {post.title}
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">
                      {post.published ? 'Published' : 'Draft'} • {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    {post.content && (
                      <p className="text-gray-700 mt-2 line-clamp-2">
                        {post.content.substring(0, 150)}...
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No posts yet. Create the first post for this user!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}