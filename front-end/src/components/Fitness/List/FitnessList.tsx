import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from '../../Common/Image';
import IconSvg from '../../Common/IconSvg';
import basic from '../../../asset/img/testImg.png';
import { ReactComponent as jjimOn } from '../../../asset/img/svg/jjimOn.svg';
import { ReactComponent as jjimOff } from '../../../asset/img/svg/jjimOff.svg';
import { ReactComponent as addOff } from '../../../asset/img/svg/pickOff.svg';
import { ReactComponent as addOn } from '../../../asset/img/svg/pickOn.svg';
import { useNavigate } from 'react-router';
import { CreateRoutine, FitnessType } from '../../../util/types/axios-fitness';
import Text from '../../Common/Text';
import { deleteFitnessJjimCancel, postFitnessJjim } from '../../../lib/api/fitness-api';

const s = {
  Container: styled.section`
    width: 100%;
    flex: 1;
  `,
  ListArea: styled.div`
    width: 90%;
    height: 60px;
    margin: 10px auto;
    display: flex;
  `,
  ContentArea: styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  `,
  IconArea: styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  FitnessTitle: styled.span`
    font-size: 16px;
    color: ${(props) => props.theme.textColor};
    margin-left: 30px;
  `,
  ListLine: styled.hr`
    width: 90%;
    background: #212121;
    height: 1px;
    border: 0;
  `,
};

interface FitnessListProps {
  add: CreateRoutine[];
  onAdd: Function;
  data: FitnessType[];
  jjim: boolean;
  onJjim: Function;
}

const FitnessList = (props: FitnessListProps): JSX.Element => {
  const navigate = useNavigate();
  // const [add, setAdd] = useState<number[]>([]);
  const handleClickMove = async (id: number) => {
    navigate('detail', { state: { id } });
  };

  const handleClickJjim = async (id: number) => {
    await postFitnessJjim(
      id,
      (resp) => {
        props.onJjim(!props.jjim);
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
  };
  const handleClickNotJjim = async (id: number) => {
    await deleteFitnessJjimCancel(
      id,
      (resp) => {
        props.onJjim(!props.jjim);
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
  };

  if (!Array.isArray(props.data)) {
    return (
      <>
        <Text children="목록이 없습니다." width="80%" margin="20px auto" display="block" />
      </>
    );
  }

  const basicUrl = 'https://i11b310.p.ssafy.io/images/';

  // 이미지 경로를 파싱하여 basicUrl과 결합하는 함수
  const getParsedImageUrl = (imagePath: string) => {
    if (imagePath.length >= 200) {
      return imagePath;
    }
    if (imagePath) {
      const relativePath = imagePath.split('/home/ubuntu/images/')[1];
      return basicUrl + relativePath;
    } else {
      return basic;
    }
  };

  return (
    <s.Container>
      {props.data.map((data, index) => (
        <div key={index}>
          <s.ListArea>
            <s.ContentArea onClick={() => handleClickMove(data.id)}>
              <Image width="60" height="60" type="" src={getParsedImageUrl(data.image)} />
              <s.FitnessTitle>{data.name}</s.FitnessTitle>
            </s.ContentArea>
            <s.IconArea>
              {data.like ? (
                <IconSvg
                  width="25"
                  height="25"
                  Ico={jjimOn}
                  color="#ccff33"
                  cursor="pointer"
                  onClick={() => handleClickNotJjim(data.id)}
                />
              ) : (
                <IconSvg
                  width="25"
                  height="25"
                  Ico={jjimOff}
                  color="#ccff33"
                  cursor="pointer"
                  onClick={() => handleClickJjim(data.id)}
                />
              )}

              {props.add.some((item) => item.exerciseId === data.id) ? (
                <IconSvg
                  width="25"
                  height="25"
                  Ico={addOn}
                  color="#ccff33"
                  cursor="pointer"
                  onClick={() => props.onAdd(data.id, data.name)}
                />
              ) : (
                <IconSvg
                  width="25"
                  height="25"
                  Ico={addOff}
                  color="#ccff33"
                  cursor="pointer"
                  onClick={() => props.onAdd(data.id, data.name)}
                />
              )}
            </s.IconArea>
          </s.ListArea>
          {index + 1 === props.data?.length || <s.ListLine />}
        </div>
      ))}
    </s.Container>
  );
  // }
};

export default FitnessList;
