export interface User {
  id: string
  email: string
  name: string | null
  createdAt: string
  updatedAt: string
  posts?: Post[]
  _count?: {
    posts: number
  }
}

export interface Post {
  id: string
  title: string
  content: string | null
  published: boolean
  authorId: string
  createdAt: string
  updatedAt: string
  author?: {
    id: string
    name: string | null
    email: string
  }
}

export interface CreateUserData {
  email: string
  name?: string
}

export interface CreatePostData {
  title: string
  content?: string
  authorId: string
  published: boolean
}