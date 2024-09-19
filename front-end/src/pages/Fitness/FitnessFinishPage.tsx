import React from 'react';
import styled from 'styled-components';
import { ReactComponent as finish } from '../../asset/img/svg/finish.svg';
import Text from '../../components/Common/Text';
import IconSvg from '../../components/Common/IconSvg';
import Button from '../../components/Common/Button';
import { useLocation, useNavigate } from 'react-router';
import { FinishProps } from '../../util/types/axios-fitness';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { fitnessActions, selectPlan, selectTime, selectVolume } from '../../store/fitness';
const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  MainArea: styled.div`
    position: relative;
    top: 15%;
  `,
  IconArea: styled.div`
    width: fit-content;
    margin: 0 auto 60px;
  `,
  ContentArea: styled.div`
    width: 280px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin: 5px auto;
  `,
  BtnArea: styled.div`
    width: 100%;
    max-width: 500px;
    height: 70px;
    position: relative;
    top: 30%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};

const FitnessFinishPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const data: FinishProps = useLocation().state?.data;
  const t = useAppSelector(selectTime);
  const volume = useAppSelector(selectVolume);
  const plan = useAppSelector(selectPlan);

  const handleClickMove = (path: string): void => {
    dispatch(fitnessActions.setFinish());
    navigate(path);
  };

  const formatSecondsToHHMMSS = (seconds: number): string => {
    // 시 계산
    const hours = Math.floor(seconds / 3600);
    // 남은 초를 이용하여 분 계산
    const minutes = Math.floor((seconds % 3600) / 60);
    // 남은 초 계산
    const secs = seconds % 60;

    // 두 자리 수로 변환하여 HH:MM:SS 형식으로 문자열 반환
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  const time = formatSecondsToHHMMSS(t);

  return (
    <s.Container>
      <s.MainArea>
        <Text
          width="150px"
          textalian="center"
          children="운동 완료"
          bold="800"
          size="32px"
          color="mainColor"
          display="block"
          margin="0 auto 20px"
        />
        <s.IconArea>
          <IconSvg width="50" height="50" Ico={finish} />
        </s.IconArea>
        <Text
          width="80%"
          textalian="center"
          children="오늘의 루틴을 완료했어요."
          size="18px"
          color="textColor"
          display="block"
          margin="20px auto 0"
        />
        <Text
          width="80%"
          textalian="center"
          children="지금 피드에 업로드해보세요."
          size="18px"
          color="textColor"
          display="block"
          margin="5px auto 60px"
        />
        <Text
          width="280px"
          textalian="left"
          children={plan.dueDate}
          size="16px"
          color="textColor2"
          display="block"
          margin="0 auto"
        />
        <s.ContentArea>
          <Text width="50%" textalian="left" children="운동 시간" size="18px" color="textColor" />
          <Text width="50%" textalian="right" children={time} size="18px" color="textColor" bold="bold" />
        </s.ContentArea>
        <s.ContentArea>
          <Text width="50%" textalian="left" children="운동량" size="18px" color="textColor" />
          <Text width="50%" textalian="right" children={`${volume} kg`} size="18px" color="textColor" bold="bold" />
        </s.ContentArea>
      </s.MainArea>
      <s.BtnArea>
        <Button
          width="170px"
          height="40px"
          children="확인"
          onClick={() => handleClickMove('/record')}
          bold="500"
          size="14px"
          margin="10px"
        />
        <Button
          width="170px"
          height="40px"
          children="업로드"
          onClick={() => handleClickMove('/sns/feed/write')}
          bold="500"
          size="14px"
          type="main"
          margin="10px"
        />
      </s.BtnArea>
    </s.Container>
  );
};

export default FitnessFinishPage;
