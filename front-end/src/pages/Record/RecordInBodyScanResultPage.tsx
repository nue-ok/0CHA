// import React, { useEffect, useState } from 'react';
// import { styled } from 'styled-components';
// import Header from '../../components/Common/Header';
// import Button from '../../components/Common/Button';
// import Text from '../../components/Common/Text';
// import RecordInbodyInput from '../../components/Record/Inbody/RecordInbodyInput';
// import { useLocation, useNavigate } from 'react-router';
// import { postInbody } from '../../lib/api/record-api';
// import { ApiResponse, Image, Inbody } from '../../util/types/axios-record';

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
//   InputArea: styled.div`
//     width: 90%;
//     height: 30px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin: 10px auto;
//   `,
//   ListLine: styled.hr`
//     width: 90%;
//     background: #212121;
//     height: 1px;
//     border: 0;
//     margin: 35px auto;
//   `,
// };

// const RecordInBodyScanResultPage = (): JSX.Element => {
//   const location = useLocation();
//   const data: ApiResponse | undefined = location.state?.data;

//   const [inbody, setInbody] = useState<Inbody>({
//     height: 0,
//     weight: 0,
//     bodyWater: 0,
//     protein: 0,
//     mineral: 0,
//     bodyFat: 0,
//     muscleMass: 0,
//     muscleBody: 0,
//     muscleLeftArm: 0,
//     muscleRightArm: 0,
//     muscleLeftLeg: 0,
//     muscleRightLeg: 0,
//     bmi: 0,
//     bodyFatPercent: 0,
//     measuredAt: '',
//   });
//   const navigate = useNavigate();

//   const changeInbodyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputData = e.target.value === '' ? '' : e.target.value;
//     setInbody({
//       ...inbody,
//       [e.target.name]: inputData,
//     });
//   };

//   const handleSaveData = async () => {
//     const day = new Date();
//     const today =
//       day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
//     setInbody({ ...inbody, measuredAt: today });
//     postInbody(
//       inbody,
//       (resp) => {
//         alert('저장되었습니다.');
//         navigate('../data');
//       },
//       (error) => {
//         alert('잠시 후 다시 시도해주세요.');
//       },
//     );
//   };

//   // Function to extract name and last subField inferText
//   function extractNameAndLastInferText(images: Image[]) {
//     return images.flatMap((image) =>
//       image.fields.map((field) => {
//         const lastSubField = field.subFields[field.subFields.length - 1];
//         return {
//           name: field.name,
//           lastInferText: lastSubField ? lastSubField.inferText : null,
//         };
//       }),
//     );
//   }

//   // Ensure data exists and images is not undefined
//   const extractedData = data ? extractNameAndLastInferText(data.images) : [];

//   return (
//     <s.Container>
//       <Header text="인바디 스캔" />
//       <s.MainArea>
//         <s.p>
//           스캔 결과가 <s.SpanBold>부정확</s.SpanBold>한 부분이 있을 수 있습니다. <br />
//           정확한 수치를 입력해주세요.
//         </s.p>
//         <Text
//           children="기본 정보"
//           width="90%"
//           color="textColor2"
//           size="14px"
//           bold="500"
//           margin="20px auto"
//           display="block"
//         />
//         <s.InputArea>
//           <RecordInbodyInput id="height" title="신장" unit="cm" value={inbody.height} onChange={changeInbodyInput} />
//           <RecordInbodyInput id="weight" title="체중" unit="kg" value={inbody.weight} onChange={changeInbodyInput} />
//         </s.InputArea>
//         <s.ListLine />
//         <Text
//           children="체성분"
//           width="90%"
//           color="textColor2"
//           size="14px"
//           bold="500"
//           margin="20px auto"
//           display="block"
//         />
//         <s.InputArea>
//           <RecordInbodyInput
//             id="bodyWater"
//             title="체수분"
//             unit="L"
//             value={inbody.bodyWater}
//             onChange={changeInbodyInput}
//           />
//           <RecordInbodyInput
//             id="protein"
//             title="단백질"
//             unit="kg"
//             value={inbody.protein}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <s.InputArea>
//           <RecordInbodyInput
//             id="mineral"
//             title="무기질"
//             unit="kg"
//             value={inbody.mineral}
//             onChange={changeInbodyInput}
//           />
//           <RecordInbodyInput
//             id="bodyFat"
//             title="체지방량"
//             unit="kg"
//             value={inbody.bodyFat}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <s.ListLine />
//         <Text
//           children="근육"
//           width="90%"
//           color="textColor2"
//           size="14px"
//           bold="500"
//           margin="20px auto"
//           display="block"
//         />
//         <s.InputArea>
//           <RecordInbodyInput
//             id="muscleMass"
//             title="골격근량"
//             unit="kg"
//             value={inbody.muscleMass}
//             onChange={changeInbodyInput}
//           />
//           <RecordInbodyInput
//             id="muscleBody"
//             title="몸통"
//             unit="kg"
//             value={inbody.muscleBody}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <s.InputArea>
//           <RecordInbodyInput
//             id="muscleLeftArm"
//             title="왼팔"
//             unit="kg"
//             value={inbody.muscleLeftArm}
//             onChange={changeInbodyInput}
//           />
//           <RecordInbodyInput
//             id="muscleRightArm"
//             title="오른팔"
//             unit="kg"
//             value={inbody.muscleRightArm}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <s.InputArea>
//           <RecordInbodyInput
//             id="muscleLeftLeg"
//             title="왼다리"
//             unit="kg"
//             value={inbody.muscleLeftLeg}
//             onChange={changeInbodyInput}
//           />
//           <RecordInbodyInput
//             id="muscleRightLeg"
//             title="오른다리"
//             unit="kg"
//             value={inbody.muscleRightLeg}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <s.ListLine />
//         <Text
//           children="비만"
//           width="90%"
//           color="textColor2"
//           size="14px"
//           bold="500"
//           margin="20px auto"
//           display="block"
//         />
//         <s.InputArea>
//           <RecordInbodyInput id="bmi" title="BMI" unit="kg/m2" value={inbody.bmi} onChange={changeInbodyInput} />
//           <RecordInbodyInput
//             id="bodyFatPercent"
//             title="체지방률"
//             unit="%"
//             value={inbody.bodyFatPercent}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <Button
//           children="저장하기"
//           bold="500"
//           size="14px"
//           display="block"
//           margin="25px auto 0"
//           height="40px"
//           type="main"
//           width="90%"
//           onClick={handleSaveData}
//         />
//       </s.MainArea>
//       {/* <BottomNav /> */}
//     </s.Container>
//   );
// };

// export default RecordInBodyScanResultPage;
// import React, { useEffect, useState } from 'react';
// import { styled } from 'styled-components';
// import Header from '../../components/Common/Header';
// import Button from '../../components/Common/Button';
// import Text from '../../components/Common/Text';
// import RecordInbodyInput from '../../components/Record/Inbody/RecordInbodyInput';
// import { useLocation, useNavigate } from 'react-router';
// import { postInbody } from '../../lib/api/record-api';
// import { ApiResponse, Image, Inbody } from '../../util/types/axios-record';

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
//   InputArea: styled.div`
//     width: 90%;
//     height: 30px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin: 10px auto;
//   `,
//   ListLine: styled.hr`
//     width: 90%;
//     background: #212121;
//     height: 1px;
//     border: 0;
//     margin: 35px auto;
//   `,
// };

// const RecordInBodyScanResultPage = (): JSX.Element => {
//   const location = useLocation();
//   const data: ApiResponse | undefined = location.state?.data;

//   const [inbody, setInbody] = useState<Inbody>({
//     height: 0,
//     weight: 0,
//     bodyWater: 0,
//     protein: 0,
//     mineral: 0,
//     bodyFat: 0,
//     muscleMass: 0,
//     muscleBody: 0,
//     muscleLeftArm: 0,
//     muscleRightArm: 0,
//     muscleLeftLeg: 0,
//     muscleRightLeg: 0,
//     bmi: 0,
//     bodyFatPercent: 0,
//     measuredAt: '',
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (data) {
//       const extractedData = extractNameAndLastInferText(data.images);

//       const updatedInbody = {
//         height: findValueByName(extractedData, '키', 0),
//         weight: findValueByName(extractedData, '체중', 0),
//         bodyWater: findValueByName(extractedData, '체수분', 0),
//         protein: findValueByName(extractedData, '단백질', 0),
//         mineral: findValueByName(extractedData, '무기질', 0),
//         bodyFat: findValueByName(extractedData, '체지방량', 0),
//         muscleMass: findValueByName(extractedData, '골격근량', 0),
//         muscleBody: findValueByName(extractedData, '몸통', 0),
//         muscleLeftArm: findValueByName(extractedData, '왼팔', 0),
//         muscleRightArm: findValueByName(extractedData, '오른팔', 0),
//         muscleLeftLeg: findValueByName(extractedData, '왼다리', 0),
//         muscleRightLeg: findValueByName(extractedData, '오른다리', 0),
//         bmi: findValueByName(extractedData, 'bmi', 0),
//         bodyFatPercent: findValueByName(extractedData, '체지방률', 0),
//         measuredAt: '', // Measured at will be set when saving
//       };

//       setInbody(updatedInbody);
//     }
//   }, [data]);

//   const changeInbodyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputData = e.target.value === '' ? '' : e.target.value;
//     setInbody({
//       ...inbody,
//       [e.target.name]: inputData,
//     });
//   };

//   const handleSaveData = async () => {
//     const day = new Date();
//     const today =
//       day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
//     setInbody({ ...inbody, measuredAt: today });
//     postInbody(
//       inbody,
//       (resp) => {
//         alert('저장되었습니다.');
//         navigate('../data');
//       },
//       (error) => {
//         alert('잠시 후 다시 시도해주세요.');
//       },
//     );
//   };

//   // Function to extract name and last subField inferText
//   // function extractNameAndLastInferText(images: Image[]) {
//   //   return images.flatMap((image) =>
//   //     image.fields.map((field) => {
//   //       const lastSubField = field.subFields[field.subFields.length - 1];
//   //       return {
//   //         name: field.name,
//   //         lastInferText: lastSubField ? lastSubField.inferText : null,
//   //       };
//   //     }),
//   //   );
//   // }
//   function extractNameAndLastInferText(images: Image[]) {
//     return images.flatMap((image) =>
//       image.fields.map((field: any) => {
//         const subFieldWithHighestConfidence = field.subFields
//           .filter((subField: any) => subField.inferText && subField.inferText.includes('.'))
//           .reduce((maxSubField: any, currentSubField: any) =>
//             parseFloat(currentSubField.inferConfidence) > parseFloat(maxSubField.inferConfidence)
//               ? currentSubField
//               : maxSubField,
//           );

//         return {
//           name: field.name,
//           lastInferText: subFieldWithHighestConfidence ? subFieldWithHighestConfidence.inferText : null,
//         };
//       }),
//     );
//   }

//   // Helper function to find value by name
//   function findValueByName(data: { name: string; lastInferText: string | null }[], name: string, defaultValue: number) {
//     const item = data.find((field) => field.name.toLowerCase() === name.toLowerCase());
//     return item && item.lastInferText ? parseFloat(item.lastInferText) : defaultValue;
//   }

//   return (
//     <s.Container>
//       <Header text="인바디 스캔" />
//       <s.MainArea>
//         <s.p>
//           스캔 결과가 <s.SpanBold>부정확</s.SpanBold>한 부분이 있을 수 있습니다. <br />
//           정확한 수치를 입력해주세요.
//         </s.p>
//         <Text
//           children="기본 정보"
//           width="90%"
//           color="textColor2"
//           size="14px"
//           bold="500"
//           margin="20px auto"
//           display="block"
//         />
//         <s.InputArea>
//           <RecordInbodyInput id="height" title="신장" unit="cm" value={inbody.height} onChange={changeInbodyInput} />
//           <RecordInbodyInput id="weight" title="체중" unit="kg" value={inbody.weight} onChange={changeInbodyInput} />
//         </s.InputArea>
//         <s.ListLine />
//         <Text
//           children="체성분"
//           width="90%"
//           color="textColor2"
//           size="14px"
//           bold="500"
//           margin="20px auto"
//           display="block"
//         />
//         <s.InputArea>
//           <RecordInbodyInput
//             id="bodyWater"
//             title="체수분"
//             unit="L"
//             value={inbody.bodyWater}
//             onChange={changeInbodyInput}
//           />
//           <RecordInbodyInput
//             id="protein"
//             title="단백질"
//             unit="kg"
//             value={inbody.protein}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <s.InputArea>
//           <RecordInbodyInput
//             id="mineral"
//             title="무기질"
//             unit="kg"
//             value={inbody.mineral}
//             onChange={changeInbodyInput}
//           />
//           <RecordInbodyInput
//             id="bodyFat"
//             title="체지방량"
//             unit="kg"
//             value={inbody.bodyFat}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <s.ListLine />
//         <Text
//           children="근육"
//           width="90%"
//           color="textColor2"
//           size="14px"
//           bold="500"
//           margin="20px auto"
//           display="block"
//         />
//         <s.InputArea>
//           <RecordInbodyInput
//             id="muscleMass"
//             title="골격근량"
//             unit="kg"
//             value={inbody.muscleMass}
//             onChange={changeInbodyInput}
//           />
//           <RecordInbodyInput
//             id="muscleBody"
//             title="몸통"
//             unit="kg"
//             value={inbody.muscleBody}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <s.InputArea>
//           <RecordInbodyInput
//             id="muscleLeftArm"
//             title="왼팔"
//             unit="kg"
//             value={inbody.muscleLeftArm}
//             onChange={changeInbodyInput}
//           />
//           <RecordInbodyInput
//             id="muscleRightArm"
//             title="오른팔"
//             unit="kg"
//             value={inbody.muscleRightArm}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <s.InputArea>
//           <RecordInbodyInput
//             id="muscleLeftLeg"
//             title="왼다리"
//             unit="kg"
//             value={inbody.muscleLeftLeg}
//             onChange={changeInbodyInput}
//           />
//           <RecordInbodyInput
//             id="muscleRightLeg"
//             title="오른다리"
//             unit="kg"
//             value={inbody.muscleRightLeg}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <s.ListLine />
//         <Text
//           children="비만"
//           width="90%"
//           color="textColor2"
//           size="14px"
//           bold="500"
//           margin="20px auto"
//           display="block"
//         />
//         <s.InputArea>
//           <RecordInbodyInput id="bmi" title="BMI" unit="kg/m2" value={inbody.bmi} onChange={changeInbodyInput} />
//           <RecordInbodyInput
//             id="bodyFatPercent"
//             title="체지방률"
//             unit="%"
//             value={inbody.bodyFatPercent}
//             onChange={changeInbodyInput}
//           />
//         </s.InputArea>
//         <Button
//           children="저장하기"
//           bold="500"
//           size="14px"
//           display="block"
//           margin="25px auto 0"
//           height="40px"
//           type="main"
//           width="90%"
//           onClick={handleSaveData}
//         />
//       </s.MainArea>
//       {/* <BottomNav /> */}
//     </s.Container>
//   );
// };

// export default RecordInBodyScanResultPage;
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Header from '../../components/Common/Header';
import Button from '../../components/Common/Button';
import Text from '../../components/Common/Text';
import RecordInbodyInput from '../../components/Record/Inbody/RecordInbodyInput';
import { useLocation, useNavigate } from 'react-router';
import { postInbody } from '../../lib/api/record-api';
import { ApiResponse, Image, Inbody } from '../../util/types/axios-record';

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
  InputArea: styled.div`
    width: 90%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
  `,
  ListLine: styled.hr`
    width: 90%;
    background: #212121;
    height: 1px;
    border: 0;
    margin: 35px auto;
  `,
};

const RecordInBodyScanResultPage = (): JSX.Element => {
  const location = useLocation();
  const data: ApiResponse | undefined = location.state?.data;

  const [inbody, setInbody] = useState<Inbody>({
    height: 0,
    weight: 0,
    bodyWater: 0,
    protein: 0,
    mineral: 0,
    bodyFat: 0,
    muscleMass: 0,
    muscleBody: 0,
    muscleLeftArm: 0,
    muscleRightArm: 0,
    muscleLeftLeg: 0,
    muscleRightLeg: 0,
    bmi: 0,
    bodyFatPercent: 0,
    measuredAt: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const extractedData = extractNameAndInferText(data.images);

      const updatedInbody = {
        height: findValueByName(extractedData, '키', 0),
        weight: findValueByName(extractedData, '체중', 0),
        bodyWater: findValueByName(extractedData, '체수분', 0),
        protein: findValueByName(extractedData, '단백질', 0),
        mineral: findValueByName(extractedData, '무기질', 0),
        bodyFat: findValueByName(extractedData, '체지방량', 0),
        muscleMass: findValueByName(extractedData, '골격근량', 0),
        muscleBody: findValueByName(extractedData, '몸통', 0),
        muscleLeftArm: findValueByName(extractedData, '왼팔', 0),
        muscleRightArm: findValueByName(extractedData, '오른팔', 0),
        muscleLeftLeg: findValueByName(extractedData, '왼다리', 0),
        muscleRightLeg: findValueByName(extractedData, '오른다리', 0),
        bmi: findValueByName(extractedData, 'bmi', 0),
        bodyFatPercent: findValueByName(extractedData, '체지방률', 0),
        measuredAt: '', // Measured at will be set when saving
      };

      setInbody(updatedInbody);
    }
  }, [data]);

  const changeInbodyInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputData = e.target.value === '' ? '' : e.target.value;
    setInbody({
      ...inbody,
      [e.target.name]: inputData,
    });
  };

  const handleSaveData = async () => {
    const day = new Date();
    const today =
      day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
    setInbody({ ...inbody, measuredAt: today });
    postInbody(
      inbody,
      (resp) => {
        alert('저장되었습니다.');
        navigate('../data');
      },
      (error) => {
        alert('잠시 후 다시 시도해주세요.');
      },
    );
  };

  // Function to extract name and inferText, setting inferText to 0 if it doesn't contain a decimal
  function extractNameAndInferText(images: Image[]) {
    return images.flatMap((image) =>
      image.fields.map((field) => {
        const inferText = field.inferText.includes('.') ? field.inferText : '0';
        return {
          name: field.name,
          inferText: inferText ? parseFloat(inferText) : 0,
        };
      }),
    );
  }

  // Helper function to find value by name
  function findValueByName(data: { name: string; inferText: number }[], name: string, defaultValue: number) {
    const item = data.find((field) => field.name.toLowerCase() === name.toLowerCase());
    return item ? item.inferText : defaultValue;
  }

  return (
    <s.Container>
      <Header text="인바디 스캔" />
      <s.MainArea>
        <s.p>
          스캔 결과가 <s.SpanBold>부정확</s.SpanBold>한 부분이 있을 수 있습니다. <br />
          정확한 수치를 입력해주세요.
        </s.p>
        <Text
          children="기본 정보"
          width="90%"
          color="textColor2"
          size="14px"
          bold="500"
          margin="20px auto"
          display="block"
        />
        <s.InputArea>
          <RecordInbodyInput id="height" title="신장" unit="cm" value={inbody.height} onChange={changeInbodyInput} />
          <RecordInbodyInput id="weight" title="체중" unit="kg" value={inbody.weight} onChange={changeInbodyInput} />
        </s.InputArea>
        <s.ListLine />
        <Text
          children="체성분"
          width="90%"
          color="textColor2"
          size="14px"
          bold="500"
          margin="20px auto"
          display="block"
        />
        <s.InputArea>
          <RecordInbodyInput
            id="bodyWater"
            title="체수분"
            unit="L"
            value={inbody.bodyWater}
            onChange={changeInbodyInput}
          />
          <RecordInbodyInput
            id="protein"
            title="단백질"
            unit="kg"
            value={inbody.protein}
            onChange={changeInbodyInput}
          />
        </s.InputArea>
        <s.InputArea>
          <RecordInbodyInput
            id="mineral"
            title="무기질"
            unit="kg"
            value={inbody.mineral}
            onChange={changeInbodyInput}
          />
          <RecordInbodyInput
            id="bodyFat"
            title="체지방량"
            unit="kg"
            value={inbody.bodyFat}
            onChange={changeInbodyInput}
          />
        </s.InputArea>
        <s.ListLine />
        <Text
          children="근육"
          width="90%"
          color="textColor2"
          size="14px"
          bold="500"
          margin="20px auto"
          display="block"
        />
        <s.InputArea>
          <RecordInbodyInput
            id="muscleMass"
            title="골격근량"
            unit="kg"
            value={inbody.muscleMass}
            onChange={changeInbodyInput}
          />
          <RecordInbodyInput
            id="muscleBody"
            title="몸통"
            unit="kg"
            value={inbody.muscleBody}
            onChange={changeInbodyInput}
          />
        </s.InputArea>
        <s.InputArea>
          <RecordInbodyInput
            id="muscleLeftArm"
            title="왼팔"
            unit="kg"
            value={inbody.muscleLeftArm}
            onChange={changeInbodyInput}
          />
          <RecordInbodyInput
            id="muscleRightArm"
            title="오른팔"
            unit="kg"
            value={inbody.muscleRightArm}
            onChange={changeInbodyInput}
          />
        </s.InputArea>
        <s.InputArea>
          <RecordInbodyInput
            id="muscleLeftLeg"
            title="왼다리"
            unit="kg"
            value={inbody.muscleLeftLeg}
            onChange={changeInbodyInput}
          />
          <RecordInbodyInput
            id="muscleRightLeg"
            title="오른다리"
            unit="kg"
            value={inbody.muscleRightLeg}
            onChange={changeInbodyInput}
          />
        </s.InputArea>
        <s.ListLine />
        <Text
          children="지표"
          width="90%"
          color="textColor2"
          size="14px"
          bold="500"
          margin="20px auto"
          display="block"
        />
        <s.InputArea>
          <RecordInbodyInput id="bmi" title="BMI" unit="" value={inbody.bmi} onChange={changeInbodyInput} />
          <RecordInbodyInput
            id="bodyFatPercent"
            title="체지방률"
            unit="%"
            value={inbody.bodyFatPercent}
            onChange={changeInbodyInput}
          />
        </s.InputArea>
        <Button
          children="저장하기"
          bold="500"
          size="14px"
          display="block"
          margin="25px auto 0"
          height="40px"
          type="main"
          width="90%"
          onClick={handleSaveData}
        />
      </s.MainArea>
    </s.Container>
  );
};

export default RecordInBodyScanResultPage;
