import React from 'react';
const NotEnabled: React.FC = () => {
  return (
    <div className='flex flex-col items-start justify-start space-y-4 p-4 max-w-5xl m-auto'>
      <h2 className='text-3xl font-semibold m-auto text-center'>Gemini Nano not enabled</h2>
      <h3 className='text-xl m-auto text-center text-primary/50'>Follow this guide to enable <a href='https://link.medium.com/keqpglVxTKb' target='_blank' className='text-blue-300 hover:text-blue-200 font-mono font-semibold tracking-wide'>Gemini Nano</a></h3>
    </div>
  );
};

export default NotEnabled;
