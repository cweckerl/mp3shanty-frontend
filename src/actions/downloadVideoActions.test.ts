import { MockConversionService } from '../services/mockConversionService'
import { DownloadActions } from './downloadVideoActions'

describe('DownloadVideoActions', () => {
  const downloadActions = new DownloadActions(new MockConversionService())

  it('should return download url', () => {
    const query = 'id'

    downloadActions.download(query).then(url =>
      expect(url).toEqual('https://id.com'))
  })
})