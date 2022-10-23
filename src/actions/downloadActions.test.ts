import { MockConversionService } from '../services/mockConversionService'
import { DownloadActions } from './downloadActions'

describe('DownloadActions', () => {
  const downloadActions = new DownloadActions(new MockConversionService())

  it('should return download url', () => {
    const query = 'id'
    const filename = 'testname'

    downloadActions.download(query, filename).then(result =>
      expect('https://id-testname.com' == result.url))
  })
})