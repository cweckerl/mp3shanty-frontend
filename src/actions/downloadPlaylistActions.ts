import JSZip from 'jszip'
import { AWSConversionService } from '../services/awsConversionService'
import { ConversionService } from '../services/conversionService'
import { HerokoProxy } from '../services/herokoProxy'
import { SearchService } from '../services/searchService'
import { YouTubeSearchService } from '../services/youTubeSearchService'

export class DownloadPlaylistActions {
  constructor(
    public readonly searchService: SearchService = new YouTubeSearchService(),
    public readonly conversionService: ConversionService = new AWSConversionService(),
    public readonly proxy: HerokoProxy = new HerokoProxy()
  ) { }

  download = async (playlistId: string, album: string): Promise<Blob> => {
    try {
      const playlistItems = await this.searchService.listPlaylistItems(playlistId)
      const zip = new JSZip()

      for (const item of playlistItems) {
        const result = await this.conversionService.convert(item.videoId, item.title, item.channelTitle, album)
        const blob = await this.proxy.zip(result.url)
        zip.file(`${item.title}.mp3`, blob)
      }
      return await zip.generateAsync({ type: "blob" })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  click = async (blob: Blob, title: string) => {
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = title
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}