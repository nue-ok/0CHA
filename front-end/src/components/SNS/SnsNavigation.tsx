import React, { useEffect } from 'react';
import styled from 'styled-components';

import Button from '../Common/Button';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../lib/hook/useReduxHook';
import { pageActions, selectSnsType } from '../../store/page';

import { MyRoutine } from '../../lib/api/sns-api';

const s = {
  Container: styled.section`
    width: 100%;
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    background-color: #000000;
  `,
  NavigationSelect: styled.select`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: 600;
    background-color: #000000;
    border: none;
    line-height: 2;
    cursor: pointer;
    outline: none;
  `,
  NavigationOption: styled.option`
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  `,
};

const SnsNavigation = (): JSX.Element => {
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };

  const snsType = useAppSelector(selectSnsType);
  const dispatch = useAppDispatch();
  const handleChangeSnsType = () => {
    snsType === 'feed' ? dispatch(pageActions.changeSnsType('market')) : dispatch(pageActions.changeSnsType('feed'));
  };
  useEffect(() => {
    snsType === 'feed' ? navigate('../feed', { replace: true }) : navigate('../market', { replace: true });
  }, [snsType]);

  const isRoutineData = async () => {
    await MyRoutine(
      (resp) => {
        handleMovePage('write');
      },
      (error) => {
        if (error.response !== undefined) {
          if (error.response.data === '오늘 운동 안함') {
            alert('금일 운동을 완료하셔야 작성이 가능합니다.');
          }
        }
      },
    );
  };

  const createButtonClick = () => {
    if (snsType === 'market') {
      handleMovePage('write');
    } else {
      if (snsType === 'market') {
        handleMovePage('write');
      } else {
        isRoutineData();
      }
    }
  };

  return (
    <s.Container>
      <s.NavigationSelect value={snsType} onChange={handleChangeSnsType}>
        <s.NavigationOption value={'feed'}>운동</s.NavigationOption>
        <s.NavigationOption value={'market'}>거래</s.NavigationOption>
      </s.NavigationSelect>
      <Button
        width="45px"
        height="30px"
        type="main"
        children="작성"
        bold="500"
        size="12px"
        onClick={createButtonClick}
      />
    </s.Container>
  );
};

export default SnsNavigation;
