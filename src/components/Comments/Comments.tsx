import React from 'react'
import styled from 'styled-components';
import Comment from './Comment';

const CommentContainer = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 600px;
`;
const Comments = () => {
  return (
    <CommentContainer>
      <Comment />
    </CommentContainer>
  )
}

export default Comments