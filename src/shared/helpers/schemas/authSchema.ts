import {
  ALPHA_WITH_SPACE,
  EMAIL_REGEX,
  EMOJI_REGEX,
  LABELS,
  MESSAGE_CODE,
  MESSAGE_STATUS,
  NUMBER_REGEX,
  PASSWORD_REGEX,
} from '@/shared/constant'
import { z } from 'zod'
import {
  maxLengthRequire,
  setErrorPasswordRequire,
  setErrorRequire,
} from '@/shared/helpers/validation'

export const registerSchema = z
  .object({
    organization_code: z
      .string()
      .min(1, setErrorRequire(LABELS.ORGANIZATION_CODE))
      .transform(val => val.trim()),
    email: z
      .string()
      .min(1, MESSAGE_CODE.MSG_003.replace('{property}', LABELS.EMAIL))
      .transform(val => val.trim())
      .refine(val => EMAIL_REGEX.test(val), {
        message: MESSAGE_CODE.MSG_010.replace('{property}', LABELS.EMAIL),
      }),
    password: z
      .string()
      .min(8, setErrorPasswordRequire(LABELS.PASSWORD))
      .regex(PASSWORD_REGEX, setErrorPasswordRequire(LABELS.PASSWORD)),
    confirm_password: z.string().min(8, setErrorPasswordRequire(LABELS.CONFIRM_PASSWORD)),
    display_name: z
      .string()
      .min(1, setErrorRequire(LABELS.DISPLAY_NAME))
      .transform(val => val.trim()),
  })
  .refine(data => data.password === data.confirm_password, {
    message: MESSAGE_STATUS.PASSWORD_MISMATCH,
    path: ['confirm_password'],
  })

export type RegisterSchema = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  organization_code: z.string().readonly(),
  email: z
    .string()
    .min(1, MESSAGE_CODE.MSG_003.replace('{property}', LABELS.EMAIL))
    .transform(val => val.trim())
    .refine(val => EMAIL_REGEX.test(val), {
      message: MESSAGE_CODE.MSG_010.replace('{property}', LABELS.EMAIL),
    }),
  password: z
    .string()
    .min(8, setErrorPasswordRequire(LABELS.PASSWORD))
    .regex(PASSWORD_REGEX, setErrorPasswordRequire(LABELS.PASSWORD)),
})
export type LoginSchema = z.infer<typeof loginSchema>

export const userSchema = z.object({
  display_name: z
    .string()
    .min(1, setErrorRequire(LABELS.DISPLAY_NAME))
    .max(255, maxLengthRequire(LABELS.DISPLAY_NAME))
    .transform(val => val.trim())
    .refine(val => ALPHA_WITH_SPACE.test(val), {
      message: MESSAGE_CODE.MSG_007.replace('{property}', LABELS.DISPLAY_NAME),
    })
    .refine(val => !EMOJI_REGEX.test(val), {
      message: MESSAGE_CODE.MSG_015.replace('{property}', LABELS.DISPLAY_NAME),
    }),
})

export const changePasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(8, setErrorPasswordRequire(LABELS.NEW_PASSWORD))
      .regex(PASSWORD_REGEX, setErrorPasswordRequire(LABELS.NEW_PASSWORD)),
    password: z
      .string()
      .min(8, setErrorPasswordRequire(LABELS.PASSWORD))
      .regex(PASSWORD_REGEX, setErrorPasswordRequire(LABELS.PASSWORD)),
    confirm_password: z.string().min(8, setErrorPasswordRequire(LABELS.PASSWORD)),
  })

  .refine(data => data.new_password === data.confirm_password, {
    message: MESSAGE_STATUS.PASSWORD_MISMATCH,
    path: ['confirm_password'],
  })
export type changePasswordSchema = z.infer<typeof changePasswordSchema>

export type UserSchema = z.infer<typeof userSchema>

export const paymentSchema = z.object({
  account_name: z
    .string()
    .min(1, setErrorRequire(LABELS.ACCOUNT_NAME))
    .max(255, maxLengthRequire(LABELS.ACCOUNT_NAME))
    .transform(val => val.trim())
    .refine(val => ALPHA_WITH_SPACE.test(val), {
      message: MESSAGE_CODE.MSG_007.replace('{property}', LABELS.ACCOUNT_NAME),
    })
    .refine(val => !EMOJI_REGEX.test(val), {
      message: MESSAGE_CODE.MSG_015.replace('{property}', LABELS.ACCOUNT_NAME),
    }),
  account_number: z
    .string()
    .min(1, setErrorRequire(LABELS.ACCOUNT_NUMBER))
    .max(30, maxLengthRequire(LABELS.ACCOUNT_NUMBER, 30))
    .regex(NUMBER_REGEX, MESSAGE_CODE.MSG_009.replace('{property}', LABELS.ACCOUNT_NUMBER)),
  payment_method: z.string().min(1, MESSAGE_CODE.MSG_016),
})

export type PaymentSchema = z.infer<typeof paymentSchema>

export const resetPasswordSchema = z.object({
  organization_code: z
    .string()
    .min(1, setErrorRequire(LABELS.ORGANIZATION_CODE))
    .transform(val => val.trim()),
  email: z
    .string()
    .min(1, MESSAGE_CODE.MSG_003.replace('{property}', LABELS.EMAIL))
    .transform(val => val.trim())
    .refine(val => EMAIL_REGEX.test(val), {
      message: MESSAGE_CODE.MSG_010.replace('{property}', LABELS.EMAIL),
    }),
})
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>

export const setPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(8, setErrorPasswordRequire(LABELS.NEW_PASSWORD))
      .regex(PASSWORD_REGEX, setErrorPasswordRequire(LABELS.NEW_PASSWORD)),
    confirm_password: z.string().min(8, setErrorPasswordRequire(LABELS.NEW_PASSWORD)),
  })
  .refine(data => data.new_password === data.confirm_password, {
    message: MESSAGE_STATUS.PASSWORD_MISMATCH,
    path: ['confirm_password'],
  })

export type SetPasswordSchema = z.infer<typeof setPasswordSchema>
