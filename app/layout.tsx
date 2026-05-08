import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OWR - Conservation Intelligence Dashboard',
  description:
    'Real-time monitoring platform for tracking forest health and industrial activity within the Okapi Wildlife Reserve, DRC.',
  keywords:
    'conservation, forest monitoring, mining tracking, DRC, wildlife reserve',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
