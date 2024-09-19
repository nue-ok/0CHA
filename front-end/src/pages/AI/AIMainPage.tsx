import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Common/Header';
import ResultModal from '../../components/AI/ResultModal';
import SettingModal from '../../components/AI/SettingModal2';
import BottomNav from '../../components/Common/BottomNav';
import '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';
import { useBottomNavHook } from '../../lib/hook/useBottomNavHook';

const s = {
  // 스타일 컴포넌트 정의
  Container: styled.section`
    height: 100%;
    background-color: ${(props) => props.theme.bgColor};
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  AIArea: styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 10px 120px;
  `,
  PageBody: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
  `,
  CameraBox: styled.div`
    width: 90%;
    height: 60vh;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.textColor2};
  `,
  CameraHeader: styled.h2`
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
    margin: 4px;
  `,
  SettingBtn: styled.button`
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.btnTextColor};
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    width: 100%;
  `,
  SelectedExercise: styled.h3`
    font-size: 14px;
    color: ${(props) => props.theme.textColor};
    margin-top: 10px;
  `,
  BtnArea: styled.div`
    width: 100%;
    display: flex;
    gap: 5px;
  `,
  ProgressBar: styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.textColor};
    border-radius: 10px;
    overflow: hidden;
    margin-top: 20px;
    position: relative; /* 자식 요소인 ProgressText를 상대적으로 배치하기 위해 설정 */
  `,
  Progress: styled.div<{ progress: number }>`
    width: ${(props) => props.progress}%;
    height: 20px;
    background-color: ${(props) => props.theme.mainColor};
    transition: width 0.3s;
  `,
  ProgressText: styled.div`
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    text-align: center;
    font-size: 14px;
    color: ${(props) => props.theme.btnTextColor};
    margin-top: 4px;
  `,
  Canvas: styled.canvas`
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover; /* 좌우 혹은 상하로 꽉 채움 */
  `,
  LabelContainer: styled.div`
    margin-top: 20px;
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
  `,
  CountContainer: styled.div`
    margin-top: 20px;
  `,
  HighlightText: styled.span`
    color: ${(props) => props.theme.mainColor};
    font-size: 14px;
    margin-left: 5px;
  `,
};

// 포즈 예측 인터페이스
interface PosePrediction {
  probability: number;
  className: string;
}

const AIMainPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // 캔버스를 참조하기 위한 ref
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false); // 설정 모달의 열림 상태를 관리
  const [isResultModalOpen, setIsResultModalOpen] = useState(false); // 결과 모달의 열림 상태를 관리

  const [progress, setProgress] = useState<number>(0); // 진행 상황을 나타내는 상태
  const [results, setResults] = useState<{ set: number; isError: boolean; message: string }[]>([]); // 운동 결과를 저장하는 상태
  const [selectedExercise, setSelectedExercise] = useState<string>(''); // 선택된 운동을 저장하는 상태
  const [totalCount, setTotalCount] = useState<number>(5); // 운동해야할 횟수를 저장해야하는 상태 변수
  const [webcam, setWebcam] = useState<tmPose.Webcam | null>(null); // 웹캠 객체를 저장하는 상태
  const [requestID, setRequestID] = useState<number | null>(null); // 애니메이션 프레임 요청 ID를 저장하는 상태

  const [model, setModel] = useState<tmPose.CustomPoseNet | null>(null); // 로드된 모델을 저장하는 상태
  const [correctCount, setCorrectCount] = useState(0); // 올바른 자세 횟수를 저장하는 상태
  const [inCorrectCount, setInCorrectCount] = useState(0); // 잘못된 자세 횟수를 저장하는 상태

  const [predictions, setPredictions] = useState<PosePrediction[]>([]); // 예측 결과를 저장하는 상태
  const [status, setStatus] = useState('middle'); // 운동 상태를 저장하는 상태
  const prevStatusRef = useRef<string>(''); // 이전 운동 상태를 저장하기 위한 ref
  const [cameraStarted, setCameraStarted] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('아라'); // 선택된 음성을 저장할 상태 변수
  const [isFinished, setIsFinished] = useState(false); // 운동 종료 여부를 저장할 상태 변수

  const pushStopRef = useRef(false); // 운동 종료 버튼(중도 하차)을 누른 경우를 관리하는 ref
  const [showStopButton, setShowStopButton] = useState(false); // 운동 종료 버튼을 표시할지 여부를 관리하는 상태

  // 트레이닝 설정 확인 시 호출되는 함수
  const handleSettingsConfirm = (exercise: string, count: number) => {
    pushStopRef.current = false; // 운동 중단 여부 초기화
    setSelectedExercise(exercise); // 선택된 운동 업데이트
    setResults([]); // 결과 초기화
    setIsFinished(false); // 운동 종료 상태 초기화
    setShowStopButton(false);
    setCorrectCount(0);
    setInCorrectCount(0);
    setProgress(0);
    setTotalCount(count); // 총 횟수 업데이트
    setIsSettingsModalOpen(false); // 설정 모달 닫기
  };

  const loadModel = async () => {
    let exerciseUrl = '';
    // 지원 안 하는 모델이면 종료
    if (selectedExercise === '테스트모델') {
      exerciseUrl = '/my_model';
    } else if (selectedExercise === '스쿼트') {
      exerciseUrl = '/squart';
    } else if (selectedExercise === '벤치프레스') {
      exerciseUrl = '/benchpress';
    } else if (selectedExercise === '데드리프트') {
      exerciseUrl = '/deadlift';
    } else {
      alert('추후 제공 예정입니다.');
      return;
    }
    const modelURL = process.env.PUBLIC_URL + exerciseUrl + '/model.json'; // 모델 URL
    const metadataURL = process.env.PUBLIC_URL + exerciseUrl + '/metadata.json'; // 메타데이터 URL

    try {
      const loadedModel = await tmPose.load(modelURL, metadataURL); // 모델 로드

      setModel(loadedModel); // 모델 상태 업데이트
    } catch (error) {
      console.error('Error loading the model:', error); // 모델 로드 실패 시 에러 출력
    }
  };

  // 운동 세션을 초기화하고 시작하는 함수
  const init = async () => {
    if (!model) return; // 모델이 로드되지 않은 경우 종료
    // 운동상태 초기화 부
    if (selectedExercise === '테스트모델') {
      // 테스트 모델
      setStatus('middle');
    } else if (selectedExercise === '스쿼트') {
      // 스쿼트 모델
      setStatus('middle');
    } else if (selectedExercise === '데드리프트') {
      // 데드리프트 모델
      setStatus('middle');
    } else if (selectedExercise === '벤치프레스') {
      // 벤치프레스 모델
      setStatus('middle');
    } else {
      return;
    }

    const size = 800; // 웹캠 크기 설정
    const flip = true; // 좌우 반전 여부 설정
    const newWebcam = new tmPose.Webcam(size, size, flip); // 웹캠 객체 생성
    await newWebcam.setup(); // 웹캠 설정
    await newWebcam.play(); // 웹캠 영상 재생
    setWebcam(newWebcam); // 웹캠 상태 업데이트

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.style.display = 'block'; // 캔버스 표시
      canvas.width = size; // 캔버스 너비 설정
      canvas.height = size; // 캔버스 높이 설정
      setCameraStarted(true);
    }

    // 5초의 대기 시간을 추가하고 그동안 캔버스에 카운트다운을 표시
    for (let i = 5; i > 0; i--) {
      if (canvasRef.current) {
        const context = canvasRef.current?.getContext('2d');
        if (context) {
          context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // 캔버스 초기화
          context.fillStyle = '#ffffff'; // 텍스트 색상 설정
          context.font = `${canvasRef.current.width * 0.5}px Pretendard`; // 텍스트 크기 설정
          context.textAlign = 'center'; // 수평 중앙 정렬
          context.textBaseline = 'middle'; // 수직 중앙 정렬

          const centerX = canvasRef.current.width / 2;
          const centerY = canvasRef.current.height / 2;
          context.fillText(i.toString(), centerX, centerY); // 캔버스 중앙에 카운트다운 숫자 표시
        }
      }
      playAudio(i.toString()); // 카운트다운 숫자를 음성으로 재생
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기
    }

    setShowStopButton(true);
    playAudio('start'); // 시작

    // 반복적으로 프레임을 갱신하고 예측을 수행하는 루프 함수
    const loop = async () => {
      if (pushStopRef.current) {
        return;
      }
      if (!canvasRef.current || !newWebcam || !model) {
        return;
      }

      newWebcam.update(); // 웹캠에서 프레임 업데이트
      const { pose, posenetOutput } = await model.estimatePose(newWebcam.canvas); // 포즈 추정
      const prediction = await model.predict(posenetOutput); // 예측 수행

      const context = canvasRef.current?.getContext('2d'); // 캔버스의 2D 컨텍스트 가져오기
      if (context) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // 캔버스 초기화
        context.drawImage(newWebcam.canvas, 0, 0); // 웹캠 영상 캔버스에 그리기

        if (pose) {
          const minPartConfidence = 0.5;
          tmPose.drawKeypoints(pose.keypoints, minPartConfidence, context); // 관절 점 그리기
          tmPose.drawSkeleton(pose.keypoints, minPartConfidence, context); // 뼈대 그리기
        }

        setPredictions(prediction); // 예측 결과 업데이트

        // 텍스트를 중앙에 위치시키기 위한 코드
        const textSize = canvasRef.current.width * 0.8; // 텍스트 크기를 캔버스 너비의 50%로 설정
        context.font = `${textSize}px Pretendard`;
        context.textAlign = 'center'; // 수평 중앙 정렬
        context.textBaseline = 'middle'; // 수직 중앙 정렬

        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2;

        // 알고리즘 부
        if (selectedExercise === '테스트모델') {
          // 테스트 모델 로직
          // 상태에 따라 운동 상태 업데이트 및 텍스트 그리기
          if (prediction[5].probability > 0.999 && correctCount + inCorrectCount < totalCount) {
            setStatus('middle');
          }
          // 왼쪽 상황
          if (prediction[0].probability > 0.999) {
            setStatus('left');
            context.fillStyle = '#ccff34'; // 색 채우기
            context.fillText('O', centerX, centerY); // 텍스트 중앙에 그리기
          } else if (prediction[5].probability > 0.999) {
            setStatus('middle');
          } else if (prediction[3].probability > 0.9) {
            setStatus('leftRock');
          }

          if (prediction[3].probability > 0.999) {
            context.fillStyle = '#ffffff';
            context.fillText('X', centerX, centerY);
          }
        } else if (selectedExercise === '스쿼트') {
          // 스쿼트 로직
          if (prediction[2].probability > 0.9) {
            setStatus('stand'); // 선 자세
            context.fillStyle = '#ccff34'; // 색 채우기
            context.fillText('O', centerX, centerY); // 텍스트 중앙에 그리기
          } else if (prediction[4].probability > 0.99) {
            setStatus('frontStand'); // 전방으로 서있는 자세(잘못됨)'
            context.fillStyle = '#ffffff';
            context.fillText('X', centerX, centerY);
          } else if (prediction[0].probability > 0.99) {
            setStatus('sit'); // 내려간 상태
            context.fillStyle = '#ccff34'; // 색 채우기
            context.fillText('O', centerX, centerY); // 텍스트 중앙에 그리기
          } else if (prediction[1].probability > 0.7) {
            setStatus('squart'); // 굽힘 상태
            context.fillStyle = '#ccff34'; // 색 채우기
            context.fillText('O', centerX, centerY); // 텍스트 중앙에 그리기
          } else if (prediction[3].probability > 0.999) {
            setStatus('frontSquart'); // 전방 굽힘 상태(잘못됨)
            context.fillStyle = '#ffffff';
            context.fillText('X', centerX, centerY);
          }
        } else if (selectedExercise === '데드리프트') {
          // 데드리프트 로직
          if (prediction[2].probability > 0.9) {
            setStatus('stand'); // 선 자세
            context.fillStyle = '#ccff34'; // 색 채우기
            context.fillText('O', centerX, centerY); // 텍스트 중앙에 그리기
          } else if (prediction[5].probability > 0.9) {
            setStatus('babelStand'); // 바벨에서 너무 멀리 떨어진 상태로 서 있음(잘못됨)
            context.fillStyle = '#ffffff';
            context.fillText('X', centerX, centerY);
          } else if (prediction[0].probability > 0.99) {
            setStatus('bottom'); // 아래로 내려간 상태
            context.fillStyle = '#ccff34'; // 색 채우기
            context.fillText('O', centerX, centerY); // 텍스트 중앙에 그리기
          } else if (prediction[1].probability > 0.9) {
            setStatus('squart'); // 굽힌 상태
            context.fillStyle = '#ccff34'; // 색 채우기
            context.fillText('O', centerX, centerY); // 텍스트 중앙에 그리기
          } else if (prediction[3].probability > 0.99) {
            setStatus('waistCurl'); // 허리 말린 상태(잘못됨)
            context.fillStyle = '#ffffff';
            context.fillText('X', centerX, centerY);
          } else if (prediction[4].probability > 0.99) {
            setStatus('babelCurl'); // 바벨에서 너무 떨어진 상태(잘못됨)
            context.fillStyle = '#ffffff';
            context.fillText('X', centerX, centerY);
          }
        } else if (selectedExercise === '벤치프레스') {
          // 벤치프레스 로직
          if (prediction[2].probability > 0.9) {
            setStatus('push'); // 완전히 뻗은 단계
            context.fillStyle = '#ccff34'; // 색 채우기
            context.fillText('O', centerX, centerY); // 텍스트 중앙에 그리기
          } else if (prediction[5].probability > 0.9) {
            setStatus('stomachPush'); // 배쪽에 뻗은 단계(잘못됨)
          } else if (prediction[0].probability > 0.99) {
            setStatus('bottom'); // 몸에 닿은 단계
            context.fillStyle = '#ccff34'; // 색 채우기
            context.fillText('O', centerX, centerY); // 텍스트 중앙에 그리기
          } else if (prediction[1].probability > 0.99) {
            setStatus('curl'); // 중간 단계
            context.fillStyle = '#ccff34'; // 색 채우기
            context.fillText('O', centerX, centerY); // 텍스트 중앙에 그리기
          } else if (prediction[3].probability > 0.99) {
            setStatus('stomachBottom'); // 배쪽에 닿은 단계(잘못됨)
            context.fillStyle = '#ffffff';
            context.fillText('X', centerX, centerY);
          } else if (prediction[4].probability > 0.99) {
            setStatus('stomachCurl'); // 배쪽에 중간 단계(잘못됨)
            context.fillStyle = '#ffffff';
            context.fillText('X', centerX, centerY);
          }
        } else {
          // 예외 처리 후 종료
          stop('modelNotSupported');
          return;
        }
      }

      setRequestID(requestAnimationFrame(loop)); // 다음 프레임을 요청
    };
    setRequestID(requestAnimationFrame(loop)); // 루프 시작
    // loop(); // 루프 시작
  };

  // 결과 메시지를 업데이트하는 함수
  const updateResults = (newMessage: string, isCorrect: boolean) => {
    setResults((prevResults) => [
      ...prevResults,
      { set: correctCount + inCorrectCount + 1, isError: !isCorrect, message: newMessage },
    ]);
    playAudio((correctCount + inCorrectCount + 1).toString());

    if (isCorrect) {
      setCorrectCount((prevCount) => prevCount + 1);
    } else {
      setInCorrectCount((prevCount) => prevCount + 1);
    }
    const nextProgress = progress + 100 / totalCount;
    setProgress(nextProgress);
  };

  // 운동 상태가 변경될 때 상태를 체크하고 올바른 자세 횟수나 올바르지 않은 자세 횟수를 증가시키는 useEffect
  useEffect(() => {
    if (selectedExercise === '테스트모델') {
      if (prevStatusRef.current !== status) {
        if (status === 'middle' && prevStatusRef.current === 'left') {
          updateResults('올바른 자세입니다.', true);
        } else if (status === 'middle' && prevStatusRef.current === 'leftRock') {
          updateResults('왼 주먹 내리세요', false);
        }
      }
    } else if (selectedExercise === '스쿼트') {
      if (prevStatusRef.current !== status) {
        // 올바른 자세로 온 경우 (스쿼트 자세에서 선 자세로)
        if (status === 'stand' && prevStatusRef.current === 'squart') {
          updateResults('올바른 자세입니다.', true);
          // 올바르지 않은 자세로 온 경우 1 (앞스쿼트 자세에서 선 자세로)
        } else if (status === 'stand' && prevStatusRef.current === 'frontSquart') {
          updateResults('스쿼트 시 상체가 앞으로 기울었습니다.', false);
          // 올바르지 않은 자세로 온 경우 추가(앉은 자세에서 곧바로 선 자세로)
        } else if (status === 'stand' && prevStatusRef.current === 'sit') {
          updateResults('너무 빠르게 올라왔습니다.', false);
          // 올바르지 않은 자세로 온 경우 2 (스쿼트 혹은 앞스쿼트 자세에서 앞으로 선 자세로)
        } else if (
          status === 'frontStand' &&
          (prevStatusRef.current === 'squart' || prevStatusRef.current === 'frontSquart')
        ) {
          updateResults('스탠드 시 상체가 앞으로 기울었습니다.', false);
        }
      }
    } else if (selectedExercise === '데드리프트') {
      // 올바른 자세로 온 경우 (스쿼트 자세에서 선 자세로)
      if (status === 'stand' && prevStatusRef.current === 'squart') {
        updateResults('올바른 자세입니다.', true);
        // 올바르지 않은 자세로 온 경우(앉은 자세에서 선 자세로 바로)
      } else if (status === 'stand' && prevStatusRef.current === 'bottom') {
        updateResults('너무 빠르게 올라왔습니다.', false);
        // 올바르지 않은 자세로 온 경우 1(허리가 말린 뒤 올라온 경우)
      } else if (status === 'stand' && prevStatusRef.current === 'waistCurl') {
        updateResults('허리가 말려 있습니다.', false);
        // 올바르지 않은 자세로 온 경우 2(바벨에서 너무 멀리 떨어진채 올라온 경우)
      } else if (status === 'stand' && prevStatusRef.current === 'babelCurl') {
        updateResults('바벨에서 너무 멀리 떨어져 있습니다.', false);
        // 올바르지 않은 자세로 온 경우 3(올라온 자세가 바벨을 멀리 잡은 경우)
      } else if (
        status === 'babelStand' &&
        (prevStatusRef.current === 'squart' || prevStatusRef.current === 'waistCurl')
      ) {
        updateResults('허리도 말려 있고 바벨을 너무 멀리 잡았습니다.', false);
      } else if (
        status === 'babelStand' &&
        (prevStatusRef.current === 'squart' || prevStatusRef.current === 'babelCurl')
      ) {
        updateResults('바벨을 너무 멀리 잡았습니다.', false);
      }
    } else if (selectedExercise === '벤치프레스') {
      // 올바른 자세로 온 경우
      if (status === 'push' && prevStatusRef.current === 'curl') {
        updateResults('완벽합니다! 잘 하셨습니다.', true);
        // 올바르지 않은 자세로 온 경우 1(배쪽에 놓고 올라온 경우)
      } else if (status === 'push' && prevStatusRef.current === 'stomachCurl') {
        updateResults('바벨이 너무 배 쪽에 가깝습니다.', false);
        // 올바르지 않은 자세로 온 경우 2(바벨을 배쪽으로 뻗은 경우)
      } else if (
        status === 'stomachPush' &&
        (prevStatusRef.current === 'curl' || prevStatusRef.current === 'stomachCurl')
      ) {
        updateResults('바벨을 배쪽으로 뻗으셨습니다.', false);
      }
    } else {
    }
    prevStatusRef.current = status; // 현재 상태를 이전 상태로 업데이트
  }, [status]);

  useEffect(() => {
    if (correctCount + inCorrectCount >= totalCount) {
      stop(); // 세션 종료
    }
  }, [correctCount, inCorrectCount, totalCount]);

  // 세션을 종료하는 함수
  const stop = (reason?: string) => {
    if (webcam) {
      try {
        webcam.stop(); // 웹캠 중지
        setCameraStarted(false);
        setIsFinished(true);
        setModel(null);
        setSelectedExercise('');
        setShowStopButton(false);
      } catch (error) {
        console.error('Error stopping webcam:', error); // 에러 처리
      }
    }

    if (requestID) {
      window.cancelAnimationFrame(requestID); // 애니메이션 프레임 요청 취소
    }

    if (canvasRef.current) {
      canvasRef.current.style.display = 'none'; // 캔버스 숨기기
      // canvasRef.current = null; // 캔버스 참조 해제
    }
    // 1초 지연 후 playAudio('finish') 실행
    setTimeout(() => {
      playAudio('finish');
    }, 1000);
    setIsResultModalOpen(true); // 세션 종료 시 결과 모달 열기

    // 이유에 따른 추가 작업
    if (reason) {
      if (reason === 'modelNotSupported') {
        alert('어익후 추후 제공 예정이긴 한데 여기까지 오면 안 되는데. 영차!');
      } else {
        console.log(`Stop reason: ${reason}`);
      }
    }
  };

  // 오디오 재생 함수
  const playAudio = (count: string) => {
    const audioPath = process.env.PUBLIC_URL + `/audio/${selectedVoice}/${count}.mp3`; // 오디오 파일 경로 설정
    const audio = new Audio(audioPath); // 새로운 오디오 객체 생성
    audio.play().catch((err) => console.error('Failed to play audio:', err)); // 오디오 재생, 실패 시 에러 출력
  };

  // 컴포넌트 언마운트 시 리소스를 정리하는 useEffect
  useEffect(() => {
    return () => {
      if (requestID) {
        cancelAnimationFrame(requestID); // 애니메이션 프레임 요청 취소
      }
    };
  }, [requestID, webcam]);

  useBottomNavHook('ai');

  return (
    <s.Container>
      <Header text="AI 트레이너" />
      <s.AIArea>
        <s.CameraHeader>
          카메라를 사용자 기준
          <s.HighlightText>우측 하단</s.HighlightText>에 위치해 주세요.
        </s.CameraHeader>
        <s.CameraBox>
          <s.Canvas id="canvas" ref={canvasRef} />
        </s.CameraBox>
        <s.SelectedExercise>선택된 운동 : {selectedExercise}</s.SelectedExercise>
        <s.PageBody>
          {/* 결과 모달이 열려 있는 경우 결과 모달 표시 */}
          {isResultModalOpen && <ResultModal onClose={() => setIsResultModalOpen(false)} results={results} />}
          {/* 설정 모달이 열려 있는 경우 설정 모달 표시 */}
          {isSettingsModalOpen && (
            <SettingModal onClose={() => setIsSettingsModalOpen(false)} onConfirm={handleSettingsConfirm} />
          )}
          {!model && <s.SettingBtn onClick={() => setIsSettingsModalOpen(true)}>운동 설정</s.SettingBtn>}
          {/* 카메라 시작 버튼 */}
          {selectedExercise && !model && <s.SettingBtn onClick={loadModel} children="준비" />}
          {selectedExercise && model && !cameraStarted && <s.SettingBtn onClick={init} children="카메라 시작" />}
          {/* 운동 종료 버튼 */}
          {selectedExercise && showStopButton && (
            <s.SettingBtn
              onClick={() => {
                pushStopRef.current = true;
                stop();
              }}
              children="운동 종료"
            />
          )}
          {/* 운동 진행 상태 바 */}
          {selectedExercise && (
            <s.ProgressBar>
              <s.Progress progress={progress} />
              <s.ProgressText>
                {correctCount + inCorrectCount} / {totalCount}
              </s.ProgressText>
            </s.ProgressBar>
          )}

          {/* 운동 종료 시 결과 보기 버튼 표시 */}
          {isFinished && <s.SettingBtn onClick={() => setIsResultModalOpen(true)}>결과 보기</s.SettingBtn>}

          {/* 예측 결과를 표시하는 영역 (추후 없앨 부분)*/}
          {/* <s.LabelContainer>
            <p>예측 결과를 표시하는 영역(추후 삭제될 부분)</p>
            {predictions.map((pred, index) => (
              <div key={pred.className}>{`${pred.className}: ${Math.round(pred.probability * 100)}%`}</div>
            ))}
          </s.LabelContainer> */}
        </s.PageBody>
      </s.AIArea>
      {/* 하단 네비게이션 */}
      <BottomNav />
    </s.Container>
  );
};

export default AIMainPage;
