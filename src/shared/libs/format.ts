/**
 * Calculates the time difference between two dates in milliseconds.
 * Ensures that the result is always a non-negative value.
 * param startTime - The start time as a Date object.
 * param endTime - The end time as a Date object.
 * returns The time difference in milliseconds. Returns 0 if the input dates are invalid or if the start time is later than the end time.
 */
export const calculateTimeDifference = (startTime: Date, endTime: Date): number => {
  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()
  return Math.max(end - start, 0)
}
/**
 * Converts a time duration in milliseconds into a formatted string in hh:mm:ss format.
 * param durationMs - The duration in milliseconds.
 * returns A string representing the formatted time in hh:mm:ss.
 */
export const formatDuration = (durationMs: number): string => {
  const totalSeconds = Math.floor(durationMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
/**
 * Calculates the estimated time difference between the public start and end time
 * and returns it as a formatted string in hh:mm:ss format.
 * param {Date} publicEndTime - The public end time as an ISO Date object.
 * param {Date} publicStartTime - The public start time as an ISO Date object.
 * returns {string} The formatted time difference in hh:mm:ss format.
 */
export const formatEstimatedTime = (publicEndTime: Date, publicStartTime: Date): string => {
  const durationMs = calculateTimeDifference(publicStartTime, publicEndTime)
  return formatDuration(durationMs)
}

/**
Function helper format money. .....
  param: formatMoney : number input 100000
 returns : formated ( 100,000)
**/
export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {}).format(amount)
}
