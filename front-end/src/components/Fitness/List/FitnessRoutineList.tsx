import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from '../../Common/Text';
import IconSvg from '../../Common/IconSvg';
import { ReactComponent as jjimOn } from '../../../asset/img/svg/jjimOn.svg';
import { ReactComponent as jjimOff } from '../../../asset/img/svg/jjimOff.svg';
import { ReactComponent as trash } from '../../../asset/img/svg/trash.svg';
import { useNavigate } from 'react-router';
import { RoutineList } from '../../../util/types/axios-fitness';
import { delRoutine, getRoutineList, putRoutineJjim } from '../../../lib/api/fitness-api';

const s = {
  Container: styled.div`
    height: 100%;
    padding: 60px 0 60px;
    overflow: auto;
  `,
  ListBoxArea: styled.div``,
  ListArea: styled.div`
    width: 80%;
    height: 60px;
    margin: 10px auto;
    display: flex;
    align-items: center;
  `,
  ContentArea: styled.div`
    width: 80%;
    height: 100%;

    display: flex;
    flex-direction: column;
    cursor: pointer;
  `,
  IconArea: styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  ListLine: styled.hr`
    width: 80%;
    background: #212121;
    height: 1px;
    border: 0;
  `,
};
const FitnessRoutineList = (): JSX.Element => {
  const navigate = useNavigate();
  const [routine, setRoutine] = useState<RoutineList[]>([]);
  const handleClickMove = (id: number): void => {
    navigate('detail', { state: { id } });
  };

  useEffect(() => {
    getRoutineList(
      (resp) => {
        setRoutine(resp.data);
      },
      (error) => {
        setRoutine([]);
      },
    );
  }, []);

  const handleDeleteRoutine = async (id: number) => {
    if (window.confirm('해당 루틴으로 오운완 피드를 올리셨다면 피드도 같이 삭제됩니다. 그래도 삭제하시겠습니까?')) {
      await delRoutine(
        id,
        (resp) => {
          setRoutine((prevRoutine) => prevRoutine.filter((item) => item.id !== id));
        },
        (error) => {
          alert('잠시 후 다시 시도해주세요.');
        },
      );
    }
  };

  const handleRoutineJjim = async (id: number) => {
    await putRoutineJjim(
      id,
      (resp) => {
        setRoutine((prevRoutine) => prevRoutine.map((item) => (item.id === id ? { ...item, like: !item.like } : item)));
      },
      (error) => {
        alert('잠시 후 다시 시도해주세요.');
      },
    );
  };
  return (
    <s.Container>
      {routine.length > 0 ? (
        routine.map((data, index) => (
          <s.ListBoxArea key={index}>
            <s.ListArea>
              <s.ContentArea onClick={() => handleClickMove(data.id)}>
                <Text
                  width="100%"
                  children={data.title}
                  color="textColor"
                  size="16px"
                  bold="700"
                  margin="10px"
                  cursor="pointer"
                />
                <Text
                  width="100%"
                  children={data.dueDate}
                  color="textColor2"
                  size="14px"
                  bold="700"
                  margin="0 0 0 10px"
                  cursor="pointer"
                />
              </s.ContentArea>
              {data.like ? (
                <s.IconArea>
                  <IconSvg width="25" height="25" Ico={jjimOn} onClick={() => handleRoutineJjim(data.id)} />
                </s.IconArea>
              ) : (
                <s.IconArea>
                  <IconSvg width="25" height="25" Ico={jjimOff} onClick={() => handleRoutineJjim(data.id)} />
                </s.IconArea>
              )}
              <s.IconArea>
                <IconSvg width="25" height="25" Ico={trash} onClick={() => handleDeleteRoutine(data.id)} />
              </s.IconArea>
            </s.ListArea>
            {index + 1 === routine?.length || <s.ListLine />}
            {/* <s.ListLine /> */}
          </s.ListBoxArea>
        ))
      ) : (
        <Text children="목록이 없습니다." width="90%" margin="20px auto" display="block" />
      )}
    </s.Container>
  );
};

export default FitnessRoutineList;
