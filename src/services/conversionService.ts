import { ConversionResult } from '../models/conversionResults'

export interface ConversionService {
  convert(videoId: string, filename: string): Promise<ConversionResult>
}
