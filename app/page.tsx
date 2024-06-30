import { ModeToggle } from '@/components/ModeToggle';

export default function Home() {

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='m-auto font-extrabold text-7xl'>Hello World</h1>
      <ModeToggle/>
    </main>
  );
}
