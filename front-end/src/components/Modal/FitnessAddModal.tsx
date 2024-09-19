import React, { useState } from 'react';
import styled from 'styled-components';
import Image from '../Common/Image';
import IconSvg from '../Common/IconSvg';
import { ReactComponent as jjimOn } from '../../../asset/img/svg/jjimOn.svg';
import { ReactComponent as jjimOff } from '../../../asset/img/svg/jjimOff.svg';
import { ReactComponent as addOff } from '../../../asset/img/svg/pickOff.svg';
import { ReactComponent as addOn } from '../../../asset/img/svg/pickOn.svg';
import { useNavigate } from 'react-router';
import { CreateRoutine, FitnessType } from '../../util/types/axios-fitness';
import ReactModal from 'react-modal';

const s = {
  Container: styled.section`
    width: 100%;
    flex: 1;
  `,
  title: styled.div`
    width: 90%;
    height: fit-content;
    margin: 10px auto;
    color: ${(props) => props.theme.textColor2};
    font-size: 14px;
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
  text: string;
  add: CreateRoutine[];
  onAdd: Function;
  data: FitnessType[];
}

const FitnessAddModal = (props: FitnessListProps): JSX.Element => {
  const navigate = useNavigate();
  // const [add, setAdd] = useState<number[]>([]);
  const handleClickMove = async (id: number) => {
    navigate('detail', { state: { id } });
  };

  return (
    <ReactModal
      // isOpen={props.open}
      ariaHideApp={false}
      // onRequestClose={() => props.onModal()}
      overlayClassName="Overlay"
      className="CommentModal"
    >
      <s.Container>
        <s.title>{props.text}</s.title>
        {props.data.map((data, index) => (
          <div key={index}>
            <s.ListArea>
              <s.ContentArea onClick={() => handleClickMove(data.id)}>
                <Image width="60" height="60" type="" src={data.image} />
                <s.FitnessTitle>{data.name}</s.FitnessTitle>
              </s.ContentArea>
              <s.IconArea>
                <IconSvg width="25" height="25" Ico={jjimOff} color="#ccff33" cursor="pointer" />
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
    </ReactModal>
  );
  // }
};

export default FitnessAddModal;
