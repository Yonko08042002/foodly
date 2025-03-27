import { registerUser } from '@/shared/helpers/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await registerUser(body)

    if (!user) {
      return NextResponse.json({ error: 'Registration failed' }, { status: 400 })
    }

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  }
}
