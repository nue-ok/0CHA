import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Feed from '../../../components/SNS/Feed';
import SnsHeader from '../../../components/SNS/SnsHeader';
import SnsNavigation from '../../../components/SNS/SnsNavigation';
import CommentModal from '../../../components/Modal/CommentModal';
import BottomNav from '../../../components/Common/BottomNav';
import UserSearchModal from '../../../components/Modal/UserSearchModal';

import test from '../../../asset/img/testImg.png';
import { useAppDispatch, useAppSelector } from '../../../lib/hook/useReduxHook';
import { modalActions, selectModalComment, selectModalUserSearch } from '../../../store/modal';
import { useLocation, useNavigate } from 'react-router';
import { useModalExitHook } from '../../../lib/hook/useModalExitHook';

import FeedList from '../../../components/SNS/FeedList';
import axios from 'axios';
import { debounce } from 'lodash';
import { ScriptTarget } from 'typescript';

import { SnsFeedList } from '../../../lib/api/sns-api';
import { logDOM } from '@testing-library/react';
import { SnsCommentList } from '../../../lib/api/sns-api';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding-top: 114px; //57+
    padding-bottom: 68px;
  `,
  Title: styled.div`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: end;
    margin-bottom: 30px;
  `,
  LoginArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  InputArea: styled.div`
    width: 80%;
    margin: 0px auto;
  `,
  LoginCheckInput: styled.input`
    accent-color: '#ccff33';
  `,
  LoginLabel: styled.label`
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
  `,
  TextBtnArea: styled.div`
    text-align: center;
    color: ${(props) => props.theme.textColor};
    width: 230px;
    display: flex;
    justify-content: space-around;
    margin-bottom: 50px;
  `,
  SnsText: styled.span`
    color: #666666;
    font-size: 14px;
  `,
  Header: styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    z-index: 5;
  `,
};

type feedData = {
  id: number;
  content: string;
  image: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  userId: number;
  nickname: string;
  profileImage: string;
  isLike: number;
};

type commentData = {
  comment: string;
  createdAt: string;
  feedId: number;
  id: number;
  nickname: string;
  profileImage: string;
  userId: number;
};

const FeedPage = (): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };

  const dispatch = useAppDispatch();
  const isComment = useAppSelector(selectModalComment);
  const isUserSearch = useAppSelector(selectModalUserSearch);
  const toggleModalComment = (): void => {
    dispatch(modalActions.toggleComment());
  };
  const toggleModalUserSearch = (): void => {
    dispatch(modalActions.toggleUserSearch());
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const [feedData, setFeedData] = useState<feedData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMoreData, setIsMoreData] = useState(true);
  const [feedId, setFeedId] = useState<number | null>(null);
  const [commentData, setCommentData] = useState<commentData[]>([]);

  const [userId, setUserId] = useState(0);
  const [userNickname, setUserNickname] = useState('');
  const [userProfileImage, setUserProfileImage] = useState('');

  const userStr = localStorage.getItem('user');

  useEffect(() => {
    if (userStr) {
      const userTmp = JSON.parse(userStr);
      setUserId(userTmp.id);
      setUserNickname(userTmp.nickname);
      setUserProfileImage(userTmp.profileImage);
    }
  }, []);

  const [offset, setOffset] = useState(0);

  const getFeedData = async (offset: number) => {
    if (loading) return;
    setLoading(true);
    await SnsFeedList(
      0,
      offset,
      (resp) => {
        const data = resp.data;
        if (data === '피드 0개입니다') {
          setIsMoreData(false);
        } else {
          setFeedData((prevData) => [...prevData, ...data]);
        }
        setLoading(false);
      },
      (error) => {
        console.error(error);
      },
      10,
    );
  };

  const getTargetData = async (offset: number) => {
    if (targetUserId) {
      await SnsFeedList(
        targetUserId,
        offset,
        (resp) => {
          const data = resp.data;
          if (data === '피드 0개입니다') {
            setIsMoreData(false);
          } else {
            setFeedData(data);
          }
          scrollToTargetFeed();
        },
        (error) => {
          console.error(error);
        },
        9999,
      );
    }
  };

  useEffect(() => {
    getFeedData(offset);
  }, [offset]);

  const handleScroll = debounce(() => {
    if (containerRef.current && targetFeedId === undefined) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop + clientHeight + 1000 >= scrollHeight) {
        if (!loading && isMoreData) {
          setOffset((prevOffset) => prevOffset + 10);
        }
      }
    }
  }, 300);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  const handleCommentClick = async (id: number) => {
    setFeedId(id);
    toggleModalComment();
    await SnsCommentList(
      id,
      (resp) => {
        const data = resp.data;
        if (data === '댓글 0개입니다') {
          setCommentData([]);
        } else {
          setCommentData(data);
        }
      },
      (error) => {
        setCommentData([]);
      },
    );
  };

  const [targetFeedId, setTargetFeedId] = useState();
  const [targetUserId, setTargetUserId] = useState();
  const location = useLocation();
  useEffect(() => {
    if (location.state !== null) {
      setTargetFeedId(location.state.targetFeedId);
      setTargetUserId(location.state.targetUserId);
    }
  }, [targetUserId]);

  // useEffect(() => {
  //   if (targetFeedId) {
  //     getTargetData(0)
  //   }
  // }, [targetFeedId])

  const scrollToTargetFeed = () => {
    if (targetFeedId && containerRef.current && targetUserId) {
      // getTargetData(0)
      setTimeout(() => {
        const element = document.getElementById(`feed-${targetFeedId}`);
        if (element) {
          element.scrollIntoView({ block: 'center' });
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (targetFeedId && containerRef.current && targetUserId) {
      getTargetData(0);
    }
  }, [targetFeedId]);

  useModalExitHook();

  return (
    <>
      <s.Header>
        <SnsHeader />
        <SnsNavigation />
      </s.Header>
      <s.Container ref={containerRef}>
        {feedData.map((data, index) => (
          <div id={`feed-${data.id}`}>
            <FeedList
              key={data.id}
              feedId={data.id}
              content={data.content}
              image={data.image}
              likeCount={data.likeCount}
              commentCount={data.commentCount}
              createdAt={data.createdAt}
              userId={data.userId}
              nickname={data.nickname}
              profileImage={data.profileImage}
              isLike={data.isLike}
              onClick={handleCommentClick}
              loginUser={userId}
            />
          </div>
        ))}
        <CommentModal open={isComment} onModal={toggleModalComment} data={commentData} feedId={feedId} />
        <UserSearchModal open={isUserSearch} onModal={toggleModalUserSearch} />
      </s.Container>
      <BottomNav />
    </>
  );
};

export default FeedPage;
