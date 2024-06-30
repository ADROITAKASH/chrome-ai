import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
} from 'react';

import { AISession } from '@/components/chat/ChatLayout';

import LoadingAnimation from '@/components/LoadingAnimation';
import NotAvailable from '@/components/chat/NotAvailable';
import { Input } from '@/components/ui/input';

export const LiveChat: React.FC<{
  aiSession: AISession;
  isAIAvailable: boolean | null;
}> = ({ aiSession, isAIAvailable }) => {
  const [inputText, setInputText] = useState<string>('');
  const [responseText, setResponseText] = useState<string>(
    'Start typing to see the response.'
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchAIResponse = useCallback(
    async (value: string, retries = 3) => {
      if (isAIAvailable && aiSession && value) {
        setIsLoading(true);
        try {
          const response = await aiSession.prompt(value);
          setResponseText(response);
          console.clear();
          console.log(value);
          console.log(response);
          setIsLoading(false);
        } catch (error) {
          console.clear();
          console.log(value);
          console.error('Error fetching AI response:', error);
          if (retries > 0) {
            setTimeout(() => {
              fetchAIResponse(value, retries - 1);
            }, 300); // Retry after 300 milliseconds
          } else {
            setResponseText(
              'Failed to fetch AI response after multiple attempts. Please try again later.'
            );
            setIsLoading(false);
          }
        }
      } else {
        setResponseText(
          'window.ai is not available in your browser. Please try again later.'
        );
      }
    },
    [isAIAvailable, aiSession]
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputText(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchAIResponse(value);
    }, 300); // Debounce time in milliseconds
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className='h-full w-full flex flex-col text-foreground'>
      <div className='flex-1 overflow-y-auto p-6'>
        <div className='text-lg font-medium'>
          {isAIAvailable === null ? (
            'Checking AI availability...'
          ) : isAIAvailable ? (
            <>
              <div className='mt-4'>
                <div className='max-w-full p-4 rounded-lg text-center bg-transparent text-card-foreground'>
                  {isLoading ? <LoadingAnimation /> : responseText}
                </div>
              </div>
            </>
          ) : (
            <NotAvailable />
          )}
        </div>
      </div>
      <div className='bg-input/50 p-4 flex'>
        <Input
          type='text'
          placeholder='Type your message...'
          value={inputText}
          onChange={handleInputChange}
          disabled={!isAIAvailable}
          className='w-full p-4 text-lg bg-transparent text-foreground border-none rounded-lg focus:ring-0 focus:outline-none'
          style={{
            boxShadow: 'none',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
};
