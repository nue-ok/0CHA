import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../../components/Common/Input';
import ReactModal from 'react-modal';
import FitnessModalList from '../Fitness/List/FitnessModalList';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { fitnessActions, selectAddList } from '../../store/fitness';
import { getFitnessList } from '../../lib/api/fitness-api';
import { CreateRoutine, FitnessType } from '../../util/types/axios-fitness';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
  HeaderArea: styled.div`
    width: 100%;
    max-width: 800px;
    position: fixed;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    height: 100%;
    padding: 120px 0 10px;
  `,
  InputArea: styled.div`
    width: 80%;
    margin: 10px auto;
  `,
  FitnessArea: styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;
  `,
  btnArea: styled.div`
    width: 90%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
  `,
  Btn: styled.button`
    width: 169px;
    height: 40px;
    font-size: 14px;
    font-weight: 500;
    margin: 10px auto;
    display: block;
    background-color: ${(props) => props.theme.mainColor};
    border-radius: 10px;
  `,
};

interface FitnessPlanModalProps {
  open: boolean;
  onModal: Function;
}

const FitnessAddListModal = (props: FitnessPlanModalProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const addList = useAppSelector(selectAddList);
  const [fitness, setFitness] = useState<FitnessType[]>([]);
  const [filteredFitness, setFilteredFitness] = useState<FitnessType[]>([]);
  const [search, setSearch] = useState<string>('');

  // Store the initial state when the modal opens
  const [initialAddList, setInitialAddList] = useState<CreateRoutine[]>([]);

  useEffect(() => {
    if (props.open) {
      setInitialAddList(addList); // Save the initial state when the modal opens
    }

    getFitnessList(
      (resp) => {
        setFitness(resp.data);
        setFilteredFitness(resp.data); // Show all data initially
      },
      (error) => {
        setFitness([]);
        setFilteredFitness([]);
      },
    );
  }, [props.open, addList]);

  const [add, setAdd] = useState<CreateRoutine[]>(addList || []);

  const handleClickAdd = (exerciseId: number, exerciseName: string) => {
    setAdd((prevAdd) => {
      const existingItem = prevAdd.find((item) => item.exerciseId === exerciseId);
      if (existingItem) {
        // Remove item if it already exists
        return prevAdd.filter((item) => item.exerciseId !== exerciseId);
      } else {
        // Add new item
        return [...prevAdd, { exerciseId, exerciseName }];
      }
    });
  };

  const handleClickMove = (): void => {
    dispatch(fitnessActions.setAddList(add)); // Commit changes
    props.onModal();
  };

  const handleCancelMove = (): void => {
    setAdd(initialAddList); // Revert changes
    props.onModal();
  };

  useEffect(() => {
    // Filter data based on search input
    const searchLower = search.toLowerCase();
    setFilteredFitness(fitness.filter((item) => item.name.toLowerCase().includes(searchLower)));
  }, [search, fitness]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <ReactModal
      isOpen={props.open}
      ariaHideApp={false}
      onRequestClose={() => props.onModal()}
      className="FitnessCalendarModal"
      overlayClassName="Overlay"
    >
      <s.Container>
        <s.HeaderArea>
          <s.InputArea>
            <Input
              width="100%"
              height="40px"
              placeholder="검색"
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
            />
          </s.InputArea>
        </s.HeaderArea>
        <s.MainArea>
          <s.FitnessArea>
            <FitnessModalList text="전체" data={filteredFitness} add={add} onAdd={handleClickAdd} />
          </s.FitnessArea>
          <s.btnArea>
            <s.Btn onClick={handleCancelMove}>돌아가기</s.Btn>
            <s.Btn onClick={handleClickMove}>루틴에 추가하기</s.Btn>
          </s.btnArea>
        </s.MainArea>
      </s.Container>
    </ReactModal>
  );
};

export default FitnessAddListModal;
