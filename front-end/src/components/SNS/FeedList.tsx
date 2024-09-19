import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import Button from '../Common/Button';
import { ReactComponent as comment } from '../../asset/img/svg/comment.svg';
import { useNavigate } from 'react-router';

import LikeIcon from './LikeIcon';

import { SnsFeedDel } from '../../lib/api/sns-api';
import { SnsFeedListRoutine } from '../../lib/api/sns-api';
import { SnsFeedRoutineLoad } from '../../lib/api/sns-api';

import test from '../../asset/img/loginbg.jpg';

const s = {
  FeedContentArea: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    margin: 15px;
  `,
  AuthorName: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    cursor: pointer;
  `,
  FeedCaption: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    margin-left: 8px;
    margin-right: 15px;
  `,
  AuthorProfileArea: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 15px 15px 10px 15px;
  `,
  AuthorProfile: styled.div`
    display: flex;
    align-items: center;
  `,
  MyFeedMenuArea: styled.div`
    display: flex;
  `,
  MyFeedMenu: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    cursor: pointer;
    margin-left: 20px;
  `,
  FeedInteractionArea: styled.div`
    display: flex;
    align-items: center;
    margin: 15px;
  `,
  RoutineButton: styled.div`
    display: flex;
    margin-left: auto;
  `,
  AuthorProfileImage: styled(Image)`
    margin-right: 10px;
    cursor: pointer;
  `,
  IconArea: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
  `,
  FeedItem: styled.div<FeedDeleteProps>`
    margin-bottom: 80px;
    display: ${(props) => (props.$isdelete === false ? '' : 'none')};
  `,
  IsRoutineButton: styled.div`
    margin-right: 10px;
  `,
  ImageArea: styled.div`
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border: #212121 1px solid;
    display: flex;
    align-items: center;
  `,
  FeedImage: styled.div<ImageAreaProps>`
    display: ${(props) => (props.$isRoutine === true ? 'none' : '')};
    width: 100%;
    height: 100%;
  `,
  FeedRoutine: styled.div<ImageAreaProps>`
    display: ${(props) => (props.$isRoutine === true ? '' : 'none')};
    width: 100%;
    height: 100%;
    overflow-y: auto;
  `,
  RoutineArea: styled.div`
    line-height: 150%;
    margin: 40px;
  `,
  Routine: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 80%;
    font-weight: 600;
    text-shadow: 1px 1px 1px black;
  `,
};

interface FeedListProps {
  feedId: number;
  content: string;
  image: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  userId: number;
  nickname: string;
  profileImage: string;
  isLike: number;
  onClick: (id: number) => void;
  loginUser: number;
}

interface FeedDeleteProps {
  $isdelete?: boolean;
}

interface ImageAreaProps {
  $isRoutine: boolean;
}

type routineData = {
  id: number;
  details: [
    {
      exerciseName: string;
      setCount: number;
    },
  ];
};

const FeedList = (props: FeedListProps): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };

  // 피드 삭제
  const [isDelete, setIsDelete] = useState(false);

  const feedDelOnClick = async (feedId: number) => {
    SnsFeedDel(
      feedId,
      (resp) => {
        setIsDelete(true);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  // 루틴, 사진 전환
  const [isRoutineMode, setIsRoutineMode] = useState(false);
  const routineButtonOnClick = () => {
    setIsRoutineMode((prev) => !prev);
  };

  const [routine, setRoutine] = useState<routineData>();

  const getRoutineData = async () => {
    await SnsFeedListRoutine(
      props.feedId,
      (resp) => {
        setRoutine(resp.data);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  useEffect(() => {
    getRoutineData();
  }, []);

  const loadRoutine = async () => {
    if (routine !== undefined) {
      await SnsFeedRoutineLoad(
        routine.id,
        (resp) => {},
        (error) => {
          console.error(error);
        },
      );
    }
  };

  const handleModifyClick = (feedId: number) => {
    const feedContent = {
      image: props.image,
      routineId: routine?.id,
      content: props.content,
    };
    navigate(`/sns/feed/update`, { state: { targetFeedId: feedId, feedContent: feedContent } });
  };

  return (
    <>
      <s.FeedItem key={props.feedId} $isdelete={isDelete}>
        <s.AuthorProfileArea>
          <s.AuthorProfile>
            <s.AuthorProfileImage
              width="30px"
              height="30px"
              src={`https://i11b310.p.ssafy.io/images/${props.profileImage.split('/home/ubuntu/images/')[1]}`}
              onClick={() => handleMovePage(`../profile/${props.userId}`)}
            />
            <s.AuthorName onClick={() => handleMovePage(`../profile/${props.userId}`)}>{props.nickname}</s.AuthorName>
          </s.AuthorProfile>
          {props.userId === props.loginUser ? (
            <s.MyFeedMenuArea>
              <s.MyFeedMenu
                onClick={() => {
                  handleModifyClick(props.feedId);
                }}
              >
                수정
              </s.MyFeedMenu>
              <s.MyFeedMenu
                onClick={() => {
                  feedDelOnClick(props.feedId);
                }}
              >
                삭제
              </s.MyFeedMenu>
            </s.MyFeedMenuArea>
          ) : (
            <></>
          )}
        </s.AuthorProfileArea>
        <s.ImageArea>
          <s.FeedImage $isRoutine={isRoutineMode}>
            {props.image === null ? (
              <></>
            ) : (
              <Image
                width="100%"
                height="100%"
                src={`https://i11b310.p.ssafy.io/images/${props.image.split('/home/ubuntu/images/')[1]}`}
                type="rect"
                fit="contain"
              />
            )}
          </s.FeedImage>
          <s.FeedRoutine $isRoutine={isRoutineMode}>
            <s.RoutineArea>
              {routine?.details?.map((item) => (
                <s.Routine>
                  {item.exerciseName} {item.setCount}세트
                </s.Routine>
              ))}
            </s.RoutineArea>
          </s.FeedRoutine>
        </s.ImageArea>
        <s.FeedInteractionArea>
          <LikeIcon feedId={props.feedId} isLike={props.isLike} likeCount={props.likeCount} />
          <s.IconArea onClick={() => props.onClick(props.feedId)}>
            <IconSvg width="25" height="25" color="#ccff33" Ico={comment} />
            <s.FeedCaption>{props.commentCount}</s.FeedCaption>
          </s.IconArea>
          <s.RoutineButton>
            <s.IsRoutineButton>
              {isRoutineMode ? (
                <Button
                  width="90px"
                  height="30px"
                  children="사진 보기"
                  size="12px"
                  bold="500"
                  onClick={routineButtonOnClick}
                />
              ) : (
                <Button
                  width="90px"
                  height="30px"
                  children="루틴 보기"
                  size="12px"
                  bold="500"
                  onClick={routineButtonOnClick}
                />
              )}
            </s.IsRoutineButton>
            <Button width="90px" height="30px" children="루틴 불러오기" size="12px" bold="500" onClick={loadRoutine} />
          </s.RoutineButton>
        </s.FeedInteractionArea>
        <s.FeedContentArea>{props.content}</s.FeedContentArea>
      </s.FeedItem>
    </>
  );
};

export default FeedList;
