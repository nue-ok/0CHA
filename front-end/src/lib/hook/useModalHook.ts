import { selectModalCalendar, selectModalComment, selectModalMarket, selectModalUserSearch } from '../../store/modal';
import { useAppDispatch, useAppSelector } from './useReduxHook';

export const useModalHook = (name: string): void => {
  const calendarOpen = useAppSelector(selectModalCalendar);
  const userSearchOpen = useAppSelector(selectModalUserSearch);
  const commentOpen = useAppSelector(selectModalComment);
  const marketOpen = useAppSelector(selectModalMarket);
  let isOpen: boolean;
  if (name === 'calendar') {
    isOpen = calendarOpen;
  } else if (name === 'userSearch') {
    isOpen = userSearchOpen;
  } else if (name === 'comment') {
    isOpen = commentOpen;
  } else if (name === 'market') {
    isOpen = marketOpen;
  }
  const dispatch = useAppDispatch();
  // 일단 정지, 각각 개발 후 되면 삭제
};
