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

  download = async (playlistId: string): Promise<Blob> => {
    try {
      const playlistItems = await this.searchService.listPlaylistItems(playlistId)
      const zip = new JSZip()

      for (const item of playlistItems) {
        try {
          const url = await this.conversionService.convert(item.videoId)
          const blob = await this.proxy.zip(url)
          zip.file(`${item.title}.mp3`, blob)
        } catch {
          console.log(`Could not download ${item.title}`)
        }
      }
      return await zip.generateAsync({ type: "blob" })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  click = async (blob: Blob) => {
    const a = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}