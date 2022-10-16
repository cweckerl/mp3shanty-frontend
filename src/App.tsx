import React, { useState } from 'react'
import { SearchActions } from './actions/searchActions'
import { DownloadActions } from './actions/downloadActions'
import { SearchResults } from './components/SearchResults'
import { SearchResult } from './models/searchResults'
import './App.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const searchActions = new SearchActions(setSearchResults)
  const downloadActions = new DownloadActions(setDownloading)

  return (
    <div>
      <input
        type='text'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={() => searchActions.search(query)}>
        Search
      </button>
      {downloading ? <p>Downloading...</p> : null}
      {
        searchResults.length > 0 && !downloading
          ? <SearchResults
            searchResults={searchResults}
            download={downloadActions.download} />
          : null
      }
    </div>
  )
}
