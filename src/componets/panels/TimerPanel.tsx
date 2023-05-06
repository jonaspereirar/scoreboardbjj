import { useContext, useEffect, useState } from 'react';
import {
  ScoreboardContext,
  ScoreboardContextType,
} from '../../context/ScoreboardContext';
import useConfirmationModal from '../../hooks/useConfirmationModal';
import useCountdownTimer from '../../hooks/useCountdownTimer';
import ActionButton from '../buttons/ActionButton';
import TimeButton from '../buttons/TimeButton';
import CountdownTimer from '../CountdownTimer';

interface TimerPanelProps {
  duration: number;
}

interface ActionButtonProps {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const TimerPanel: React.FC<TimerPanelProps> = (props) => {
  const context: ScoreboardContextType = useContext(ScoreboardContext);
  const [initialDuration, setInitialDuration] = useState<number>(
    props.duration,
  );

  useEffect(() => {
    setInitialDuration(props.duration);
  }, [props.duration]);

  const { countdown, addTime, isCounting, resetTimer, toggleCountdown } =
    useCountdownTimer(initialDuration);

  const { confirmationModal, showConfirmationModal } = useConfirmationModal({
    submitButtonOnClick: () => context.setIsMatchResetting(true),
    submitButtonText: 'Reiniciar',
  });

  const handleResetClick = () => {
    window.location.reload();
  };

  useEffect(() => {
    //console.log('isMatchResetting:', context.isMatchResetting);
    if (context.isMatchResetting) {
      resetTimer();
      console.log('resetTimer() called!');
    }
  }, [context.isMatchResetting]);

  return (
    <div className=" bg-darker-gray grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
      <div
        title="Time-Positive"
        className="mt-10 bg-black grid grid-cols-4 gap-2 justify-center items-center text-positive rounded-md"
      >
        <TimeButton time={1} onClick={() => addTime(1)} className="px-10" />
        <TimeButton time={10} onClick={() => addTime(10)} className="px-4" />
        <TimeButton time={60} onClick={() => addTime(60)} className="px-4" />

        <ActionButton
          text={isCounting ? 'PAUSE TIMER' : 'START TIMER'}
          onClick={toggleCountdown}
          className="bg-black text-white rounded-md p-2 hover:bg-gray-300 hover:text-green-700 transition-colors duration-200"
        />
      </div>
      <div
        title="Time-Negative"
        className="mt-[-290px] sm:col-start-1 lg:col-start-3 bg-black grid grid-cols-4 gap-2 justify-center items-center bg-red-500 text-negative rounded-md"
      >
        <TimeButton
          time={-1}
          onClick={() => addTime(-1)}
          className="bg-red-500"
        />
        <TimeButton time={-10} onClick={() => addTime(-10)} />
        <TimeButton time={-60} onClick={() => addTime(-60)} />
        {!isCounting && (
          <ActionButton
            text={'Reiniciar'}
            onClick={showConfirmationModal}
            className="bg-black text-white rounded-md p-2 hover:bg-gray-300 hover:text-red-700 transition-colors duration-200"
          />
        )}
      </div>
      <div
        title="Time"
        className="mt-[-100px] ml-auto col-span-2 sm:col-span-1 lg:col-span-2 text-center text-[300px]"
      >
        <CountdownTimer time={countdown} onClick={toggleCountdown} />
      </div>
      {confirmationModal}
    </div>
  );
};

export default TimerPanel;
