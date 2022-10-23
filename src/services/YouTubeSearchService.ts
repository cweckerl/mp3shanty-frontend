import axios from 'axios'
import { SearchResult } from '../models/searchResults'
import { SearchService } from './searchService'

export class YouTubeSearchService implements SearchService {
  async search(query: string): Promise<SearchResult[]> {
    const key = process.env.REACT_APP_YOUTUBE_SEARCH_KEY
    return new Promise((resolve, reject) => {
      axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${query}&key=${key}`,
      )
        .then(res => {
          const results = res.data.items.map(
            (item: any) => {
              return {
                videoId: item.id.videoId,
                title: item.snippet.title,
                channelTitle: item.snippet.channelTitle,
                publishDate: item.snippet.publishedAt,
              }
            }
          )
          resolve(results)
        })
        .catch(err => { reject(err) })
    })
  }
}
