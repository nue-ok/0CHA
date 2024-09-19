import React, { useState } from 'react';
import styled from 'styled-components';

import BottomNav from '../../../components/Common/BottomNav';
import Header from '../../../components/Common/Header';
import TextArea from '../../../components/Common/TextArea';
import Button from '../../../components/Common/Button';
import Image from '../../../components/Common/Image';
import Conversation from '../../../components/SNS/Conversation';

import test from '../../../asset/img/testImg.png';
import NotificationItem from '../../../components/SNS/Notification';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding: 57px 25px 68px 25px;
  `,
};

const NotificationPage = (): JSX.Element => {
  return (
    <>
      <Header text="알림" />
      <s.Container>
        <NotificationItem
          profileImage={test}
          username="stranger_00"
          content="님이 회원님을 팔로우했습니다."
          time="3시간 전"
          isUnread={true}
        />
        <NotificationItem
          profileImage={test}
          username="stranger_00"
          content="님이 회원님을 팔로우했습니다."
          time="3시간 전"
          isUnread={false}
        />
      </s.Container>
      <BottomNav />
    </>
  );
};

export default NotificationPage;
