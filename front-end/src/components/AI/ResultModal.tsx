import React from 'react';
import styled from 'styled-components';

const s = {
  ModalOverlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7); // 투명도 설정
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; // 맨 위로
  `,
  ModalContent: styled.div`
    background: ${(props) => props.theme.bgColor};
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    color: ${(props) => props.theme.mainColor};
    width: 80%;
    max-width: 400px;
    overflow: hidden;
  `,
  ModalTitle: styled.h2`
    margin-bottom: 30px;
    color: ${(props) => props.theme.mainColor};
    font-size: 14px;
  `,
  ResultTable: styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 14px;
  `,
  TableRow: styled.tr`
    background-color: ${(props) => props.theme.bgColor}; /* 모든 행의 배경색을 동일하게 설정 */
  `,
  TableCell: styled.td<{ $isError?: boolean }>`
    padding: 5px;
    color: ${(props) => (props.$isError ? props.theme.mainColor : props.theme.textColor)};
    font-weight: ${(props) => (props.$isError ? 'bold' : 'normal')};
  `,
  ConfirmBtn: styled.button`
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.btnTextColor};
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 20px;
  `,
  TableBody: styled.tbody`
    /* 추가적인 스타일이 필요한 경우 여기서 정의 */
  `,
};
// 결과
interface Result {
  set: number;
  isError: boolean;
  message: string;
}

interface ResultModalProps {
  onClose: () => void;
  results: Result[];
}

const ResultModal: React.FC<ResultModalProps> = ({ onClose, results }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <s.ModalOverlay onClick={handleOverlayClick}>
      <s.ModalContent onClick={(e) => e.stopPropagation()}>
        <s.ModalTitle children="트레이닝 결과" />
        <s.ResultTable>
          <s.TableBody>
            {results.map((result) => (
              <s.TableRow key={result.set}>
                <s.TableCell width="20%" style={{ textAlign: 'right' }} $isError={result.isError}>
                  {result.set}회차
                </s.TableCell>
                <s.TableCell width="10%" $isError={result.isError}>
                  {result.isError ? 'X' : 'O'}
                </s.TableCell>
                <s.TableCell width="65%" style={{ textAlign: 'left' }} $isError={result.isError}>
                  {result.message}
                </s.TableCell>
              </s.TableRow>
            ))}
          </s.TableBody>
        </s.ResultTable>
        <s.ConfirmBtn onClick={onClose}>확인</s.ConfirmBtn>
      </s.ModalContent>
    </s.ModalOverlay>
  );
};

export default ResultModal;
