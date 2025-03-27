export interface PaymentSetting {
  account_name: string
  account_number: string
  payment_method: string
}
export enum UserRole {
  USER = 'USER',
}

export interface User {
  id: string
  email: string
  display_name: string
  role: UserRole
  block_to: string | null
  my_coin: number
  payment_setting: PaymentSetting[]
  max_order: number
  organization_id: string
  reset_password_token: string
  reset_password_token_expires_at: string
  created_at: string
  updated_at: string
}
export interface UpdatePassword {
  password: string
  new_password: string
}

export type UpdateUserInfo = Partial<Pick<User, 'display_name' | 'payment_setting'>>

export interface UpdateUserInfoResponse extends UpdateUserInfo {
  id: string
}
export interface ResetPasswordUser extends Pick<User, 'email'> {
  organization_code: string
  redirect_url?: string
}

export interface PasswordUserResponse {
  id: string
}

export interface SetPasswordUser extends Pick<UpdatePassword, 'new_password'> {
  token: string
}
export interface FormSetPassword extends Pick<UpdatePassword, 'new_password'> {
  confirm_password: string
}
