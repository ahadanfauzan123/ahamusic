import React from 'react'
import {BsFillPauseFill, BsFillPlayFill} from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { playingTrackState, playState } from '../atom/playerAtom';

function Poster({track, chooseTrack}) {
  const [play, setPlay] = useRecoilState(playState);
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);

    const handlePlay = () => {
        chooseTrack(track);

        if(track.uri === playingTrack.uri) {
            setPlay(!play); 
        }
    }
  
    return (
    <div className=' poster w-[220px] h-[360px] sm:w-[240px] md:w-[300px] lg:w-[280px] xl:w-[220px] rounded-[40px] overflow-hidden relative text-white/80 cursor-pointer
     hover:scale-105 hover:text-white/100 
    transition duration-200 ease-out group mx-auto' onClick={handlePlay}>
        <img src={track.albumUrl} alt=""
        className='h-full w-full absolute inset-0 object-cover rounded-[40px] opacity-80 group-hover:opacity-100' />
        <div className='absolute bottom-10 inset-x-0 ml-4 flex items-center space-x-3.5'>
            <div className='h-10 w-10 bg-[#15883e] rounded-full flex flex-shrink-0 items-center justify-center group-hover:bg-[#1db954]'>
                {track.uri === playingTrack.uri && play ? (
                    <BsFillPauseFill className='text-xl'/>                
                ) :  (
                <BsFillPlayFill className='text-xl ml-[1px]'/>                
                )}
            </div>
            <div className='text-[15px]'>
                <h4 className='font-extrabold truncate w-[120px]'>{track.title}</h4>
                <h6>{track.artist}</h6>
            </div>
        </div>
    </div>
  )
}

export default Poster