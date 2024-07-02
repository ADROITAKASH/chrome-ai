import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useCallback,
  ReactElement,
} from 'react';

import { AISession } from '@/components/chat/ChatLayout';

import LoadingAnimation from '@/components/LoadingAnimation';
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
          let response = '', trial = 0;
          while (response == "" && trial < retries) {
            const stream = aiSession.promptStreaming(value);
            for await (const chunk of await stream) {
              response = chunk;
            }
            trial++;
          }
          setResponseText(response);
          setIsLoading(false);
        } catch (error: any) {
          console.error(error.message);
          setIsLoading(false);
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

  const getFormattedText = (input: string): ReactElement[] => {
    if (!input) return [];

    // Normalize the input to ensure uniform line breaks
    const normalizedInput = input.replace(/\r\n|\r/g, '\n');

    // Split the input text by line breaks and map each segment to JSX
    const lines = normalizedInput.split('\n');
    const jsxOutput: ReactElement[] = [];

    lines.forEach((line, index) => {
      if (line.trim().startsWith('*')) {
        const cleanLine = line.trim().slice(1).trim().replace(/\*+/g, '');
        jsxOutput.push(<b key={`b${index}`}>{cleanLine}</b>);
        jsxOutput.push(<br key={`br${index}`} />);
      } else {
        const cleanLine = line.replace(/\*+/g, '').trim();
        if (cleanLine.length > 0) {
          jsxOutput.push(<span key={`span${index}`}>{cleanLine}</span>);
          jsxOutput.push(<br key={`br${index}`} />);
        }
      }
    });

    return jsxOutput;
  };

  return (
    <div className='h-full w-full flex flex-col text-foreground border border-l-0 rounded-r-3xl'>
      <div className='flex-1 overflow-y-auto p-6'>
        <div className='text-lg font-medium'>
          <div className='mt-4'>
            <div className='max-w-full h-full p-4 rounded-lg text-center bg-transparent text-card-foreground'>
              {isLoading ? <LoadingAnimation center={true} /> : responseText == 'Start typing to see the response.' ? <div className='text-center font-mono text-2xl'>Start typing to see the response.</div> : getFormattedText(responseText)}
            </div>
          </div>
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
