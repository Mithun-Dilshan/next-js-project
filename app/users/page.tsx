'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User } from '@/types'
import { usersApi } from '@/lib/api'
import toast from 'react-hot-toast'
import { Trash2, Edit, Plus, User as UserIcon } from 'lucide-react'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    try {
      const data = await usersApi.getAll()
      setUsers(data)
    } catch (error) {
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, name: string | null) => {
    if (!confirm(`Are you sure you want to delete ${name || 'this user'}?`)) {
      return
    }

    try {
      await usersApi.delete(id)
      setUsers(users.filter(user => user.id !== id))
      toast.success('User deleted successfully')
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-xl">Loading users...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <Link
          href="/users/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add User
        </Link>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12">
          <UserIcon size={48} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No users found</h2>
          <p className="text-gray-500 mb-4">Get started by creating your first user.</p>
          <Link
            href="/users/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create User
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {users.map((user) => (
            <div key={user.id} className="bg-white border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {user.name || 'Unnamed User'}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Posts: {user._count?.posts || 0}</p>
                    <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/users/${user.id}`}
                    className="text-blue-600 hover:text-blue-800 p-2"
                    title="View Details"
                  >
                    <UserIcon size={18} />
                  </Link>
                  <Link
                    href={`/users/${user.id}/edit`}
                    className="text-green-600 hover:text-green-800 p-2"
                    title="Edit User"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id, user.name)}
                    className="text-red-600 hover:text-red-800 p-2"
                    title="Delete User"
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