import { useEffect, useRef } from 'react';

export const usePlayback = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(_ => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(_ => {
    if (delay !== null) {
      let tick = setInterval(_ => savedCallback.current(), delay);
      return _ => clearInterval(tick);
    }
  }, [delay]);
}
