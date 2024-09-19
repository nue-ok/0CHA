// import React from 'react';
// import styled from 'styled-components';
// import Header from '../../components/Common/Header';
// import Button from '../../components/Common/Button';
// import { useAppDispatch } from '../../lib/hook/useReduxHook';
// import { pageActions } from '../../store/page';

// const s = {
//   Container: styled.section`
//     height: 100%;
//     background-color: ${(props) => props.theme.bgColor};
//   `,
//   MainArea: styled.div`
//     height: 100%;
//     padding: 60px 0 80px;
//     overflow: auto;
//   `,
//   p: styled.p`
//     font-size: 14px;
//     font-weight: 500;
//     text-align: center;
//     color: ${(props) => props.theme.textColor};
//     line-height: 20px;
//     margin: 10px auto;
//   `,
//   SpanBold: styled.span`
//     color: ${(props) => props.theme.mainColor};
//     font-size: 14px;
//     font-weight: 500;
//   `,
//   CameraArea: styled.div`
//     width: 80%;
//     height: 550px;
//     border: 1px solid red;
//     margin: 0 auto;
//   `,
//   BtnArea: styled.div`
//     width: 80%;
//     height: 40px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin: 20px auto;
//   `,
// };

// const RecordInBodyScanPage = (): JSX.Element => {
//   const dispatch = useAppDispatch();
//   const handleMovePage = () => {
//     dispatch(pageActions.toogleIsScan(true));
//   };
//   return (
//     <s.Container>
//       <Header text="인바디 스캔" />
//       <s.MainArea>
//         <s.p>
//           결과지 테두리를 <s.SpanBold>사각형</s.SpanBold>에 맞춘 후<br /> 촬영 버튼을 눌러주세요.
//         </s.p>
//         <s.CameraArea />
//         <s.BtnArea>
//           <Button width="47%" height="40px" children="갤러리" bold="500" size="14px" type="main" />
//           <Button
//             width="47%"
//             height="40px"
//             children="촬영"
//             bold="500"
//             size="14px"
//             type="main"
//             onClick={handleMovePage}
//           />
//         </s.BtnArea>
//       </s.MainArea>
//       {/* <BottomNav /> */}
//     </s.Container>
//   );
// };

// export default RecordInBodyScanPage;
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import Button from '../../components/Common/Button';
import { useAppDispatch } from '../../lib/hook/useReduxHook';
import jsonData from '../../lib/data/test.json';
import { pageActions } from '../../store/page';
import { inbodyTest, sendInbodyRequest } from '../../lib/api/record-api';
import { useNavigate } from 'react-router';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    height: 100%;
    padding: 60px 0 80px;
    overflow: auto;
  `,
  p: styled.p`
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: ${(props) => props.theme.textColor};
    line-height: 20px;
    margin: 10px auto;
  `,
  SpanBold: styled.span`
    color: ${(props) => props.theme.mainColor};
    font-size: 14px;
    font-weight: 500;
  `,
  CameraArea: styled.div`
    width: 80%;
    height: 550px;
    border: 1px solid red;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  `,
  BtnArea: styled.div`
    width: 80%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto;
  `,
  FileInput: styled.input`
    display: none;
  `,
};

const RecordInBodyScanPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 페이지 이동 핸들러
  const handleMovePage = async () => {
    if (selectedImage === '') {
      alert('이미지를 첨부해주세요.');
    } else {
      const base64WithoutHeader = selectedImage.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
      let d;
      await inbodyTest(
        base64WithoutHeader,
        (resp) => {
          d = resp.data;
        },
        (error) => {
          console.log(error);
        },
      );
      dispatch(pageActions.toogleIsScan(true));
      navigate('/record/inbody/scan', { state: { data: d } });
    }
  };

  // 갤러리 버튼 클릭 시 파일 입력 필드 클릭
  const handleGalleryClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 이미지 선택 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <s.Container>
      <Header text="인바디 스캔" />
      <s.MainArea>
        <s.p>
          결과지 테두리를 <s.SpanBold>카메라 끝</s.SpanBold>에 맞춘
          <br /> 사진을 준비해주세요.
        </s.p>
        <s.CameraArea>
          {selectedImage ? <img src={selectedImage} alt="선택된 이미지" /> : '이미지를 업로드하세요.'}
        </s.CameraArea>
        <s.BtnArea>
          {/* 갤러리 버튼 클릭 시 파일 입력 창 열기 */}
          <Button
            width="47%"
            height="40px"
            children="갤러리"
            bold="500"
            size="14px"
            type="main"
            onClick={handleGalleryClick}
          />
          <s.FileInput ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} />
          <Button
            width="47%"
            height="40px"
            children="스캔"
            bold="500"
            size="14px"
            type="main"
            onClick={handleMovePage}
          />
        </s.BtnArea>
      </s.MainArea>
      {/* <BottomNav /> */}
    </s.Container>
  );
};

export default RecordInBodyScanPage;
