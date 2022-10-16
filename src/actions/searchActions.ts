import { Dispatch } from 'react'
import { SearchResult } from '../models/searchResults'
import { YouTubeSearchService, SearchService } from '../services/searchService'

export class SearchActions {
  constructor(
    public readonly setSearchResults: Dispatch<SearchResult[]>,
    public readonly searchService: SearchService = new YouTubeSearchService()
  ) { }

  search = async (query: string) => {
    if (query === '') return
    try {
      const results = await this.searchService.search(query)
      this.setSearchResults(results)
    } catch (error) {
      console.log(error)
      this.setSearchResults([])
    }
  }
}
