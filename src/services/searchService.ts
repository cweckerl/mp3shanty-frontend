import { SearchResult } from '../models/searchResults'

export interface SearchService {
  search(query: string, type: string): Promise<SearchResult[]>
  listVideo(id: string): Promise<[string, string]>
  listPlaylist(id: string): Promise<number>
}
