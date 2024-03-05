import type { SanitizedConfig } from 'payload/types'

import '@payloadcms/ui/scss/app.scss'
import { headers as getHeaders } from 'next/headers'
import { parseCookies } from 'payload/auth'
import { createClientConfig } from 'payload/config'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'

import { getRequestLanguage } from '../../utilities/getRequestLanguage'

export const metadata = {
  description: 'Generated by Next.js',
  title: 'Next.js',
}

const rtlLanguages = ['ar', 'fa', 'ha', 'ku', 'ur', 'ps', 'dv', 'ks', 'khw', 'he', 'yi']

export const RootLayout = async ({
  children,
  config: configPromise,
}: {
  children: React.ReactNode
  config: Promise<SanitizedConfig>
}) => {
  const config = await configPromise
  const clientConfig = await createClientConfig(config)

  const headers = getHeaders()
  const cookies = parseCookies(headers)

  const lang =
    getRequestLanguage({
      cookies,
      headers,
    }) ?? clientConfig.i18n.fallbackLanguage

  const dir = rtlLanguages.includes(lang) ? 'RTL' : 'LTR'

  return (
    <html dir={dir} lang={lang}>
      <body>
        {children}
        <div id="portal" />
      </body>
    </html>
  )
}
