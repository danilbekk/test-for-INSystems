import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import styled from 'styled-components';

const CommentContainer = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 600px;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentContent = styled.div`
  margin-bottom: 8px;
`;

const CommentActions = styled.div`
  display: flex;
  align-items: center;
`;

interface CommentProps {
  author: string;
  text: string;
  date: Date;
  rating: number;
  onVote: (type: 'up' | 'down') => void;
}

const Comment: React.FC<CommentProps> = ({ author, text, date, rating, onVote }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleVote = (type: 'up' | 'down') => {
    onVote(type);
  };

  return (
    <CommentContainer>
      <CommentHeader>
        <Avatar>{author?.charAt(0)}</Avatar>
        <Typography variant="subtitle1" style={{ marginLeft: '8px' }}>
          {!author && 'Я автор'}
        </Typography>
      </CommentHeader>
      <CommentContent>
        <Typography>{!text && "Это текст"}</Typography>
      </CommentContent>
      <CommentActions>
        <IconButton onClick={() => handleVote('up')}>
          <ThumbUpIcon />
        </IconButton>
        <Typography>{rating}</Typography>
        <IconButton onClick={() => handleVote('down')}>
          <ThumbDownIcon />
        </IconButton>
        <Typography variant="caption" style={{ marginLeft: '8px' }}>
          {date?.toLocaleString()}
        </Typography>
      </CommentActions>
    </CommentContainer>
  );
};

export default Comment;
