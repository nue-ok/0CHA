import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import { ReactComponent as add } from '../../asset/img/svg/add.svg';
import IconSvg from '../../components/Common/IconSvg';
import Button from '../../components/Common/Button';
import BottomNav from '../../components/Common/BottomNav';
import FitnessPlanSetModal from '../../components/Modal/FitnessPlanSetModal';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { modalActions, selectModalAddList, selectModalCalendar } from '../../store/modal';
import { useModalExitHook } from '../../lib/hook/useModalExitHook';
import { axiosCreateRoutine, ExerciseDetailType } from '../../util/types/axios-fitness';
import Text from '../../components/Common/Text';
import { putNewRoutine } from '../../lib/api/fitness-api';
import { RoutineListDetail, RoutineDetails } from '../../util/types/axios-fitness';
import TestPlan from '../../components/Fitness/Detail/TestPlan';
import { pageActions } from '../../store/page';
import { fitnessActions, selectAddList } from '../../store/fitness';
import FitnessAddListModal from '../../components/Modal/FitnessAddListModal';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  ContentArea: styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 57px 0 80px;
  `,
  DateArea: styled.div`
    color: ${(props) => props.theme.textColor2};
    font-size: 16px;
    width: 200px;
    height: 50px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px auto;
    cursor: pointer;
  `,
  FitnessArea: styled.div`
    width: 90%;
    margin: 0 auto;
  `,
  FitnessAdd: styled.div`
    width: 100px;
    height: 60px;
    margin: 20px auto;
    color: ${(props) => props.theme.mainColor};
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
  `,
  BtnArea: styled.div`
    width: 100%;
    max-width: 500px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const TestPlanSetPage = (): JSX.Element => {
  const navigate = useNavigate();
  const addListData = useAppSelector(selectAddList);
  const locationState = useLocation().state;
  const historyData = locationState?.data as RoutineListDetail;

  const [title, setTitle] = useState('이름과 날짜를 지정해주세요.');
  const [date, setDate] = useState('');

  // 불러오기를 안하면 fitness는 공란
  const [fitness, setFitness] = useState<RoutineDetails[]>(historyData?.details || []);

  const dispatch = useAppDispatch();
  const isModal = useAppSelector(selectModalCalendar);
  const isAddList = useAppSelector(selectModalAddList);

  // Effect to handle adding new exercises
  useEffect(() => {
    if (addListData.length > 0) {
      // Filter out exercises that are already in the fitness state
      const newExercises = addListData.filter(
        (exercise) => !fitness.some((fit) => fit.exerciseId === exercise.exerciseId),
      );

      // Only update state if there are new exercises
      if (newExercises.length > 0) {
        setFitness((prevFitness) => [
          ...prevFitness,
          ...newExercises.map((exercise) => ({ ...exercise, sequence: prevFitness.length, sets: [] })),
        ]);
      }
    }
  }, [addListData]);

  // Effect to handle loading a new routine
  useEffect(() => {
    if (historyData?.details) {
      if (!historyData.complete) {
        setTitle(historyData.title);
        setDate(historyData.dueDate);
      }
      setFitness(historyData.details);
    }
  }, [historyData]);

  const handleChangeOpen = (): void => {
    dispatch(modalActions.toggleCalendar());
  };

  const handleChangeAddListOpen = (): void => {
    dispatch(modalActions.toggleAddList());
  };

  const handleClickMove = (path: string): void => {
    if (window.confirm('작성중인 루틴이 삭제됩니다. 그래도 진행하시겠습니까?')) {
      navigate(path);
    }
  };

  const handleDeleteExercise = (index: number): void => {
    const updatedFitness = fitness.filter((_, idx) => idx !== index);
    setFitness(updatedFitness);
  };

  const handleSetChange = (exerciseIndex: number, updatedSets: ExerciseDetailType[]) => {
    const updatedFitness = fitness.map((exercise, idx) => {
      if (idx === exerciseIndex) {
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });
    setFitness(updatedFitness);
  };

  const handleSaveRoutine = async () => {
    if (fitness.length === 0) {
      alert('운동이 없습니다.');
      return;
    }
    const day = new Date();
    const today =
      day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
    if (date === '') {
      alert('제목과 날짜를 선택해주세요.');
    } else {
      const param: axiosCreateRoutine = {
        title: title,
        dueDate: date,
        details: fitness,
      };
      await putNewRoutine(
        param,
        (resp) => {
          alert('저장완료');
          navigate('/fitness');
        },
        (error) => {
          alert('저장 중 오류');
        },
      );
    }
  };

  const handlePlay = async () => {
    if (fitness.length === 0) {
      alert('운동이 없습니다.');
      return;
    }
    for (const exercise of fitness) {
      if (exercise.sets.length === 0) {
        alert(`${exercise.exerciseName}의 세트를 설정해주세요.`);
        return;
      }
      for (const set of exercise.sets) {
        if (set.count === '' || set.count <= 0) {
          alert(`${exercise.exerciseName}의 세트에 유효한 횟수를 입력해주세요.`);
          return;
        }
        if (set.weight === '' || set.weight < 0) {
          alert(`${exercise.exerciseName}의 세트에 유효한 무게를 입력해주세요.`);
          return;
        }
      }
    }
    const day = new Date();
    const today =
      day.getFullYear() + '-' + ('0' + (1 + day.getMonth())).slice(-2) + '-' + ('0' + day.getDate()).slice(-2);
    if (date === '') {
      alert('제목과 날짜를 선택해주세요.');
    } else if (date !== today) {
      alert('운동시작은 당일만 가능합니다.');
    } else {
      const param: axiosCreateRoutine = {
        title: title,
        dueDate: date,
        details: fitness.map((exercise) => ({
          ...exercise,
          sets: exercise.sets.map((set) => ({
            ...set,
            complete: false,
          })),
        })),
      };
      dispatch(fitnessActions.saveTime(0));
      dispatch(fitnessActions.setPlanData(param));
      await putNewRoutine(
        param,
        (resp) => {
          dispatch(pageActions.toogleIsPlay(true));
          dispatch(fitnessActions.setPlanId(resp.data.routineId));
          navigate('../../play');
        },
        (error) => {
          alert('잠시 후 다시시도해주세요.');
          navigate('/fitness');
        },
      );
    }
  };

  const handleExitModal = (): void => {
    dispatch(modalActions.toggleAddList());
  };

  useModalExitHook();

  return (
    <s.Container>
      <Header text="새루틴" onBack={() => navigate('../list')}>
        <Button
          width="80px"
          height="40px"
          children="불러오기"
          onClick={() => handleClickMove('../history')}
          size="14px"
          margin="0 20px 0 0"
        />
      </Header>
      <s.ContentArea>
        <s.DateArea onClick={handleChangeOpen}>
          {title}
          <Text
            children={date}
            margin="0 auto"
            size="16px"
            bold="500"
            textalian="center"
            display="block"
            color="textColor2"
            cursor="pointer"
          />
        </s.DateArea>

        <s.FitnessArea>
          {fitness.map((exercise, index) => (
            <div key={index}>
              <TestPlan
                exercise={exercise}
                index={index}
                onChangeSet={handleSetChange}
                onDelete={() => handleDeleteExercise(index)}
              />
            </div>
          ))}
        </s.FitnessArea>
        <s.FitnessAdd onClick={handleChangeAddListOpen}>
          운동 추가
          <IconSvg width="24" height="24" Ico={add} />
        </s.FitnessAdd>
        <s.BtnArea>
          <Button
            width="170px"
            height="40px"
            children="루틴 저장"
            onClick={handleSaveRoutine}
            bold="500"
            size="14px"
            margin="10px"
          />
          <Button
            width="170px"
            height="40px"
            children="운동시작"
            onClick={handlePlay}
            bold="500"
            size="14px"
            type="main"
            margin="10px"
          />
        </s.BtnArea>
      </s.ContentArea>
      <BottomNav />
      <FitnessPlanSetModal open={isModal} onModal={handleChangeOpen} onTitle={setTitle} onDate={setDate} />
      <FitnessAddListModal open={isAddList} onModal={handleExitModal} />
    </s.Container>
  );
};

export default TestPlanSetPage;
