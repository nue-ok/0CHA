import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '../Common/Button';
import Image from '../Common/Image';

import test from '../../asset/img/testImg.png';
import { useLocation, useNavigate, useParams } from 'react-router';

import { IsFollowingUser } from '../../lib/api/sns-api';
import { UserFollow } from '../../lib/api/sns-api';
import { UserFollowCancel } from '../../lib/api/sns-api';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { modalActions } from '../../store/modal';
import ItemModal from '../Modal/ItemModal';
import { Imag } from '@tensorflow/tfjs';

const s = {
  Container: styled.section`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    padding: 0 15px;
  `,
  ProfileImage: styled.div`
    margin-right: 35px;
  `,
  ProfileButtonArea: styled.div`
    width: 100%;
    max-width: 270px;
    min-width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
  UserName: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: 500;
  `,
  ProfileButton: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
  `,
  ProfileTopArea: styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 300px;
    min-width: 150px;
    cursor: default;
  `,
  ProfileBottomArea: styled.div`
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 100%;
    max-width: 280px;
    min-width: 150px;
    cursor: default;
  `,
  UserStat: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  UserStatPointer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  `,
  UserStatTitle: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
  `,
  UserStatCnt: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 700;
    margin-top: 10px;
  `,
};

interface UserProfileInfoProps {
  profileUserId?: number;
  isCurrentUser?: boolean;
  userName?: string;
  postCnt?: number;
  marketCnt?: number;
  followingCnt?: number;
  followerCnt?: number;
  profileImage?: string;
}

const UserProfileInfo = (props: UserProfileInfoProps): JSX.Element => {
  const { profileUserId, isCurrentUser, userName, postCnt, marketCnt, followingCnt, followerCnt, profileImage } = props;
  const naviagate = useNavigate();
  const handleMovePage = (path: string): void => {
    naviagate(path);
  };
  const userId = useLocation().pathname;

  const dispatch = useAppDispatch();
  const handleClickFollowingModal = (): void => {
    dispatch(modalActions.toggleFollowing());
  };
  const handleClickFollowerModal = (): void => {
    dispatch(modalActions.toggleFollower());
  };

  const params = useParams();
  const feedUserId = params.id;

  const [isFollowing, setIsFollowing] = useState(false);
  const [follower, setFollower] = useState(followerCnt);

  useEffect(() => {
    setFollower(followerCnt);
  }, [followerCnt]);

  const getIsFollowing = async () => {
    if (feedUserId) {
      await IsFollowingUser(
        parseInt(feedUserId),
        (resp) => {
          if (resp.data === '팔로우 상태가 아닙니다.') {
            setIsFollowing(false);
          } else {
            setIsFollowing(true);
          }
        },
        (error) => {
          console.error(error);
        },
      );
    }
  };

  useEffect(() => {
    getIsFollowing();
  }, [userId]);

  const followClick = async () => {
    if (feedUserId) {
      await UserFollow(
        parseInt(feedUserId),
        (resp) => {
          setIsFollowing(true);
          if (follower !== undefined) {
            setFollower(follower + 1);
          }
        },
        (error) => {
          console.error(error);
        },
      );
    }
  };

  const unfollowClick = async () => {
    if (feedUserId) {
      await UserFollowCancel(
        parseInt(feedUserId),
        (resp) => {
          setIsFollowing(false);
          if (follower !== undefined) {
            setFollower(follower - 1);
          }
        },
        (error) => {
          console.error(error);
        },
      );
    }
  };

  return (
    <s.Container>
      <s.ProfileTopArea>
        <s.ProfileImage>
          {profileImage ? (
            <Image
              width="60px"
              height="60px"
              src={`https://i11b310.p.ssafy.io/images/${profileImage.split('/home/ubuntu/images/')[1]}`}
              fit="cover"
            />
          ) : (
            <div></div>
          )}
        </s.ProfileImage>
        <s.ProfileButtonArea>
          <s.UserName>{userName}</s.UserName>
          <s.ProfileButton>
            {isCurrentUser === true ? (
              <Button
                width="48%"
                height="30px"
                children="채팅 목록"
                size="14px"
                bold="500"
                onClick={() => handleMovePage('../../chat')}
              />
            ) : (
              <Button
                width="48%"
                height="30px"
                children="채팅"
                size="14px"
                bold="500"
                onClick={() => handleMovePage(`../../chat/${profileUserId}`)}
              />
            )}
            {isCurrentUser === true ? (
              <Button
                width="48%"
                height="30px"
                children="내 정보"
                size="14px"
                bold="500"
                onClick={() => handleMovePage(`../../../mypage`)}
              />
            ) : (
              <>
                {isFollowing === true ? (
                  <Button
                    width="48%"
                    height="30px"
                    children="팔로우 취소"
                    size="14px"
                    bold="500"
                    onClick={unfollowClick}
                  />
                ) : (
                  <Button width="48%" height="30px" children="팔로우" size="14px" bold="500" onClick={followClick} />
                )}
              </>
            )}
          </s.ProfileButton>
        </s.ProfileButtonArea>
      </s.ProfileTopArea>
      <s.ProfileBottomArea>
        <s.UserStat>
          <s.UserStatTitle>운동</s.UserStatTitle>
          <s.UserStatCnt>{postCnt}</s.UserStatCnt>
        </s.UserStat>
        <s.UserStat>
          <s.UserStatTitle>거래</s.UserStatTitle>
          <s.UserStatCnt>{marketCnt}</s.UserStatCnt>
        </s.UserStat>
        <s.UserStatPointer onClick={handleClickFollowerModal}>
          <s.UserStatTitle>팔로워</s.UserStatTitle>
          <s.UserStatCnt>{follower}</s.UserStatCnt>
        </s.UserStatPointer>
        <s.UserStatPointer onClick={handleClickFollowingModal}>
          <s.UserStatTitle>팔로잉</s.UserStatTitle>
          <s.UserStatCnt>{followingCnt}</s.UserStatCnt>
        </s.UserStatPointer>
      </s.ProfileBottomArea>
    </s.Container>
  );
};

export default UserProfileInfo;
