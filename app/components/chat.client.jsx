'use client'

import { useEffect, useState } from 'react'

const ChatComponent = () => {
  const [posts, setPosts] = useState([])
  const connectToStream = () => {
    const eventSource = new EventSource('https://weathered-surf-9256.fly.dev/api/stream')
    eventSource.addEventListener('message', (event) => {
      const tmp = JSON.parse(event.data)
      setPosts((prevPosts) => [...prevPosts, tmp])
    })
    eventSource.addEventListener('error', (event) => {
      eventSource.close()
      // Reconnect after a delay (e.g., 100 msecond)
      setTimeout(connectToStream, 100)
    })
    eventSource.onclose = () => {
      // Reconnect after a delay (e.g., 100 msecond)
      setTimeout(connectToStream, 100)
    }
    return eventSource
  }
  useEffect(() => {
    const eventSource = connectToStream()
    return () => {
      eventSource.close()
    }
  }, [])
  return (
    <div className="pt-6 mt-6 border-t flex flex-col">
      <h2 className="font-semibold">Real-Time Notifications 👇🏻</h2>
      {posts.map((post, _) => (
        <div className="mt-3 pt-3 flex flex-col border-t" key={_}>
          <span className="text-xs text-gray-400">{post.date}</span>
          <span className="mt-2">
            {post.country}: {post.message}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ChatComponent
