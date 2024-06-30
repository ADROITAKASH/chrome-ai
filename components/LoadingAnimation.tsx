import React from 'react';
import useAnimatedGradient from '@/hooks/useAnimatedGradient';

const LoadingAnimation: React.FC = () => {
  const duration = 3000; // Duration in milliseconds
  const offset = useAnimatedGradient(duration);

  const primaryColor = '#2D2D32';
  const containerColor = '#235EC2';

  const gradientStyle = {
    background: `linear-gradient(90deg, ${primaryColor} 0%, ${containerColor} 50%, ${primaryColor} 100%)`,
    backgroundSize: '200% 100%',
    backgroundPosition: `${offset}% 50%`,
  };

  return (
    <div className='flex flex-col items-start justify-start space-y-4 p-4 max-w-5xl'>
      <div
        className='w-full h-5 rounded-lg animate-scroll'
        style={gradientStyle}
      ></div>
      <div
        className='w-full h-5 rounded-lg animate-scroll'
        style={gradientStyle}
      ></div>
      <div
        className='w-3/4 h-5 rounded-lg animate-scroll'
        style={gradientStyle}
      ></div>
    </div>
  );
};

export default LoadingAnimation;