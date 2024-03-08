'use server'

import { Redis } from '@upstash/redis'
import { headers } from 'next/headers'

// The function that takes care of obtaining the country code from Vercel headers
// And publishing messages to the Upstash Redis database with the current timestamp
export async function publishNotification(formData) {
  'use server'
  const redis = Redis.fromEnv()
  const headersList = headers()
  const country = headersList.get('x-vercel-ip-country')
  await redis.publish(
    'posts',
    JSON.stringify({
      country,
      date: new Date().toString(),
      message: formData.get('message'),
    }),
  )
}
