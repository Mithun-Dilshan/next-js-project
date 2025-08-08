'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

// User Actions
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
})

export async function createUser(formData: FormData) {
  const validatedFields = CreateUserSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.user.create({
      data: validatedFields.data,
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to create user.',
    }
  }

  revalidatePath('/users')
  redirect('/users')
}

export async function updateUser(id: string, formData: FormData) {
  const validatedFields = CreateUserSchema.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.user.update({
      where: { id },
      data: validatedFields.data,
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to update user.',
    }
  }

  revalidatePath('/users')
  redirect('/users')
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    })
    revalidatePath('/users')
    return { message: 'User deleted successfully' }
  } catch (error) {
    return {
      message: 'Database Error: Failed to delete user.',
    }
  }
}

// Post Actions
const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().optional(),
  authorId: z.string(),
  published: z.boolean().default(false),
})

export async function createPost(formData: FormData) {
  const validatedFields = CreatePostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    authorId: formData.get('authorId'),
    published: formData.get('published') === 'true',
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.post.create({
      data: validatedFields.data,
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to create post.',
    }
  }

  revalidatePath('/posts')
  redirect('/posts')
}

export async function updatePost(id: string, formData: FormData) {
  const validatedFields = CreatePostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    authorId: formData.get('authorId'),
    published: formData.get('published') === 'true',
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.post.update({
      where: { id },
      data: validatedFields.data,
    })
  } catch (error) {
    return {
      message: 'Database Error: Failed to update post.',
    }
  }

  revalidatePath('/posts')
  redirect('/posts')
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({
      where: { id },
    })
    revalidatePath('/posts')
    return { message: 'Post deleted successfully' }
  } catch (error) {
    return {
      message: 'Database Error: Failed to delete post.',
    }
  }
}