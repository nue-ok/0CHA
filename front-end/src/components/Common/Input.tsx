import React from 'react';
import styled from 'styled-components';

const s = {
  input: styled.input<InputProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.theme.subColor};
    color: ${(props) => props.theme.textColor};
    font-weight: ${(props) => props.bold || '500'};
    size: ${(props) => props.size || '14px'};
    display: ${(props) => props.display};
    margin: ${(props) => props.margin};
    text-align: ${(props) => props.textalian};
    &::placeholder {
      color: ${({ placeColor, theme }) => (placeColor ? theme[placeColor] : theme['textColor2'])};
    }
  `,
};

interface InputProps {
  width?: string;
  height?: string;
  placeholder?: string;
  margin?: string;
  size?: string;
  type?: string;
  name?: string;
  value?: string;
  display?: string;
  onChange?: Function;
  onClick?: Function;
  onKeyPress?: Function;
  placeColor?: string;
  bold?: string;
  textalian?: string;
}
const Input = (props: InputProps): JSX.Element => {
  return <s.input {...props} />;
};

export default Input;
