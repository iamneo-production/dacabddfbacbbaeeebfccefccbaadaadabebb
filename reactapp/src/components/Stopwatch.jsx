import React, { useState, useEffect } from 'react';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);

      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, intervalId]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const addLap = () => {
    setLaps([...laps, time]);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const formatTime = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedCentiseconds = String(centiseconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
  };

  return (
    <div className="stopwatch">
      <div className="time-display">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={startStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={addLap} disabled={!isRunning}>
          Add Lap
        </button>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="lap-list">
        {laps.map((lapTime, index) => (
          <div key={index} className="lap-item">
            Lap {index + 1}: {formatTime(lapTime)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stopwatch;
