import React from 'react'
import Image from 'next/image'
import {
    HomeIcon,
    ChartBarIcon,
    ClockIcon,
    DotsHorizontalIcon
} from '@heroicons/react/solid'
import { FaMicrophoneAlt } from "react-icons/fa";
import { RiCompassFill } from "react-icons/ri";

function Sidebar() {
  return (
    <section className='fixed top-0 z-40 flex flex-col items-center p-4 bg-black w-[90px] h-screen space-y-12'>
        <Image src="https://rb.gy/xkacau"
         width={56} 
         height={56}
         objectFit='contain'
         className='animate-bounce'/>

         <div className='flex flex-col space-y-8'>
         <HomeIcon className="sidebarIcon text-white opacity-[0.85]" />
        <RiCompassFill className="sidebarIcon text-2xl" />
        <FaMicrophoneAlt className="sidebarIcon ml-1" />
        <ChartBarIcon className="sidebarIcon" />
        <ClockIcon className="sidebarIcon" />
        <DotsHorizontalIcon className="sidebarIcon" />
         </div>
    </section>
  )
}

export default Sidebar