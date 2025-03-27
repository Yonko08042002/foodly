export interface Group {
  id: string
  code: string
  name: string
  created_by_id: string
  public_start_time: Date
  public_end_time: Date
  price: number
  share_scope: string
  type: string
  status: string
  invite_code: string | null
  created_at: string
  updated_at: string
  deleted_at: string | null
  menu_items: MenuItem[]
  total_quantity: number
  created_by: {
    id: string
    display_name: string
    payment_setting: string | null
  }
  description: string | null
}
export interface SearchGroupParams {
  page?: number
  size?: number
  sort?: string
  is_online?: number
  is_mine?: number
  search?: string
}
export interface MenuItem {
  id: string
  name: string
  price: number
  group_id: string
  deleted_at: string | null
  created_at: string
  updated_at: string
  description: string | null
}
export interface MetaData {
  is_first_page: boolean
  is_last_page: boolean
  current_page: number
  previous_page: number | null
  next_page: number | null
  page_count: number
  total_count: number
}

export interface SearchGroupResponse {
  groups: Group[]
  meta: MetaData
}
