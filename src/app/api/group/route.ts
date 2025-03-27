import apiClient from '@/shared/libs/axios'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const pageParam = searchParams.get('page') || '1'
    const size = searchParams.get('size') || '6'
    const sort = searchParams.get('sort') || 'code:asc'
    const isOnline = searchParams.get('is_online') || '0'
    const isMine = searchParams.get('is_mine') || '0'

    const { data } = await apiClient.get('/groups', {
      params: { page: pageParam, size, sort, is_online: isOnline, is_mine: isMine },
    })

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch groups' }, { status: 500 })
  }
}
