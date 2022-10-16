import { Dispatch } from 'react'
import { AWSConversionService, ConversionService } from '../services/conversionService'

export class DownloadActions {
  constructor(
    public readonly setDownloading: Dispatch<boolean>,
    public readonly conversionService: ConversionService = new AWSConversionService(),
  ) { }

  download = async (videoId: string, filename: string) => {
    try {
      this.setDownloading(true)
      const result = await this.conversionService.convert(videoId, filename)
      const a = document.createElement('a')
      a.href = result.url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      this.setDownloading(false)
    } catch (error) {
      console.log(error)
      this.setDownloading(false)
    }
  }
}
