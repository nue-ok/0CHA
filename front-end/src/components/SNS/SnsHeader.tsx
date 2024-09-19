import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import IconSvg from '../Common/IconSvg';
import Input from '../Common/Input';
import Image from '../Common/Image';
import { ReactComponent as alarm } from '../../asset/img/svg/alram.svg';
import { ReactComponent as message } from '../../asset/img/svg/message.svg';
import { ReactComponent as search } from '../../asset/img/svg/search.svg';

import test from '../../asset/img/testImg.png';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { modalActions, selectModalUserSearch } from '../../store/modal';
import { useNavigate } from 'react-router';

const s = {
  Container: styled.section`
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    background-color: #000000;
  `,
  MenuArea1: styled.div`
    width: 70%;
    display: flex;
    align-items: center;
  `,
  MenuArea2: styled.div`
    width: 30%;
    display: flex;
    justify-content: end;
    align-items: center;
  `
};

const SnsHeader = (): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };
  const dispatch = useAppDispatch();
  const handleClickModal = (): void => {
    dispatch(modalActions.toggleUserSearch());
  };

  const [userId, setUserId] = useState(0)
  const [userNickname, setUserNickname] = useState('')
  const [userProfileImage, setUserProfileImage] = useState('')

  const userStr = localStorage.getItem("user")

  useEffect(() => {
    if (userStr) {
      const userTmp = JSON.parse(userStr)
      setUserId(userTmp.id)
      setUserNickname(userTmp.nickname)
      setUserProfileImage(userTmp.profileImage)
    }
  }, [])


  return (
    <s.Container>
      <s.MenuArea1>
        {userProfileImage === null ? (
            <></>
          ) : (
          <Image
            width="35px"
            height="35px"
            src={`https://i11b310.p.ssafy.io/images/${userProfileImage.split('/home/ubuntu/images/')[1]}`}
            cursor="pointer"
            onClick={() => handleMovePage(`../profile/${userId}`)}
            display="block"
            margin="0 10px 0 0"
          />
          )} 
      </s.MenuArea1>
      <s.MenuArea2>
        <IconSvg
          width="25"
          height="25"
          Ico={search}
          cursor="pointer"
          onClick={handleClickModal}
          display="block"
          margin=" 0 10px 0 0"
        />
        <IconSvg
          width="25"
          height="25"
          Ico={alarm}
          cursor="pointer"
          onClick={() => handleMovePage('../notification')}
          display="block"
          margin=" 0 10px 0 0"
        />
        <IconSvg width="25" height="25" Ico={message} cursor="pointer" onClick={() => handleMovePage('../chat')} />
      </s.MenuArea2>
    </s.Container>
  );
};

export default SnsHeader;
