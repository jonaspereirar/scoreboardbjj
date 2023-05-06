import { useEffect, useState } from 'react';

interface CountdownTimer {
  countdown: number;
  toggleCountdown: () => void;
  addTime: (time: number) => void;
  resetTimer: () => void;
  isCounting: boolean;
  intervalId: NodeJS.Timer | null;
}

const useCountdownTimer = (
  initialDuration: number,
  onTimerEnd?: () => void,
): CountdownTimer => {
  const [countdown, setCountdown] = useState<number>(initialDuration);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const [isCounting, setIsCounting] = useState<boolean>(false);

  const toggleCountdown = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsCounting(false);
    } else {
      setIsCounting(true);
      const id = setInterval(() => {
        setCountdown((countdown) => {
          const newCountdown = countdown - 1;
          if (newCountdown === 0 && onTimerEnd) {
            onTimerEnd();
          }
          return newCountdown;
        });
      }, 1000);
      setIntervalId(id);
    }
  };

  const addTime = (time: number) => {
    setCountdown((countdown) => countdown + time);
  };

  const resetTimer = () => {
    setIsCounting(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
    setCountdown(initialDuration);
    setIntervalId(null);
  };

  useEffect(() => {
    setCountdown(initialDuration);
  }, [initialDuration]);

  return {
    countdown,
    toggleCountdown,
    addTime,
    resetTimer,
    isCounting,
    intervalId,
  };
};

export default useCountdownTimer;
