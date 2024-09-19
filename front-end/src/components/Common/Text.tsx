import React from 'react';
import styled from 'styled-components';

const s = {
  Text: styled.span<identification>`
    width: ${(props) => props.width};
    font-weight: 900;
    font-size: ${(props) => props.size || '14px'};
    border-radius: 10px;
    font-weight: ${(props) => props.bold || '500'};
    cursor: ${(props) => props.cursor || 'default'};
    color: ${({ color, theme }) => (color ? theme[color] : theme['textColor'])};
    display: ${(props) => props.display};
    margin: ${(props) => props.margin};
    text-align: ${(props) => props.textalian};
  `,
};

interface identification {
  width?: string;
  size?: string;
  cursor?: string;
  type?: string;
  onClick?: Function;
  children: React.ReactNode;
  display?: string;
  margin?: string;
  bold?: string;
  color?: string;
  textalian?: string;
}
const Text = (props: identification): JSX.Element => {
  return <s.Text {...props}>{props.children}</s.Text>;
};

export default Text;
