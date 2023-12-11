import React, { useState } from 'react';
import { Avatar, TextField, Grid, IconButton, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

interface CommentFormProps {
  onSubmit: (comment: CommentData) => void;
}

interface CommentData {
  author: string;
  text: string;
}

const StyledCommentForm = styled(Grid)({
  marginBottom: '16px',
  maxWidth: '350px',
  display: 'block'
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
      onSubmit({ author, text });
      setAuthor('');
      setText('');
    }
  };

  return (
    <StyledCommentForm container spacing={2}>
      <Grid item>
        <Avatar />
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              id="author"
              label="Your Name"
              variant="outlined"
              value={author}
              onChange={handleAuthorChange}
            />
          </Grid>
          <Grid item xs>
            <TextField
              id="email"
              label="Your email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              type='email'
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
