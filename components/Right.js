import React, { useEffect, useState } from 'react'
import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";
import Dropdown from './Dropdown'
import { useSession } from 'next-auth/react';
import Spotify from 'next-auth/providers/spotify';
import RecentlyPlayed from './RecentlyPlayed';

function Right({spotifyApi, chooseTrack}) {
  const {data : session} = useSession();
  const accessToken = session?.accessToken;
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
}, [accessToken]);

  useEffect(() => {
    if(!accessToken) return;

    //jika token ada...
    spotifyApi.getMyRecentlyPlayedTracks({limit: 25}).then((res) => {
      setRecentlyPlayed(res.body.items.map(({track}) => {
        return {
          id: track.id,
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: track.album.images[0].url,
        }
      })
      );
    });
  }, [accessToken]);
  console.log(recentlyPlayed)


  return (
    <section className='p-4 space-y-6 pr-8'>
      <div className='flex space-x-2 items-center justify-between'>
        {/* icon */}
        <div className='flex items-center justify-center space-x-4 border-2 border-[#262626] rounded-full h-12 w-[120px] mr-4'>
          <HiOutlineShieldCheck className='text-[#ccc] text-xl'/>
          <MdOutlineSettings className='text-[#ccc] text-xl'/>
          <BiBell className='text-[#ccc] text-xl'/>
        </div>
        {/* profile & logout */}
        <Dropdown/>
      </div>

        {/* recent songs */}
        <div className='bg-[#0d0d0d] border-2 border-[#262626] p-4 rounded-xl space-y-4 text-white'>
          <div className='flex items-center justify-between'>
            <h4 className='text-white font-semibold text-sm'>Recently Played</h4>
            <ViewGridIcon className='w-[30px] h-[30px] text-[#686868]'/>
          </div>

          <div className='space-y-4 overflow-y-scroll scrollbar-hide overflow-x-hidden h-[240px] md:h-[450px]'>
            {recentlyPlayed.map((track, index) => (
              <RecentlyPlayed key={index} 
                  track={track}
                  chooseTrack={chooseTrack}/>
            ))}
          </div>
          <button className="btn">
          View All
        </button>
        </div>

    </section>
  )
}

export default Right