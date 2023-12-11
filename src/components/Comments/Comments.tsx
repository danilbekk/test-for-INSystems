import React, { useEffect } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useAppDispatch, useAppSelector } from '../../storage/redux/hooks';
import { addComment, fetchComments } from '../../storage/redux/slices/commentSlice';
import CommentForm from '../CommentForm/CommentForm';
import { CommentType } from '../../interfaces/commentsModel';

const CommentContainer = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 600px;
`;

function formatTime(timestamp) {
  const currentTime = Date.now();
  const difference = currentTime - timestamp;

  if (difference < 60000) {
    const seconds = Math.floor(difference / 1000);
    return `${seconds} ${pluralize(seconds, 'секунда', 'секунды', 'секунд')} назад`;
  } else if (difference < 3600000) {
    const minutes = Math.floor(difference / 60000);
    return `${minutes} ${pluralize(minutes, 'минута', 'минуты', 'минут')} назад`;
  } else if (difference < 86400000) {
    const hours = Math.floor(difference / 3600000);
    return `${hours} ${pluralize(hours, 'час', 'часа', 'часов')} назад`;
  } else {
    const days = Math.floor(difference / 86400000);
    return `${days} ${pluralize(days, 'день', 'дня', 'дней')} назад`;
  }
}

function pluralize(number, one, few, many) {
  if (number % 10 === 1 && number % 100 !== 11) {
    return one;
  } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
    return few;
  } else {
    return many;
  }
}

const Comments = () => {
  const dispatch = useAppDispatch();
  const { comments, loading, error } = useAppSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);


  const handleAddComment = (data: CommentType) => {
    dispatch(addComment(data))
  }

  if (loading === true) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <CommentForm onSubmit={handleAddComment} />
      <CommentContainer>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            avatar={comment.avatar}
            author={comment.author}
            text={comment.text}
            rating={comment.rating}
            timestamp={formatTime(comment.timestamp)}
          />
        ))}
      </CommentContainer>
    </>
  );
};

export default Comments;
