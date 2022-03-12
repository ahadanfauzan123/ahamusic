import React, { useEffect, useState } from 'react'
import Search from './Search'
import { useSession } from 'next-auth/react';
import Poster from './Poster';
import Track from './Track';

function Body({ spotifyApi, chooseTrack }) {
    const { data:session} = useSession();
    const accessToken = session?.accessToken;
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

    // console.log(searchResults)
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
    // console.log(newReleases)

    // console.log(accessToken)
    // console.log(user)
  return (
    <section className='bg-black ml-24 py-4 space-y-8 md:max-w-[990px] flex-grow md:mr-2.5'>
        <Search search={search} setSearch={setSearch}/>
        
        <div className='grid items-center justify-center overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 2sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 p-4'>
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
        <div className='flex space-x-8 absolute min-w-full md:relative ml-6 max-w-[990px]'>
            {/* Genres */}
            <div className='hidden xl:inline max-w-[250px]'>
                <h2 className='text-white font-bold mb-3'>Genres</h2>
                <div className='flex gap-x-2 gap-y-2.5 flex-wrap mb-3'>
                    <div className='genre'>Classic</div>
                    <div className='genre'>House</div>
                    <div className='genre'>Minimal</div>
                    <div className='genre'>Hip-Hop</div>
                    <div className='genre'>Electronics</div>
                    <div className='genre'>Chillout</div>
                    <div className='genre'>Blues</div>
                    <div className='genre'>Country</div>
                    <div className='genre'>Techno</div>
                </div>
                <button className="btn">
                    All Genres
                </button>
            </div>
            {/* tracks */}
            <div className=''>
                <h2 className='text-white font-bold mb-3'>{searchResults.length === 0 ? "New Releases" : "Tracks" }</h2>
                <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[660px]">
            {searchResults.length === 0
              ? newReleases
                  .slice(4, newReleases.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))
              : searchResults
                  .slice(4, searchResults.length)
                  .map((track) => (
                    <Track
                      key={track.id}
                      track={track}
                      chooseTrack={chooseTrack}
                    />
                  ))}
          </div>
            </div>
        </div>
    </section>
  )
}

export default Body