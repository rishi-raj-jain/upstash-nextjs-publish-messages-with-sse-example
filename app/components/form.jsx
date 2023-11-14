'use client'

import { useEffect } from 'react'
import { useFormStatus } from 'react-dom'

const Form = () => {
  const { pending } = useFormStatus()
  useEffect(() => {
    if (!pending) document.getElementById('publish-form').reset()
  }, [pending])
  return (
    <>
      <input placeholder="Your message" className="border rounded px-3 outline-none focus:border-black/50 py-2" type="text" name="message" required />
      <button disabled={pending} className="hover:border-black/50 max-w-max border rounded py-1 px-3" type="submit">
        {pending ? (
          <div className="flex flex-row gap-x-2 items-center">
            <div className="animate-spin border border-gray-800 rounded-full h-[15px] w-[15px]"></div>
            <span>Publishing</span>
          </div>
        ) : (
          <>Publish Notification &rarr;</>
        )}
      </button>
    </>
  )
}

export default Form
