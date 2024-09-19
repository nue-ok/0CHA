import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useReduxHook';
import { modalActions, selectModalCalendar } from '../../store/modal';
import { useLocation, useNavigate } from 'react-router';

export const useModalExitHook = (): void => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleRouteChange = () => {
      dispatch(modalActions.CloseCalendar());
      dispatch(modalActions.CloseComment());
      dispatch(modalActions.CloseMarket());
      dispatch(modalActions.CloseUserSearch());
      dispatch(modalActions.CloseAddList());
    };

    handleRouteChange();
  }, [dispatch, location]);
};
