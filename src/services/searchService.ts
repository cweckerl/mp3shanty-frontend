import { SearchResult } from '../models/searchResults'

export interface SearchService {
  search(query: string): Promise<SearchResult[]>
}
