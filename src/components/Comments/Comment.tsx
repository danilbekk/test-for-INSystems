import React, { useEffect, useMemo, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import Rate from '../../ui/Rate/Rate';
import { addRate } from '../../storage/redux/slices/commentSlice';
import { useAppDispatch } from '../../storage/redux/hooks';
import { RateType } from '../../interfaces/commentsModel';
import { Button } from '@mui/material';
import { formatTime } from '../../utils/formatTime';

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
`;

interface CommentProps {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: number;
  rates: RateType[];
}

const Comment: React.FC<CommentProps> = ({ id, author, text, timestamp, avatar, rates }) => {
  const profileId = localStorage.getItem('profileId');
  const dispatch = useAppDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const valueRate = useMemo(() => rates.reduce((acc, item) => (item.volume ? acc + item.volume : 0), 0), [rates]);

  useEffect(() => {
    if (valueRate < -10) {
      setIsCollapsed(true);
    }
  }, [valueRate]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  let isUpped = false;
  let isDowned = false;

  if (profileId) {
    rates.forEach((item) => {
      if (item.user === profileId && item.volume === 1) {
        isUpped = true;
      }

      if (item.user === profileId && item.volume === -1) {
        isDowned = true;
      }
    });
  }
  const handleChangeRate = (data: { volume: number; id: string; profileId: string | null }) => {
    dispatch(addRate(data));
  };

  return (
    <div>
      <CommentHeader>
        <Avatar src={avatar}>{author?.charAt(0)}</Avatar>
        <Typography variant="subtitle2">{author}</Typography>
        <Typography variant="caption">{formatTime(timestamp)}</Typography>
      </CommentHeader>
      {!isCollapsed && (
        <>
          <CommentContent>
            <Typography>{text}</Typography>
          </CommentContent>
          <CommentActions>
            <Rate
              isUpped={isUpped}
              isDowned={isDowned}
              currentRate={valueRate}
              onUp={() => handleChangeRate({ volume: 1, id, profileId })}
              onDown={() => handleChangeRate({ volume: -1, id, profileId })}
            />
          </CommentActions>
        </>
      )}
      {valueRate < -10 && (
        <Button onClick={toggleCollapse} color="primary">
          {isCollapsed ? 'Открыть комментарий' : 'Свернуть комментарий'}
        </Button>
      )}
    </div>
  );
};

export default Comment;
