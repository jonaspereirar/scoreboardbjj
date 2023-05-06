import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { isInteger } from 'tunis-extensions';
import TimerPanel from '../../componets/panels/TimerPanel';
import { Scoreboard } from '../../componets/Scoreboard';
import { CountryList } from '../../models/Country';
import {
  defaultMatchDuration,
  defaultPlayer,
  Player,
} from '../../models/Player';

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([
    defaultPlayer(1),
    defaultPlayer(2),
  ]);

  const [duration, setDuration] = useState<number>(defaultMatchDuration);

  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const durationParam = queryParams.get('duration');
    if (durationParam && isInteger(durationParam, false, true)) {
      setDuration(Number(durationParam) * 60);
    }

    const updatedPlayers = [...players];
    for (let i = 0; i < players.length; i++) {
      const nameParam = queryParams.get(`name${(i + 1).toString()}`);
      if (nameParam) {
        updatedPlayers[i].name = nameParam;
      }

      const countryParam = queryParams
        .get(`country${(i + 1).toString()}`)
        ?.toUpperCase();
      if (countryParam && CountryList.has(countryParam)) {
        updatedPlayers[i].countryCode = countryParam;
      }
    }

    setPlayers(updatedPlayers);
  }, []);

  const handlePlayerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    playerIndex: number,
  ) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].name = event.target.value;
    setPlayers(updatedPlayers);
  };
  const handlePlayerNameChange2 = (
    event: React.ChangeEvent<HTMLInputElement>,
    playerIndex: number,
  ) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].name = event.target.value;
    setPlayers(updatedPlayers);
  };

  return (
    <div>
      <div className="flex">
        {/* <img src={gordonImage} alt="Gordon Ryan" className="w-20 h-20 mr-4" /> */}
        <div title="Player 1" className="flex text-[100px]">
          <input
            type="text"
            // value={players[0].name}
            // onChange={(event) => handlePlayerNameChange(event, 0)}
            placeholder="Lutador 1"
            className="outline-none border-none bg-gray"
          />
        </div>
      </div>
      <Scoreboard bgColor="yellow" textColor="green" />
      <hr className="mt-[-30px] border-t-2 border-gray-700" />
      <div className="flex">
        {/* <img src={gordonImage} alt="Gordon Ryan" className="w-20 h-20 mr-4" /> */}
        <div title="Player 2" className="mt-[-10px] flex text-[100px]">
          <input
            type="text"
            // value={players[0].name}
            // onChange={(event) => handlePlayerNameChange2(event, 0)}
            placeholder="Lutador 2"
            className="outline-none border-none bg-gray"
          />
        </div>
      </div>
      <Scoreboard bgColor="black" textColor="white" />
      <div className="timer-panel">
        <TimerPanel duration={duration} />
      </div>
      <Outlet />
    </div>
  );
}
