import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Welcome to Next.js CRUD App
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users Management</h2>
          <p className="text-gray-600 mb-4">
            Create, view, edit, and delete users. Manage user profiles and information.
          </p>
          <Link 
            href="/users"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Manage Users
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Posts Management</h2>
          <p className="text-gray-600 mb-4">
            Create, view, edit, and delete blog posts. Manage content and publications.
          </p>
          <Link 
            href="/posts"
            className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          >
            Manage Posts
          </Link>
        </div>
      </div>
    </div>
  )
}