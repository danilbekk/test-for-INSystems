import { useState } from 'react'
import Comment  from './components/Comments/Comment'
import CommentForm from './components/CommentForm/CommentForm'
import Comments from './components/Comments/Comments'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CommentForm />
      <Comments />
      
    </div>
  )
}

export default App
