export const runtime = 'edge'

import Form from './components/form'
import { publishNotification } from './actions'
import ChatComponent from './components/chat.client'

const Home = () => {
  return (
    <>
      <div className="w-[300px] flex flex-col">
        <form id="publish-form" className="mt-3 flex flex-col gap-y-3" action={publishNotification}>
          <Form />
        </form>
        <ChatComponent />
      </div>
    </>
  )
}

export default Home
