import { ConversionService } from '../services/conversionService'
import { AWSConversionService } from '../services/awsConversionService'
import { ConversionResult } from '../models/conversionResults'

export class DownloadActions {
  constructor(
    public readonly conversionService: ConversionService = new AWSConversionService()
  ) { }

  download = async (videoId: string, title: string, channel: string): Promise<ConversionResult> => {
    try {
      return this.conversionService.convert(videoId, title, channel, '')
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  click = (url: string) => {
    const a = document.createElement('a')
    a.href = url
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }
}
