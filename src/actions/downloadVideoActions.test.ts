import { MockConversionService } from '../services/mockConversionService'
import { DownloadActions } from './downloadVideoActions'

describe('DownloadVideoActions', () => {
  const downloadActions = new DownloadActions(new MockConversionService())

  it('should return download url', () => {
    const query = 'id'
    const filename = 'testname'

    downloadActions.download(query, filename).then(result =>
      expect(result.url).toEqual('https://id-testname.com'))
  })
})