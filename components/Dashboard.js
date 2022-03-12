import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Body from '../components/Body'
import SpotifyWebApi from 'spotify-web-api-node'
import Right from '../components/Right'
import Player from '../components/Player'
import { useRecoilState } from 'recoil'
import { playingTrackState } from '../atom/playerAtom'
import { useSession } from 'next-auth/react'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
  });

  
  function Dashboard() {
    const {data: session} = useSession()
    const accessToken = session?.accessToken;
      const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState);
      const [showPlayer, setShowPlayer] = useState(false);

      useEffect(() => {
        setShowPlayer(true);
      }, [])
      //choosetrack digunakan untuk memilih lagu
    const chooseTrack = (track) => {
        setPlayingTrack(track);
    }
  return (
    <main className='flex min-h-screen min-w-max'>
        <Sidebar/>
        <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>
        <Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />

        {/* show player */}
        {/* {showPlayer && ( */}
                <div className='fixed bottom-0 left-0 right-0 z-50'>
                  <Player accessToken={accessToken} trackUri={playingTrack.uri} />
                </div>
         {/* )} */}
    </main>
  )
}

export default Dashboard