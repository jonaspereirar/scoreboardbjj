import React, { useEffect } from 'react';

export interface CountdownTimerProps {
  time: number;
  onClick?: () => void;
}

export const formatTimer = (time: number): string => {
  const safeTime = Math.max(time, 0);
  const minutes = Math.floor(safeTime / 60);
  const seconds = safeTime % 60;

  const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds.toString();

  return `${minutesStr}:${secondsStr}`;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ time, onClick }) => {
  useEffect(() => {
    if (time === 0) {
      const playBeep = () => {
        const beep = new Audio('/sounds/beep.wav');
        beep.play();
      };
  
      playBeep(); // Toca imediatamente
  
      // Toca repetidamente a cada 500ms durante 2 segundos
      const interval = setInterval(playBeep, 300);
      const stop = setTimeout(() => clearInterval(interval), 2000);
  
      return () => {
        clearInterval(interval);
        clearTimeout(stop);
      };
    }
  }, [time]);

  return (
    <div className={time === 0 ? 'time-over' : ''} onClick={onClick}>
      {formatTimer(time)}
    </div>
  );
};

export default CountdownTimer;
