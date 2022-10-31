import axios from 'axios'
import { SearchResult, SearchType } from '../models/searchResults'
import { SearchService } from './searchService'

export class YouTubeSearchService implements SearchService {
  async search(query: string, type: string): Promise<SearchResult[]> {
    const key = process.env.REACT_APP_YOUTUBE_SEARCH_KEY
    return new Promise((resolve, reject) => {
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=${type}&maxResults=5&q=${query}&key=${key}`)
        .then(res => resolve(res.data.items.map((item: any) => {
          return {
            id: type === SearchType.Video ? item.id.videoId : item.id.playlistId,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            publishDate: item.snippet.publishedAt,
          }
        })))
        .catch(err => reject(err))
    })
  }

  async listVideo(id: string): Promise<[string, string]> {
    return new Promise((resolve, reject) => {
      const key = process.env.REACT_APP_YOUTUBE_SEARCH_KEY
      axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${id}&key=${key}`)
        .then(res => {
          const item = res.data.items[0]
          resolve([item.statistics.viewCount, item.contentDetails.duration])
        })
        .catch(err => reject(err))
    })
  }

  async listPlaylist(id: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const key = process.env.REACT_APP_YOUTUBE_SEARCH_KEY
      axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=contentDetails&id=${id}&key=${key}`)
        .then(res => {
          const item = res.data.items[0]
          resolve(item.contentDetails.itemCount)
        })
        .catch(err => reject(err))
    })
  }
}
