import React from 'react';
const NotAvailable: React.FC = () => {
  return (
    <div className='flex flex-col items-start justify-start space-y-4 p-4 max-w-5xl m-auto'>
      <h2>Gemini Nano not enabled</h2>
      <h3>Follow this guide to enable &apos;Gemini Nano&apos;</h3>
    </div>
  );
};

export default NotAvailable;
