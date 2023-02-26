import React, { useState, useEffect } from "react";

type TimerProps = {
  workTime: number;
  breakTime: number;
};

enum TimerState {
  WORKING = "Working",
  BREAKING = "Breaking",
}

const Timer: React.FC<TimerProps> = ({ workTime, breakTime }) => {
  const [secondsLeft, setSecondsLeft] = useState(workTime * 60);
  const [timerState, setTimerState] = useState(TimerState.WORKING);

  useEffect(() => {
    let interval: number;

    if (secondsLeft === 0) {
      if (timerState === TimerState.WORKING) {
        setSecondsLeft(breakTime * 60);
        setTimerState(TimerState.BREAKING);
      } else {
        setSecondsLeft(workTime * 60);
        setTimerState(TimerState.WORKING);
      }
    }

    if (secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [secondsLeft, timerState, workTime, breakTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div>
      <h1>{timerState}</h1>
      <h2>{formatTime(secondsLeft)}</h2>
    </div>
  );
};

const PomodoroClock: React.FC = () => {
  const [workTime, setWorkTime] = useState(1);
  const [breakTime, setBreakTime] = useState(5);

  const handleWorkTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkTime(parseInt(event.target.value));
  };

  const handleBreakTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBreakTime(parseInt(event.target.value));
  };

  return (
    <div>
      <label>
        Work Time (minutes):
        <input type="number" value={workTime} onChange={handleWorkTimeChange} />
      </label>
      <br />
      <label>
        Break Time (minutes):
        <input
          type="number"
          value={breakTime}
          onChange={handleBreakTimeChange}
        />
      </label>
      <br />
      <Timer workTime={workTime} breakTime={breakTime} />
    </div>
  );
};

export default PomodoroClock;
