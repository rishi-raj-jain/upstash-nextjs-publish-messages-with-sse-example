'use client'

import { useEffect, useState } from 'react'

const ChatComponent = () => {
  // Initial set of messages
  const [posts, setPosts] = useState([])
  // Function to take care of initial connect to the SSE API
  // Also, it reconnects to the SSE API as soon as it shuts down
  // This keeps the connection alive - forever with micro second delays
  const connectToStream = () => {
    // Connect to /api/stream as the SSE API source
    const eventSource = new EventSource('/api/stream')
    eventSource.addEventListener('message', (event) => {
      // Parse the data received from the stream into JSON
      // Add it the list of messages seen on the page
      const tmp = JSON.parse(event.data)
      setPosts((prevPosts) => [...prevPosts, tmp])
    })
    // In case of any error, close the event source
    // So that it attempts to connect again
    eventSource.addEventListener('error', () => {
      eventSource.close()
    })
    // As soon as SSE API source is closed, attempt to reconnect
    eventSource.onclose = () => {
      setTimeout(connectToStream, 1)
    }
    return eventSource
  }
  useEffect(() => {
    // Initiate the first call to connect to SSE API
    const eventSource = connectToStream()
    // As the component unmounts, close listener to SSE API
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
