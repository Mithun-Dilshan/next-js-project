'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post } from '@/types'
import { postsApi } from '@/lib/api'
import toast from 'react-hot-toast'
import { Trash2, Edit, Plus, FileText, Eye, EyeOff } from 'lucide-react'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const data = await postsApi.getAll()
      setPosts(data)
    } catch (error) {
      toast.error('Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      await postsApi.delete(id)
      setPosts(posts.filter(post => post.id !== id))
      toast.success('Post deleted successfully')
    } catch (error) {
      toast.error('Failed to delete post')
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl">Loading posts...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
        <Link
          href="/posts/create"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Create Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h2>
          <p className="text-gray-500 mb-4">Get started by creating your first post.</p>
          <Link
            href="/posts/create"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Post
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      {post.published ? (
                        <>
                          <Eye size={16} className="text-green-600" />
                          <span className="text-xs text-green-600 font-medium">Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff size={16} className="text-gray-400" />
                          <span className="text-xs text-gray-400 font-medium">Draft</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {post.content && (
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {post.content.length > 150 
                        ? `${post.content.substring(0, 150)}...` 
                        : post.content
                      }
                    </p>
                  )}
                  
                  <div className="text-sm text-gray-500">
                    <p>Author: {post.author?.name || post.author?.email || 'Unknown'}</p>
                    <p>Created: {new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link
                    href={`/posts/${post.id}`}
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title="View Post"
                  >
                    <FileText size={18} />
                  </Link>
                  <Link
                    href={`/posts/${post.id}/edit`}
                    className="text-green-600 hover:text-green-800 p-2"
                    title="Edit Post"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Delete Post"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}