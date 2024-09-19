import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import IconSvg from '../../components/Common/IconSvg';
import { ReactComponent as jjimOn } from '../../asset/img/svg/jjimOn.svg';
import { ReactComponent as jjimOff } from '../../asset/img/svg/jjimOff.svg';
import BottomNav from '../../components/Common/BottomNav';
import Chart from '../../components/Common/Chart';
import {
  deleteFitnessJjimCancel,
  getFitnessJjimCheck,
  getFitnessListCategory,
  getFitnessMomentum,
  postFitnessJjim,
} from '../../lib/api/fitness-api';
import loading from '../../asset/img/loading.png';
import { useLocation } from 'react-router';
import { FitnessMomenthum, FitnessType } from '../../util/types/axios-fitness';
import Text from '../../components/Common/Text';

const s = {
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
  `,
  HeaderArea: styled.div`
    position: relative;
    z-index: 1000;
  `,
  IconArea: styled.div`
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  ContentArea: styled.div`
    width: 100%;
    height: 100%;
    padding: 57px 0 90px;
    overflow: auto;
  `,
  ImgArea: styled.div`
    position: relative;
    width: 80%;
    margin: 0 auto;
    border: 1px solid red;
    &::after {
      display: block;
      content: '';
      padding-bottom: 100%;
    }
  `,
  Img: styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
  `,
  FitnessTextArea: styled.div`
    width: 90%;
    height: auto;
    display: flex;
    align-items: center;
    line-height: 25px;
    padding: 10px;
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    margin: 30px auto;
    overflow: auto;
  `,
  Title: styled.div`
    width: 90%;
    margin: 10px auto;
    padding-left: 20px;
    text-align: left;
    font-size: 14px;
    color: ${(props) => props.theme.textColor2};
  `,
};

const FitnessDetailPage = (): JSX.Element => {
  const labels = ['07.14', '07.15', '07.16', '07.17', '07.18', '07.19', '07,20'];
  const [fitness, setFieness] = useState<FitnessType>();
  const [isLike, setIsLike] = useState<boolean>(false);
  const [momenthum, setMomenthum] = useState<FitnessMomenthum[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [volumes, setVolumes] = useState<number[]>([]);
  const id = useLocation().state?.id;

  useEffect(() => {
    getFitnessListCategory(
      id,
      (resp) => {
        setFieness(resp.data);
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
    getFitnessJjimCheck(
      id,
      (resp) => {
        resp.data.favorite ? setIsLike(true) : setIsLike(false);
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
    getFitnessMomentum(
      id,
      (resp) => {
        setMomenthum(resp.data);
      },
      (error) => {
        console.log(error);
      },
    );
  }, [id]);
  useEffect(() => {
    const dates = momenthum.map((data) => data.date);
    const volumes = momenthum.map((data) => data.volume);
    setDates(dates);
    setVolumes(volumes);
  }, [momenthum]);

  const handleClickJjim = async () => {
    await postFitnessJjim(
      id,
      (resp) => {
        setIsLike(true);
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
  };
  const handleClickNotJjim = async () => {
    await deleteFitnessJjimCancel(
      id,
      (resp) => {
        setIsLike(false);
      },
      (error) => {
        alert('잠시후 다시 시도해주세요.');
      },
    );
  };

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
      return loading;
    }
  };
  return (
    <s.Container>
      <s.HeaderArea>
        <Header text={fitness?.name}>
          {isLike ? (
            <s.IconArea onClick={handleClickNotJjim}>
              <IconSvg width="24" height="24" Ico={jjimOn} />
            </s.IconArea>
          ) : (
            <s.IconArea onClick={handleClickJjim}>
              <IconSvg width="24" height="24" Ico={jjimOff} />
            </s.IconArea>
          )}
        </Header>
      </s.HeaderArea>
      <s.ContentArea>
        <s.ImgArea>
          <s.Img src={fitness ? getParsedImageUrl(fitness.image) : loading} />
        </s.ImgArea>
        <s.FitnessTextArea>{fitness?.description}</s.FitnessTextArea>
        <s.Title>운동이력</s.Title>
        {momenthum.length === 0 ? (
          <Text
            children="기록이 없습니다."
            margin="30px auto"
            display="block"
            width="80%"
            size="16px"
            bold="500"
            textalian="center"
          />
        ) : (
          <Chart datas={volumes} labels={dates} />
        )}
      </s.ContentArea>
      <BottomNav />
    </s.Container>
  );
};

export default FitnessDetailPage;
