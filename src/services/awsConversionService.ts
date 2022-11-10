import axios from 'axios'
import { ConversionResult } from '../models/conversionResults'
import { ConversionService } from './conversionService'

export class AWSConversionService implements ConversionService {
  async convert(videoId: string, title: string, channel: string): Promise<ConversionResult> {
    const id = process.env.REACT_APP_LAMBDA_ID
    const region = process.env.REACT_APP_REGION
    return new Promise((resolve, reject) => {
      const uri = `https://${id}.execute-api.${region}.amazonaws.com/prod/conversion?video_id=${videoId}&title=${title}&artist=${channel}`
      axios.get(encodeURI(uri)).then(res => resolve(res.data)).catch(err => reject(err))
    })
  }
}
