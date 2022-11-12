import { ConversionResult } from '../models/conversionResults'
import { ConversionService } from './conversionService'

export class MockConversionService implements ConversionService {
  async convert(videoId: string, title: string, channel: string, album: string): Promise<ConversionResult> {
    return new Promise((resolve, reject) => {
      resolve({ 'url': `https://${videoId}-${title}.com` })
    })
  }
}
