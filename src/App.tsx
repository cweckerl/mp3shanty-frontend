import React, { useState } from 'react'
import { SearchActions } from './actions/searchActions'
import { SearchResults } from './components/SearchResults'
import { Video } from './models/searchResults'
import './App.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [videoResults, setVideoResults] = useState<Video[]>([])
  const searchActions = new SearchActions()

  return (
    <div>
      <title>mp3shanty</title>
      <h1>mp3shanty💿</h1>
      <input
        type='text'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={() => searchActions.searchVideo(query).then(res => setVideoResults(res))}>
        Search
      </button>
      {videoResults.length > 0 ? <SearchResults videoResults={videoResults} /> : null}
      <h6>Not for commerial use. Downloading copyrighted work is prohibited.</h6>
    </div>
  )
}
