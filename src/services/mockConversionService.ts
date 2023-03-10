import { ConversionService } from './conversionService'

export class MockConversionService implements ConversionService {
  async convert(videoId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve(`https://${videoId}.com`)
    })
  }
}
