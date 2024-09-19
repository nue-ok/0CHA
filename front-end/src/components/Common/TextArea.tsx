import React from 'react';
import styled from 'styled-components';

const s = {
  TextArea: styled.textarea<TextAreaProps>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.theme.subColor};
    color: ${(props) => props.theme.textColor};
    font-weight: ${(props) => props.bold || '500'};
    font-size: ${(props) => props.size || '14px'};
    display: ${(props) => props.display};
    margin: ${(props) => props.margin};
    outline: none;
    border-radius: 10px;
    border: none;
    resize: none;
    padding: 10px;
    &::placeholder {
      color: ${({ placeColor, theme }) => (placeColor ? theme[placeColor] : theme['textColor2'])};
    }
  `,
};

interface TextAreaProps {
  width?: string;
  height?: string;
  placeholder?: string;
  display?: string;
  margin?: string;
  onclick?: Function;
  onChange?: Function;
  onKeyPress?: Function;
  bold?: string;
  placeColor?: string;
  size?: string;
  value?: string;
}

const TextArea = (props: TextAreaProps): JSX.Element => {
  return <s.TextArea {...props} />;
};
export default TextArea;
