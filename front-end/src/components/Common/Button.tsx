import React from 'react';
import styled from 'styled-components';

const btn = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-weight: ${(props) => props.bold};
  font-size: ${(props) => props.size};
  border-radius: 10px;
  margin: ${(props) => props.margin};
  display: ${(props) => props.display};
`;
const s = {
  Mainbutton: styled(btn)`
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.btnTextColor};
  `,
  Subbutton: styled(btn)`
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.mainColor};
    border: 1px solid ${(props) => props.theme.mainColor};
  `,
};

interface ButtonProps {
  width?: string;
  height?: string;
  size?: string;
  margin?: string;
  type?: string;
  bold?: string;
  display?: string;
  onClick?: Function;
  children: React.ReactNode;
}
const Button = (props: ButtonProps): JSX.Element => {
  return (
    <>
      {props.type === 'main' ? (
        <s.Mainbutton {...props}>{props.children}</s.Mainbutton>
      ) : (
        <s.Subbutton {...props}>{props.children}</s.Subbutton>
      )}
    </>
  );
};

export default Button;
