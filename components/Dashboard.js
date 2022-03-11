import React from 'react'
import Sidebar from '../components/Sidebar'
import Body from '../components/Body'
import Right from '../components/Right'
import SpotifyWebApi from 'spotify-web-api-node'
import { useRecoilState } from 'recoil'
import { playingTrackState } from '../atom/playerAtom'

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
  });

  
  function Dashboard() {
      const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)
    const chooseTrack = (track) => {
        setPlayingTrack(track);
    }
  return (
    <main>
        <Sidebar/>
        <Body spotifyApi={spotifyApi} chooseTrack={chooseTrack}/>
        <Right/>
    </main>
  )
}

export default Dashboard