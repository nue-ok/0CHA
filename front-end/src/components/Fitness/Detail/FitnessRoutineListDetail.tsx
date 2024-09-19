import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as off } from '../../../asset/img/svg/pickOff.svg';
import { ReactComponent as on } from '../../../asset/img/svg/pickOn.svg';
import IconSvg from '../../Common/IconSvg';
import Text from '../../Common/Text';
import { getRoutineDetail } from '../../../lib/api/fitness-api';
import { useLocation } from 'react-router';
import { RoutineDetails } from '../../../util/types/axios-fitness';

const s = {
  Container: styled.section`
    width: 100%;
  `,
  PlanHeaderArea: styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    color: ${(props) => props.theme.textColor};
    margin: 0 auto 10px;
  `,
  DeleteText: styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
  `,
  PlanTable: styled.table`
    width: 80%;
    color: ${(props) => props.theme.textColor};
    text-align: center;
    margin: 30px auto;
  `,
  TableHead: styled.thead`
    font-size: 14px;
  `,
  TableBody: styled.tbody``,
  Th: styled.th``,
  Tr: styled.tr``,
  Td: styled.td`
    vertical-align: middle;
    width: 20%;
    padding: 5px;
  `,

  SetBtnArea: styled.div`
    width: 70%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  PlanSetBtn: styled.div`
    font-size: 14px;
    width: 100px;
    text-align: center;
    line-height: 40px;
    height: 40px;
    color: ${(props) => props.theme.mainColor};
    cursor: pointer;
  `,
  ListLine: styled.hr`
    width: 90%;
    background: #212121;
    height: 1px;
    border: 0;
    margin: 20px auto;
  `,
};
// type ExerciseType = {
//   name: string;
//   detail: ExerciseDetailType[];
// };

// type ExerciseDetailType = {
//   id: number;
//   set: number;
//   weight: number;
//   count: number;
//   is_complete: boolean;
// };
// interface FitnessDataProps {
//   exercise: ExerciseType[];
// }

interface RoutineDetailProps {
  exercise: RoutineDetails[];
}

const FitnessRoutineListDetail = (props: RoutineDetailProps): JSX.Element => {
  const id = useLocation().state?.id;
  useEffect(() => {
    getRoutineDetail(
      id,
      (resp) => {},
      (error) => {},
    );
  });
  return (
    <>
      {props.exercise.map((data, index) => (
        <s.Container key={index}>
          <Text
            children={index + 1 + '. ' + data.exerciseName}
            width="85%"
            size="18px"
            bold="600"
            display="block"
            margin="0 auto 10px"
          />
          <s.PlanTable>
            <s.TableHead>
              <s.Tr>
                <s.Th>세트</s.Th>
                <s.Th>무게</s.Th>
                <s.Th>횟수</s.Th>
                <s.Th>완료</s.Th>
              </s.Tr>
            </s.TableHead>
            <s.TableBody>
              {data.sets.map((data, index) => (
                <s.Tr key={index}>
                  <s.Td>{data.sequence}</s.Td>
                  <s.Td>
                    <Text children={data.weight} width="50px" size="18px" bold="700" textalian="center" />
                  </s.Td>
                  <s.Td>
                    <Text children={data.count} width="50px" size="18px" bold="700" textalian="center" />
                  </s.Td>
                  <s.Td>
                    {data.complete ? (
                      <IconSvg width="30" height="30" Ico={on} cursor="pointer" />
                    ) : (
                      <IconSvg width="30" height="30" Ico={off} cursor="pointer" />
                    )}
                  </s.Td>
                </s.Tr>
              ))}
            </s.TableBody>
          </s.PlanTable>
          {index + 1 === props.exercise?.length || <s.ListLine />}
        </s.Container>
      ))}
    </>
  );
};

export default FitnessRoutineListDetail;
