import { Typography } from '@mui/material';
import { useMemo, useState, useEffect } from 'react';

export default function AnimateCounters({ number, typoVari = 'body1' }) {
  const [numberVal, setNumberVal] = useState(0);

  useEffect(() => {
    let start = parseInt(numberVal);
    const end = parseInt(number);

    // find duration per increment
    if (end != 0) {
      console.log('end', end);
      console.log('start', start);
      let totalMilSecDur = parseInt(50);
      let incrementTime = totalMilSecDur / end;

      let timer = setInterval(() => {
        if (end > start) {
          start += 1;
        } else {
          start -= 1;
        }
        setNumberVal(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
    } else {
      setNumberVal(number);
    }
  }, [number]);

  return <Typography variant={typoVari}>{numberVal}</Typography>;
}
