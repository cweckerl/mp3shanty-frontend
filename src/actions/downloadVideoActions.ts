import { ConversionService } from '../services/conversionService'
import { AWSConversionService } from '../services/awsConversionService'

export class DownloadActions {
  constructor(
    public readonly conversionService: ConversionService = new AWSConversionService()
  ) { }

  download = async (videoId: string): Promise<string> => {
    try {
      return this.conversionService.convert(videoId)
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
