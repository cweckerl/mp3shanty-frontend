import { SearchResult } from '../models/searchResults'
import { SearchService } from '../services/searchService'
import { YouTubeSearchService } from '../services/YouTubeSearchService'

export class SearchActions {
  constructor(
    public readonly searchService: SearchService = new YouTubeSearchService()
  ) { }

  search = async (query: string): Promise<SearchResult[]> => {
    if (query === '') return []
    try {
      return this.searchService.search(query)
    } catch (error) {
      console.log(error)
      return []
    }
  }
}
