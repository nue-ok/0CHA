import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import SearchProfile from '../SNS/SearchProfile';
import test from '../../asset/img/testImg.png';
import Input from '../Common/Input';
import Button from '../Common/Button';
import IconSvg from '../Common/IconSvg';
import { ReactComponent as back } from '../../asset/img/svg/back.svg';
import { useNavigate } from 'react-router';
import { UserSearch } from '../../lib/api/sns-api';

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
};

interface UserSearchModalProps {
  open: boolean;
  onModal: Function;
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

const UserSearchModal = (props: UserSearchModalProps): JSX.Element => {
  const [search, setSearch] = useState('');
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const toggleModal = (): void => {
    props.onModal();
  };

  const navigate = useNavigate();
  const handleMovePage = (id: string) => {
    props.onModal();
    getUserData();
    navigate(`../profile/${id}`);
  };

  const [userData, setUserData] = useState<UserData[]>([])

  const getUserData = async () => {
    await UserSearch(
      (resp) => {
        setUserData(resp.data)
      },
      (error) => {
        console.error(error);
      }
    )
  }

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
          <s.InputArea>
            <s.IconArea onClick={toggleModal}>
              <IconSvg width="25" height="25" Ico={back} cursor="pointer" />
            </s.IconArea>
            <Input
              width="90%"
              display="block"
              margin="0 auto"
              height="40px"
              placeColor="textColor2"
              placeholder="검색어 입력"
              name={search}
              value={search}
              onChange={onSearch}
            />
          </s.InputArea>
          {filter.map((user) => (
            <SearchProfile
              profileImage={user.profileImage}
              username={user.nickname}
              onClick={() => handleMovePage(`${user.id}`)}
            />
          ))}
        </s.Container>
      </ReactModal>
    </>
  );
};

export default UserSearchModal;
