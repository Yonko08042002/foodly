export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const ALPHA_WITH_SPACE = /^[A-Za-zÀ-Ỹà-ỹ\s]*$/
export const EMOJI_REGEX =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g
export const SPACE_REGEX = /\s/g
export const REMOVE_MARKS_REGEX = /[\u0300-\u036f]/g
export const NUMBER_REGEX = /^\d+$/
