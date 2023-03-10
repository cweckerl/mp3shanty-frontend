export interface ConversionService {
  convert(videoId: string): Promise<string>
}
