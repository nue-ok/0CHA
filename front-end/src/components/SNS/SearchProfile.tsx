import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';

const s = {
  Container: styled.div`
    height: 45px;
    display: flex;
    align-items: center;
    padding: 0 25px;
    margin: 20px 0;
    cursor: pointer;
  `,
  Username: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    margin-left: 15px;
  `,
};

interface CommentProps {
  profileImage: string;
  username: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const SearchProfile = (props: CommentProps): JSX.Element => {
  const { profileImage, username, onClick } = props;
  return (
    <s.Container onClick={onClick}>
      {profileImage ? (
        <Image
          width="45px"
          height="45px"
          src={`https://i11b310.p.ssafy.io/images/${profileImage.split('/home/ubuntu/images/')[1]}`}
        />
      ) : (
        <div></div>
      )}
      <s.Username>{username}</s.Username>
    </s.Container>
  );
};

export default SearchProfile;
