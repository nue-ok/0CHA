import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Image from '../Common/Image';
import { create } from 'lodash';
import { SnsCommentDel } from '../../lib/api/sns-api';
import Input from '../Common/Input';
import Button from '../Common/Button';

import { SnsCommentModify } from '../../lib/api/sns-api';

const s = {
  Container: styled.section<ContainerProps>`
    height: 40px;
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 25px;
    display: ${(props) => (props.$isdelete === false ? '' : 'none')};
  `,
  Modify: styled.section<ModifyProps>`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    padding: 3px;
    margin-left: 10px;
    display: ${(props) => (props.$ismodify === true ? '' : 'none')};
  `,
  CommentArea: styled.div<CommentAreaProps>`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: 3px;
    margin-left: 10px;
    display: ${(props) => (props.$ismodify === false ? '' : 'none')};
  `,
  CommentAuthorArea: styled.div`
    display: flex;
  `,
  CommentAuthor: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
  `,
  CommentMenu: styled.div`
    color: ${(props) => props.theme.textColor2};
    font-size: 12px;
    margin-left: 15px;
  `,
  CommentContent: styled.div`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
  `,
  ModifyButton: styled.span`
    margin-left: 10px;
  `,
  ModifyInput: styled.input`
    width: 100%;
    height: 40px;
    background-color: ${(props) => props.theme.subColor};
    color: ${(props) => props.theme.textColor};
    font-weight: 500;
  `,
};

interface CommentProps {
  commentProfileImage: string;
  commentAuthor: string;
  commentContent: string;
  isUserComment: boolean;
  createdAt: string;
  commentId: number;
}

interface ContainerProps {
  $isdelete?: boolean;
}

interface ModifyProps {
  $ismodify?: boolean;
}
interface CommentAreaProps {
  $ismodify?: boolean;
}

const Comment = (props: CommentProps): JSX.Element => {
  const { commentProfileImage, commentAuthor, commentContent, isUserComment, createdAt, commentId } = props;

  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const now = today.toISOString();

  const year = Number(now.substring(0, 4));
  const month = Number(now.substring(5, 7));
  const day = Number(now.substring(8, 10));
  const hour = Number(now.substring(11, 13));
  const minute = Number(now.substring(14, 16));
  const createdYear = Number(createdAt.substring(0, 4));
  const createdMonth = Number(createdAt.substring(5, 7));
  const createdDay = Number(createdAt.substring(8, 10));
  const createdHour = Number(createdAt.substring(11, 13));
  const createdMinute = Number(createdAt.substring(14, 16));

  let createdStr;
  let createdRecent;

  if (year === createdYear) {
    if (month === createdMonth) {
      if (day === createdDay) {
        if (hour === createdHour) {
          createdRecent = 'minute';
          createdStr = minute - createdMinute;
        } else {
          createdRecent = 'hour';
          createdStr = hour - createdHour;
        }
      } else {
        createdRecent = 'false';
      }
    }
  }

  const [isDelete, setIsDelete] = useState(false);

  const deleteOnClick = async (commentId: number) => {
    await SnsCommentDel(
      commentId,
      (resp) => {
        setIsDelete(true);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  const [isModify, setIsModify] = useState(false);

  const modonclick = () => {
    setIsModify((prev) => !prev);
  };
  const [content, setContent] = useState(commentContent);
  const [commentValue, setCommentValue] = useState(commentContent);

  const commentOnModify = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCommentValue(value);
  };

  const modifyOnSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    await SnsCommentModify(
      commentId,
      commentValue,
      (resp) => {
        setIsModify(false);
        setContent(commentValue);
      },
      (error) => {
        console.error(error);
      },
    );
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const modifyRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (isModify && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModify]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modifyRef.current && !modifyRef.current.contains(event.target as Node)) {
        setIsModify(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const basicUrl = 'https://i11b310.p.ssafy.io/images/';

  // 이미지 경로를 파싱하여 basicUrl과 결합하는 함수
  const getParsedImageUrl = (imagePath?: string) => {
    if (imagePath) {
      const relativePath = imagePath.split('/home/ubuntu/images/')[1];
      return basicUrl + relativePath;
    }
  };

  return (
    <>
      <s.Container $isdelete={isDelete}>
        <Image width="34px" height="34px" src={getParsedImageUrl(commentProfileImage)} />
        <s.CommentArea $ismodify={isModify}>
          <s.CommentAuthorArea>
            <s.CommentAuthor>{commentAuthor}</s.CommentAuthor>

            {createdAt === '방금' ? (
              <s.CommentMenu>방금</s.CommentMenu>
            ) : (
              <>
                {createdRecent === 'false' ? (
                  <s.CommentMenu>
                    {createdAt.substring(0, 4)}년 {createdAt.substring(5, 7)}월 {createdAt.substring(8, 10)}일
                  </s.CommentMenu>
                ) : (
                  <>
                    {createdRecent === 'hour' ? (
                      <s.CommentMenu>{createdStr}시간 전</s.CommentMenu>
                    ) : (
                      <s.CommentMenu>{createdStr}분 전</s.CommentMenu>
                    )}
                  </>
                )}
              </>
            )}

            {isUserComment === true ? <s.CommentMenu onClick={modonclick}>수정</s.CommentMenu> : <></>}
            {isUserComment === true ? (
              <s.CommentMenu onClick={() => deleteOnClick(commentId)}>삭제</s.CommentMenu>
            ) : (
              <></>
            )}
          </s.CommentAuthorArea>
          <s.CommentContent>{content}</s.CommentContent>
        </s.CommentArea>
        <s.Modify $ismodify={isModify} ref={modifyRef}>
          {/* <span ref={inputRef}><Input width="100%" height="40px" value={commentValue} onChange={commentOnModify} /></span> */}
          <s.ModifyInput type="text" ref={inputRef} value={commentValue} onChange={commentOnModify} />
          <s.ModifyButton>
            <Button width="64px" height="40px" size="14px" bold="500" onClick={modifyOnSubmit}>
              수정
            </Button>
          </s.ModifyButton>
        </s.Modify>
      </s.Container>
    </>
  );
};

export default Comment;
