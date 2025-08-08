'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Post } from '@/types'
import { postsApi } from '@/lib/api'
import toast from 'react-hot-toast'
import { Edit, User, Calendar, Eye, EyeOff } from 'lucide-react'

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postsApi.getById(params.id)
        setPost(data)
      } catch (error) {
        toast.error('Failed to fetch post')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [params.id])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl">Loading post...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">Post not found</h2>
        <Link href="/posts" className="text-blue-600 hover:text-blue-800">
          ← Back to Posts
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/posts" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Posts
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
              <div className="flex items-center gap-1">
                {post.published ? (
                  <>
                    <Eye size={20} className="text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Published</span>
                  </>
                ) : (
                  <>
                    <EyeOff size={20} className="text-gray-400" />
                    <span className="text-sm text-gray-400 font-medium">Draft</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <User size={16} />
                <Link 
                  href={`/users/${post.author?.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {post.author?.name || post.author?.email}
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <Link
            href={`/posts/${post.id}/edit`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Edit size={20} />
            Edit Post
          </Link>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md border">
        {post.content ? (
          <div className="prose max-w-none">
            <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">No content available for this post.</p>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        Last updated: {new Date(post.updatedAt).toLocaleDateString()}
      </div>
    </div>
  )
}