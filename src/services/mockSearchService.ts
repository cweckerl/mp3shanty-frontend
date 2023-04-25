import { PlaylistItem, SearchResult } from '../models/types'
import { SearchService } from './searchService'

export class MockSearchService implements SearchService {
  async search(query: string, type: string): Promise<SearchResult[]> {
    return new Promise((resolve, reject) => {
      const result: SearchResult[] = [{
        id: '0',
        title: 'foo',
        channelTitle: 'channelFoo',
        publishDate: '2022-10-10T10:18:26.785085',
        thumbnail: 'foo.jpg'
      }]
      resolve(result)
    })
  }

  async listVideo(id: string): Promise<[string, string]> {
    return new Promise((resolve, reject) => {
      resolve(['5000', 'PT1M'])
    })
  }

  async listPlaylist(id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      resolve(10)
    })
  }

  listPlaylistItems(playlistId: string): Promise<PlaylistItem[]> {
    return new Promise((resolve, reject) => {
      const result: PlaylistItem[] = [{
        videoId: '0', title: 'foo', channelTitle: 'channelFoo'
      }]
      resolve(result)
    })
  }
}
