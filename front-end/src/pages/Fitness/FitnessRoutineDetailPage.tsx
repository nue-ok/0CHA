import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import Button from '../../components/Common/Button';
import BottomNav from '../../components/Common/BottomNav';
import FitnessRoutineListDetail from '../../components/Fitness/Detail/FitnessRoutineListDetail';
import { useLocation, useNavigate } from 'react-router';
import { getRoutineDetail } from '../../lib/api/fitness-api';
import { RoutineDetails, RoutineListDetail } from '../../util/types/axios-fitness';
const s = {
  Container: styled.div`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    padding: 60px 0 80px;
  `,
};

const FitnessRoutineDetatilPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [routine, setRoutine] = useState<RoutineListDetail>();
  const [details, setDetails] = useState<RoutineDetails[]>([]);
  const id = useLocation().state?.id;
  const handleClickMove = (): void => {
    navigate('../../plan', { state: { data: routine } });
  };

  useEffect(() => {
    getRoutineDetail(
      id,
      (resp) => {
        setRoutine(resp.data);
        setDetails(resp.data.details);
      },
      (error) => {},
    );
  }, []);

  // id로 루틴 상세조회해야하함
  return (
    <s.Container>
      <Header text={routine?.title}>
        <Button
          width="80px"
          height="40px"
          children="불러오기"
          onClick={handleClickMove}
          size="14px"
          margin="0 20px 0 0"
        />
      </Header>
      <s.MainArea>
        {/* <FitnessRoutineListDetail exercise={FitnessPlanData.exercise} /> */}
        <FitnessRoutineListDetail exercise={details} />
      </s.MainArea>
      <BottomNav />
    </s.Container>
  );
};

export default FitnessRoutineDetatilPage;
