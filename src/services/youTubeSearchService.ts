import axios from 'axios'
import { decode } from '../actions/util'
import { PlaylistItem, SearchResult, SearchType } from '../models/types'
import { SearchService } from './searchService'

export class YouTubeSearchService implements SearchService {
  async search(query: string, type: string): Promise<SearchResult[]> {
    const key = process.env.REACT_APP_YOUTUBE_SEARCH_KEY
    return new Promise((resolve, reject) => {
      axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=${type}&maxResults=5&q=${query}&key=${key}`)
        .then(res => resolve(res.data.items.map((item: any) => {
          return {
            id: type === SearchType.Video ? item.id.videoId : item.id.playlistId,
            title: decode(item.snippet.title),
            channelTitle: decode(item.snippet.channelTitle),
            publishDate: item.snippet.publishedAt,
            thumbnail: item.snippet.thumbnails.medium.url
          }
        })))
        .catch(err => reject(err))
    })
  }

  async listVideo(videoId: string): Promise<[string, string]> {
    return new Promise((resolve, reject) => {
      const key = process.env.REACT_APP_YOUTUBE_SEARCH_KEY
      axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoId}&key=${key}`)
        .then(res => {
          const item = res.data.items[0]
          console.log(item)
          resolve([item.statistics.viewCount, item.contentDetails.duration])
        })
        .catch(err => reject(err))
    })
  }

  async listPlaylist(playlistId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const key = process.env.REACT_APP_YOUTUBE_SEARCH_KEY
      axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=contentDetails&id=${playlistId}&key=${key}`)
        .then(res => {
          const item = res.data.items[0]
          resolve(item.contentDetails.itemCount)
        })
        .catch(err => reject(err))
    })
  }

  async listPlaylistItems(playlistId: string): Promise<PlaylistItem[]> {
    return new Promise((resolve, reject) => {
      const key = process.env.REACT_APP_YOUTUBE_SEARCH_KEY
      axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=30&key=${key}`)
        .then(res => resolve(res.data.items.map((item: any) => {
          return {
            videoId: item.snippet.resourceId.videoId,
            title: decode(item.snippet.title),
            channelTitle: decode(item.snippet.channelTitle)
          }
        })))
        .catch(err => reject(err))
    })
  }
}
