import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar, { OnClickFunc } from 'react-calendar';
import moment from 'moment';
import '../../styles/Calendar.css';
import { FitnessDay } from '../../util/types/axios-record';

const s = {
  /* 오늘 날짜에 텍스트 삽입 스타일 */
  StyledToday: styled.div`
    border: 2px solid ${(props) => props.theme.mainColor};
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

type CalendarProps = {
  className?: string;
  RoutineFinish?: string[];
  Routine?: string[];
  pick?: string;
  onChangeDate?: OnClickFunc;
  FitnessDay?: FitnessDay[];
};

const CalendarArea = (props: CalendarProps): JSX.Element => {
  const today = new Date();
  const [value, setValue] = useState<Date>(today);

  return (
    <Calendar
      locale="ko"
      className={props.className}
      onClickDay={props.onChangeDate}
      value={value}
      formatDay={(locale, date) => moment(date).format('D')}
      prev2Label={null}
      next2Label={null}
      calendarType="gregory"
      showNeighboringMonth={false}
      minDetail="decade"
      tileClassName={({ date, view }) => {
        if (props.FitnessDay?.find((x) => x.dueDate === moment(date).format('YYYY-MM-DD'))) {
          return 'routineFinish';
        }
        // if (props.RoutineFinish?.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
        //   return 'routineFinish';
        // }
        // if (props.Routine?.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
        //   return 'routine';
        // }
        if (props.pick === moment(date).format('YYYY-MM-DD')) {
          return 'pick';
        }
        // if (view === 'month') {
        //   if (date < today) {
        //     return 'past-date';
        //   }
        // }
      }}
      tileContent={({ date, view }) => {
        let html = [];
        if (view === 'month' && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
          html.push(<s.StyledToday key={'today'} />);
        }
        return <>{html}</>;
      }}
    />
  );
};

export default CalendarArea;
