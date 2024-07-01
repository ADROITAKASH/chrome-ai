import React from 'react';
const NotAvailable: React.FC = () => {
  return (
    <div className='flex flex-col items-start justify-start space-y-4 p-4 max-w-5xl m-auto'>
      <h2 className='text-3xl font-semibold m-auto text-center'>Gemini Nano not enabled</h2>
      <h3 className='text-xl m-auto text-center text-primary/50'>Follow this guide to enable <a href='#' className='text-blue-300 hover:text-blue-400'>Gemini Nano</a></h3>
    </div>
  );
};

export default NotAvailable;
