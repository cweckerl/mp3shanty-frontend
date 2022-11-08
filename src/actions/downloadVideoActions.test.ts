import { MockConversionService } from '../services/mockConversionService'
import { DownloadActions } from './downloadVideoActions'

describe('DownloadVideoActions', () => {
  const downloadActions = new DownloadActions(new MockConversionService())

  it('should return download url', () => {
    const query = 'id'
    const title = 'testname'
    const channel = 'foo'

    downloadActions.download(query, title, channel).then(result =>
      expect(result.url).toEqual('https://id-testname.com'))
  })
})