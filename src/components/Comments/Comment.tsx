import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import styled from 'styled-components';
import CommentForm from '../CommentForm/CommentForm';

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
  > div:first-child {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }

  > h6 {
    margin-left: 8px;
    margin-right: 8px;
  }
`;

const CommentContent = styled.div`
  margin-bottom: 8px;
`;

const CommentActions = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

interface CommentProps {
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  rating: number;
  onVote: (type: 'up' | 'down') => void;
}

const Comment: React.FC<CommentProps> = ({ author, text, timestamp, avatar, rating, onVote }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleVote = (type: 'up' | 'down') => {
    onVote(type);
  };

  return (
    <>
   
      <CommentHeader>
        <Avatar src={avatar}>{author?.charAt(0)}</Avatar>
        <Typography variant="subtitle2">{author}</Typography>
        <Typography variant="caption">{timestamp?.toLocaleString()}</Typography>
      </CommentHeader>
      <CommentContent>
        <Typography>{text}</Typography>
      </CommentContent>
      <CommentActions>
        <IconButton onClick={() => handleVote('up')}>
          <ThumbUpIcon />
        </IconButton>
        <Typography>{rating}</Typography>
        <IconButton onClick={() => handleVote('down')}>
          <ThumbDownIcon />
        </IconButton>
      </CommentActions>
    </>
  );
};

export default Comment;
