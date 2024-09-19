import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import SearchProfile from '../SNS/SearchProfile';
import IconSvg from '../Common/IconSvg';
import { ReactComponent as back } from '../../asset/img/svg/back.svg';
import { useNavigate } from 'react-router';
import { UserSearch } from '../../lib/api/sns-api';
import { UserPageFollowing } from '../../lib/api/sns-api';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow-y: auto;
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 20px;
  `,
  IconArea: styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;
  `,
  HeaderContainer: styled.section`
    max-width: 800px;
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.bgColor};
    position: fixed;
  `,
  HeaderBasicArea: styled.div`
    width: 70%;
    height: 100%;
    margin: 0 10px;
    display: flex;
    align-items: center;
  `,
  HeaderTitle: styled.span`
    width: 100%;
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: bold;
    margin-left: 20px;
    cursor: default;
  `,
  UserList: styled.div`
    padding-top: 57px;
  `,
};

interface FollowingModalProps {
  open: boolean;
  onModal: Function;
  userId?: number;
}

type UserData = {
  id: number;
  nickname: string;
  profileImage: string;
  feedCount: number;
  itemCount: number;
  followedIdCount: number;
  followerIdCount: number;
}

const FollowingModal = (props: FollowingModalProps): JSX.Element => {
  const [search, setSearch] = useState('');
  const toggleModal = (): void => {
    props.onModal();
  };

  const navigate = useNavigate();
  const handleMovePage = (id: string) => {
    props.onModal();
    getUserData();
    navigate(`../${id}`, {replace: false});
  };
//////////////////////
  const [userData, setUserData] = useState<UserData[]>([])

  const getUserData = async () => {
    await UserSearch(
      (resp) => {
        setUserData(resp.data)
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    getUserData();
  }, []);

  const [filter, setFilter] = useState<UserData[]>([])

  useEffect(() => {
    if (search) {
      const filterData = userData.filter((user) =>
        user.nickname.includes(search)
      )
      setFilter(filterData)
    } else {
      setFilter([])
    }
  }, [search])
  /////////////////

  const [followingData, setFollowingData] = useState<UserData[]>([]);

  const getFollowingData = async () => {
    if (props.userId) {
      await UserPageFollowing(
        props.userId,
        (resp) => {
          if (resp.data === '팔로잉 0명 입니다') {
            setFollowingData([]);
          } else {
            setFollowingData(resp.data);
          };
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  useEffect(() => {
    getFollowingData();
  }, [props.userId]);


  return (
    <>
      <ReactModal
        isOpen={props.open}
        ariaHideApp={false}
        onRequestClose={toggleModal}
        className="marketModal"
        overlayClassName="Overlay"
      >
        <s.Container>
          <s.HeaderContainer>
            <s.HeaderBasicArea>
              <IconSvg width="25" height="25" Ico={back} cursor="pointer" onClick={toggleModal}/>
              <s.HeaderTitle>팔로잉 목록</s.HeaderTitle>
            </s.HeaderBasicArea>
          </s.HeaderContainer>
          <s.UserList>
            {followingData.map((user) => (
              <SearchProfile key={user.id}
                profileImage={user.profileImage}
                username={user.nickname}
                onClick={() => handleMovePage(`${user.id}`)}
              />
            ))}
          </s.UserList>
        </s.Container>
      </ReactModal>
    </>
  );
};

export default FollowingModal;
