import { ConversionResult } from '../models/conversionResults'

export interface ConversionService {
  convert(videoId: string, title: string, channel: string, album: string): Promise<ConversionResult>
}
