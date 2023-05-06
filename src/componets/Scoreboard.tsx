import { useState } from 'react';
import { Button } from './Button';

interface ButtonProps {
  value: string;
  onClick: () => void;
  color?: string;
}

interface colorProps {
  bgColor: string;
  textColor: string;
}

export function Scoreboard({ bgColor, textColor }: colorProps) {
  const [score, setScore] = useState(0);
  const [advantage, setAdvantage] = useState(0);
  const [penalty, setPenalty] = useState(0);

  function handleIncrement(value: number) {
    setScore(score + value);
  }

  function handleDecrement(value: number) {
    setScore(score - value);
  }

  function handleAdvantageIncrement() {
    setAdvantage(advantage + 1);
  }

  function handleAdvantageDecrement() {
    setAdvantage(advantage - 1);
  }
  function handlePunitionIncrement() {
    setPenalty(penalty + 1);
  }

  function handlePunitionDecrement() {
    setPenalty(penalty - 1);
  }

  const buttons: ButtonProps[] = [
    { value: '+1', onClick: () => handleIncrement(1), color: 'green' },
    { value: '+2', onClick: () => handleIncrement(2), color: 'green' },
    { value: '+3', onClick: () => handleIncrement(3), color: 'green' },
    { value: '+4', onClick: () => handleIncrement(4), color: 'green' },
    { value: 'A', onClick: handleAdvantageIncrement, color: 'green' },
    { value: 'P', onClick: handlePunitionIncrement, color: 'red' },
    { value: '-1', onClick: () => handleDecrement(1), color: 'red' },
    { value: '-2', onClick: () => handleDecrement(2), color: 'red' },
    { value: '-3', onClick: () => handleDecrement(3), color: 'red' },
    { value: '-4', onClick: () => handleDecrement(4), color: 'red' },
    { value: '-A', onClick: handleAdvantageDecrement, color: 'red' },
    { value: '-P', onClick: handlePunitionDecrement, color: 'red' },
  ];

  return (
    <div className="flex">
      <div className="ml-[-10px] space-y-4 justify-start">
        {buttons.slice(0, 6).map((button) => (
          <Button
            key={button.value}
            value={button.value}
            onClick={button.onClick}
            color="green"
          />
        ))}
        <br />
        {buttons.slice(6).map((button) => (
          <Button
            key={button.value}
            value={button.value}
            onClick={button.onClick}
            color="red"
          />
        ))}
      </div>
      <div className="ml-auto">
        <div className="mt-[-140px] mr-[350px] flex-col">
          <div className="text-3xl">VANTAGEM</div>
          <div className="text-lime-500 text-8xl ">{advantage}</div>

          <div className="text-3xl">PUNIÇÃO</div>
          <div className="text-red text-8xl">{penalty}</div>
        </div>
        <div
          className={`mt-[-270px] ml-auto h-[300px] w-[300px] flex items-center justify-center font-bold text-[300px] text-${textColor}`}
          style={{ backgroundColor: bgColor }}
        >
          {score}
        </div>
      </div>
    </div>
  );
}
