import './global.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Real-Time Notifications using Next.js Server Actions, Upstash Redis, and Streaming',
  description: 'A demo of real time notifications publications using Next.js Server Actions, Upstash Redis and Streaming.',
  openGraph: {
    url: 'https://upstash-nextjs-publish-example.vercel.app',
    title: 'Real-Time Notifications using Next.js Server Actions, Upstash, and Streaming',
    siteName: 'Real-Time Notifications using Next.js Server Actions, Upstash, and Streaming',
    description: 'A demo of real time notifications publications using Next.js Server Actions, Upstash Redis and Streaming.',
  },
  twitter: {
    site: '@rishi_raj_jain_',
    creator: '@rishi_raj_jain_',
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={[inter.className, 'bg-white h-screen w-screen flex flex-col items-center'].join(' ')}>{children}</body>
    </html>
  )
}
