import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Input from '../Common/Input';

const s = {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7); // 투명도 설정
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `,
  ModalContent: styled.div`
    background: ${(props) => props.theme.subColor};
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    color: ${(props) => props.theme.textColor};
    width: 80%;
    max-width: 400px;
    overflow: hidden;
  `,
  ModalTitle: styled.h2`
    margin-bottom: 20px;
  `,
  ExerciseList: styled.div`
    margin-bottom: 20px;
    height: 120px; /* 운동 목록 3개가 보이도록 가운데 상-하 1개씩 */
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    position: relative;
  `,
  Exercise: styled.div<{ selected: boolean; disabled: boolean }>`
    margin: 10px 0;
    font-size: ${(props) => (props.selected ? '24px' : '16px')};
    font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
    color: ${(props) => (props.selected ? props.theme.mainColor : props.theme.textColor2)};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
    transition:
      font-size 0.3s,
      font-weight 0.3s,
      color 0.3s;
  `,
  Counter: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  `,
  CounterBtn: styled.button<{ disabled: boolean }>`
    background-color: ${(props) => (props.disabled ? props.theme.textColor2 : props.theme.btnTextColor)};
    color: ${(props) => props.theme.textColor};
    border: none;
    padding: 10px;
    font-size: 18px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  `,
  CounterInput: styled(Input)`
    margin: 0 20px;
    font-size: 24px;
    width: 50px;
    text-align: center;
    border: 1px solid ${(props) => props.theme.mainColor};
    border-radius: 5px;
  `,
  ConfirmBtn: styled.button`
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.btnTextColor};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
  `,
};

interface TrainingSettingsModalProps {
  onClose: () => void;
}

const SettingModal: React.FC<TrainingSettingsModalProps> = ({ onClose }) => {
  const [counter, setCounter] = useState<string>('1'); // 운동 기본횟수 1회
  // 운동 목록
  const exercises = ['------------', '데드리프트', '스쿼트', '벤치프레스', ' ------------ '];
  // 기본 설정 스쿼트
  const [selectedExercise, setSelectedExercise] = useState('스쿼트');
  const listRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0); // 터치 시작 지점을 저장하기 위한 Ref

  // 선택된 운동을 중앙으로 이동시키는 함수
  const scrollToCenter = (index: number) => {
    const listElement = listRef.current;
    if (listElement) {
      const itemHeight = listElement.clientHeight / 3;
      const offset = itemHeight * index;
      listElement.scrollTo({
        top: offset - itemHeight,
        behavior: 'smooth',
      });
    }
  };

  // 선택된 운동을 중앙으로
  useEffect(() => {
    // 선택된 운동의 인덱스를 찾는 인덱스
    const idx = exercises.indexOf(selectedExercise);
    // 해당 운동을 중앙으로
    scrollToCenter(idx);
  }, [selectedExercise]);

  useEffect(() => {
    const listElement = listRef.current;

    const handleScroll = (direction: number) => {
      const currentIdx = exercises.indexOf(selectedExercise);
      const newIdx = currentIdx + direction;

      if (newIdx >= 1 && newIdx <= exercises.length - 2) {
        setSelectedExercise(exercises[newIdx]);
        scrollToCenter(newIdx);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      handleScroll(direction);
    };

    const handleTouchStart = (e: TouchEvent) => {
      startY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endY = e.changedTouches[0].clientY;
      const direction = startY.current - endY > 0 ? 1 : -1;
      handleScroll(direction);
    };

    if (listElement) {
      listElement.addEventListener('wheel', handleWheel, { passive: false });
      listElement.addEventListener('touchstart', handleTouchStart, { passive: false });
      listElement.addEventListener('touchend', handleTouchEnd, { passive: false });
    }

    return () => {
      if (listElement) {
        listElement.removeEventListener('wheel', handleWheel);
        listElement.removeEventListener('touchstart', handleTouchStart);
        listElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [selectedExercise, exercises]);

  const handleConfirm = () => {
    const count = parseInt(counter, 10);
    if (!isNaN(count) && count >= 1 && count <= 15) {
      alert(`${selectedExercise} ${count}회 시작합니다.`);
      onClose();
    } else {
      alert('1에서 15 사이의 숫자를 입력하세요.');
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCounterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // 빈 값이나 숫자만 허용
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      // 입력값이 1~15 범위를 벗어나지 않도록 제한
      const numericValue = parseInt(value, 10);
      if (numericValue < 1) {
        value = '1';
      } else if (numericValue > 15) {
        value = '15';
      }
      setCounter(value);
    }
  };

  const handleIncrement = () => {
    setCounter((prev) => {
      const currentValue = prev === '' ? 1 : parseInt(prev, 10);
      return String(Math.min(15, currentValue + 1));
    });
  };

  const handleDecrement = () => {
    setCounter((prev) => {
      const currentValue = prev === '' ? 1 : parseInt(prev, 10);
      return String(Math.max(1, currentValue - 1));
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <s.ModalOverlay onClick={handleOverlayClick}>
      <s.ModalContent onClick={(e) => e.stopPropagation()}>
        <s.ModalTitle children="트레이닝 설정" />
        <s.ExerciseList ref={listRef}>
          {exercises.map((exercise, index) => (
            <s.Exercise
              key={exercise}
              selected={exercise === selectedExercise}
              disabled={index === 0 || index === exercises.length - 1}
              onClick={() => {
                if (index !== 0 && index !== exercises.length - 1) {
                  setSelectedExercise(exercise);
                  scrollToCenter(index);
                }
              }}
            >
              {exercise}
            </s.Exercise>
          ))}
        </s.ExerciseList>
        <s.Counter>
          <s.CounterBtn onClick={handleDecrement} disabled={counter === '1'} children="-" />
          <s.CounterInput type="text" value={counter} onChange={handleCounterChange} />
          <s.CounterBtn onClick={handleIncrement} disabled={counter === '15'} children="+" />
        </s.Counter>
        <s.ConfirmBtn onClick={handleConfirm} children="시작하기" />
      </s.ModalContent>
    </s.ModalOverlay>
  );
};

export default SettingModal;
