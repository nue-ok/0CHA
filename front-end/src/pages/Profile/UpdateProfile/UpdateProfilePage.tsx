import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Common/Button';
import basic from '../../../asset/img/basic.png';
import Header from '../../../components/Common/Header';
import Input from '../../../components/Common/Input';
import BottomNav from '../../../components/Common/BottomNav';
import { useNavigate } from 'react-router';
import { putProfileModify } from '../../../lib/api/main-api';
import { userData } from '../../../lib/hook/userData';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  BinArea: styled.div`
    width: 100%;
    height: 60px;
  `,
  ProfileArea: styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 120px 5px 70px;
    margin: 0 auto;
  `,
  ProfileImage: styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 60px;
    cursor: pointer;
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
  `,
  InputHeader: styled.p`
    text-align: left;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 5px;
    font-size: 16px;
    display: inline-block; /* 콘텐츠 크기에 맞게 너비 조정 */
    white-space: nowrap; /* 줄바꿈 방지 */
  `,
  ErrorText: styled.p`
    color: ${(props) => props.theme.mainColor};
    font-size: 12px;
    margin-left: 10px;
  `,
  InfoNameBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
  `,
  InputBox: styled.div`
    flex: 1;
    margin-right: 10px;
  `,
  ButtonArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  `,
  ProfileButton: styled(Button)`
    width: 48%;
    height: 40px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.btnTextColor};
  `,
  CancelButton: styled(Button)`
    width: 48%;
    height: 40px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.btnTextColor};
    color: ${(props) => props.theme.mainColor};
  `,
};

interface User {
  nickname: string;
  profileImage: string;
  tempNickname: string;
}

const UpdateProfilePage = (): JSX.Element => {
  const navigate = useNavigate();
  const data = userData();

  // 닉네임
  const [nickname, setNickName] = useState(data.nickname);
  const [nicknameError, setNicknameError] = useState('');

  const [image, setImage] = useState<string>(data.profileImage); // 파일 배열로 변경
  const [changeImg, setChangeImg] = useState<File>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFilesArray = Array.from(e.target.files);
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result as string);
        };
        setChangeImg(newFilesArray[0]);
        reader.readAsDataURL(file);
      }
    }
  };

  // 닉네임 핸들러
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    const nicknameRegex = /^[a-zA-Z0-9_]*$/;
    if (!nicknameRegex.test(e.target.value) || e.target.value.length < 5 || e.target.value.length > 10) {
      setNicknameError('닉네임은 5~10자 영문/숫자/_만 사용 가능합니다.');
    } else {
      setNicknameError('');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    if (nicknameError.length < 3) {
      const item = {
        nickname: nickname,
      };
      const formData = new FormData();
      formData.append('nickname', new Blob([JSON.stringify(item)], { type: 'application/json' }));
      if (changeImg) {
        formData.append('image', changeImg);
      } else {
        formData.append('image', '');
      }
      await putProfileModify(
        formData,
        (resp) => {
          alert('변경되었습니다.');
          navigate('../../mypage');
        },
        (error) => {
          if (error.response?.data === '사용중인 닉네임입니다.') {
            alert('사용중인 닉네임입니다.');
          } else {
            alert('잠시 후 다시 시도해주세요.');
          }
        },
      );
    } else {
      alert('입력하신 데이터를 확인해주세요.');
    }
  };

  const basicUrl = 'https://i11b310.p.ssafy.io/images/';

  // 이미지 경로를 파싱하여 basicUrl과 결합하는 함수
  const getParsedImageUrl = (imagePath: string) => {
    if (imagePath.length >= 200) {
      return imagePath;
    }
    if (imagePath) {
      const relativePath = imagePath.split('/home/ubuntu/images/')[1];
      return basicUrl + relativePath;
    } else {
      return basic;
    }
  };

  return (
    <s.Container>
      <Header text="프로필 수정" />
      <s.BinArea></s.BinArea>
      <s.ProfileArea>
        <label htmlFor="profileImage">
          <s.ProfileImage src={getParsedImageUrl(image)} alt="프로필 이미지" />
        </label>
        <input
          type="file"
          id="profileImage"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageUpload}
        />
        <s.InfoNameBox>
          <s.InputHeader children="닉네임" />
          {nicknameError && <s.ErrorText>{nicknameError}</s.ErrorText>}
        </s.InfoNameBox>
        <s.InputArea>
          <s.InputBox>
            <Input
              width="100%"
              height="40px"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              type="text"
              margin="5px auto"
              value={nickname}
              onChange={handleNicknameChange}
            />
          </s.InputBox>
        </s.InputArea>
        <s.ButtonArea>
          <s.CancelButton onClick={handleCancel} children="이전" bold="500" />
          <s.ProfileButton onClick={handleSave} children="수정완료" bold="500" />
        </s.ButtonArea>
      </s.ProfileArea>
      <BottomNav />
    </s.Container>
  );
};

export default UpdateProfilePage;
