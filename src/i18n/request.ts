// import { notFound } from 'next/navigation'
// import { getRequestConfig } from 'next-intl/server'
// import { headers } from 'next/headers'
// import { routing } from './routing'

// export default getRequestConfig(async () => {
//   const requestHeaders = await headers()
//   const locale = requestHeaders.get('X-NEXT-INTL-LOCALE')

//   if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) notFound()

//   return {
//     messages: (await import(`../../messages/${locale}.json`)).default,
//     timeZone: 'UTC',
//   }
// })
import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound()

  return {
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
