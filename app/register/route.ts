import { connectToDatabase } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    
    const { email, password } = body
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ 
      email: email.toLowerCase() 
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' }, 
        { status: 409 }
      )
    }
    
    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    
    // Create new user
    const newUser = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    const result = await db.collection('users').insertOne(newUser)
    
    // Generate JWT token for auto-login after registration
    const token = jwt.sign(
      { 
        userId: result.insertedId, 
        email: newUser.email 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )
    
    // Create response
    const response = NextResponse.json({ 
      success: true, 
      message: 'Registration successful',
      user: {
        id: result.insertedId,
        email: newUser.email,
      }
    }, { status: 201 })
    
    // Set httpOnly cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
      path: '/'
    })
    
    return response
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process registration request' }, 
      { status: 500 }
    )
  }
}
