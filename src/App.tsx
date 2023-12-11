import { useState } from 'react'
import Comment  from './components/Comment/Comment'
import CommentForm from './components/CommentForm/CommentForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Comment />
      <CommentForm />
    </div>
  )
}

export default App
