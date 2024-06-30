import { useEffect, useState } from 'react';

const useAnimatedGradient = (duration: number) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const animate = () => {
      setOffset((prev) => (prev >= 200 ? 0 : prev + 1));
    };
    const intervalId = setInterval(animate, duration / 200);

    return () => clearInterval(intervalId);
  }, [duration]);

  return offset;
};

export default useAnimatedGradient;
