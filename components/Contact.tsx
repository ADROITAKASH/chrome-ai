import React from 'react';
import { GlowingStarsBackgroundCard } from './ui/glowing-stars';

const Contact: React.FC = () => {
  return (
    <div className='flex flex-col justify-between gap-6 h-full max-w-5xl m-auto px-4 py-2'>
      <GlowingStarsBackgroundCard>
        <h2>Chrome Ai</h2>
        <p>Blog on Chrome Ai - Gemini Nano</p>
      </GlowingStarsBackgroundCard>

      {/* Github */}
      <div className='flex flex-col items-start justify-start'>
        <a href='https://github.com/ADROITAKASH/chrome-ai' target="_blank"
          rel="noopener noreferrer" className="bg-muted text-center w-56 rounded-2xl h-14 relative font-sans text-primary text-lg font-semibold group"
        >
          <div
            className="bg-background/60 backdrop-blur-xl rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[216px] z-10 duration-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
          </div>
          <div className="flex flex-col justify-center items-start translate-x-[4.5rem]">
            <p className='text-md font-thin text-left text-base'>OpenSource on</p>
            <p className="text-left font-mono">GitHub</p>
          </div>
        </a>
      </div>

      {/* Contact */}
      <div className='flex flex-col gap-5 mt-auto mx-auto'>
        <div className='flex gap-7 m-auto text-primary/30'>
          {/* Instagram */}
          <a href='https://www.instagram.com/akashtdev/' target="_blank"
            rel="noopener noreferrer" className='font-mono hover:text-pink-300 hover:font-semibold'>Instagram</a>

          {/* Twitter */}
          <a href='https://x.com/akashtdev' target="_blank"
            rel="noopener noreferrer" className='font-mono hover:text-blue-300 hover:font-semibold'>Twitter</a>

          {/* Medium */}
          <a href='https://medium.com/@akashtdev' target="_blank"
            rel="noopener noreferrer" className='font-mono hover:text-white hover:font-semibold'>Medium</a>
        </div>

        {/* Made By AkashtDev */}
        <p className="text-center flex items-center justify-center space-x-2 m-auto">
          <img
            src="https://pbs.twimg.com/profile_images/1802188845657792512/V4wPAxqX_400x400.jpg"
            alt="Profile Picture"
            className="w-8 h-8 rounded-full"
          />
          <span>Made By</span>
          <a
            href="https://x.com/akashtdev"
            className="hover:text-blue-300 transition-colors duration-300 font-semibold font-mono"
            target="_blank"
            rel="noopener noreferrer"
          >
            @akashtdev
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;