import { MockConversionService } from '../services/mockConversionService'
import { MockProxy } from '../services/mockProxy'
import { MockSearchService } from '../services/mockSearchService'
import { DownloadPlaylistActions } from './downloadPlaylistActions'

describe('DownloadPlaylistActions', () => {
  const downloadActions = new DownloadPlaylistActions(new MockSearchService(), new MockConversionService(), new MockProxy())

  it('should return zip blob', () => {
    const playlistId = 'id'

    downloadActions.download(playlistId).then(result =>
      expect(result).toBeInstanceOf(Blob)
    )
  })
})