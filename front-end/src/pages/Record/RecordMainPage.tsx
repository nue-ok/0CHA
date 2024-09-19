import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import CalendarArea from '../../components/Common/CalendarArea';
import Text from '../../components/Common/Text';
import Button from '../../components/Common/Button';
import IconSvg from '../../components/Common/IconSvg';
import { ReactComponent as move } from '../../asset/img/svg/move.svg';
import { useNavigate } from 'react-router';
import moment from 'moment';
import { getFitnessCalendar } from '../../lib/api/record-api';
import { FitnessDay, IsRoutine } from '../../util/types/axios-record';
import { useAppDispatch } from '../../lib/hook/useReduxHook';
import { pageActions } from '../../store/page';
const s = {
  Continer: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    height: 100%;
    padding: 60px 0 80px;
    overflow: auto;
  `,
  TextBtnArea: styled.div`
    width: 80%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px auto;
    cursor: pointer;
  `,
};

const RecordMainPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fitness, setFitness] = useState<FitnessDay[]>([]);
  const handleClickMove = (path: string): void => {
    if (path === '../inbody/scan') {
      dispatch(pageActions.toogleIsScan(true));
    }
    navigate(path);
  };
  // const attendDay = ['2024-07-30', '2024-07-15', '2024-08-12']; // 운동시작 버튼 누른 날
  // const attendDay2 = ['2024-07-31', '2024-07-16', '2024-08-13']; // 운동 시작버튼 안누른 날(계획)
  const [date, SetDate] = useState<string>('');
  const [isRoutine, setIsRoutine] = useState<IsRoutine>({ btnName: '루틴 생성하기', routineId: -1, isFlag: false });
  const handleChangeDate = (newDate: Date) => {
    const pickDay = new Date();
    const today =
      pickDay.getFullYear() +
      '-' +
      ('0' + (1 + pickDay.getMonth())).slice(-2) +
      '-' +
      ('0' + pickDay.getDate()).slice(-2);
    const routineDate = moment(newDate).format('YYYY-MM-DD');
    SetDate(routineDate);

    const day = fitness.find((x) => x.dueDate === routineDate);
    if (day) {
      if (today === routineDate && !day.completed) {
        setIsRoutine({ btnName: '오늘의 운동 시작하기', isFlag: false, routineId: day.routineId });
      } else {
        setIsRoutine({
          btnName: '루틴 확인하기',
          isFlag: true,
          routineId: day.routineId,
        });
      }
    } else {
      setIsRoutine({ btnName: '루틴 생성하기', routineId: -1, isFlag: false });
    }
  };

  const handleClickCalendar = (id: number, flag: boolean) => {
    if (flag && id > 0) {
      //루틴확인
      navigate('../../fitness/history/detail', { state: { id } });
    } else if (!flag && id > 0) {
      //오늘의 운동하러 가기
      navigate('../../fitness/history/detail', { state: { id } });
    } else if (!flag && id === -1) {
      //루틴생성
      navigate('../../fitness');
    }
  };

  useEffect(() => {
    getFitnessCalendar(
      (resp) => {
        setFitness(resp.data);
      },
      (error) => {
        console.log('잠시 후 다시 시도해주세요.');
      },
    );
  }, []);

  return (
    <s.Continer>
      <Header text="기록" onBack={() => navigate('../../record')} />
      <s.MainArea>
        <CalendarArea
          className="react-calendar__record"
          onChangeDate={handleChangeDate}
          FitnessDay={fitness}
          pick={date}
        />
        <Text children={date} color="textColor2" bold="500" size="14px" width="80%" display="block" margin="0 auto" />
        <Button
          width="80%"
          height="40px"
          children={isRoutine?.btnName}
          bold="500"
          size="14px"
          type="main"
          display="block"
          margin="20px auto 50px"
          onClick={() => handleClickCalendar(isRoutine.routineId, isRoutine.isFlag)}
        />
        <Text
          children="기록관리"
          color="textColor2"
          bold="500"
          size="14px"
          width="80%"
          display="block"
          margin="0 auto"
        />
        <s.TextBtnArea onClick={() => handleClickMove('../inbody/scan')}>
          <Text children="인바디 등록" color="textColor" bold="500" size="16px" width="100px" cursor="pointer" />
          <IconSvg width="24" height="24" Ico={move} />
        </s.TextBtnArea>
        <s.TextBtnArea onClick={() => handleClickMove('../inbody/data')}>
          <Text children="인바디 결과" color="textColor" bold="500" size="16px" width="100px" cursor="pointer" />
          <IconSvg width="24" height="24" Ico={move} />
        </s.TextBtnArea>
        <s.TextBtnArea onClick={() => handleClickMove('../data')}>
          <Text children="운동 기록" color="textColor" bold="500" size="16px" width="100px" cursor="pointer" />
          <IconSvg width="24" height="24" Ico={move} />
        </s.TextBtnArea>
      </s.MainArea>
      {/* <BottomNav /> */}
    </s.Continer>
  );
};

export default RecordMainPage;
