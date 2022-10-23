import React, { useState } from 'react'
import { SearchActions } from './actions/searchActions'
import { SearchResults } from './components/SearchResults'
import { SearchResult } from './models/searchResults'
import './App.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const searchActions = new SearchActions()

  return (
    <div>
      <input
        type='text'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={() => searchActions.search(query).then(x => setSearchResults(x))}>
        Search
      </button>
      {
        searchResults.length > 0
          ? <SearchResults searchResults={searchResults} />
          : null
      }
    </div>
  )
}
