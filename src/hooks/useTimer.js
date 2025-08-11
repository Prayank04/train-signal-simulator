import { useState, useEffect } from 'react';

export default function useTimer(precision = 16) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), precision);
    return () => clearInterval(id);
  }, [precision]);
  return time;
}
