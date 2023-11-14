'use server'

import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

export async function publishNotification(formData) {
  'use server'
  const redis = Redis.fromEnv()
  const headersList = headers()
  const country = headersList.get('x-vercel-ip-country')
  await redis.publish('posts', JSON.stringify({ country, date: new Date().toString(), message: formData.get('message') }))
}
