'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import LoadingAnimation from '@/components/LoadingAnimation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AISession } from '@/components/chat/ChatLayout';
import { Send, Edit3, Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export const Conversation: React.FC<{
  aiSession: AISession;
  isAIAvailable: boolean | null;
  chatSessions: { id: string; name: string; history: any[] }[];
  setChatSessions: React.Dispatch<
    React.SetStateAction<{ id: string; name: string; history: any[] }[]>
  >;
  currentSessionId: string | null;
  setCurrentSessionId: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({
  aiSession,
  isAIAvailable,
  chatSessions,
  setChatSessions,
  currentSessionId,
  setCurrentSessionId,
}) => {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [inputText, setInputText] = useState('');
    const [chatHistory, setChatHistory] = useState<
      { id: number; role: string; message: string; isLoading?: boolean }[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [editName, setEditName] = useState<string>('');

    useEffect(() => {
      chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    useEffect(() => {
      if (currentSessionId) {
        const session = chatSessions.find(
          (session) => session.id === currentSessionId
        );
        setChatHistory(session ? session.history : []);
      }
    }, [currentSessionId, chatSessions]);

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!inputText.trim()) return;

      const userMessage = {
        id: chatHistory.length + 1,
        role: 'user',
        message: inputText,
      };
      const newChatHistory = [
        ...chatHistory,
        userMessage,
        {
          id: chatHistory.length + 2,
          role: 'assistant',
          message: '',
          isLoading: true,
        },
      ];
      setChatHistory(newChatHistory);
      setInputText('');
      setIsLoading(true);

      const prompt =
        newChatHistory.map((msg) => `${msg.role}: ${msg.message}`).join('\n') +
        `\nuser: ${inputText}\nassistant:`;

      let response = "";
      let trial = 0;
      try {
        while (response == "" && trial < 6) {
          const stream = aiSession.promptStreaming(prompt);
          for await (const chunk of await stream) {
            response = chunk;
          }
          trial++;
        }
      } catch (e: any) {
        console.error(e.message);
        setIsLoading(false);
      }

      const updatedChatHistory = newChatHistory.map((msg) =>
        msg.id === chatHistory.length + 2
          ? {
            ...msg,
            message: response || '',
            isLoading: false,
          }
          : msg
      );
      setChatHistory(updatedChatHistory);
      updateSessionHistory(updatedChatHistory);
      setIsLoading(false);
    };

    const handleFormReset = () => {
      setChatHistory([]);
      setInputText('');
    };

    const updateSessionHistory = (history: any[]) => {
      if (!currentSessionId) return;

      const updatedSessions = chatSessions.map((session) =>
        session.id === currentSessionId ? { ...session, history } : session
      );
      setChatSessions(updatedSessions);
      localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
    };

    const handleEdit = (id: string) => {
      const session = chatSessions.find((session) => session.id === id);
      if (session) {
        setEditMode(id);
        setEditName(session.name);
      }
    };

    const handleSaveEdit = (id: string) => {
      const updatedSessions = chatSessions.map((session) =>
        session.id === id ? { ...session, name: editName } : session
      );
      setChatSessions(updatedSessions);
      localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
      setEditMode(null);
      setEditName('');
    };

    const deleteSession = (id: string) => {
      const updatedSessions = chatSessions.filter((session) => session.id !== id);
      setChatSessions(updatedSessions);
      localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
      if (currentSessionId === id)
        setCurrentSessionId(
          updatedSessions.length > 0 ? updatedSessions[0].id : null
        );
    };

    return (
      <div className='h-full w-full flex flex-col text-foreground border border-l-0 rounded-r-3xl'>
        <div className='flex items-center justify-between text-2xl font-semibold px-4 py-4'>
          {editMode === currentSessionId ? (
            <div className='flex items-center w-full'>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className='w-full bg-input text-foreground'
              />
              <Button
                onClick={() => handleSaveEdit(currentSessionId!)}
                className='ml-2 bg-primary text-primary-foreground hover:bg-primary/90 p-2 rounded-2xl'
              >
                Save
              </Button>
            </div>
          ) : (
            <>
              <h1 className='p-2'>
                {
                  chatSessions.find((session) => session.id === currentSessionId)
                    ?.name
                }
              </h1>
              <div className='flex items-center space-x-2'>
                <Button
                  onClick={() => handleEdit(currentSessionId!)}
                  className='bg-transparent text-primary/30 hover:text-primary/80 hover:bg-transparent p-2 rounded'
                >
                  <Edit3 className='h-5 w-5' />
                </Button>
                <Button
                  onClick={() => deleteSession(currentSessionId!)}
                  className='bg-transparent text-red-300/50 hover:text-red-300/90 hover:bg-transparent p-2 rounded'
                >
                  <Trash className='h-5 w-5' />
                </Button>
              </div>
            </>
          )}
        </div>
        <Separator />
        <div className='flex-1 overflow-y-auto p-4'>
          <div className={cn('text-lg font-medium', !chatHistory.length && 'flex items-center justify-center h-full')}>
            {!chatHistory.length ? (
              <div className='text-center font-mono text-2xl'>Start a conversation</div>
            ) : (
              chatHistory.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                    } mb-4`}
                >
                  {msg.isLoading ? (
                    <div className='w-full max-w-xl p-4 rounded-lg bg-transparent text-card-foreground'>
                      <LoadingAnimation />
                    </div>
                  ) : (
                    <div
                      className={`max-w-xl px-4 py-2 rounded-2xl ${msg.role === 'user'
                        ? 'bg-primary/10'
                        : 'bg-transparent'
                        } text-${msg.role === 'user' ? 'primary/90' : 'card-foreground'
                        }`}
                    >
                      {msg.message == "" ? "Something went wrong" : msg.message}
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={chatContainerRef}></div>
          </div>
        </div>
        <div className='bg-input/50 p-4 flex'>
          <form
            className='flex w-full items-center space-x-2'
            onSubmit={handleFormSubmit}
            onReset={handleFormReset}
          >
            <Input
              placeholder='Type your message...'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={!isAIAvailable || isLoading}
              className='w-full p-4 text-lg bg-transparent text-foreground border-none rounded-lg focus:ring-0 focus:outline-none'
              style={{
                boxShadow: 'none',
                outline: 'none',
              }}
            />
            <Button
              type='submit'
              size='icon'
              disabled={!isAIAvailable || isLoading}
            >
              <Send className='h-4 w-4' />
              <span className='sr-only'>Send</span>
            </Button>
          </form>
        </div>
      </div>
    );
  };
