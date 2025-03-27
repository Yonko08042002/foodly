import { MESSAGE_CODE, REMOVE_MARKS_REGEX, SPACE_REGEX } from '@/shared/constant'

export const setErrorPasswordRequire = (fieldName: string) => {
  return MESSAGE_CODE.MSG_004.replace('{property}', fieldName)
}
export const setErrorRequire = (fieldName: string, min: number = 1) => {
  return MESSAGE_CODE.MSG_002.replace('{property}', fieldName).replace('{min}', String(min))
}
export const isTextMatching = (text: string, search: string) => {
  const formatText = (str: string) =>
    str
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(REMOVE_MARKS_REGEX, '')
      .replace(SPACE_REGEX, '')
  return formatText(text).includes(formatText(search))
}
export const maxLengthRequire = (fieldName: string, max: number = 255) =>
  MESSAGE_CODE.MSG_011.replace('{property}', fieldName).replace('255', String(max))
