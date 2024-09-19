import React from 'react';
import styled from 'styled-components';
import Input from '../../components/Common/Input';

const s = {
  PhoneNumberContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,

  FixedPhoneNumber: styled.div`
    width: 30%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.subColor};
    border: 1px solid ${(props) => props.theme.bgColor};
    border-radius: 8px;
    font-size: 14px;
  `,

  BetweenText: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  `,
};

interface PhoneNumberInputProps {
  phonePart2: string;
  phonePart3: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ phonePart2, phonePart3, onChange }) => (
  <s.PhoneNumberContainer>
    <s.FixedPhoneNumber children="010" />
    <s.BetweenText children="-" />
    <Input
      height="40px"
      width="30%"
      type="text"
      name="phonePart2"
      placeholder="앞 4자리"
      value={phonePart2}
      onChange={onChange}
      textalian="center"
    />
    <s.BetweenText children="-" />
    <Input
      height="40px"
      width="30%"
      type="text"
      name="phonePart3"
      placeholder="뒤 4자리"
      value={phonePart3}
      onChange={onChange}
      textalian="center"
    />
  </s.PhoneNumberContainer>
);

export default PhoneNumberInput;
