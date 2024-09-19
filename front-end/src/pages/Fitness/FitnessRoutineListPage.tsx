import React from 'react';
import styled from 'styled-components';
import FitnessRoutineList from '../../components/Fitness/List/FitnessRoutineList';
import Header from '../../components/Common/Header';
import BottomNav from '../../components/Common/BottomNav';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    overflow: auto;
  `,
};

const FitnessRoutineListPage = (): JSX.Element => {
  return (
    <>
      <Header text="루틴목록"></Header>
      <s.Container>
        <FitnessRoutineList />
        <BottomNav />
      </s.Container>
    </>
  );
};

export default FitnessRoutineListPage;
