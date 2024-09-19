import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from '../../../components/Common/Image';
import Header from '../../../components/Common/Header';
import BottomNav from '../../../components/Common/BottomNav';
import UserProfileInfo from '../../../components/SNS/UserProfileInfo';
import { useNavigate, useParams } from 'react-router';

import { UserPage } from '../../../lib/api/sns-api';
import { UserPageFeed } from '../../../lib/api/sns-api';
import { UserPageItem } from '../../../lib/api/sns-api';
import FollowingModal from '../../../components/Modal/FollowingModal';
import { useAppDispatch, useAppSelector } from '../../../lib/hook/useReduxHook';
import { modalActions, selectModalFollower, selectModalFollowing, selectModalMarket } from '../../../store/modal';
import FollowerModal from '../../../components/Modal/FollowerModal';
import ItemModal from '../../../components/Modal/ItemModal';
import { pageActions } from '../../../store/page';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding-top: 57px;
    padding-bottom: 68px;
  `,
  TabBar: styled.div`
    display: flex;
    justify-content: space-around;
  `,
  TabBarContent: styled.span``,
  ActiveText: styled.div`
    width: 50%;
    color: ${(props) => props.theme.mainColor};
    font-size: 14px;
    font-weight: 500;
    border-bottom: 1px solid ${(props) => props.theme.mainColor};
    text-align: center;
    padding: 10px;
    cursor: pointer;
  `,
  InactiveText: styled.div`
    width: 50%;
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    padding: 10px;
    cursor: pointer;
  `,
  testArea: styled.div`
    width: 100%;
    margin-top: 3px;
  `,
  ThumbnailArea: styled.div`
    width: 100%;
    margin: auto;
    display: inline-flex;
    flex-wrap: wrap;
  `,
  Thumbnail: styled.div`
    width: 33%;
    aspect-ratio: 1;
    padding: 1px;
    border: 1px #212121 solid;
    display: flex;
    align-items: center;
  `,
};

type userPageData = {
  id: number;
  nickname: string;
  profileImage: string;
  feedCount: number;
  itemCount: number;
  followedIdCount: number;
  followerIdCount: number;
};

type userPageFeedData = {
  id: number;
  image: string;
};

type userPageMarketData = {
  id: number;
  image: string;
};

// 복현우
interface Item {
  id: number;
  images: string[];
  title: string;
  price: string;
  isSold: boolean;
  likeCount: number;
  isLike: number;
}

const UserPostPage = (): JSX.Element => {
  const [isFitness, setIsFitness] = useState(true);
  const switchTabbar = () => {
    setIsFitness(!isFitness);
  };

  const isFollowingModal = useAppSelector(selectModalFollowing);
  const isFollowerModal = useAppSelector(selectModalFollower);
  const dispatch = useAppDispatch();
  const toggleModalFollowing = (): void => {
    dispatch(modalActions.toggleFollowing());
  };
  const toggleModalFollower = (): void => {
    dispatch(modalActions.toggleFollower());
  };

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

  const [userData, setUserData] = useState<userPageData>();
  const [feedData, setFeedData] = useState<userPageFeedData[]>([]);
  const [marketData, setMarketData] = useState<userPageMarketData[]>([]);
  const params = useParams();
  const feedUserId = params.id;

  const getUserPage = async () => {
    if (feedUserId) {
      await UserPage(
        parseInt(feedUserId),
        (resp) => {
          setUserData(resp.data);
        },
        (error) => {
          navigate('*'); //잘못된 접근입니다. (유저 없을때)
        },
      );
    }
  };

  const getUserPageFeed = async () => {
    if (feedUserId) {
      await UserPageFeed(
        parseInt(feedUserId),
        (resp) => {
          if (resp.data === '피드 0개입니다') {
            setFeedData([]);
          } else {
            setFeedData(resp.data);
          }
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  const getUserPageMarket = async () => {
    if (feedUserId) {
      await UserPageItem(
        parseInt(feedUserId),
        (resp) => {
          if (resp.data === '중고거래 0개입니다') {
            setMarketData([]);
          } else {
            setMarketData(resp.data);
          }
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  useEffect(() => {
    getUserPage();
    getUserPageFeed();
    getUserPageMarket();
  }, [feedUserId]);

  useEffect(() => {}, [userData]);

  const navigate = useNavigate();

  const handleThumbnailClick = (feedId: number) => {
    dispatch(pageActions.changeSnsType('feed'));
    navigate(`/sns/feed`, { state: { targetFeedId: feedId, targetUserId: feedUserId } });
  };

  // 복현우
  const [selectedItem, setSelectedItem] = useState<number | null>(null); // 선택된 아이템 상태 관리
  const [showItemModal, setShowItemModal] = useState(false);

  const toggleMarket = (itemId?: number): void => {
    if (itemId !== undefined) {
      setSelectedItem(itemId); // 선택된 아이템 설정
      setShowItemModal(true);
    } else {
      // itemId가 선택이 안되는 경우
      setShowItemModal(false);
    }
    dispatch(modalActions.toggleMarket());
  };

  const handleItemDeleted = () => {
    toggleMarket(); // 모달 닫기
    setShowItemModal(false);
  };

  // 아이템 리스트의 특정 아이템 업데이트 함수
  const handleItemUpdated = (updatedItem: Item) => {};

  return (
    <>
      <Header text="피드" onBack={() => navigate('../../')} />
      <s.Container>
        <UserProfileInfo
          profileUserId={userData?.id}
          isCurrentUser={userId === userData?.id}
          userName={userData?.nickname}
          postCnt={userData?.feedCount}
          marketCnt={userData?.itemCount}
          followerCnt={userData?.followerIdCount}
          followingCnt={userData?.followedIdCount}
          profileImage={userData?.profileImage}
        />
        <s.TabBar>
          {isFitness === true ? (
            <s.ActiveText>운동</s.ActiveText>
          ) : (
            <s.InactiveText onClick={switchTabbar}>운동</s.InactiveText>
          )}
          {isFitness === true ? (
            <s.InactiveText onClick={switchTabbar}>거래</s.InactiveText>
          ) : (
            <s.ActiveText>거래</s.ActiveText>
          )}

          {/* {props.image === null ? (
            <></>
          ) : (
          <Image
            width="100%"
            height="100%"
            src={`https://i11b310.p.ssafy.io/images/${props.image.split('/home/ubuntu/images/')[1]}`}
            type="rect"
          /> */}
        </s.TabBar>
        <s.testArea>
          <s.ThumbnailArea>
            {isFitness === true ? (
              <>
                {feedData.map((thumbnail) => (
                  <s.Thumbnail key={thumbnail.id} onClick={() => handleThumbnailClick(thumbnail.id)}>
                    {thumbnail.image === null ? (
                      <div></div>
                    ) : (
                      <Image
                        width="100%"
                        height="100%"
                        src={`https://i11b310.p.ssafy.io/images/${thumbnail.image.split('/home/ubuntu/images/')[1]}`}
                        type="rect"
                        cursor="pointer"
                        fit="cover"
                      />
                    )}
                  </s.Thumbnail>
                ))}
              </>
            ) : (
              <>
                {marketData.map((thumbnail) => (
                  <s.Thumbnail
                    key={thumbnail.id}
                    onClick={() => toggleMarket(thumbnail.id)} // 클릭 시 해당 아이템을 모달에 설정
                  >
                    {thumbnail.image === null ? (
                      <div></div>
                    ) : (
                      <Image
                        width="100%"
                        height="100%"
                        src={`https://i11b310.p.ssafy.io/images/${thumbnail.image.split('/home/ubuntu/images/')[1]}`}
                        type="rect"
                        cursor="pointer"
                        fit="cover"
                      />
                    )}
                  </s.Thumbnail>
                ))}
              </>
            )}
          </s.ThumbnailArea>
        </s.testArea>
        <FollowingModal open={isFollowingModal} onModal={toggleModalFollowing} userId={userData?.id} />
        <FollowerModal open={isFollowerModal} onModal={toggleModalFollower} userId={userData?.id} />
        {/* 아이템 모달 자리 for 복현우 ^^ */}
        <ItemModal
          open={showItemModal}
          onModal={toggleMarket}
          itemId={selectedItem}
          onDelete={handleItemDeleted} // 삭제 후 호출될 콜백 함수 전달
          onItemUpdate={handleItemUpdated} // 아이템 업데이트 후 호출될 콜백 함수 전달
        />
      </s.Container>
      <BottomNav />
    </>
  );
};

export default UserPostPage;
