import { AxiosError } from 'axios';
import { localAxios, publicAxios } from '../../util/axios-setting';
import { snsFeedWrite, snsItemList, snsItemWrite } from '../../util/types/axios-sns';
import SockJS from 'sockjs-client';
import { Client, Frame } from '@stomp/stompjs';

const local = publicAxios();
const jwt = localAxios();

// 유저페이지
export const UserPage = async (param: number, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/sns/social/user-page/info?user-id=${param}`).then(success).catch(fail);
};

// 유저페이지 내 피드 보기
export const UserPageFeed = async (
  param: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/sns/social/user-page/feeds?user-id=${param}`).then(success).catch(fail);
};

// 유저페이지 내 장터 보기
export const UserPageItem = async (
  param: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/sns/social/user-page/items?user-id=${param}`).then(success).catch(fail);
};

// 팔로워 목록조회
export const UserPageFollower = async (
  param: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/sns/social/user-page/followers?user-id=${param}`).then(success).catch(fail);
};

// 팔로잉 목록조회
export const UserPageFollowing = async (
  param: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/sns/social/user-page/followings?user-id=${param}`).then(success).catch(fail);
};

// 팔로우하는 유저인지 조회
export const IsFollowingUser = async (
  targetUserId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/sns/social/is-following?target-id=${targetUserId}`).then(success).catch(fail);
};

// 팔로우
export const UserFollow = async (
  targetUserId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/sns/social/follow`, targetUserId).then(success).catch(fail);
};

// 팔로우 삭제 (number 타입가질 시 에러남)
export const UserFollowCancel = async (
  targetUserId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.put(`/sns/social/follow`, targetUserId).then(success).catch(fail);
};

// 피드 내역 가져오기
export const SnsFeedList = async (
  userId: number,
  offset: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
  limit?: number,
) => {
  await jwt.get(`/sns/feed/list?user-id=${userId}&offset=${offset}&limit=${limit}`).then(success).catch(fail);
};

// 피드 작성
export const SnsFeedWrite = async (
  // param: snsFeedWrite,
  param: FormData,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  // await jwt.post(`/sns/feed/write`, param).then(success).catch(fail);
  await jwt
    .post(`/sns/feed/write`, param, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(success)
    .catch(fail);
};

// 피드 작성시 루틴가져오기
export const SnsFeedGetRoutine = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/sns/feed/my-routine`).then(success).catch(fail);
};

// 피드 수정
export const SnsFeedModify = async (
  feedId: number,
  param: FormData,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt
    .put(`/sns/feed/${feedId}`, param, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(success)
    .catch(fail);
  // await jwt.put(`/sns/feed/${feedId}`, param).then(success).catch(fail);
};

// 피드 삭제
export const SnsFeedDel = async (
  feedId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.delete(`/sns/feed/${feedId}`).then(success).catch(fail);
};

// 피드 좋아요 리스트
export const SnsFeedLikeList = async (
  feedId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/sns/feed/${feedId}/like`).then(success).catch(fail);
};

// 피드 좋아요 추가
export const SnsFeedLike = async (
  feedId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/sns/feed/${feedId}/like`).then(success).catch(fail);
};

// 피드 좋아요 제거
export const SnsFeedLikeCancel = async (
  feedId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.delete(`/sns/feed/${feedId}/like`).then(success).catch(fail);
};

// 피드의 루틴 불러오기
export const SnsFeedListRoutine = async (
  feedId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/sns/feed/${feedId}/routine`).then(success).catch(fail);
};

// 불러온 루틴 저장
export const SnsFeedRoutineLoad = async (
  routineId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/sns/feed/${routineId}/routine`).then(success).catch(fail);
};

// 피드 댓글 목록
export const SnsCommentList = async (
  feedId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/sns/feed/${feedId}/comment`).then(success).catch(fail);
};

// 피드 댓글 작성
export const SnsCommentWrite = async (
  feedId: number,
  content: string,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/sns/feed/${feedId}/comment`, { comment: content }).then(success).catch(fail);
};

// 피드 댓글 수정
export const SnsCommentModify = async (
  commentId: number,
  content: string,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.put(`/sns/feed/comment/${commentId}`, { comment: content }).then(success).catch(fail);
};

// 피드 댓글 삭제
export const SnsCommentDel = async (
  commentId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.delete(`/sns/feed/comment/${commentId}`).then(success).catch(fail);
};

// 중고마켓 목록 조회
export const SnsItemList = async (
  param: snsItemList,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt
    .get(
      `/sns/item/list?user-id=${param.userId}&page=${param.page}&limit=${param.limit}&district=${param.district}&si-gun-gu=${param.siGunGu}&title=${param.title}`,
    )
    .then(success)
    .catch(fail);
};

// 물건 상세
export const SnsItemDetail = async (
  itemId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/sns/item/${itemId}`).then(success).catch(fail);
};

// 물건 좋아요
export const SnsItemLike = async (
  itemId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/sns/item/${itemId}/like`).then(success).catch(fail);
};

// 물건 좋아요 삭제
export const SnsItemLikeCancel = async (
  itemId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.delete(`/sns/item/${itemId}/like`).then(success).catch(fail);
};

// 물건 판매 작성
export const SnsItemWrite = async (
  param: FormData,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt
    .post(`/sns/item/write`, param, {
      headers: {
        'Content-Type': 'multipart/form-data', // FormData에 맞는 Content-Type 설정
      },
    })
    .then(success)
    .catch(fail);
};

// 물건 판매 수정
export const SnsItemModify = async (
  itemId: number,
  param: FormData,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt
    .put(`/sns/item/${itemId}`, param, {
      headers: {
        'Content-Type': 'multipart/form-data', // FormData에 맞는 Content-Type 설정
      },
    })
    .then(success)
    .catch(fail);
};

// 물건 판매 삭제
export const SnsItemDel = async (
  itemId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.delete(`/sns/item/${itemId}`).then(success).catch(fail);
};

// 물건 판매 완료 (상태변경)
export const SnsItemSell = async (
  itemId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.put(`/sns/item/${itemId}/soldout`).then(success).catch(fail);
};

// 채팅방 목록
// export const SnsChatList = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
//   await jwt.get(`/sns/chat`).then(success).catch(fail);
// };

export const SnsChatList = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/sns/chat/last-message-list`).then(success).catch(fail);
};

// 채팅방 들어가기
export const SnsChatEnter = async (
  receiverId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.get(`/sns/chat/createRoom?receiverId=${receiverId}`).then(success).catch(fail);
};

// 해당 채팅방 메세지 가져오기
// export const SnsChat = async (chatId: number, success: (response: any) => void, fail: (error: AxiosError) => void) => {
//   await jwt.get(`/sns/chat/${chatId}/message`).then(success).catch(fail);
// };

export const SnsChat = async (roomId: number, success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/sns/chat/history?roomId=${roomId}`).then(success).catch(fail);
};

// 메세지 보내기
export const SnsChatSend = async (
  chatId: number,
  text: string,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.post(`/sns/chat/${chatId}/message`, text).then(success).catch(fail);
};

// 웹소켓 연결
// 웹소켓 연결 함수
// export const SnsChatOn = (success: (frame: Frame) => void, fail: (error: AxiosError | string) => void) => {
//   try {
//     // SockJS를 사용하여 웹소켓 연결 생성
//     const socket = new SockJS('/proxy/ws');

//     // STOMP 클라이언트를 사용하여 웹소켓 연결 설정
//     const client = new Client({
//       webSocketFactory: () => socket,
//       connectHeaders: {
//         Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // 연결 시 토큰 헤더 포함
//       },
//       onConnect: success,
//       onStompError: (frame: Frame) => {
//         fail(`Broker reported error: ${frame.headers['message']}. Additional details: ${frame.body}`);
//       },
//       onWebSocketError: (event: Event) => {
//         fail(`WebSocket error: ${event}`);
//       },
//     });

//     // 클라이언트 활성화
//     client.activate();
//   } catch (error) {
//     fail(error as AxiosError);
//   }
// };

export const SnsChatOn = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.post(`/sns/chat/connect`).then(success).catch(fail);
};

// 웹소켓
export const WsOn = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/ws/`).then(success).catch(fail);
};

// 웹소켓 해제
export const SnsChatOff = async (
  connectionId: number,
  success: (response: any) => void,
  fail: (error: AxiosError) => void,
) => {
  await jwt.delete(`/sns/chat/connect/${connectionId}`).then(success).catch(fail);
};

// 유저전체조회(검색)
export const UserSearch = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`/sns/social/search`).then(success).catch(fail);
};

export const MyRoutine = async (success: (response: any) => void, fail: (error: AxiosError) => void) => {
  await jwt.get(`sns/feed/my-routine`).then(success).catch(fail);
};
