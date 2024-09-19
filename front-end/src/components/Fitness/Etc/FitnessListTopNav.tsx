import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../lib/hook/useReduxHook';
import { fitnessActions, selectFitnessType } from '../../../store/fitness';

const s = {
  Container: styled.section`
    width: 100%;
    height: 55px !important;
    display: flex;
    justify-content: space-between;
  `,
  SelectArea: styled.button`
    width: 100%;
    color: ${(props) => props.color || props.theme.textColor};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 3px solid ${(props) => props.color || '#000'};
    &:hover {
      color: ${(props) => props.theme.mainColor};
      border-bottom: 3px solid ${(props) => props.theme.mainColor};
    }
  `,
};

const FitnessListTopNav = (): JSX.Element => {
  const type = useAppSelector(selectFitnessType);
  const dispatch = useAppDispatch();
  const handleClickIcon = (mode: string) => {
    dispatch(fitnessActions.changeFitnessType(mode));
  };

  const getColor = (mode: string) => {
    return type === mode ? '#ccff33' : undefined;
  };
  return (
    <s.Container>
      <s.SelectArea onClick={() => handleClickIcon('전체')} color={getColor('전체')}>
        전체
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('가슴')} color={getColor('가슴')}>
        가슴
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('등')} color={getColor('등')}>
        등
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('하체')} color={getColor('하체')}>
        하체
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('어깨')} color={getColor('어깨')}>
        어깨
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('팔')} color={getColor('팔')}>
        팔
      </s.SelectArea>
      <s.SelectArea onClick={() => handleClickIcon('기타')} color={getColor('기타')}>
        기타
      </s.SelectArea>
    </s.Container>
  );
};

export default FitnessListTopNav;
