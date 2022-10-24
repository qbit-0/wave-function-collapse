import { useEffect, useRef } from "react";

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) savedCallback.current();
    };
    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
