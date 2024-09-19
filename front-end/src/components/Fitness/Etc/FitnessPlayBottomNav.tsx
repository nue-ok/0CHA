import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Button from '../../Common/Button';
import Text from '../../Common/Text';
import { useAppDispatch, useAppSelector } from '../../../lib/hook/useReduxHook';
import { fitnessActions, selectRest, selectRestStack, selectTime } from '../../../store/fitness';

const s = {
  Container: styled.div`
    width: 100%;
    max-width: 800px;
    height: 70px;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
  `,
  MainArea: styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
  `,
  ContentArea: styled.div`
    width: 50%;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
};

interface PlayProps {
  onFinish: (seconds: number) => void;
}

const FitnessPlayBottomNav = (props: PlayProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const time = useAppSelector(selectTime);
  const IsRest = useAppSelector(selectRest);
  const IsRestStack = useAppSelector(selectRestStack);

  // 화면에 표시할 시간 상태
  const [displaySeconds, setDisplaySeconds] = useState(0);
  const [restTime, setRestTime] = useState(0);

  // 실제 시간을 관리할 ref
  const secondsRef = useRef(0);
  const intervalIdRef1 = useRef<number | null>(null); // 본 운동 시간
  const intervalIdRef2 = useRef<number | null>(null); // 쉬는 시간

  // 초기 시간을 redux에서 가져와 설정
  useEffect(() => {
    secondsRef.current = time;
    setDisplaySeconds(time);
  }, [time]);

  // 쉬는 시간 타이머 설정
  useEffect(() => {
    if (IsRest) {
      if (intervalIdRef2.current) {
        clearInterval(intervalIdRef2.current);
      }
      setRestTime(60); // 새로운 쉬는 시간 설정
      intervalIdRef2.current = window.setInterval(() => {
        setRestTime((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(intervalIdRef2.current as number);
            dispatch(fitnessActions.toggleRest(false));
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      setRestTime(0);
    }

    return () => {
      if (intervalIdRef2.current !== null) {
        clearInterval(intervalIdRef2.current);
      }
    };
  }, [IsRest, dispatch]);

  useEffect(() => {
    if (IsRest) {
      setRestTime(60);
    }
  }, [IsRestStack, dispatch]);

  // 운동 시간 타이머 시작
  useEffect(() => {
    intervalIdRef1.current = window.setInterval(() => {
      secondsRef.current += 1; // Use ref to update seconds
      setDisplaySeconds(secondsRef.current); // Update state to trigger re-render
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      dispatch(fitnessActions.saveTime(secondsRef.current));
      if (intervalIdRef1.current !== null) {
        clearInterval(intervalIdRef1.current);
      }
    };
  }, []);

  // 운동 종료 핸들러
  const handleFinish = () => {
    // 타이머 중지
    if (intervalIdRef1.current !== null) {
      clearInterval(intervalIdRef1.current);
    }

    // 경과 시간을 'YY:MM:SS' 형식으로 변환
    const hours = Math.floor(secondsRef.current / 3600);
    const minutes = Math.floor((secondsRef.current % 3600) / 60);
    const secs = secondsRef.current % 60;
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    // 경과 시간을 alert로 표시

    // 운동 종료 콜백 호출
    props.onFinish(secondsRef.current);
  };

  // 시간을 'YY:MM:SS' 형식으로 변환
  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <s.Container>
      <s.MainArea>
        <s.ContentArea>
          <Text width="100%" children="휴식 시간" bold="500" size="16px" textalian="center" />
          <Text width="100%" children={formatTime(restTime)} bold="700" size="16px" textalian="center" />
        </s.ContentArea>
        <s.ContentArea>
          <Text width="100%" children="운동 시간" bold="500" size="16px" textalian="center" />
          <Text width="100%" children={formatTime(displaySeconds)} bold="700" size="16px" textalian="center" />
        </s.ContentArea>
      </s.MainArea>
      <Button width="40%" height="40px" children="운동 종료" bold="500" type="main" onClick={handleFinish} />
    </s.Container>
  );
};

export default FitnessPlayBottomNav;
