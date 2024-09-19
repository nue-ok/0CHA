import React, { MouseEventHandler, useState, useEffect } from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import { ReactComponent as likeOn } from '../../asset/img/svg/likeOn.svg';
import { ReactComponent as likeOff } from '../../asset/img/svg/likeOff.svg';

import { SnsItemLike, SnsItemLikeCancel } from '../../lib/api/sns-api';
import testImg from '../../asset/img/testImg.png';

const s = {
  Container: styled.section`
    height: 70px;
    min-width: 250px;
    display: flex;
    padding: 0 15px;
    margin: 20px 0;
    cursor: pointer;
  `,
  ItemName: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    font-weight: 600;
  `,
  ItemPrice: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    align-items: center;
  `,
  Available: styled.div`
    color: ${(props) => props.theme.mainColor};
    font-size: 12px;
    font-weight: 600;
  `,
  Unavailable: styled.div`
    color: ${(props) => props.theme.textColor2};
    font-size: 12px;
    font-weight: 600;
  `,
  ItemLike: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    font-weight: 500;
    margin-left: 10px;
  `,
  ItemInfoArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
  `,
  ItemTopArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `,
  ItemBottomArea: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  ItemLikeArea: styled.div`
    display: flex;
    align-items: center;
  `,
  Horizon: styled.hr`
    margin: 0 15px;
    min-width: 250px;
    border-color: ${(props) => props.theme.subColor};
  `,
  ItemImage: styled.div`
    width: 70px;
    height: 70px;
    min-width: 70px;
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
};

interface MarketItemProps {
  itemId: number; // 상품 id
  itemImage: string; // 상품 이미지 url
  itemName: string; // 상품명
  itemPrice: string; // 가격
  isOnSale: boolean; // 판매중여부
  itemLike: number; // 좋아요 수
  isLike: number; // 내가 좋아요 했는지
  onClick: MouseEventHandler<HTMLElement>;
}

const MarketItem = (props: MarketItemProps): JSX.Element => {
  const { itemId, itemImage, itemName, itemPrice, isOnSale, itemLike, isLike, onClick } = props;
  const [like, setLike] = useState(props.isLike);
  const [likeCount, setLikeCount] = useState(itemLike); // 좋아요 수 상태 추가

  const handleLike = async (id: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); // 부모 요소로의 이벤트 버블링을 막음
    if (like) {
      // 이미 좋아요인 경우
      await SnsItemLikeCancel(
        id,
        (resp) => {
          setLike(0);
          setLikeCount(likeCount - 1);
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
      // 좋아요가 아닌 경우
      await SnsItemLike(
        id,
        (resp) => {
          setLike(1);
          setLikeCount(likeCount + 1); // 좋아요 수 업데이트
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  useEffect(() => {
    setLike(isLike);
    setLikeCount(itemLike);
  }, [isLike, itemLike]);

  const basicUrl = 'https://i11b310.p.ssafy.io/images/';

  // 이미지 경로를 파싱하여 basicUrl과 결합하는 함수
  const getParsedImageUrl = (imagePath: string) => {
    if (imagePath) {
      const relativePath = imagePath.split('/home/ubuntu/images/')[1];
      return basicUrl + relativePath;
    } else {
      return testImg;
    }
  };

  return (
    <s.Container>
      {/* <Image width="70px" height="70px" src={itemImage} type="rect" /> */}
      <s.ItemImage>
        <Image width="70px" height="70px" src={getParsedImageUrl(itemImage)} type="rect" />
      </s.ItemImage>
      <s.ItemInfoArea>
        <s.ItemTopArea onClick={onClick}>
          <s.ItemName>{itemName}</s.ItemName>
          {isOnSale === true ? <s.Available>판매중</s.Available> : <s.Unavailable>판매완료 </s.Unavailable>}
        </s.ItemTopArea>
        <s.ItemBottomArea>
          <s.ItemPrice>{Number(itemPrice).toLocaleString()}원</s.ItemPrice>
          <s.ItemLikeArea onClick={(event) => handleLike(itemId, event)}>
            {like === 1 ? (
              <IconSvg width="23" height="23" Ico={likeOn} />
            ) : (
              <IconSvg width="23" height="23" Ico={likeOff} />
            )}
            <s.ItemLike>{likeCount}</s.ItemLike>
          </s.ItemLikeArea>
        </s.ItemBottomArea>
      </s.ItemInfoArea>
    </s.Container>
  );
};

export default MarketItem;
