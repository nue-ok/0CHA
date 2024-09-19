import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

import BottomNav from '../../../components/Common/BottomNav';
import Header from '../../../components/Common/Header';
import TextArea from '../../../components/Common/TextArea';
import Input from '../../../components/Common/Input';
import Button from '../../../components/Common/Button';
import IconSvg from '../../../components/Common/IconSvg';
import Image from '../../../components/Common/Image';
import { ReactComponent as camera } from '../../../asset/img/svg/camera.svg';

import { SnsItemDetail, SnsItemModify } from '../../../lib/api/sns-api';

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
    color: #000000;
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
};

interface Item {
  id: number;
  images: string[];
  title: string;
  price: number;
  content: string;
}

interface LocationState {
  item: Item;
}

const getByteLength = (str: string) => new Blob([str]).size;

const UpdateItemPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const [existingImages, setExistingImages] = useState<string[]>(state?.item.images || []);
  const [newImages, setNewImages] = useState<File[]>([]); // 파일 배열로 변경
  const [removeImages, setRemoveImages] = useState<string[]>([]); // 삭제된 이미지를 관리
  const [title, setTitle] = useState<string>(state?.item.title || '');
  const [price, setPrice] = useState<string>(state?.item.price.toString() || '');
  const [content, setContent] = useState<string>(state?.item.content || '');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state) {
      // State가 없는 경우, 아이템 ID로 서버에서 데이터를 가져옴
      if (id) {
        const fetchItemDetail = async () => {
          await SnsItemDetail(
            parseInt(id, 10),
            (resp) => {
              const item = resp.data;
              setExistingImages(item.images);
              setTitle(item.title);
              setPrice(item.price.toString());
              setContent(item.content);
            },
            (err) => {
              console.error('아이템 정보를 가져오는 중 오류 발생:', err);
            },
          );
        };
        fetchItemDetail();
      }
    }
  }, [id, state]);

  // 이미지 유효성
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files).slice(0, 5 - existingImages.length - newImages.length);
      const validFiles = filesArray.filter((file) => file.size <= 5 * 1024 * 1024); // 5MB 이하의 파일만 추가
      if (validFiles.length < filesArray.length) {
        alert('이미지 파일 크기는 각 5MB 이하로 제한됩니다.');
      }
      setNewImages((prevImages) => [...prevImages, ...validFiles]);
    }
  };
  // 이미지 업로드를 위한 클릭
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
    } else if (existingImages.length + newImages.length === 0) {
      alert('이미지를 한 장 이상 입력해 주세요');
      return;
    }

    const formData = new FormData();
    const itemData = {
      title: title,
      price: parseInt(price),
      content: content,
      removeImagePaths: removeImages,
    };

    // ItemDto 데이터를 JSON 형태로 변환하고 formData에 추가
    formData.append('item', new Blob([JSON.stringify(itemData)], { type: 'application/json' }));

    newImages.forEach((image) => {
      formData.append('addImages', image);
    });

    // 보내는 부분
    if (id) {
      await SnsItemModify(
        parseInt(id, 10),
        formData,
        (resp) => {
          navigate('/sns/market');
        },
        (err) => {
          console.log('문제 발생', err);
        },
      );
    } else {
      console.log('id 없음');
    }
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

  const handleDeleteImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      const removedImage = existingImages[index];
      setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setRemoveImages((prevRemove) => [...prevRemove, removedImage]);
    } else {
      setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  // 이미지 경로를 파싱하여 basicUrl과 결합하는 함수
  const getParsedImageUrl = (imagePath: string) => {
    const basicUrl = 'https://i11b310.p.ssafy.io/images/';
    const basePath = '/home/ubuntu/images/';

    // 서버에서 온 이미지인 경우 이미지 url 반환
    if (!imagePath.includes(basePath)) {
      return imagePath;
    }

    const relativePath = imagePath.split('/home/ubuntu/images/')[1];
    return basicUrl + relativePath;
  };

  return (
    <>
      <Header text="수정하기" />
      <s.Container>
        <s.ImageUploadArea onClick={handleUploadClick}>
          <IconSvg width="50" height="50" Ico={camera} color="#ffffff" />
          <s.ImageText>{existingImages.length + newImages.length}/5</s.ImageText>
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
            {existingImages.map((image, index) => (
              <s.ImageWrapper key={`existing-${index}`}>
                <Image width="64px" height="64px" src={getParsedImageUrl(image)} type="rect" />
                {index === 0 && <s.MainImageCaption>대표</s.MainImageCaption>}
                <s.DeleteButton onClick={() => handleDeleteImage(index, true)}>X</s.DeleteButton>
              </s.ImageWrapper>
            ))}
            {newImages.map((file, index) => (
              <s.ImageWrapper key={`new-${index}`}>
                <Image width="64px" height="64px" src={URL.createObjectURL(file)} type="rect" />
                {/* 대표 이미지 표시 */}
                {existingImages.length === 0 && index === 0 && <s.MainImageCaption>대표</s.MainImageCaption>}
                <s.DeleteButton onClick={() => handleDeleteImage(index, false)}>X</s.DeleteButton>
              </s.ImageWrapper>
            ))}
          </s.ImageArea>
        </s.ImageOutBox>
        <s.InputArea>
          <s.InputLabel>제목</s.InputLabel>
          <Input width="100%" height="40px" value={title} onChange={handleTitleChange} />
          <s.InputLabel>가격</s.InputLabel>
          <Input width="100%" height="40px" value={price} onChange={handlePriceChange} />
          <s.InputLabel>상품 설명</s.InputLabel>
          <TextArea width="100%" height="180px" value={content} onChange={handleContentChange} />
        </s.InputArea>
        <s.Button>
          <Button
            width="100%"
            height="40px"
            size="14px"
            type="main"
            bold="500"
            children="수정 완료"
            onClick={handleMovePage}
          />
        </s.Button>
      </s.Container>
      <BottomNav />
    </>
  );
};

export default UpdateItemPage;
