import { SearchResult } from '../models/searchResults'
import { SearchService } from './searchService'

export class MockSearchService implements SearchService {
  async search(query: string): Promise<SearchResult[]> {
    return new Promise((resolve, reject) => {
      const result: SearchResult[] = [{
        videoId: '0',
        title: 'foo',
        channelTitle: 'channelFoo',
        publishDate: '2022-10-10T10:18:26.785085'
      }]
      resolve(result)
    })
  }
}