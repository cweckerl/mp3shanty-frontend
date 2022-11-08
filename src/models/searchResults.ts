export interface SearchResult {
  readonly id: string
  readonly title: string
  readonly channelTitle: string
  readonly publishDate: string
}

export interface Video extends SearchResult {
  readonly viewCount: string
  readonly duration: string
}

export interface Playlist extends SearchResult {
  readonly itemCount: number
}

export interface PlaylistItem {
  readonly videoId: string
  readonly title: string
  readonly channelTitle: string
}

export enum SearchType {
  Channel = 'channel',
  Playlist = 'playlist',
  Video = 'video'
}