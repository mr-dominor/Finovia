
//Finovia
import {WalletIcon, ArrowRightIcon} from '@heroicons/react/24/outline'
import { lusitana } from '@/ui/font';
import Image from 'next/image';
import Link from 'next/link';
export default async function Home() {
    
  return (

    <main className="flex min-h-screen flex-col p-6">
     <div className="flex h-20 shrink-0 bg-blue-500 items-end rounded-lg p-4 md:h-52">
        <WalletIcon className='text-white w-12' />
        <span className={`text-white p-2 font-bold text-3xl ${lusitana.className}`}>Finovia</span>
      </div>
      <div className='flex flex-col md:flex-row grow mt-4 rounded-lg '>
        <div className='bg-gray-50 rounded-lg grow flex flex-col items-start px-6 py-10 md:px-20 w-full md:w-2/5'>
          <p className={`text-3xl ${lusitana.className}`}>Welcome to <span className='text-blue-500 font-bold'>Finovia</span>. <br/><span>“Track. Analyze. Act.”</span></p>
          {/*Add the navlink later */}
          <Link href='/dashboard'><div className='bg-blue-500 text-white w-32 h-10 flex justify-center items-center gap-2 rounded-lg text-center m-6 p-1'><strong>Dashboard</strong><ArrowRightIcon className='w-8 h-6' /></div></Link>
        </div>
        <div className='grow w-full md:w-3/5 p-6 rounded-lg md:px-28'>
          <Image 
          src="/hero-desktop.png"
          width={1000}
          height={760}
          className='hidden md:block'
          alt='Screenshots of the Project'
          />
          <Image 
          src="/hero-mobile.png"
          width={560}
          height={620}
          className='block md:hidden' 
          alt='Screenshots of the Project'
          />
        </div>
      </div>
    </main>
  );
}
