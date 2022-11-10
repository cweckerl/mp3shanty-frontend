import React, { useState } from 'react'
import { SearchActions } from './actions/searchActions'
import { Playlist, SearchType, Video } from './models/searchResults'
import { VideoResults } from './components/VideoResults'
import { PlaylistResults } from './components/PlaylistResults'
import './App.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<string>(SearchType.Video)
  const [videoResults, setVideoResults] = useState<Video[]>([])
  const [playlistResults, setPlaylistResults] = useState<Playlist[]>([])
  const [error, setError] = useState(false)
  const searchActions = new SearchActions()

  const search = () => {
    setError(false)
    if (searchType === SearchType.Video) {
      searchActions.searchVideo(query).then(res => setVideoResults(res))
    } else if (searchType === SearchType.Playlist) {
      searchActions.searchPlaylists(query).then(res => setPlaylistResults(res))
    }
  }

  return (
    <div>
      <title>mp3shanty</title>
      <h1>mp3shanty💿</h1>
      <div>
        <input
          type='text'
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoCorrect='off'
          onKeyDown={e => {
            if (e.key === 'Enter') search()
          }}
        />
        <button onClick={search}>Search</button>
        <br />
        <input
          type='radio'
          name='filter'
          value={SearchType.Video}
          checked={searchType === SearchType.Video}
          onChange={e => setSearchType(e.target.value)}
        />Video
        <input
          type='radio'
          name='filter'
          value={SearchType.Playlist}
          checked={searchType === SearchType.Playlist}
          onChange={e => setSearchType(e.target.value)}
        />Playlist
      </div>
      {
        searchType === SearchType.Video && videoResults.length > 0
          ? <VideoResults videoResults={videoResults} error={error} setError={setError} />
          : searchType === SearchType.Playlist && playlistResults.length > 0
            ? <PlaylistResults playlistResults={playlistResults} error={error} setError={setError} />
            : null
      }
      <h6>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href="https://github.com/cweckerl/mp3shanty-frontend/blob/master/README.md"
        >How do I use this?</a>
      </h6>
      <h6>Not for commercial use. Downloading copyrighted work is prohibited.</h6>
    </div>
  )
}
