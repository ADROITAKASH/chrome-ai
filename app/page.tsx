import { ModeToggle } from '@/components/ModeToggle';
import ChatLayout from '@/components/chat/ChatLayout';

export default function Home() {

  return (
    <main className='flex h-screen flex-col items-center justify-between py-4 pl-4'>
      <ChatLayout />
    </main>
  );
}
