import React, { useState, useEffect } from 'react';

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // 타이머 시작
  const startTimer = () => {
    setIsRunning(true);
  };

  // 타이머 중지
  const stopTimer = () => {
    setIsRunning(false);
  };

  // 타이머 리셋
  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
    localStorage.removeItem('timerSeconds');
  };

  useEffect(() => {
    // 페이지 로드 시 저장된 시간 가져오기
    const savedTime = localStorage.getItem('timerSeconds');
    if (savedTime) {
      setSeconds(parseInt(savedTime, 10));
    }

    // 타이머 실행 중일 때
    let intervalId: NodeJS.Timeout | undefined;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;
          localStorage.setItem('timerSeconds', newSeconds.toString());
          return newSeconds;
        });
      }, 1000);
    } else {
      // 타이머가 멈췄을 때는 interval을 정리합니다
      if (intervalId) {
        clearInterval(intervalId);
      }
    }

    // useEffect 클린업 함수
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <h1>{formatTime(seconds)}</h1>
      <button onClick={startTimer} disabled={isRunning}>
        시작
      </button>
      <button onClick={stopTimer} disabled={!isRunning}>
        멈추기
      </button>
      <button onClick={resetTimer}>리셋</button>
    </div>
  );
};

export default Timer;
