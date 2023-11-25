import React, { useState } from 'react'
import './App.css'
import { SearchActions } from './actions/searchActions'
import { Footer } from './components/Footer'
import { PlaylistResults } from './components/PlaylistResults'
import { VideoResults } from './components/VideoResults'
import { Playlist, SearchType, Video } from './models/types'

export default function App() {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<string>(SearchType.Video)
  const [videoResults, setVideoResults] = useState<Video[]>([])
  const [playlistResults, setPlaylistResults] = useState<Playlist[]>([])
  const [error, setError] = useState(false)
  const [settings, setSettings] = useState(false)
  const searchActions = new SearchActions()

  const search = (query: string) => {
    setError(false)
    if (searchType === SearchType.Video) {
      searchActions.searchVideo(query).then(res => setVideoResults(res))
    } else {
      searchActions.searchPlaylists(query).then(res => setPlaylistResults(res))
    }
  }

  return (
    <div>
      <title>mp3shanty</title>
      <h1>mp3shanty💿</h1>
      <input
        type='search'
        value={query}
        onChange={e => setQuery(e.target.value)}
        autoCorrect='off'
        onKeyDown={e => { if (e.key === 'Enter') search(query) }}
        placeholder='Search'
      />
      <br />
      <button onClick={() => setSettings(!settings)}>Filter</button>
      {
        settings ? <select name='searchType' onChange={e => setSearchType(e.target.value)}>
            <option value={SearchType.Video}>{SearchType.Video}</option>
            <option value={SearchType.Playlist}>{SearchType.Playlist}</option>
          </select> : null
      }
      {
        searchType === SearchType.Video && videoResults.length > 0
          ? <VideoResults videoResults={videoResults} error={error} setError={setError} />
          : searchType === SearchType.Playlist && playlistResults.length > 0
            ? <PlaylistResults playlistResults={playlistResults} error={error} setError={setError} />
            : <Footer/>
      }
    </div>
  )
}
