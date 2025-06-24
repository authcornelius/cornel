import { connectToDatabase } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function GET(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    
    // Example: Fetch data from a collection
    const data = await db.collection('cornelius-portfolio-db').find({}).toArray()
    
    return NextResponse.json({ 
      message: 'Hello from API route', 
      data 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to connect to database' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const body = await request.json()
    
    const { email, password } = body
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' }, 
        { status: 400 }
      )
    }
    
    // Find user in database
    const user = await db.collection('users').findOne({ email })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401 }
      )
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401 }
      )
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )
    
    // Create response with httpOnly cookie
    const response = NextResponse.json({ 
      success: true, 
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        token: token
      }
    })
    
    // Set httpOnly cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400 // 24 hours
    })
    
    return response
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process login request' }, 
      { status: 500 }
    )
  }
}
