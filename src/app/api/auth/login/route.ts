import { loginUser } from '@/shared/helpers/auth'
import { CODE_STATUS, MESSAGE_STATUS } from '@/shared/constant'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const user = await loginUser(body)

    if (!user) {
      return NextResponse.json(
        { error: MESSAGE_STATUS.INVALID_CREDENTIALS },
        { status: CODE_STATUS.UNAUTHORIZED },
      )
    }

    return NextResponse.json(user, { status: CODE_STATUS.OK })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: MESSAGE_STATUS.INTERNAL_SERVER_ERROR },
      { status: CODE_STATUS.INTERNAL_SERVER_ERROR },
    )
  }
}
