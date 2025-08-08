import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            CRUD App
          </Link>
          <div className="flex space-x-4">
            <Link 
              href="/users" 
              className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Users
            </Link>
            <Link 
              href="/posts" 
              className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Posts
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}