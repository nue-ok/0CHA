import React, { useState } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Header from '../../../components/Common/Header';
import { useNavigate } from 'react-router';
import { putChangePw } from '../../../lib/api/main-api';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  BinArea: styled.div`
    width: 100%;
    height: 60px;
  `,
  ChangePasswordArea: styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 120px 10px 70px;
    overflow: auto;
    margin: 0 auto;
  `,
  PasswordArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  `,
  InputArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  InputHeader: styled.p`
    text-align: left;
    color: ${(props) => props.theme.textColor};
    margin-bottom: 5px;
    font-size: 16px;
  `,
  BetweenText: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  `,
  ButtonArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  `,
  InputBox: styled.div`
    flex: 1;
    margin-right: 10px;
  `,
  InputButton: styled.div`
    flex-shrink: 0;
  `,
  InfoNameBox: styled.div`
    width: 100%;
    display: flex;
    justify-content: left;
  `,
  ErrorText: styled.p`
    color: ${(props) => props.theme.mainColor};
    font-size: 12px;
    margin-left: 5px;
  `,
};

interface dataType {
  prePw: string;
  pw: string;
  pwCheck: string;
}

const ChangePasswordPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [data, setData] = useState<dataType>({
    prePw: '',
    pw: '',
    pwCheck: '',
  });

  // 비밀번호
  const [pwError, setPwError] = useState('');
  const [pwCheckError, setPwCheckError] = useState('');

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 이전 비밀번호 로직
    if (name === 'newPw') {
      const pwRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*()])[a-zA-Z0-9~!@#$%^&*()]+$/;
      if (value.length === 0) {
        setPwError('');
      } else if (!pwRegex.test(value) || value.length < 8) {
        setPwError('영소문자, 숫자, 특수문자를 포함한 8~16자로 입력하세요.');
      } else {
        setPwError('');
      }
      if (value.length === 16) {
        return;
      }
    }

    // 비밀번호 로직
    if (name === 'pw') {
      const pwRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*()])[a-zA-Z0-9~!@#$%^&*()]+$/;
      if (value.length === 0) {
        setPwError('');
      } else if (!pwRegex.test(value) || value.length < 8) {
        setPwError('영소문자, 숫자, 특수문자를 포함한 8~16자로 입력하세요.');
      } else {
        setPwError('');
      }
      if (value.length === 16) {
        return;
      }
    }

    // 비밀번호 확인 로직
    if (name === 'pwCheck') {
      if (value.length !== 0) {
        if (value === data.pw) {
          setPwCheckError('');
        } else {
          setPwCheckError('비밀번호가 틀립니다.');
        }
      } else {
        setPwCheckError('');
      }
    }

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // 제출 로직 작성(기존 비밀번호가 맞는지 확인)
    // 기존 비밀번호가 맞는지 확인
    if (
      data.prePw.length !== 0 &&
      data.pw.length !== 0 &&
      data.pwCheck.length !== 0 &&
      pwError === '' &&
      pwCheckError === ''
    ) {
      // 기존 비밀번호 확인 로직
      const param = {
        curPassword: data.prePw,
        newPassword: data.pw,
      };
      await putChangePw(
        param,
        (resp) => {
          alert('비밀번호가 변경되었습니다.');
          navigate('../');
        },
        (error) => {
          alert('변경 전 비밀번호를 다시 입력해 주세요.');
        },
      );

      // if (true) {
      //   console.log('Form submitted:', data);
      //   alert('비밀번호가 변경되었습니다.');
      //   navigate('../');
      // } else {
      //   // 틀리면
      //   alert('변경 전 비밀번호를 다시 입력해 주세요.');
      // }
    } else {
      // 조건 미충족시
      alert('값을 모두 입력하지 않았거나 조건에 충족하지 않았습니다.');
    }
  };

  const handlePrevious = () => {
    navigate(-1);
  };

  return (
    <s.Container>
      <Header text="비밀번호 변경" />
      <s.BinArea></s.BinArea>
      <s.ChangePasswordArea>
        <s.PasswordArea>
          <s.InfoNameBox>
            <s.InputHeader children="기존 비밀번호" />
          </s.InfoNameBox>
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              placeholder="기존 비밀번호"
              margin="5px auto"
              type="password"
              name="prePw"
              value={data.prePw}
              onChange={handleChangeValue}
            />
          </s.InputArea>
          <s.InfoNameBox>
            <s.InputHeader children="비밀번호" style={{ minWidth: '60px' }} />
            {pwError && <s.ErrorText>{pwError}</s.ErrorText>}
          </s.InfoNameBox>
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              placeholder="비밀번호"
              margin="5px auto"
              type="password"
              name="pw"
              value={data.pw}
              onChange={handleChangeValue}
            />
          </s.InputArea>
          <s.InfoNameBox>
            <s.InputHeader children="비밀번호 확인" />
            {pwCheckError && <s.ErrorText>{pwCheckError}</s.ErrorText>}
          </s.InfoNameBox>
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              placeholder="비밀번호 확인"
              margin="5px auto"
              type="password"
              name="pwCheck"
              value={data.pwCheck}
              onChange={handleChangeValue}
            />
          </s.InputArea>
        </s.PasswordArea>
        <s.ButtonArea>
          <Button width="48%" height="40px" children="이전" onClick={handlePrevious} bold="500" />
          <Button width="48%" height="40px" type="main" children="비밀번호 변경" onClick={handleSubmit} bold="500" />
        </s.ButtonArea>
      </s.ChangePasswordArea>
    </s.Container>
  );
};

export default ChangePasswordPage;
