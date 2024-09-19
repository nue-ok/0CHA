import React from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import { ReactComponent as alarmOn } from '../../asset/img/svg/alramOn.svg';

const s = {
  Container: styled.div`
    height: 45px;
    display: flex;
    align-items: center;
    margin: 20px 0;
    cursor: pointer;
  `,

  Content: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
  `,
  ContentArea: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  `,
  Time: styled.span`
    color: #666666;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 10px;
  `,
  ProfileImage: styled.div`
    position: relative;
  `,
  IsUnread: styled.div`
    position: absolute;
    top: -25%;
    left: -10%;
  `,
};

interface CommentProps {
  profileImage: string;
  username: string;
  content: string;
  time: string;
  isUnread: boolean;
}

const NotificationItem = (props: CommentProps): JSX.Element => {
  const { profileImage, username, content, time, isUnread } = props;
  return (
    <s.Container>
      <s.ProfileImage>
        <Image width="45px" height="45px" src={profileImage} />
        {isUnread === true ? (
          <s.IsUnread>
            <IconSvg width="6" height="6" Ico={alarmOn} />
          </s.IsUnread>
        ) : (
          <></>
        )}
      </s.ProfileImage>
      <s.ContentArea>
        <s.Time>{time}</s.Time>
        <s.Content>
          {username}
          {content}
        </s.Content>
      </s.ContentArea>
    </s.Container>
  );
};

export default NotificationItem;
