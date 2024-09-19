import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import Text from '../../components/Common/Text';
import Chart from '../../components/Common/Chart';
import { getFitnessData, getRm } from '../../lib/api/record-api';
import { FitnessData, RmDataType } from '../../util/types/axios-record';
import { fitnessActions, selectRmType } from '../../store/fitness';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';

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

const RecordFitnessChartPage = (): JSX.Element => {
  const [fitnessData, setFitnessData] = useState<FitnessData[]>([]);
  const [rmData, setRmData] = useState<RmDataType[]>([]);
  const [squat, setSquat] = useState<RmDataType[]>([]);
  const [dead, setDead] = useState<RmDataType[]>([]);
  const [bench, setBench] = useState<RmDataType[]>([]);
  const [separatedData, setSeparatedData] = useState({
    squat: [] as number[],
    dead: [] as number[],
    bench: [] as number[],
  });
  const [separatedDataDate, setSeparatedDataDate] = useState({
    squatDate: [] as string[],
    deadDate: [] as string[],
    benchDate: [] as string[],
  });

  // 현재 선택된 데이터 유형을 저장하는 상태
  const [compositionChart, setcompositionChart] = useState<string>('squat');
  const [compositionChartDate, setcompositionChartDate] = useState<string>('squatDate');
  // 선택된 데이터에 따라 차트 데이터 설정
  const chartData1 = separatedData[compositionChart as keyof typeof separatedData];
  const chartDataDate1 = separatedDataDate[compositionChartDate as keyof typeof separatedDataDate];

  const [rmDates, setRmDates] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [totalVolumes, setTotalVolumes] = useState<number[]>([]);
  const [totalTimes, setTotalTimes] = useState<number[]>([]);

  useEffect(() => {
    getRm(
      27,
      (resp) => {
        setSquat(resp.data);
      },
      (error) => {
        setSquat([]);
      },
    );
    getRm(
      103,
      (resp) => {
        setDead(resp.data);
      },
      (error) => {
        setDead([]);
      },
    );
    getRm(
      163,
      (resp) => {
        setBench(resp.data);
      },
      (error) => {
        setBench([]);
      },
    );

    getFitnessData(
      (resp) => {
        setFitnessData(resp.data);
        setDates(fitnessData.map((data) => data.date));
        setTotalVolumes(fitnessData.map((data) => data.totalVolume));
        setTotalTimes(fitnessData.map((data) => data.totalTime));
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
    return () => {
      dispatch(fitnessActions.changeRmType('스쿼트'));
    };
  }, []);

  useEffect(() => {
    const newSeparatedData = {
      squat: [] as number[],
      dead: [] as number[],
      bench: [] as number[],
      squatDate: [] as string[],
      deadDate: [] as string[],
      benchDate: [] as string[],
    };
    const newSeparatedDataDate = {
      squatDate: [] as string[],
      deadDate: [] as string[],
      benchDate: [] as string[],
    };

    Array.isArray(squat) &&
      squat.forEach((rm) => {
        if (rm.oneRepMax !== undefined) newSeparatedData.squat.push(rm.oneRepMax);
        if (rm.date !== undefined) newSeparatedDataDate.squatDate.push(rm.date);
      });
    Array.isArray(dead) &&
      dead.forEach((rm) => {
        if (rm.oneRepMax !== undefined) newSeparatedData.dead.push(rm.oneRepMax);
        if (rm.date !== undefined) newSeparatedDataDate.deadDate.push(rm.date);
      });
    Array.isArray(bench) &&
      bench.forEach((rm) => {
        if (rm.oneRepMax !== undefined) newSeparatedData.bench.push(rm.oneRepMax);
        if (rm.date !== undefined) newSeparatedDataDate.benchDate.push(rm.date);
      });

    setSeparatedData(newSeparatedData);
    setSeparatedDataDate(newSeparatedDataDate);
  }, [squat, dead, bench]);

  useEffect(() => {
    setDates(fitnessData.map((data) => data.date));
    setTotalVolumes(fitnessData.map((data) => data.totalVolume));
    setTotalTimes(fitnessData.map((data) => data.totalTime));
  }, [fitnessData]);

  const rmType = useAppSelector(selectRmType);
  const dispatch = useAppDispatch();
  const handleButtonClick = (dataType: string) => {
    dispatch(fitnessActions.changeRmType(dataType));
    setcompositionChart(dataType);
    setcompositionChartDate(dataType + 'Date');
  };

  const getColor = (mode: string) => {
    return rmType === mode ? '#ccff33' : undefined;
  };

  return (
    <s.Container>
      <Header text="운동 기록" />
      <s.MainArea>
        <Text children="1RM" width="90%" bold="700" color="textColor" size="16px" display="block" margin="20px auto" />
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
          <>
            <Chart labels={chartDataDate1} datas={chartData1} />
            <s.TextBtnArea>
              <s.Btn onClick={() => handleButtonClick('squat')} color={getColor('squat')}>
                스쿼트
              </s.Btn>
              <s.Btn onClick={() => handleButtonClick('dead')} color={getColor('dead')}>
                데드리프트
              </s.Btn>
              <s.Btn onClick={() => handleButtonClick('bench')} color={getColor('bench')}>
                벤치프레스
              </s.Btn>
            </s.TextBtnArea>
          </>
        )}

        <Text
          children="운동량"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="100px auto 20px"
        />
        {totalVolumes.length === 0 ? (
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
          <Chart labels={dates} datas={totalVolumes} />
        )}

        <Text
          children="운동시간"
          width="90%"
          bold="700"
          color="textColor"
          size="16px"
          display="block"
          margin="100px auto 20px"
        />
        {totalTimes.length === 0 ? (
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
          <Chart labels={dates} datas={totalTimes} />
        )}
      </s.MainArea>
      {/* <BottomNav /> */}
    </s.Container>
  );
};

export default RecordFitnessChartPage;
