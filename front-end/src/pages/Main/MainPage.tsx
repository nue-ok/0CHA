import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import basic from '../../asset/img/basic.png';
import IconSvg from '../../components/Common/IconSvg';
import { ReactComponent as alarm } from '../../asset/img/svg/alram.svg';
import { ReactComponent as main1 } from '../../asset/img/svg/main1.svg';
import { ReactComponent as main2 } from '../../asset/img/svg/main2.svg';
import { ReactComponent as main3 } from '../../asset/img/svg/main3.svg';
import { ReactComponent as main4 } from '../../asset/img/svg/main4.svg';
import { ReactComponent as main5 } from '../../asset/img/svg/main5.svg';
import BottomNav from '../../components/Common/BottomNav';
import Button from '../../components/Common/Button';
import { useBottomNavHook } from '../../lib/hook/useBottomNavHook';
import { useNavigate } from 'react-router';
import { getMainRoutineAll, getMyInfo, getMyRoutine, postFcmToken } from '../../lib/api/main-api';
import { MainMyRoutine, User } from '../../util/types/axios-main';
import { mainPageRoutine } from '../../util/types/axios-fitness';
import { useAppSelector } from '../../lib/hook/useReduxHook';
import { selectIsPlay } from '../../store/page';
import Text from '../../components/Common/Text';
import { requestPermission } from '../../firebaseCloudMessaging';

const s = {
  Header: styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  `,
  Title: styled.h1`
    font-size: 20px;
    margin: 0;
    cursor: default;
    font-weight: 600;
  `,
  HeaderIcons: styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100px;
  `,
  ScrollContainer: styled.section`
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 0 20px 0;
    color: ${(props) => props.theme.textColor};
    width: 100%;
  `,
  ScrollArea: styled.div`
    display: flex;
    overflow-x: auto;
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;
  `,
  Item: styled.div`
    position: relative;
    min-width: 150px;
    height: 150px;
    background-color: ${(props) => props.theme.subColor};
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: ${(props) => props.theme.mainColor};
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    overflow: hidden;
  `,
  ItemImage: styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    cursor: pointer;
  `,
  ItemText1: styled.div`
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    font-size: 16px;
    font-weight: 800;
    padding: 5px;
    border-radius: 5px;
    cursor: default;
  `,
  ItemText2: styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    font-size: 16px;
    font-weight: 800;
    padding: 5px;
    border-radius: 5px;
    cursor: default;
  `,
  RoutineList: styled.div`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 60px;
  `,
  RoutineItem: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid ${(props) => props.theme.textColor2};
  `,
  RoutineBtn: styled.button`
    background-color: transparent;
    color: ${(props) => props.theme.mainColor};
    border: 1px solid ${(props) => props.theme.mainColor};
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  `,
  RoutineInfo: styled.div`
    display: flex;
    flex-direction: column;
    cursor: default;
  `,
  RoutineName: styled.div`
    font-size: 16px;
    font-weight: 600;
  `,
  RoutineDate: styled.div`
    font-size: 12px;
    color: ${(props) => props.theme.textColor2};
    margin-top: 10px;
    font-weight: 500;
  `,
  MoreBtn: styled.button`
    background: none;
    border: none;
    color: ${(props) => props.theme.textColor2};
    font-size: 14px;
    cursor: pointer;
    font-weight: 500;
  `,
  Icon: styled.img`
    width: 24px;
    height: 24px;
  `,
  ProfileImage: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  `,
  Container: styled.div`
    padding: 10px 20px 20px;
    background-color: ${(props) => props.theme.bgColor};
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  SectionTitleContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  SectionTitle: styled.h4`
    font-size: 18px;
    margin: 0;
    cursor: default;
    font-weight: 600;
  `,
  PageBody: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `,
  BtnArea: styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  `,
  LiveBtn: styled(Button)`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background-color: ${(props) => props.theme.btnColor};
    color: ${(props) => props.theme.btnTextColor};
    font-weight: 500;
  `,
};

const Text1 = styled(s.ItemText1)`
  text-align: right;
  color: ${(props) => props.theme.mainColor};
`;
const Text2 = styled(s.ItemText2)`
  text-align: left;
  color: ${(props) => props.theme.textColor};
`;
const Text3 = styled(s.ItemText1)`
  text-align: right;
  color: ${(props) => props.theme.mainColor};
`;
const Text4 = styled(s.ItemText1)`
  text-align: right;
  color: ${(props) => props.theme.mainColor};
`;
const Text5 = styled(s.ItemText2)`
  text-align: left;
  color: ${(props) => props.theme.textColor};
`;

interface HorizontalScrollProps {
  items: mainPageRoutine[];
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ items }) => {
  const scrollWrapperRef = useRef<HTMLDivElement | null>(null);

  useBottomNavHook('main');
  const navigate = useNavigate();
  const handleMovePage = (path: string): void => {
    navigate(path);
  };
  const img = [main1, main2, main3, main4, main5];
  useEffect(() => {
    const scrollWrapper = scrollWrapperRef.current;
    if (scrollWrapper) {
      const handleWheel = (event: WheelEvent) => {
        if (event.deltaY !== 0) {
          event.preventDefault();
          scrollWrapper.scrollLeft += event.deltaY;
        }
      };
      scrollWrapper.addEventListener('wheel', handleWheel);
      return () => {
        scrollWrapper.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  return (
    <s.ScrollContainer>
      <s.SectionTitle children="추천 루틴" />
      {items.length === 0 ? (
        <Text children="목록이 없습니다." width="100%" margin="20px auto" display="block" />
      ) : (
        <s.ScrollArea ref={scrollWrapperRef}>
          <s.Item onClick={() => navigate('/fitness/history/detail', { state: { id: items[0].id } })}>
            <IconSvg Ico={img[0]} height="100%" width="100%" cursor="pointer" />
            <Text1>{items[0]?.title}</Text1>
          </s.Item>
          <s.Item onClick={() => navigate('/fitness/history/detail', { state: { id: items[1].id } })}>
            <IconSvg Ico={img[1]} height="100%" width="100%" cursor="pointer" />
            <Text2>{items[1]?.title}</Text2>
          </s.Item>
          <s.Item onClick={() => navigate('/fitness/history/detail', { state: { id: items[2].id } })}>
            <IconSvg Ico={img[2]} height="100%" width="100%" cursor="pointer" />
            <Text3>{items[2]?.title}</Text3>
          </s.Item>
          <s.Item onClick={() => navigate('/fitness/history/detail', { state: { id: items[3].id } })}>
            <IconSvg Ico={img[3]} height="100%" width="100%" cursor="pointer" />
            <Text4>{items[3]?.title}</Text4>
          </s.Item>
          <s.Item onClick={() => navigate('/fitness/history/detail', { state: { id: items[4].id } })}>
            <IconSvg Ico={img[4]} height="100%" width="100%" cursor="pointer" />
            <Text5>{items[4]?.title}</Text5>
          </s.Item>
        </s.ScrollArea>
      )}
    </s.ScrollContainer>
  );
};

const MainPage = (): JSX.Element => {
  const navigate = useNavigate();
  const isPlay = useAppSelector(selectIsPlay);
  const [user, setUser] = useState<User>();
  const [main, setMain] = useState<mainPageRoutine[]>([]);
  const [token, setToken] = useState<string>('');
  const [mainMyRoutine, setMainMyRoutine] = useState<MainMyRoutine[]>([]);
  useEffect(() => {
    getMyInfo(
      (resp) => {
        setUser(resp.data);
        if (localStorage.getItem('user')) {
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(resp.data));
        } else {
          localStorage.setItem('user', JSON.stringify(resp.data));
        }
      },
      (error) => {},
    );
    getMainRoutineAll(
      (resp) => {
        setMain(resp.data);
      },
      (error) => {
        console.log(error);
      },
    );
    getMyRoutine(
      (resp) => {
        setMainMyRoutine(resp.data);
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);

  useEffect(() => {
    handleToken();
  }, [user?.id]);

  const basicUrl = 'https://i11b310.p.ssafy.io/images/';

  const handleToken = async () => {
    const token = await requestPermission();

    if (token && user?.id) {
      const param = {
        id: user.id,
        fcmToken: token,
      };

      await postFcmToken(
        param,
        (resp) => {
          console.log('토큰 전송 성공:', resp.data);
        },
        (error) => {
          console.log('토큰 전송 실패: 토큰 또는 사용자 ID가 없습니다.');
        },
      );
    } else {
    }
  };

  // 이미지 경로를 파싱하여 basicUrl과 결합하는 함수
  const getParsedImageUrl = (imagePath?: string) => {
    if (imagePath) {
      const relativePath = imagePath.split('/home/ubuntu/images/')[1];
      return basicUrl + relativePath;
    } else {
      return basic;
    }
  };

  const PageHeader = () => (
    <s.Header>
      <s.Title children="홈" />
      <s.HeaderIcons>
        <IconSvg
          width="25"
          height="25"
          color="#ffffff"
          Ico={alarm}
          cursor="pointer"
          onClick={() => navigate('/sns/notification')}
        />
        <s.ProfileImage src={getParsedImageUrl(user?.profileImage)} alt="Profile" onClick={() => navigate('/mypage')} />
      </s.HeaderIcons>
    </s.Header>
  );

  const handleLiveExercise = () => {
    isPlay ? navigate('/play') : alert('진행중인 운동이 존재하지 않습니다.');
  };
  const handleClickMove = (id: number): void => {
    navigate('../fitness/history/detail', { state: { id } });
  };

  return (
    <s.Container>
      <PageHeader />
      <s.PageBody>
        <HorizontalScroll items={main} />
        <s.BtnArea>
          <s.LiveBtn children="진행 중인 운동" onClick={handleLiveExercise} />
        </s.BtnArea>
        <s.ScrollContainer>
          <s.SectionTitleContainer>
            <s.SectionTitle children="내 루틴" />
            <s.MoreBtn onClick={() => navigate('/fitness/history')} children="더보기" />
          </s.SectionTitleContainer>
          <s.RoutineList>
            {mainMyRoutine.length === 0 ? (
              <Text children="목록이 없습니다." width="100%" margin="20px auto" display="block" />
            ) : (
              mainMyRoutine.map((routine, index) => (
                <s.RoutineItem key={index}>
                  <s.RoutineInfo>
                    <s.RoutineName children={routine.title} />
                    <s.RoutineDate children={routine.dueDate} />
                  </s.RoutineInfo>
                  <s.RoutineBtn children="상세보기" onClick={() => handleClickMove(routine.id)} />
                </s.RoutineItem>
              ))
            )}
          </s.RoutineList>
        </s.ScrollContainer>
      </s.PageBody>
      <BottomNav />
    </s.Container>
  );
};

export default MainPage;
