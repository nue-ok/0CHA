import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import BottomNav from '../../../components/Common/BottomNav';
import Header from '../../../components/Common/Header';
import TextArea from '../../../components/Common/TextArea';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import IconSvg from '../../../components/Common/IconSvg';
import Image from '../../../components/Common/Image';
import { ReactComponent as camera } from '../../../asset/img/svg/camera.svg';

import { useNavigate } from 'react-router';
import { SnsItemWrite } from '../../../lib/api/sns-api';

const s = {
  ImageText: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
  `,
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
    padding-top: 57px;
    padding-bottom: 68px;
  `,
  InputArea: styled.div`
    width: 100%;
    height: 350px;
    padding: 0 25px;
    margin: 40px 0 80px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  InputLabel: styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    font-weight: 500;
    margin-left: 10px;
  `,
  ImageUploadArea: styled.div`
    display: flex;
    height: 110px;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  `,
  ImageOutBox: styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  `,
  ImageArea: styled.div`
    width: 90%;
    display: flex;
    justify-content: left;
    margin: 0 auto;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  `,
  ImageWrapper: styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 8px;
    margin-top: 16px;
  `,
  DeleteButton: styled.button`
    background-color: ${(props) => props.theme.subColor};
    border: none;
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    padding: 2px 4px;
    position: absolute;
    top: -8px;
    right: -8px;
    cursor: pointer;
  `,
  Button: styled.div`
    display: flex;
    width: 100%;
    max-width: 800px;
    padding: 0 25px;
    position: fixed;
    bottom: 88px;
  `,
  MainImageArea: styled.div`
    position: relative;
  `,
  MainImageCaption: styled.div`
    color: ${(props) => props.theme.btnTextColor};
    display: flex;
    font-size: 12px;
    font-weight: 500;
    justify-content: center;
    align-items: center;
    width: 64px;
    height: 20px;
    background-color: #ccff33aa;
    position: absolute;
    top: 44px;
  `,
  MainImage: styled(Image)``,
  ImageSizeInfo: styled.div`
    position: absolute;
    bottom: -8px;
    right: -8px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-size: 10px;
    padding: 2px 4px;
    border-radius: 4px;
  `,
};

// 바이트 길이 계산 함수
const getByteLength = (str: string) => new Blob([str]).size;

const UploadItemPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]); // 파일 배열로 변경
  const [totalImageSize, setTotalImageSize] = useState<number>(0); // 총 이미지 용량 상태 추가

  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFilesArray = Array.from(event.target.files);
      const validFiles = newFilesArray.filter((file) => file.size <= 5 * 1024 * 1024); // 5MB 이하의 파일만 추가

      if (validFiles.length < newFilesArray.length) {
        alert('각 이미지 파일 크기는 5MB를 초과할 수 없습니다.');
      }

      setImages((prevImages) => [...prevImages, ...validFiles].slice(0, 5)); // 최대 5개까지
      const newTotalSize = validFiles.reduce((acc, file) => acc + file.size, totalImageSize);
      setTotalImageSize(newTotalSize); // 총 이미지 용량 업데이트
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 작성완료
  const handleMovePage = async () => {
    if (!title.trim()) {
      alert('제목을 작성해 주세요.');
      return;
    } else if (!price) {
      alert('가격을 입력해 주세요.');
      return;
    } else if (!content.trim()) {
      alert('내용을 입력해 주세요.');
      return;
    } else if (images.length === 0) {
      alert('이미지를 한 장 이상 입력해 주세요');
      return;
    }

    const formData = new FormData();
    const itemData = {
      title: title,
      price: parseInt(price),
      content: content,
    };

    // ItemDto 데이터를 JSON 형태로 변환하고 formData에 추가
    formData.append('item', new Blob([JSON.stringify(itemData)], { type: 'application/json' }));

    images.forEach((image) => {
      formData.append('images', image);
    });

    await SnsItemWrite(
      formData,
      (resp) => {
        navigate('/sns');
      },
      (err) => {
        formData.forEach((value, key) => {});
      },
    );
  };

  // 제목 유효성
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (getByteLength(value) <= 50) {
      setTitle(value);
    }
  };
  // 내용 유효성
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (getByteLength(value) <= 1000) {
      setContent(value);
    }
  };
  // 가격 유효성
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredValue = value.replace(/[^0-9]/g, ''); // 숫자만 입력되도록 필터링
    // 2의 31승보다 작은 가격만 설정 가능
    const maxPrice = 2 ** 31 - 1;
    if (parseInt(filteredValue) > maxPrice) {
      setPrice(maxPrice.toString());
      alert(`가격은 ${maxPrice.toLocaleString()}원까지만 입력 가능합니다. `);
    } else {
      setPrice(filteredValue);
    }
  };
  // 이미지 삭제
  const handleDeleteImage = (index: number) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      const deletedImageSize = prevImages[index].size;
      setTotalImageSize(totalImageSize - deletedImageSize);
      return updatedImages;
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <>
      <Header text="판매하기" />
      <s.Container>
        <s.ImageUploadArea onClick={handleUploadClick}>
          <IconSvg width="50" height="50" Ico={camera} color="#ffffff" />
          <s.ImageText>{images.length}/5</s.ImageText>
        </s.ImageUploadArea>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <s.ImageOutBox>
          <s.ImageArea>
            {images.map((image, index) => (
              <s.ImageWrapper key={index}>
                <Image width="64px" height="64px" src={URL.createObjectURL(image)} type="rect" />
                {index === 0 && <s.MainImageCaption>대표</s.MainImageCaption>}
                <s.DeleteButton onClick={() => handleDeleteImage(index)}>X</s.DeleteButton>
                <s.ImageSizeInfo>{formatBytes(image.size)}</s.ImageSizeInfo>
              </s.ImageWrapper>
            ))}
          </s.ImageArea>
        </s.ImageOutBox>
        <s.InputArea>
          <s.InputLabel>제목</s.InputLabel>
          <Input width="100%" height="40px" value={title} onChange={handleTitleChange} />
          <s.InputLabel>가격</s.InputLabel>
          <Input width="100%" height="40px" value={price} onChange={handlePriceChange} />
          <s.InputLabel>상품 설명 </s.InputLabel>
          <TextArea width="100%" height="180px" value={content} onChange={handleContentChange} />
        </s.InputArea>
        <s.Button>
          <Button
            width="100%"
            height="40px"
            size="14px"
            type="main"
            bold="500"
            children="작성완료"
            onClick={handleMovePage}
          />
        </s.Button>
      </s.Container>
      <BottomNav />
    </>
  );
};

export default UploadItemPage;
