import React from 'react';
import styled from 'styled-components';
import Text from '../../Common/Text';

const s = {
  Container: styled.div`
    width: 47%;
    height: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  ResultLabel: styled.label`
    width: 35%;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.textColor};
  `,

  InputArea: styled.div`
    width: 65%;
    display: flex;
    justify-content: end;
    align-items: center;
  `,

  ResultInput: styled.input`
    width: 70%;
    max-width: 80px;
    text-align: right;
    background-color: ${(props) => props.theme.bgColor};
    font-size: 18px;
    font-weight: 500;
    border: 1px solid ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.textColor};
    &:focus {
      outline: 1px solid ${(props) => props.theme.mainColor};
      border: none;
    }
  `,
};

interface InBodyResultProps {
  id?: string;
  title?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit?: string;
  value?: number;
}

const RecordInbodyInput = (props: InBodyResultProps): JSX.Element => {
  return (
    <s.Container>
      <s.ResultLabel htmlFor={props.id}>{props.title}</s.ResultLabel>
      <s.InputArea>
        <s.ResultInput id={props.id} name={props.id} value={props.value} onChange={props.onChange} />
        <Text width="30%" size="16px" bold="500" color="textColor" children={props.unit} textalian="center" />
      </s.InputArea>
    </s.Container>
  );
};

export default RecordInbodyInput;
