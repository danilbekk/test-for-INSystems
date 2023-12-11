import { useEffect } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { useAppDispatch, useAppSelector } from '../../storage/redux/hooks';
import { addComment, fetchComments } from '../../storage/redux/slices/commentSlice';
import CommentForm from '../CommentForm/CommentForm';
import { CommentType } from '../../interfaces/commentsModel';

const CommentContainer = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 600px;

  > div {
    margin-bottom: 30px;
  }
`;

const Comments = () => {
  const dispatch = useAppDispatch();
  const { comments, loading, error } = useAppSelector((state) => state.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleAddComment = (data: CommentType) => {
    dispatch(addComment(data));
  };

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
            id={comment.id}
            avatar={comment.avatar}
            author={comment.author}
            text={comment.text}
            rates={comment.rates}
            timestamp={comment.timestamp}
          />
        ))}
      </CommentContainer>
    </>
  );
};

export default Comments;
