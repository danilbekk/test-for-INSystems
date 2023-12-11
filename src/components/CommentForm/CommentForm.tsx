import React, { useState } from 'react';
import { TextField, Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { generateId } from '../../utils/generateId';
import { CommentType } from '../../interfaces/commentsModel';

interface CommentFormProps {
  onSubmit: (comment: CommentType) => void;
}

const StyledCommentForm = styled(Grid)({
  marginBottom: '16px',
  display: 'block',
});

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleSubmit = () => {
    if (author && text) {
      onSubmit({ id: generateId(), author, text, email, avatar: '', rating: 0, timestamp: Date.now() });
      setAuthor('');
      setText('');
      setEmail('');
    }
  };

  return (
    <StyledCommentForm container spacing={2}>
      <Grid item xs={12} sm container>
        <Grid container rowSpacing={1} spacing={2}>
          <Grid item xs={6}>
            <TextField id="author" label="Your Name" variant="outlined" value={author} onChange={handleAuthorChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="email"
              label="Your email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              type="email"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              id="text"
              label="Your Comment"
              variant="outlined"
              multiline
              rows={2}
              value={text}
              onChange={handleTextChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Button onClick={handleSubmit} aria-label="submit">
          <Typography color="primary">Submit</Typography>
        </Button>
      </Grid>
    </StyledCommentForm>
  );
};

export default CommentForm;
