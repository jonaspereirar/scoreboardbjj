import React from 'react';

export interface CountdownTimerProps {
  time: number;
  onClick?: () => void;
}

export const formatTimer = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds.toString();

  return `${minutesStr}:${secondsStr}`;
};

const CountdownTimer: React.FC<CountdownTimerProps> = (props) => {
  return (
    <div
      className={props.time === 0 ? 'time-over' : ''}
      onClick={props.onClick}
    >
      {formatTimer(props.time)}
    </div>
  );
};

export default CountdownTimer;
