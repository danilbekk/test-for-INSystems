import { useState } from 'react'
import CommentForm from './components/CommentForm/CommentForm'
import Comments from './components/Comments/Comments'
import { Container } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxWidth="sm">
      <Comments />
    </Container>
  )
}

export default App
