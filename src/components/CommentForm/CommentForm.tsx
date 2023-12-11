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
  const [textError, setTextError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [authorError, setAuthorError] = useState('');

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
    setAuthorError('');
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    setTextError('');
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);

    // Validate email format using a simple regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailPattern.test(inputEmail) ? '' : 'Invalid email format');
  };

  const handleSubmit = () => {
    if (!author.trim()) {
      setAuthorError('Введите имя');
    }
    if (!text.trim()) {
      setTextError('Введите текст');
    }
    if (!email.trim()) {
      setEmailError('Введите emal');
    }
    if (author && text && email) {
      onSubmit({ id: generateId(), author, text, email, avatar: '', rates: [], timestamp: Date.now() });
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
            <TextField
              id="author"
              label="Your Name"
              variant="outlined"
              value={author}
              onChange={handleAuthorChange}
              error={!!authorError}
              helperText={authorError}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="email"
              label="Your email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              type="email"
              error={!!emailError}
              helperText={emailError}
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
              error={!!textError}
              helperText={textError}
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
