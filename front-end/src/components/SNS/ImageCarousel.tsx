import React, { useState } from 'react';
import styled from 'styled-components';
import testImg from '../../asset/img/testImg.png'; // 테스트용 이미지

interface CarouselWrapperProps {
  translatex: number;
}

const s = {
  CarouselContainer: styled.div`
    position: relative;
    width: 100%;
    overflow: hidden;
  `,
  CarouselWrapper: styled.div<CarouselWrapperProps>`
    display: flex;
    transform: ${(props) => `translatex(${props.translatex}%)`};
    transition: transform 0.5s ease-in-out;
  `,
  ImageContainer: styled.div`
    min-width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Image: styled.img`
    width: 100%;
    height: auto;
    color: ${(props) => props.theme.textColor};
  `,
  ButtonLeft: styled.button`
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  `,
  ButtonRight: styled.button`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  `,
};

interface CarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const basicUrl = 'https://i11b310.p.ssafy.io/images/';

  // 이미지 경로를 파싱하여 basicUrl과 결합하는 함수
  const getParsedImageUrl = (imagePath: string) => {
    const relativePath = imagePath.split('/home/ubuntu/images/')[1];
    return basicUrl + relativePath;
  };

  return (
    <s.CarouselContainer>
      <s.CarouselWrapper translatex={-currentIndex * 100}>
        {images.map((img, index) => (
          <s.ImageContainer key={index}>
            <s.Image src={getParsedImageUrl(img)} alt="이미지가 안 떠요" />
          </s.ImageContainer>
        ))}
      </s.CarouselWrapper>
      <s.ButtonLeft onClick={handlePrevClick}>{'<'}</s.ButtonLeft>
      <s.ButtonRight onClick={handleNextClick}>{'>'}</s.ButtonRight>
    </s.CarouselContainer>
  );
};

export default ImageCarousel;
