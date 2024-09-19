import React, { MouseEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';

import IconSvg from '../Common/IconSvg';
import { ReactComponent as likeOn } from '../../asset/img/svg/likeOn.svg';
import { ReactComponent as likeOff } from '../../asset/img/svg/likeOff.svg';

import { SnsFeedLike } from '../../lib/api/sns-api';
import { SnsFeedLikeCancel } from '../../lib/api/sns-api';


const s = {
  FeedCaption: styled.span<FeedCaptionProps>`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    margin-left: 8px;
    margin-right: 15px;
    display: ${(props) => (props.$likechange === 0 ? 'inline' : 'none')};
  `,
  FeedCaptionplus: styled.span<FeedCaptionProps>`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    margin-left: 8px;
    margin-right: 15px;
    display: ${(props) => (props.$likechange === 1 ? 'inline' : 'none')};
  `,
  FeedCaptionminus: styled.span<FeedCaptionProps>`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    margin-left: 8px;
    margin-right: 15px;
    display: ${(props) => (props.$likechange === -1 ? 'inline' : 'none')};
  `,
  IconChangeDefault: styled.span<FeedCaptionProps>`
    display: ${(props) => (props.$likechange === 0 ? 'inline' : 'none')};
  `,
  IconChangeFill: styled.span<FeedCaptionProps>`
    display: ${(props) => (props.$likechange === 1 ? 'inline' : 'none')};
  `,
  IconChangeEmpty: styled.span<FeedCaptionProps>`
    display: ${(props) => (props.$likechange === -1 ? 'inline' : 'none')};
  `,
  IconArea: styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
  `,
};

interface LikeIconProps {
  feedId: number;
  isLike: number;
  likeCount: number;
}

interface FeedCaptionProps {
  $likechange?: number;
}

const LikeIcon: React.FC<LikeIconProps> = ({feedId, isLike, likeCount}) => {
  const [itemIsLike, setItemIsLike] = useState(isLike)
  const [itemLikeCount, setItemLikeCount] = useState(likeCount);
  const [likeChange, setLikeChange] = useState(0);

  const likeClick = async () => {
    if (itemIsLike) {
      await SnsFeedLikeCancel(
        feedId,
        (resp) => {
          setItemIsLike(0)
          setItemLikeCount((prevCount) => prevCount - 1);
          if (likeChange === 0) {
            setLikeChange(-1);
          } else if (likeChange === 1) {
            setLikeChange(0);
          }
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      await SnsFeedLike(
        feedId,
        (resp) => {
          setItemIsLike(1);
          setItemLikeCount((prevCount) => prevCount + 1);
          if (likeChange === 0) {
            setLikeChange(1);
          } else if (likeChange === -1) {
            setLikeChange(0);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
  

  return (
    <s.IconArea key={feedId}>

      <s.IconChangeDefault $likechange={likeChange}>
        {isLike === 1 ? (
          <IconSvg
            width="25"
            height="25"
            color="#ffffff"
            Ico={likeOn}
            onClick={likeClick}
          />
        ) : (
          <IconSvg
            width="25"
            height="25"
            color="#ffffff"
            Ico={likeOff}
            onClick={likeClick}
          />
        )}
      </s.IconChangeDefault>
      <s.IconChangeFill $likechange={likeChange}>
        <IconSvg
          width="25"
          height="25"
          color="#ffffff"
          Ico={likeOn}
          onClick={likeClick}
        />
      </s.IconChangeFill>
      <s.IconChangeEmpty $likechange={likeChange}>
        <IconSvg
          width="25"
          height="25"
          color="#ffffff"
          Ico={likeOff}
          onClick={likeClick}
        />
      </s.IconChangeEmpty>

      <s.FeedCaptionplus $likechange={likeChange} >{likeCount+1}</s.FeedCaptionplus>
      <s.FeedCaption $likechange={likeChange} >{likeCount}</s.FeedCaption>
      <s.FeedCaptionminus $likechange={likeChange} >{likeCount-1}</s.FeedCaptionminus>
    </s.IconArea>
  );
};

export default LikeIcon;