import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for validation
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
})

// GET /api/users - Get all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        _count: {
          select: { posts: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/users - Create new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = createUserSchema.parse(body)
    
    const user = await prisma.user.create({
      data: validatedData,
      include: {
        posts: true
      }
    })
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}