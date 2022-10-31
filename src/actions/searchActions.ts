import { Playlist, SearchResult, SearchType, Video } from '../models/searchResults'
import { SearchService } from '../services/searchService'
import { YouTubeSearchService } from '../services/youTubeSearchService'

export class SearchActions {
  constructor(
    public readonly searchService: SearchService = new YouTubeSearchService()
  ) { }

  search = async (query: string, type: string): Promise<SearchResult[]> => {
    if (query === '') return []
    try {
      return this.searchService.search(query, type)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  searchVideo = async (query: string): Promise<Video[]> => {
    if (query === '') return []
    try {
      let videoResults: Video[] = []
      const searchResults = await this.searchService.search(query, SearchType.Video)
      for (const result of searchResults) {
        await this.searchService.listVideo(result.id)
          .then(d => videoResults.push({ ...result, viewCount: d[0], duration: d[1] }))
      }
      return videoResults
    } catch (error) {
      console.log(error)
      return []
    }
  }

  searchPlaylists = async (query: string): Promise<Playlist[]> => {
    if (query === '') return []
    try {
      let playlistResults: Playlist[] = []
      const searchResults = await this.searchService.search(query, SearchType.Playlist)
      for (const result of searchResults) {
        await this.searchService.listPlaylist(result.id)
          .then(d => playlistResults.push({ ...result, itemCount: d }))
      }
      return playlistResults
    } catch (error) {
      console.log(error)
      return []
    }
  }
}
