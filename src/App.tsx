import Comments from './components/Comments/Comments';
import { Container } from '@mui/material';

function App() {
  localStorage.setItem('profileId', '3');
  return (
    <Container maxWidth="sm">
      <Comments />
    </Container>
  );
}

export default App;
