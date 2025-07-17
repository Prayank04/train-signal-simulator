import { useState, useEffect } from 'react';

export default function useTimer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date()); // just update from local machine
    }, 1000);

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return time;
}
