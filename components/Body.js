import React, { useEffect, useState } from 'react'
import Search from './Search'
import { useSession } from 'next-auth/react';
import Poster from './Poster';

function Body({ spotifyApi, chooseTrack }) {
    const { data:session} = useSession();
    const {accessToken} = session;
    // const user = session.user;
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [newReleases, setNewReleases] = useState([]);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    //searching....
    useEffect(() => {
        //jika tidak ada search dari tag input, maka set hasilnya menjadi array kosong []
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        //jika ada search yang diketik...
        spotifyApi.searchTracks(search).then((res) => {
            setSearchResults(res.body.tracks.items.map((track) => {
                return {
                    id : track.id,
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: track.album.images[0].url,
                    popularity: track.popularity,
                }
            }));
        })
    },[search, accessToken]);

    console.log(searchResults)
    // new releases.....
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.getNewReleases().then((res) => {
            setNewReleases(res.body.albums.items.map((track) => {
                return {
                    id: track.id,
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: track.images[0].url,
                }
            }))
        })
    }, [accessToken])
    console.log(newReleases)

    // console.log(accessToken)
    // console.log(user)
  return (
    <section className='bg-black ml-24 py-4 space-y-8 md:max-w-[990px] flex-grow md:mr-2.5'>
        <Search search={search} setSearch={setSearch}/>
        
        <div className='grid items-center justify-center overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4'>
            {searchResults.length === 0 ? newReleases.slice(0,4).map((track) => (
                <Poster key={track.id}
                 track={track} 
                 chooseTrack={chooseTrack}
                 />
            )) : searchResults.slice(0,4).map((track) => (
                <Poster key={track.id}
                track={track}
                chooseTrack={chooseTrack}
                />
            ))}
        </div>
    </section>
  )
}

export default Body