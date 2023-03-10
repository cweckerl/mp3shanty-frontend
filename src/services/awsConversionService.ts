import axios from 'axios'
import { ConversionService } from './conversionService'

export class AWSConversionService implements ConversionService {
  async convert(videoId: string): Promise<string> {
    const id = process.env.REACT_APP_LAMBDA_ID
    const region = process.env.REACT_APP_REGION
    return new Promise((resolve, reject) => {
      const uri = `https://${id}.execute-api.${region}.amazonaws.com/prod/conversion?videoId=${videoId}`
      axios.get(uri).then(res => resolve(res.data)).catch(err => reject(err))
    })
  }
}
