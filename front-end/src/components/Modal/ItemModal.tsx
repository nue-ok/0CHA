import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

import Button from '../Common/Button';
import Header from '../Common/Header';
import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import { ReactComponent as likeOn } from '../../asset/img/svg/likeOn.svg';
import { ReactComponent as likeOff } from '../../asset/img/svg/likeOff.svg';

import { useNavigate } from 'react-router';
import { SnsItemDetail, SnsItemLike, SnsItemLikeCancel, SnsItemDel, SnsItemSell } from '../../lib/api/sns-api';
import testImg from '../../asset/img/testImg.png';
import ImageCarousel from '../SNS/ImageCarousel';

const s = {
  Container: styled.section`
    padding-top: 57px;
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow-y: auto;
  `,
  Header: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  `,
  SellerInfo: styled.div`
    height: 70px;
    display: flex;
    align-items: center;
    padding: 0 20px;
  `,
  SellerName: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 7px;
  `,
  SellerInfoContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  CreatedAt: styled.div`
    color: ${(props) => props.theme.textColor2};
    font-size: 12px;
    font-weight: 400;
  `,
  LikeCnt: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    font-weight: 500;
    margin-left: 7px;
  `,
  SellerNameArea: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  `,
  LikeArea: styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
  `,
  ButtonArea: styled.div`
    display: flex;
    margin-left: auto;
  `,
  ItemTitleArea: styled.div`
    margin: 20px 0;
    padding: 0 20px;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  ItemName: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    font-weight: 500;
  `,
  ItemPrice: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
    font-weight: 700;
  `,
  Horizon: styled.hr`
    margin: 0 20px;
    border-color: ${(props) => props.theme.subColor};
  `,
  ItemContent: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    padding: 0 20px;
    margin: 20px 0;
  `,
  ActionButtons: styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
    gap: 10px;
  `,
  ItemStatus: styled.div<{ available: string }>`
    color: ${(props) => (props.available === 'true' ? props.theme.mainColor : props.theme.textColor2)};
    width: 90%;
    margin: 0 auto;
    font-size: 14px;
    font-weight: 600;
    text-align: right;
  `,
};

interface Item {
  id: number;
  images: string[];
  title: string;
  price: string;
  isSold: boolean;
  likeCount: number;
  isLike: number;
  nickname: string;
  content: string;
  userId: number;
  createdAt: string;
  profileImage: string;
}

interface MarketModalProps {
  open: boolean;
  onModal: Function;
  itemId: number | null;
  onDelete: () => void;
  onItemUpdate: (updatedItem: Item) => void;
}

const ItemModal = (props: MarketModalProps): JSX.Element => {
  const { itemId, open, onModal, onDelete, onItemUpdate } = props;
  const [item, setItem] = useState<Item | null>(null);
  const [like, setLike] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [userId, setUserId] = useState<number | null>(null);
  const [relativeTime, setRelativeTime] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userTmp = JSON.parse(userStr);
      setUserId(userTmp.id);
    }
  }, []);

  // 상세 정보를 불러오는 함수
  const getItemDetail = async () => {
    if (itemId) {
      await SnsItemDetail(
        itemId,
        (resp) => {
          setItem(resp.data);
          setLike(resp.data.isLike);
          setLikeCount(resp.data.likeCount);
          calculateRelativeTime(resp.data.createdAt);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  const calculateRelativeTime = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffInSeconds = 9 * 3600 + (now.getTime() - createdDate.getTime()) / 1000;
    if (diffInSeconds < 60) {
      setRelativeTime('방금 전');
    } else if (diffInSeconds < 3600) {
      setRelativeTime(`${Math.floor(diffInSeconds / 60)}분 전`);
    } else if (diffInSeconds < 86400) {
      setRelativeTime(`${Math.floor(diffInSeconds / 3600)}시간 전`);
    } else if (diffInSeconds < 2592000) {
      setRelativeTime(`${Math.floor(diffInSeconds / 86400)}일 전`);
    } else if (diffInSeconds < 31104000) {
      setRelativeTime(`${Math.floor(diffInSeconds / 2592000)}개월 전`);
    } else {
      setRelativeTime(`${Math.floor(diffInSeconds / 31104000)}년 전`);
    }
  };

  // 좋아요
  const handleLike = async () => {
    if (item) {
      if (like) {
        await SnsItemLikeCancel(
          item.id,
          (resp) => {
            const updatedItem = { ...item, isLike: 0, likeCount: likeCount - 1 };
            setLike(0);
            setLikeCount(likeCount - 1);
            setItem(updatedItem);
            onItemUpdate(updatedItem); // 변경된 좋아요 상태를 부모 컴포넌트로 전달
          },
          (error) => {
            console.log(error);
          },
        );
      } else {
        await SnsItemLike(
          item.id,
          (resp) => {
            const updatedItem = { ...item, isLike: 1, likeCount: likeCount + 1 };
            setLike(1);
            setLikeCount(likeCount + 1);
            setItem(updatedItem);
            onItemUpdate(updatedItem); // 변경된 좋아요 상태를 부모 컴포넌트로 전달
          },
          (error) => {
            console.log(error);
          },
        );
      }
    }
  };
  // 마운트시 실행될 함수
  useEffect(() => {
    if (open && itemId) {
      getItemDetail();
    }
  }, [open, itemId]);

  const handleMovePage = (): void => {
    onModal();
    if (item?.userId === userId) {
      // 사용자가 판매자인 경우
      navigate('/sns/chat');
    } else {
      // 사용자가 구매자인 경우
      navigate(`/sns/chat/${item?.userId}`);
    }
  };
  // 게시글 수정
  const handleUpdate = () => {
    if (item) {
      navigate(`/sns/market/update/${item.id}`, { state: { item } });
    }
  };
  // 게시글 삭제
  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      if (itemId) {
        await SnsItemDel(
          itemId,
          (resp) => {
            onDelete();
            navigate('/sns/market');
          },
          (err) => {
            console.log(err);
          },
        );
      }
    } else {
      return;
    }
  };

  const handleStatusChange = async () => {
    if (item && !item.isSold) {
      if (window.confirm('판매완료로 전환하면 다시 판매 중으로 바꿀 수 없습니다. 판매완료가 맞습니까?')) {
        const newStatus = true;
        await SnsItemSell(
          item.id,
          (resp) => {
            const updatedItem = { ...item, isSold: newStatus };
            setItem(updatedItem);
            onItemUpdate(updatedItem);
          },
          (error) => {
            console.log(error);
          },
        );
      }
    }
  };

  // 프로필 페이지로 이동하는 함수
  const handleMoveProfilePage = (): void => {
    onModal();
    if (item?.userId) {
      navigate(`/sns/profile/${item?.userId}`);
    }
  };

  return (
    <ReactModal
      isOpen={open}
      ariaHideApp={false}
      onRequestClose={() => onModal()}
      className="marketModal"
      overlayClassName="Overlay"
    >
      <s.Header>
        <Header text="거래글 상세" onBack={onModal} />
      </s.Header>
      <s.Container>
        {/* 이미지 캐러셀 추가 */}
        {item?.images && item.images.length > 0 ? (
          <ImageCarousel images={item.images} />
        ) : (
          <Image width="100%" height="auto" src={testImg} type="rect" />
        )}
        {/* 1. images배열의 image들이 들어가야 할 부분 */}
        <s.SellerInfo>
          <s.SellerInfoContainer onClick={handleMoveProfilePage}>
            {item?.profileImage && (
              <Image
                width="34px"
                height="34px"
                src={'https://i11b310.p.ssafy.io/images/' + item?.profileImage.split('/home/ubuntu/images/')[1]}
              />
            )}
            {!item?.profileImage && <Image width="34px" height="34px" src={testImg} />}
            <s.SellerNameArea>
              <s.SellerName>{item?.nickname}</s.SellerName>
              <s.CreatedAt>{relativeTime}</s.CreatedAt>
            </s.SellerNameArea>
          </s.SellerInfoContainer>
          <s.ButtonArea>
            <s.LikeArea onClick={handleLike}>
              <IconSvg width="23" height="23" Ico={like ? likeOn : likeOff} />
              <s.LikeCnt>{likeCount}</s.LikeCnt>
            </s.LikeArea>
            <Button
              width="80px"
              height="30px"
              children="채팅하기"
              type="main"
              size="14px"
              bold="500"
              onClick={handleMovePage}
            />
          </s.ButtonArea>
        </s.SellerInfo>
        <s.ItemStatus available={(!item?.isSold).toString()}>{item?.isSold ? '판매완료' : '판매중'}</s.ItemStatus>
        <s.ItemTitleArea>
          <s.ItemName>{item?.title}</s.ItemName>
          <s.ItemPrice>{Number(item?.price).toLocaleString()}원</s.ItemPrice>
        </s.ItemTitleArea>
        <s.Horizon />
        <s.ItemContent>{item?.content}</s.ItemContent>
        {item?.userId === userId && (
          <s.ActionButtons>
            {!item.isSold && (
              <Button
                width="60px"
                height="30px"
                children="수정"
                type="main"
                size="14px"
                bold="500"
                onClick={handleUpdate}
              />
            )}
            <Button
              width="60px"
              height="30px"
              children="삭제"
              type="danger"
              size="14px"
              bold="500"
              onClick={handleDelete}
            />
            {!item.isSold && (
              <Button
                width="80px"
                height="30px"
                children="판매완료"
                type="main"
                size="14px"
                bold="500"
                onClick={handleStatusChange}
              />
            )}
          </s.ActionButtons>
        )}
      </s.Container>
    </ReactModal>
  );
};

export default ItemModal;
