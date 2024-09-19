import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import { useLocation, useNavigate } from 'react-router';
import {
  axiosCreateRoutine,
  ExerciseDetailType,
  RoutineDetails,
  RoutineListDetail,
} from '../../util/types/axios-fitness';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { pageActions } from '../../store/page';
import { delRoutine, putFinishRoutine, putUpdateRoutine } from '../../lib/api/fitness-api';
import FitnessPlayPlan from '../../components/Fitness/Detail/FitnessPlayPlan';
import { fitnessActions, selectPlan, selectSave, selectTime, selectVolume } from '../../store/fitness';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    padding: 60px 0 80px;
  `,
};

const FitnessPlayPage = (): JSX.Element => {
  const navigate = useNavigate();
  const isSave = useAppSelector(selectSave);
  const plan = useAppSelector(selectPlan);
  let planTest = { ...plan };
  const locationState = useLocation().state;
  const time = useAppSelector(selectTime);
  const volume = useAppSelector(selectVolume);

  const [fitness, setFitness] = useState<RoutineDetails[]>(planTest.details);

  useEffect(() => {
    save();
  }, [fitness]);

  const handleMoveMain = () => {
    dispatch(fitnessActions.toggleRest(false));
    dispatch(fitnessActions.toggleRestStack(false));
    navigate('/main');
  };

  // 운동 삭제
  const handleDeleteExercise = async (index: number) => {
    if (fitness.length === 1) {
      if (window.confirm('이 운동을 삭제하시면 오늘의 운동은 취소됩니다. 삭제하시겠습니까?')) {
        await delRoutine(
          planTest.id!,
          (resp) => {
            alert('취소되었습니다.');
            dispatch(pageActions.toogleIsPlay(false));
            dispatch(fitnessActions.setFinish());
          },
          (error) => {
            alert('잠시 후 다시 시도해주세요.');
          },
        );
        navigate('/main');
      }
      return;
    }
    const exerciseToDelete = fitness[index];

    // 완료된 세트가 있는지 확인
    const hasCompletedSet = exerciseToDelete.sets.some((set) => set.complete);

    if (hasCompletedSet) {
      alert('완료된 세트가 있어 삭제할 수 없습니다.');
      return;
    }
    const updatedFitness = fitness.filter((_, idx) => idx !== index);
    setFitness(updatedFitness);
  };

  // 세트 변경
  const handleSetChange = (exerciseIndex: number, updatedSets: ExerciseDetailType[]) => {
    const updatedFitness = fitness.map((exercise, idx) => {
      if (idx === exerciseIndex) {
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });
    setFitness(updatedFitness);
  };

  const save = () => {
    const param: axiosCreateRoutine = {
      id: planTest.id,
      title: planTest.title,
      dueDate: planTest.dueDate,
      sumTime: time,
      sumVolume: volume,
      details: fitness,
    };
    dispatch(fitnessActions.setPlanData(param));
    dispatch(fitnessActions.toggleSave(true));
  };

  // 피트니스 바텀 nav
  const dispatch = useAppDispatch();

  const handleFinish = (t: number) => {
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
    const param: axiosCreateRoutine = {
      title: planTest.title,
      dueDate: planTest.dueDate,
      sumTime: t,
      sumVolume: volume,
      details: fitness,
    };
    putUpdateRoutine(
      planTest.id!,
      param,
      (resp) => {
        putFinishRoutine(
          planTest.id!,
          (resp) => {
            dispatch(pageActions.toogleIsFinish(true));
            navigate('/play', {
              state: { data: { date: planTest.dueDate || planTest.dueDate, volume: volume, time: t } },
            });
          },
          (error) => {
            alert('잠시 후 다시 시도해주세요.(운동완료)');
          },
        );
      },
      (error) => {
        alert('잠시 후 다시 시도해주세요.(운동루틴수정)');
      },
    );
  };

  return (
    <s.Container>
      <Header text="운동" onBack={handleMoveMain} />
      <s.MainArea>
        {fitness.map((exercise, index) => (
          <div key={index}>
            <FitnessPlayPlan
              exercise={exercise}
              index={index}
              onChangeSet={handleSetChange}
              onDelete={() => handleDeleteExercise(index)}
              onFinish={handleFinish}
            />
          </div>
        ))}
      </s.MainArea>
    </s.Container>
  );
};

export default FitnessPlayPage;
