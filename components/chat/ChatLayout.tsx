'use client';

import React, { useState, useEffect } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import NotAvailable from '@/components/chat/NotAvailable';
import { cn } from '@/lib/utils';
import { Conversation } from '@/components/chat/Conversation';
import { LiveChat } from '@/components/chat/LiveChat';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs } from '@/components/ui/tabs';
import { Edit3, PlusCircle, Search, Trash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '../ui/switch';

declare global {
  interface Window {
    ai: any;
  }
}

export interface AISession {
  prompt: (input: string) => Promise<string>;
}

export default function ChatLayout() {
  const defaultLayout = [265, 340, 755];

  const [aiSession, setAISession] = useState<AISession | null>(null);
  const [isAIAvailable, setIsAIAvailable] = useState<boolean | null>(null);
  const [isLiveChat, setIsLiveChat] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState([265, 440, 655]);
  const [searchTerm, setSearchTerm] = useState('');
  const [chatSessions, setChatSessions] = useState<
    { id: string; name: string; history: any[] }[]
  >([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>('');

  const handleToggle = () => {
    setIsLiveChat(!isLiveChat);
  };

  useEffect(() => {
    const initializeAISession = async () => {
      try {
        const aiStatus = 'ai' in window;
        if (aiStatus) {
          const session = await window.ai.createTextSession();
          setAISession(session);
        }
        setIsAIAvailable(aiStatus);
      } catch {
        setIsAIAvailable(false);
      }
    };

    initializeAISession();
    const storedSessions = JSON.parse(
      localStorage.getItem('chatSessions') || '[]'
    );
    setChatSessions(storedSessions);
    if (storedSessions.length > 0) {
      setCurrentSessionId(storedSessions[0].id);
    }
  }, []);

  const createNewChat = () => {
    const newSession = {
      id: Date.now().toString(),
      name: `Chat ${chatSessions.length + 1}`,
      history: [],
    };
    const updatedSessions = [...chatSessions, newSession];
    setChatSessions(updatedSessions);
    localStorage.setItem('chatSessions', JSON.stringify(updatedSessions));
    setCurrentSessionId(newSession.id);
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

  const clearAllSessions = () => {
    setChatSessions([]);
    localStorage.removeItem('chatSessions');
    setCurrentSessionId(null);
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

  return (
    <ResizablePanelGroup
      direction='horizontal'
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className='h-full items-stretch bg-background text-foreground'
    >
      <React.Fragment>
        <ResizablePanel
          defaultSize={defaultLayout[1]}
          minSize={20}
          maxSize={35}
          className='bg-foreground/5 rounded-l-3xl'
        >
          <Tabs defaultValue='Conversations'>
            <div className='flex items-center justify-between text-2xl font-semibold px-4 py-4'>
              <h1 className='p-2'>Gemini Nano</h1>
            </div>
            <Separator />

            <div className="p-4">
              <div className='bg-muted/35 border shadow rounded-lg p-6 w-full max-w-md m-auto'>
                <div className='flex items-center justify-between'>
                  <span className={cn('font-semibold', isLiveChat ? 'text-primary' : 'text-muted-foreground')}>
                    Live chat
                  </span>
                  <Switch checked={isLiveChat} onCheckedChange={handleToggle} />
                </div>
              </div>
            </div>

            <Separator />

            <div
              className={`${isLiveChat ? 'pointer-events-none opacity-50' : ''
                }`}
            >
              <div className='flex items-center px-4 py-2 space-x-2 pt-4'>
                <div className='flex items-center w-full bg-transparent focus:bg-input/50 rounded-xl focus-within:bg-input/90 hover:bg-input/30'>
                  <Search className='h-5 w-5 text-muted-foreground ml-2' />
                  <Input
                    placeholder='Search'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full bg-transparent text-foreground border-none focus:ring-0 focus:outline-none rounded-xl pl-2'
                  />
                </div>
                <Button
                  onClick={createNewChat}
                  className='bg-transparent text-[#91B98E] hover:bg-transparent p-2 rounded'
                >
                  <PlusCircle className='h-7 w-7 pr-2' /> New Chat
                </Button>
              </div>
              <div className="p-4 pl-8 ">
                <div className="group flex flex-row justify-center items-center relative text-center cursor-pointer" onClick={clearAllSessions}>
                  <div className="flex-grow border-t border-red-300/80 group-hover:border-red-300"></div>
                  <h3 className="z-10 text-red-300/80 group-hover:text-red-300 focus:outline-none px-4">
                    Clear All
                  </h3>
                </div>
              </div>
              <div className='space-y-4 px-4 py-2'>
                {chatSessions
                  .filter((session) =>
                    session.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((session) => (
                    <div
                      key={session.id}
                      className={cn(
                        'group flex items-center justify-between p-6 border bg-card/30 text-muted-foreground rounded-lg shadow-md cursor-pointer hover:bg-muted/10 transition-all duration-300 max-w-md m-auto',
                        currentSessionId === session.id &&
                        'bg-muted/50 text-card-foreground border-card-foreground/10'
                      )}
                      onClick={() => setCurrentSessionId(session.id)}
                    >
                      {editMode === session.id ? (
                        <div className='flex items-center w-full'>
                          <Input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className='w-full bg-input text-foreground'
                          />
                          <Button
                            onClick={() => handleSaveEdit(session.id)}
                            className='ml-2 bg-primary text-primary-foreground hover:bg-primary/90 p-2 rounded'
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span className='font-semibold'>{session.name}</span>
                          <div className='flex items-center space-x-2'>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(session.id);
                              }}
                              className='bg-transparent text-transparent group-hover:text-primary/30 hover:text-primary/80 hover:bg-transparent p-2 rounded'
                            >
                              <Edit3 className='h-5 w-5' />
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteSession(session.id);
                              }}
                              className='bg-transparent text-red-300/50 hover:text-red-300/90 hover:bg-transparent p-2 rounded'
                            >
                              <Trash className='h-5 w-5' />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={defaultLayout[2]}
          className='bg-foreground/5 rounded-r-3xl'
        >
          {aiSession && isAIAvailable !== null ? (
            isLiveChat ? (
              <LiveChat aiSession={aiSession} isAIAvailable={isAIAvailable} />
            ) : (
              <Conversation
                aiSession={aiSession}
                isAIAvailable={isAIAvailable}
                chatSessions={chatSessions}
                setChatSessions={setChatSessions}
                currentSessionId={currentSessionId}
                setCurrentSessionId={setCurrentSessionId}
              />
            )
          ) : (
            <div className='flex items-center justify-center flex-1'>
              {isAIAvailable === null ? (
                'Checking AI availability...'
              ) : (
                <NotAvailable />
              )}
            </div>
          )}
        </ResizablePanel>
      </React.Fragment>
      <div
        className={cn(
          isCollapsed &&
          'min-w-[20%] max-w-[25%] transition-all duration-300 ease-in-out'
        )}
      >
        <h3 className='p-4 text-lg font-medium'>Hello world</h3>
      </div>
    </ResizablePanelGroup>
  );
}