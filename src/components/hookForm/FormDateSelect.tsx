import { motion } from 'framer-motion';
import React from 'react';
import { ko } from 'react-day-picker/locale';
import { useSwipeable } from 'react-swipeable';
import { DateRange, DayPicker, addToRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import styled from 'styled-components';
import dayjs from 'dayjs';

type TDateMode = 'THREE_DAYS' | 'FIVE_DAYS' | 'WEEK' | 'FREE_SELECT';

const initRange = { from: undefined, to: undefined };

export default function FormDateSelect() {
  const today = new Date();
  const yesterDay = new Date(today.setDate(today.getDate() - 1));
  const initDisabled = { from: new Date(-1), to: yesterDay };

  const [dateRangeState, setDateRangeState] = React.useState<DateRange | undefined>(initRange);
  const [dateMode, setDateMode] = React.useState<TDateMode>('FREE_SELECT');
  const [month, setMonth] = React.useState<Date>(new Date());
  const [disabledDate, setDisabledDate] = React.useState<DateRange[]>([initDisabled]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, prev.getDate()));
    },
    onSwipedRight: () => {
      setMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, prev.getDate()));
    },
    delta: 10, // min distance(px) before a swipe starts
    trackTouch: true, // track touch input
    trackMouse: true, // track mouse input
  });

  const modifiers = { start: String(dateRangeState?.from), end: String(dateRangeState?.to) };

  const handleDayClick = (day: Date) => {
    if (dateMode !== 'FREE_SELECT') return;
    if (dateRangeState && dateRangeState.from && new Date(String(dateRangeState?.to)) > day) {
      return setDateRangeState({
        from: day,
        to: dateRangeState?.to,
      });
    }
    const range = addToRange(day, dateRangeState);
    setDateRangeState(range);
  };

  const handleChangeDateMode = (dateMode: TDateMode) => {
    //TODO: 시간설정 다이얼로그 출력
    setDateMode(dateMode);
    const today = new Date();
    setMonth(today);
    if (dateMode === 'THREE_DAYS') {
      //TODO: 중복코드 개선하기
      setDisabledDate([initDisabled, { from: new Date(new Date().setDate(new Date().getDate() + 3)), to: new Date('9999-01-01') }]);
      setDateRangeState({ from: new Date(), to: new Date(today.setDate(today.getDate() + 2)) });
      return;
    }
    if (dateMode === 'FIVE_DAYS') {
      setDisabledDate([initDisabled, { from: new Date(new Date().setDate(new Date().getDate() + 5)), to: new Date('9999-01-01') }]);
      setDateRangeState({ from: new Date(), to: new Date(today.setDate(today.getDate() + 4)) });
      return;
    }
    if (dateMode === 'WEEK') {
      setDisabledDate([initDisabled, { from: new Date(new Date().setDate(new Date().getDate() + 7)), to: new Date('9999-01-01') }]);
      setDateRangeState({ from: new Date(), to: new Date(today.setDate(today.getDate() + 6)) });
      return;
    }
    setDisabledDate([initDisabled]);
    setDateRangeState(initRange);
  };

  const handleShowTimeSelectDialog = () => {
    if (dateMode !== 'FREE_SELECT') return;
  };

  React.useEffect(() => {
    console.log(dateRangeState);
  }, [dateRangeState]);

  React.useEffect(function initializeDatePicker() {
    handleChangeDateMode('FREE_SELECT');
    // const calendarHeader = document.getElementsByClassName('rdp-head_row')[0];
    // calendarHeader.firstElementChild?.classList.add('sunday');
    // calendarHeader.lastElementChild?.classList.add('saturday');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.FormDateSelect>
      <div className="swiper-handler" {...handlers}>
        <DayPicker
          disabled={disabledDate}
          mode="range"
          locale={ko}
          captionLayout="dropdown"
          month={month}
          endMonth={new Date(today.setFullYear(today.getFullYear() + 1))}
          onSelect={handleShowTimeSelectDialog}
          onMonthChange={setMonth}
          modifiersClassNames={modifiers}
          selected={dateRangeState}
          onDayClick={handleDayClick}
        />
      </div>
      <div className="button-wrapper">
        <button onClick={() => handleChangeDateMode('THREE_DAYS')}>
          3일
          {dateMode === 'THREE_DAYS' && (
            <motion.span layoutId="date-type" layout="position">
              3일
            </motion.span>
          )}
        </button>
        <button onClick={() => handleChangeDateMode('FIVE_DAYS')}>
          5일
          {dateMode === 'FIVE_DAYS' && (
            <motion.span layoutId="date-type" layout="position">
              5일
            </motion.span>
          )}
        </button>
        <button onClick={() => handleChangeDateMode('WEEK')}>
          일주일
          {dateMode === 'WEEK' && (
            <motion.span layoutId="date-type" layout="position">
              일주일
            </motion.span>
          )}
        </button>
        <button onClick={() => handleChangeDateMode('FREE_SELECT')}>
          자유선택
          {dateMode === 'FREE_SELECT' && (
            <motion.span style={{ width: '4rem' }} layoutId="date-type" layout="position">
              자유선택
            </motion.span>
          )}
        </button>
      </div>
      {/*TODO: 시간 재설정 기능 만들기 << 그전에 시간설정이 필요한거임? */}
      <div className="display-date">
        <p>
          {dateRangeState?.from ? <strong>{dayjs(dateRangeState?.from).format('YYYY.MM.DD HH:mm')}</strong> : `시작 날짜를 선택해주세요.`}
          {dateRangeState?.from && '부터'}
        </p>
        <p>
          {dateRangeState?.to ? <strong>{dayjs(dateRangeState?.to).format('YYYY.MM.DD HH:mm')}</strong> : `마지막 날짜를 선택해주세요.`}
          {dateRangeState?.to && '까지'}
        </p>
      </div>
    </S.FormDateSelect>
  );
}

const S = {
  FormDateSelect: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 350px;
    --rdp-range_end-background: #2279c5;
    .swiper-handler {
      width: 100%;
    }
    .rdp {
      display: flex;
      margin: 0px;
      justify-content: center;
      --rdp-cell-size: 50px;
    }
    .rdp-months {
      width: fit-content;
    }
    .rdp-caption {
      padding-left: 10px;
    }
    .rdp-month {
      width: fit-content;
    }
    table {
      width: 100%;
    }
    .rdp-head_cell {
      font-size: 1rem;
    }
    .rdp-cell {
      height: 50px;
      button {
        width: 52px;
        height: 50px;
      }
    }
    .rdp-range_middle {
      background-color: #2279c5 !important;
      color: #ffffff;
    }
    .rdp-selected .rdp-range_end {
      background: #2279c5 !important;
    }
    .rdp-range_end .rdp-day_button {
      color: var(--rdp-range_start-color);
      border: none;
      background-color: #2279c5 !important;
    }
    .sunday {
      color: red;
    }
    .saturday {
      color: #3174af;
    }
    .button-wrapper {
      width: 350px;
      gap: 50px;
      display: flex;
      font-family: Pretendard;
      margin: 20px 0px;
      padding-left: 10px;
      button {
        cursor: pointer;
        background-color: transparent;
        border: transparent;
        font-size: 0.8rem;
        height: 1.6rem;
        font-family: Pretendard;
        position: relative;

        span {
          display: flex;
          justify-content: center;
          align-items: center;
          top: 0;
          font-family: Pretendard;
          border-radius: 20px;
          background-color: #333;
          left: 0;
          position: absolute;
          z-index: 1;
          color: #f9f9f9;
          width: 3rem;
          height: 1.6rem;
          padding-left: 0rem;
          padding-right: 0rem;
        }
      }
    }
    .display-date {
      width: 350px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding-left: 10px;
      strong {
        font-weight: 800;
      }
    }
  `,
};
