import { PlaylistItem, SearchResult } from '../models/types'

export interface SearchService {
  search(query: string, type: string): Promise<SearchResult[]>
  listVideo(videoId: string): Promise<[string, string]>
  listPlaylist(playlistId: string): Promise<number>
  listPlaylistItems(playlistId: string): Promise<PlaylistItem[]>
}
