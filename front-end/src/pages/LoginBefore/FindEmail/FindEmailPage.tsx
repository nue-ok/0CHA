import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Header from '../../../components/Common/Header';
import PhoneNumberInput from '../../../components/LoginBefore/phoneNumberInput';
import { findEmail } from '../../../lib/api/user-api';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch } from '../../../lib/hook/useReduxHook';
import { pageActions } from '../../../store/page';

// 4자리 로직 작성

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
  BinArea: styled.div`
    width: 100%;
    height: 60px;
  `,
  FindEmailArea: styled.div`
    width: 100%;
    padding: 120px 0 80px;
    overflow: auto;
  `,
  InfoArea: styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `,
  InputHeader: styled.p`
    text-align: left;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 5px;
    font-size: 16px;
  `,
  BtnArea: styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 20px auto 0;
  `,
  ErrorText: styled.p`
    color: ${(props) => props.theme.mainColor};
    font-size: 12px;
    margin-left: 10px;
    margin-top: 5px;
  `,
  InfoNameBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
  `,
  ExistedTest: styled.p`
    color: ${(props) => props.theme.mainColor};
    font-size: 12px;
    margin-bottom: 10px;
    width: 90%;
    margin: 0 auto;
  `,
};

interface dataType {
  username: string;
  phonePart2: string;
  phonePart3: string;
}

const FindEmailPage = (): JSX.Element => {
  const location = useLocation();
  const [data, setData] = useState<dataType>({
    username: '',
    phonePart2: '',
    phonePart3: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 유효성 검사 상태
  const [usernameError, setUsernameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isExisted, setIsExisted] = useState(false); // 이메일이 존재하는가

  // 전화번호 유효성 검사
  useEffect(() => {
    const validatePhoneNumber = () => {
      const { phonePart2, phonePart3 } = data;
      if (
        (phonePart2 && phonePart2.length !== 4) ||
        (phonePart3 && phonePart3.length !== 4) ||
        (!phonePart2 && phonePart3) ||
        (phonePart2 && !phonePart3)
      ) {
        setPhoneNumberError('휴대전화 앞, 뒤 4자리를 정확하게 입력해 주세요.');
      } else {
        setPhoneNumberError('');
      }
    };

    validatePhoneNumber();
  }, [data.phonePart2, data.phonePart3]);

  // 상태 변화 감지 후 처리
  useEffect(() => {
    if (emailMessage === '' && isExisted === true) {
      alert('이메일 찾기 요청이 제출되었습니다.');
    }
  }, [emailMessage]);

  // 입력 값 변경 처리
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'username') {
      const usernameRegex = /^[a-zA-Z가-힣]*$/;
      if (!usernameRegex.test(value) || value.length === 1) {
        setUsernameError('2~20자 내 한글/영문만 입력하세요.');
      } else {
        setUsernameError('');
      }
      if (value.length > 20) {
        return;
      }
    }

    // 전화번호 필드
    if (name === 'phonePart2' || name === 'phonePart3') {
      const phoneNumberRegex = /^\d*$/;
      if (!phoneNumberRegex.test(value)) {
        return;
      }
      if (value.length > 4) {
        return;
      }
    }

    setData({
      ...data,
      [name]: value,
    });
  };

  // 제출 처리
  const handleSubmit = async () => {
    const param = {
      name: data.username,
      phone: '010' + data.phonePart2 + data.phonePart3,
    };
    // 모든 정보가 완전하게 입력된 경우이면
    if (data.username.length !== 0 && data.phonePart2.length !== 2 && phoneNumberError === '' && usernameError === '') {
      // 회원정보 탐색 로직
      // 존재하지 않는 경우
      await findEmail(
        param,
        (resp) => {
          dispatch(pageActions.toogleIsEmail(true));
          navigate('/find/email', { state: { result: { name: param.name, email: resp.data } } });
        },
        (error) => {
          setEmailMessage('해당 정보로 가입된 이메일이 없습니다.');
          setIsExisted(false);
        },
      );
      // 존재하는 경우
      // setIsExisted(true);
      // setEmailMessage('');
    } else {
      alert('모든 정보를 정확히 입력해주십시오.');
    }
  };

  // 이전 페이지로 이동 처리
  const handlePrevious = () => {
    navigate('/login');
  };
  return (
    <s.Container>
      <Header text="이메일 찾기" />
      <s.BinArea></s.BinArea>
      <s.FindEmailArea>
        <s.InfoArea>
          <s.InfoNameBox>
            <s.InputHeader children="이름" />
            {usernameError && <s.ErrorText>{usernameError}</s.ErrorText>}
          </s.InfoNameBox>
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              name="username"
              placeholder="이름을 입력해주세요"
              type="text"
              value={data.username}
              onChange={handleChangeValue}
            />
          </s.InputArea>
          <s.InfoNameBox>
            <s.InputHeader children="전화번호" />
            {phoneNumberError && <s.ErrorText>{phoneNumberError}</s.ErrorText>}
          </s.InfoNameBox>
          <PhoneNumberInput phonePart2={data.phonePart2} phonePart3={data.phonePart3} onChange={handleChangeValue} />
        </s.InfoArea>
        {emailMessage && <s.ExistedTest>{emailMessage}</s.ExistedTest>}
        <s.BtnArea>
          <Button width="48%" height="40px" children="이전" onClick={handlePrevious} />
          <Button width="48%" height="40px" type="main" children="이메일 찾기" onClick={handleSubmit} />
        </s.BtnArea>
      </s.FindEmailArea>
    </s.Container>
  );
};

export default FindEmailPage;
