import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import Header from '../../../components/Common/Header';
import PhoneNumberInput from '../../../components/LoginBefore/phoneNumberInput';
import EmailArea from '../../../components/LoginBefore/EmailArea';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../../lib/hook/useReduxHook';
import { findPwAuth, findPwAuthCheck } from '../../../lib/api/user-api';
import { pageActions } from '../../../store/page';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  BinArea: styled.div`
    width: 100%;
    height: 60px;
  `,
  FindPasswordArea: styled.div`
    width: 100%;
    height: calc(100%-60px); // 가운데
    padding: 120px 0 80px !important;
    overflow: auto;
  `,
  InfoArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  `,
  InputArea: styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `,
  InfoNameBox: styled.div`
    width: 90%;
    display: flex;
    justify-content: left;
  `,
  InputHeader: styled.p`
    text-align: left;
    color: ${(props) => props.theme.textColor};
    width: fit-content;
    margin-bottom: 5px;
    font-size: 16px;
  `,
  ErrorText: styled.p`
    color: ${(props) => props.theme.mainColor};
    font-size: 12px;
    margin-left: 10px;
    margin-top: 5px;
  `,
  BtnArea: styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin: 20px auto 0;
  `,
  InputBox: styled.div`
    flex: 1;
    margin-right: 10px;
  `,
  InputBtn: styled.div`
    flex-shrink: 0;
  `,
  PhoneArea: styled.div`
    width: 90%;
  `,
};

interface dataType {
  username: string;
  phonePart2: string;
  phonePart3: string;
  email: string;
  verificationCode: string;
}

const FindPasswordPage = (): JSX.Element => {
  const [data, setData] = useState<dataType>({
    username: '',
    phonePart2: '',
    phonePart3: '',
    email: '',
    verificationCode: '',
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 이름
  const [usernameError, setUsernameError] = useState('');
  // 전화번호
  const [phoneNumberError, setPhoneNumberError] = useState('');
  // 이메일
  const [emailError, setEmailError] = useState('');
  const [emailInfoMessage, setEmailInfoMessage] = useState(''); // 가입 가/불 메시지
  // 인증번호
  const [verificationBtnText, setVerificationBtnText] = useState('인증번호 발송');
  const [verificationBtnType, setVerificationBtnType] = useState('main');
  const [confirmBtnText, setConfirmBtnText] = useState('확인');
  const [confirmBtnType, setConfirmBtnType] = useState('main');
  const [returnCode, setReturnCode] = useState('0000000'); // 7자로 설정하여 못 뚫게 함

  // 계정 존재 여부
  const [isExisted, setIsExisted] = useState(false);

  // 인증 완료 여부
  const [isVerified, setIsVerified] = useState(false);

  // 전화번호 유효성 검사(두 필드를 한 번에 검사하기 위함)
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

  // 유효성 검사
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 이름 필드
    if (name === 'username') {
      const usernameRegex = /^[a-zA-Z가-힣]*$/;
      // 한 글자는 입력 불가
      if (!usernameRegex.test(value) || value.length === 1) {
        setUsernameError('2~20자 내 한글/영문만 입력하세요.');
      } else {
        setUsernameError('');
      }
      if (value.length > 20) {
        return; // 20자를 초과할 경우 입력을 막음
      }
    }

    // 전화번호 두 번째와 세 번째 필드에 대해 숫자만 입력 가능 및 4자리로 제한
    if (name === 'phonePart2' || name === 'phonePart3') {
      const phoneNumberRegex = /^\d*$/;
      if (!phoneNumberRegex.test(value)) {
        return;
      }
      if (value.length > 4) {
        return;
      }
    }

    // 이메일 필드
    if (name === 'email') {
      // 인증번호가 보내진 상태에서 수정을 가했다면 초기화
      if (verificationBtnType === 'sub') {
        setIsVerified(false); // 인증 상태 초기화
        setVerificationBtnText('인증번호 발송'); // 인증번호 전송 버튼 텍스트 초기화
        setVerificationBtnType('main'); // 인증번호 전송 버튼 타입 초기화
        setConfirmBtnText('확인'); // 인증번호 확인 버튼 텍스트 초기화
        setConfirmBtnType('main'); // 인증번호 확인 버튼 초기화
        setEmailInfoMessage(''); // 이메일 가/불 안내 메시지 초기화
      }
      // 이메일 유효성 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value) && value.length > 0) {
        setEmailError('유효한 이메일 주소를 입력하세요.');
      } else {
        setEmailError('');
      }
    }

    // 이메일 인증번호 필드
    if (name === 'verificationCode') {
      // 전송 버튼이 안 보내졌거나 6자 이상은 입력 불가
      if (verificationBtnType === 'main' || value.length > 6) {
        return;
      }
    }

    setData({
      ...data,
      [name]: value,
    });
  };

  // 이메일 전송 버튼 로직(기존 이메일과 중복 확인하는 작업 필요)
  const handleSendVerificationCode = async () => {
    // 이메일 필드 조건 충족한 경우
    if (emailError === '' && data.email !== '') {
      const param = {
        email: data.email,
        name: data.username,
        phone: '010' + data.phonePart2 + data.phonePart3,
      };
      await findPwAuth(
        param,
        (resp) => {
          alert('인증번호가 발송되었습니다.');
          setReturnCode('000000'); // 인증번호 설정
          setVerificationBtnText('재전송'); // 버튼명 변경
          setVerificationBtnType('sub'); // 버튼 타입변경
          setConfirmBtnText('확인'); // 확인 필드에 대해서도 변경
          setConfirmBtnType('main');
          setIsVerified(false); // 인증여부 초기화
          setEmailInfoMessage('');
        },
        (error) => {
          setEmailInfoMessage('가입 정보가 없습니다. 다시 확인해주세요.');
        },
      );
      if (true) {
        // 가입 이력이 있는 이메일인 경우 인증번호 발송
        // alert('인증번호가 발송되었습니다.');
        // setReturnCode('000000'); // 인증번호 설정
        // setVerificationBtnText('재전송'); // 버튼명 변경
        // setVerificationBtnType('sub'); // 버튼 타입변경
        // setConfirmBtnText('확인'); // 확인 필드에 대해서도 변경
        // setConfirmBtnType('main');
        // setIsVerified(false); // 인증여부 초기화
        // setEmailInfoMessage('');
      } else {
        // 가입 이력이 없는 이메일인 경우
        // setEmailInfoMessage('가입 정보가 없습니다. 다시 확인해주세요.');
      }
    } else {
      // 이메일 필드 조건을 미충족한 경우
      // 정상 이메일이 아니면 이메일 확인
      alert('조건에 맞는 이메일을 먼저 입력해 주세요.');
    }
  };

  // 이메일 인증 확인 로직
  const handleCheckVerificationCode = async () => {
    const { verificationCode } = data;
    // 인증완료시 비활성화
    if (!isVerified) {
      // 인증번호 6자를 안 누르고 확인 누를 경우 인증번호 6자를 정확하게 입력해주세요 알림창 띄움
      if (data.verificationCode.length !== 6) {
        alert('인증번호 6자를 정확하게 입력해주세요.');
      } else {
        // 6자 누른 경우
        const param = {
          email: data.email,
          authCode: parseInt(data.verificationCode),
        };
        await findPwAuthCheck(
          param,
          (resp) => {
            alert('인증번호가 확인되었습니다.');
            setConfirmBtnText('인증완료');
            setConfirmBtnType('sub');
            setIsVerified(true);
          },
          (error) => {
            alert('인증번호가 틀립니다.');
          },
        );
        if (verificationCode === returnCode) {
          // alert('인증번호가 확인되었습니다.');
          // setConfirmBtnText('인증완료');
          // setConfirmBtnType('sub');
          // setIsVerified(true);
        } else {
          // alert('인증번호가 틀립니다.');
        }
      }
    }
  };

  const handleSubmit = () => {
    // 제출 로직 작성
    if (
      isVerified &&
      phoneNumberError === '' &&
      data.phonePart2.length !== 0 &&
      data.username.length !== 0 &&
      usernameError === ''
    ) {
      // alert('비밀번호 변경 페이지로 이동합니다.');
      dispatch(pageActions.toogleIsPw(true));
      navigate('/find/password', { state: { email: data.email } });
    } else {
      alert('입력값을 다시한번 확인해주세요.');
    }
  };

  const handlePrevious = () => {
    navigate('/login');
  };

  return (
    <s.Container>
      <Header text="비밀번호 찾기" />
      <s.BinArea></s.BinArea>
      <s.FindPasswordArea>
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
          <s.PhoneArea>
            <PhoneNumberInput phonePart2={data.phonePart2} phonePart3={data.phonePart3} onChange={handleChangeValue} />
          </s.PhoneArea>
          <EmailArea
            email={data.email}
            verificationCode={data.verificationCode}
            emailError={emailError}
            verificationBtnText={verificationBtnText}
            verificationBtnType={verificationBtnType}
            confirmBtnText={confirmBtnText}
            confirmBtnType={confirmBtnType}
            onChange={handleChangeValue}
            onSendVerificationCode={handleSendVerificationCode}
            onCheckVerificationCode={handleCheckVerificationCode}
            emailInfoMessage={emailInfoMessage}
          />
        </s.InfoArea>
        <s.BtnArea>
          <Button width="48%" height="40px" children="이전" onClick={handlePrevious} />
          <Button width="48%" height="40px" type="main" children="비밀번호 변경" onClick={handleSubmit} />
        </s.BtnArea>
      </s.FindPasswordArea>
    </s.Container>
  );
};

export default FindPasswordPage;
