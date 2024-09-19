import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Common/Button';
import basic from '../../../asset/img/basic.png';
import Header from '../../../components/Common/Header';
import BottomNav from '../../../components/Common/BottomNav';
import { useNavigate } from 'react-router';
import { logout } from '../../../lib/api/user-api';
import { delMyDel, getMyInfo } from '../../../lib/api/main-api';
import { User } from '../../../util/types/axios-main';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  ProfileArea: styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px 5px 70px;
    overflow: auto;
  `,
  ProfileImageArea: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    cursor: default;
  `,
  ProfileImage: styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 20px;
  `,
  ProfileDetails: styled.div`
    display: flex;
    flex-direction: column;
  `,
  MainDetail: styled.p`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    margin-bottom: 5px;
  `,
  SubDetail: styled.p`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    margin-bottom: 5px;
  `,
  Email: styled.p`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    margin-bottom: 20px;
  `,
  ButtonArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  `,
  ProfileButton: styled(Button)`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
    font-weight: 500;
  `,
  InfoArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  InfoItem: styled.div`
    width: 100%;
    padding: 25px 10px;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  `,
  InfoText: styled.p`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  `,
  Arrow: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  `,
  InfoHeader: styled.p`
    text-align: left;
    width: 100%;
    color: ${(props) => props.theme.textColor2};
    margin-bottom: 5px;
    font-size: 14px;
    cursor: default;
  `,
};

const ProfileMainPage = (): JSX.Element => {
  // const user = useLocation().state?.data;
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    id: 0,
    email: '',
    password: '',
    name: '',
    nickname: '',
    phone: '',
    birth: '',
    profileImage: '',
    gender: 0,
    height: 0,
    weight: 0,
    district: '',
    siGunGu: '',
  }); // 나중에 리액트쿼리
  useEffect(() => {
    getMyInfo(
      (resp) => {
        setUser(resp.data);
        if (localStorage.getItem('user')) {
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(resp.data));
        } else {
          localStorage.setItem('user', JSON.stringify(resp.data));
        }
      },
      (error) => {},
    );
  }, []);
  const handleEditProfile = () => {
    navigate('profile');
  };

  const handleEditInfo = () => {
    navigate('info');
  };

  const handleChangePassword = () => {
    navigate('password');
  };

  const postLogout = async () => {
    await logout(
      (resp) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      },
      (error) => {
        alert('로그아웃 도중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      },
    );
  };

  const handleDeleteAccount = async () => {
    const password = prompt('정말로 탈퇴하시겠습니까? 탈퇴를 하시려면 "동의합니다." 를 입력해주세요.');
    if (password === '동의합니다.') {
      await delMyDel(
        (resp) => {
          alert('탈퇴되었습니다. 이용해주셔서 감사합니다.');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/');
        },
        (error) => {
          alert('잠시 후 다시 시도해주세요.');
        },
      );
    } else {
      alert('입력문구가 맞지않습니다.');
    }
  };

  const basicUrl = 'https://i11b310.p.ssafy.io/images/';

  // 이미지 경로를 파싱하여 basicUrl과 결합하는 함수
  const getParsedImageUrl = (imagePath: string) => {
    if (imagePath) {
      const relativePath = imagePath.split('/home/ubuntu/images/')[1];
      return basicUrl + relativePath;
    } else {
      return basic;
    }
  };

  return (
    <s.Container>
      <Header text="내 프로필" />
      <s.ProfileArea>
        <s.ProfileImageArea>
          <s.ProfileImage src={getParsedImageUrl(user.profileImage)} alt="프로필 이미지" />
          <s.ProfileDetails>
            <s.MainDetail children={user.name} />
            <s.SubDetail children={user.nickname} />
            <s.SubDetail children={user.email} />
          </s.ProfileDetails>
        </s.ProfileImageArea>
        <s.ButtonArea>
          <s.ProfileButton onClick={handleEditProfile} children="프로필 수정" />
        </s.ButtonArea>
        <s.InfoHeader children="내 정보 관리" />
        <s.InfoArea>
          <s.InfoItem onClick={handleEditInfo}>
            <s.InfoText children="내 정보 수정" />
            <s.Arrow>›</s.Arrow>
          </s.InfoItem>
          <s.InfoItem onClick={handleChangePassword}>
            <s.InfoText children="비밀번호 변경" />
            <s.Arrow>›</s.Arrow>
          </s.InfoItem>
          <s.InfoItem onClick={postLogout}>
            <s.InfoText children="로그아웃" />
            <s.Arrow>›</s.Arrow>
          </s.InfoItem>
          <s.InfoItem onClick={handleDeleteAccount}>
            <s.InfoText children="회원 탈퇴" />
            <s.Arrow>›</s.Arrow>
          </s.InfoItem>
        </s.InfoArea>
      </s.ProfileArea>

      <BottomNav />
    </s.Container>
  );
};

export default ProfileMainPage;
