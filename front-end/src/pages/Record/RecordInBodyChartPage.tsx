import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import Text from '../../components/Common/Text';
import Chart from '../../components/Common/Chart';
import { getInbody } from '../../lib/api/record-api';
import { Inbody } from '../../util/types/axios-record';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { pageActions, selectType1, selectType2, selectType3 } from '../../store/page';
const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    height: 100%;
    padding: 60px 0 40px;
    overflow: auto;
  `,
  TextBtnArea: styled.section`
    width: 90%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    margin: 5px auto 50px;
  `,
  Btn: styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.color || '#fff'};
  `,
};

const RecordInBodyChartPage = (): JSX.Element => {
  const type1 = useAppSelector(selectType1);
  const type2 = useAppSelector(selectType2);
  const type3 = useAppSelector(selectType3);
  const dispatch = useAppDispatch();
  const [inbodyData, setInbodyData] = useState<Inbody[]>([]);
  const [separatedData, setSeparatedData] = useState({
    height: [] as number[],
    weight: [] as number[],
    bodyWater: [] as number[],
    protein: [] as number[],
    mineral: [] as number[],
    bodyFat: [] as number[],
    muscleMass: [] as number[],
    muscleBody: [] as number[],
    muscleLeftArm: [] as number[],
    muscleRightArm: [] as number[],
    muscleLeftLeg: [] as number[],
    muscleRightLeg: [] as number[],
    bmi: [] as number[],
    bodyFatPercent: [] as number[],
    // measuredAt: [] as string[],
  });

  const [chartDate, setChartDate] = useState<string[]>();

  // 현재 선택된 데이터 유형을 저장하는 상태
  const [compositionChart, setcompositionChart] = useState<string>('bodyFat');

  // 현재 선택된 데이터 유형을 저장하는 상태
  const [skeletalChart, setskeletalChart] = useState<string>('muscleMass');

  // 현재 선택된 데이터 유형을 저장하는 상태
  const [muscleChart, setmuscleChart] = useState<string>('muscleLeftArm');

  // 선택된 데이터에 따라 차트 데이터 설정
  const chartData1 = separatedData[compositionChart as keyof typeof separatedData];
  // 선택된 데이터에 따라 차트 데이터 설정
  const chartData2 = separatedData[skeletalChart as keyof typeof separatedData];
  // 선택된 데이터에 따라 차트 데이터 설정
  const chartData3 = separatedData[muscleChart as keyof typeof separatedData];

  const formatDate = (dateString: string): string => {
    return moment(dateString).format('YY-MM-DD');
  };

  useEffect(() => {
    getInbody(
      (resp) => {
        setInbodyData(resp.data);
      },
      (error) => {
        alert('잠시 후 다시 시도해주세요.');
      },
    );
    return () => {
      dispatch(pageActions.changeChart1('bodyFat'));
      dispatch(pageActions.changeChart2('muscleMass'));
      dispatch(pageActions.changeChart3('muscleLeftArm'));
    };
  }, []);

  useEffect(() => {
    const newSeparatedData = {
      height: [] as number[],
      weight: [] as number[],
      bodyWater: [] as number[],
      protein: [] as number[],
      mineral: [] as number[],
      bodyFat: [] as number[],
      muscleMass: [] as number[],
      muscleBody: [] as number[],
      muscleLeftArm: [] as number[],
      muscleRightArm: [] as number[],
      muscleLeftLeg: [] as number[],
      muscleRightLeg: [] as number[],
      bmi: [] as number[],
      bodyFatPercent: [] as number[],
      // measuredAt: [] as string[],
    };
    let date: string[] = [];

    // 인바디 데이터를 반복하여 배열을 채움
    Array.isArray(inbodyData) &&
      inbodyData.forEach((inbody) => {
        if (inbody.height !== undefined) newSeparatedData.height.push(inbody.height);
        if (inbody.weight !== undefined) newSeparatedData.weight.push(inbody.weight);
        if (inbody.bodyWater !== undefined) newSeparatedData.bodyWater.push(inbody.bodyWater);
        if (inbody.protein !== undefined) newSeparatedData.protein.push(inbody.protein);
        if (inbody.mineral !== undefined) newSeparatedData.mineral.push(inbody.mineral);
        if (inbody.bodyFat !== undefined) newSeparatedData.bodyFat.push(inbody.bodyFat);
        if (inbody.muscleMass !== undefined) newSeparatedData.muscleMass.push(inbody.muscleMass);
        if (inbody.muscleBody !== undefined) newSeparatedData.muscleBody.push(inbody.muscleBody);
        if (inbody.muscleLeftArm !== undefined) newSeparatedData.muscleLeftArm.push(inbody.muscleLeftArm);
        if (inbody.muscleRightArm !== undefined) newSeparatedData.muscleRightArm.push(inbody.muscleRightArm);
        if (inbody.muscleLeftLeg !== undefined) newSeparatedData.muscleLeftLeg.push(inbody.muscleLeftLeg);
        if (inbody.muscleRightLeg !== undefined) newSeparatedData.muscleRightLeg.push(inbody.muscleRightLeg);
        if (inbody.bmi !== undefined) newSeparatedData.bmi.push(inbody.bmi);
        if (inbody.bodyFatPercent !== undefined) newSeparatedData.bodyFatPercent.push(inbody.bodyFatPercent);
        if (inbody.measuredAt !== undefined) date.push(formatDate(inbody.measuredAt));
      });

    setSeparatedData(newSeparatedData);
    setChartDate(date);
  }, [inbodyData]);

  // 버튼 클릭 시 선택된 데이터를 변경하는 함수
  const handleButtonClick1 = (dataType: string) => {
    dispatch(pageActions.changeChart1(dataType));
    setcompositionChart(dataType);
  };

  const handleButtonClick2 = (dataType: string) => {
    dispatch(pageActions.changeChart2(dataType));
    setskeletalChart(dataType);
  };

  const handleButtonClick3 = (dataType: string) => {
    dispatch(pageActions.changeChart3(dataType));
    setmuscleChart(dataType);
  };
  const getColor1 = (mode: string) => {
    return type1 === mode ? '#ccff33' : undefined;
  };
  const getColor2 = (mode: string) => {
    return type2 === mode ? '#ccff33' : undefined;
  };
  const getColor3 = (mode: string) => {
    return type3 === mode ? '#ccff33' : undefined;
  };

  return (
    <s.Container>
      <Header text="인바디 결과" />
      <s.MainArea>
        <Text
          children="체성분"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="20px auto"
        />
        {chartData1.length === 0 ? (
          <Text
            children="데이터가 존재하지 않습니다."
            width="90%"
            bold="700"
            color="textColor"
            size="16px"
            display="block"
            margin="20px auto"
          />
        ) : (
          <Chart labels={chartDate!} datas={chartData1} />
        )}
        {/* <Chart labels={chartDate!} datas={chartData1} /> */}
        <s.TextBtnArea>
          <s.Btn onClick={() => handleButtonClick1('bodyFat')} color={getColor1('bodyFat')}>
            체지방
          </s.Btn>
          <s.Btn onClick={() => handleButtonClick1('protein')} color={getColor1('protein')}>
            단백질
          </s.Btn>
          <s.Btn onClick={() => handleButtonClick1('mineral')} color={getColor1('mineral')}>
            무기질
          </s.Btn>
          <s.Btn onClick={() => handleButtonClick1('bodyWater')} color={getColor1('bodyWater')}>
            체수분
          </s.Btn>
        </s.TextBtnArea>
        <Text
          children="골격근"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="20px auto"
        />
        {chartData2.length === 0 ? (
          <Text
            children="데이터가 존재하지 않습니다."
            width="90%"
            bold="700"
            color="textColor"
            size="16px"
            display="block"
            margin="20px auto"
          />
        ) : (
          <Chart labels={chartDate!} datas={chartData2} />
        )}

        <s.TextBtnArea>
          <s.Btn onClick={() => handleButtonClick2('muscleMass')} color={getColor2('muscleMass')}>
            골격근량
          </s.Btn>
          <s.Btn onClick={() => handleButtonClick2('bodyFatPercent')} color={getColor2('bodyFatPercent')}>
            체지방률
          </s.Btn>
          <s.Btn onClick={() => handleButtonClick2('weight')} color={getColor2('weight')}>
            체중
          </s.Btn>
        </s.TextBtnArea>
        <Text
          children="부위별 근육"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="20px auto"
        />
        {chartData3.length === 0 ? (
          <Text
            children="데이터가 존재하지 않습니다."
            width="90%"
            bold="700"
            color="textColor"
            size="16px"
            display="block"
            margin="20px auto"
          />
        ) : (
          <Chart labels={chartDate!} datas={chartData3} />
        )}

        <s.TextBtnArea>
          <s.Btn onClick={() => handleButtonClick3('muscleLeftArm')} color={getColor3('muscleLeftArm')}>
            왼팔
          </s.Btn>
          <s.Btn onClick={() => handleButtonClick3('muscleRightArm')} color={getColor3('muscleRightArm')}>
            오른팔
          </s.Btn>
          <s.Btn onClick={() => handleButtonClick3('muscleBody')} color={getColor3('muscleBody')}>
            몸통
          </s.Btn>
          <s.Btn onClick={() => handleButtonClick3('muscleRightLeg')} color={getColor3('muscleRightLeg')}>
            오른다리
          </s.Btn>
          <s.Btn onClick={() => handleButtonClick3('muscleLeftLeg')} color={getColor3('muscleLeftLeg')}>
            왼다리
          </s.Btn>
        </s.TextBtnArea>
      </s.MainArea>
      {/* <BottomNav /> */}
    </s.Container>
  );
};

export default RecordInBodyChartPage;
