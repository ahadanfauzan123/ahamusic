import React, { useState } from 'react'
import {ImHeadphones} from 'react-icons/im'
import { AiFillHeart } from 'react-icons/ai'
import {BsFillPauseFill, BsFillPlayFill} from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { playingTrackState, playState } from '../atom/playerAtom'

function Track({track, chooseTrack}) {
    const [play, setPlay] = useRecoilState(playState)
    const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)
    const [hasLiked, setHasLiked] = useState(false)

    const handlePlay = () => {
        chooseTrack(track)
        if (track.uri === playingTrack.uri) {
            setPlay(!play);
        }
    }
  return (
    <div className='flex items-center justify-between space-x-20 cursor-default hover:bg-[#fafafa]/10 py-2 px-4 rounded-lg group transition delay-75 ease-out'>
        <div className='flex items-center'>
            <img src={track.albumUrl} alt="" className='w-[45px] h-[45px] rounded-xl object-cover mr-3'/>
        
            <div className='flex-grow'>
                <h4 className='text-white text-sm font-semibold truncate w-[120px]'>{track.title}</h4>
                <p className='text-[rgb(179,179,179)] text-sm font-thin'>{track.artist}</p>
            </div>
        </div>
        {/* buttons */}
        <div className='md:ml-auto flex items-center space-x-2'>
            <div className='text-white flex space-x-1 text-sm font-semibold'>
                <ImHeadphones className='text-md text-white' />
                <h4>{track.popularity}</h4>
            </div>
            {/* heart and play */}
            <div className='flex items-center justify-between rounded-full border-2 border-[#262626] w-[85px] h-[38px] relative cursor-pointer group-hover:border-white/30'>
                <AiFillHeart className={`text-xl ml-3 icon ${hasLiked ? "text-[#d6459e] text-2xl" : "text-[rgb(165,163,163)]"}`} 
                onClick={() => setHasLiked(!hasLiked)} />
                <div className='h-[34px] w-[34px] bg-[#3091e0] rounded-full flex items-center justify-center text-xl text-white'
                    onClick={handlePlay}>
                    {track.uri === playingTrack.uri && play ? (
                        <BsFillPauseFill className='text-2xl hover:scale-90 transition-all ease-in animate-pulse'/>
                    ) : (
                    <BsFillPlayFill className='ml-[1px] hover:scale-110 transition-all'/>
                    )}
                </div>
            </div>

        </div>
        
    </div>
  )
}

export default Track