import { MockSearchService } from '../services/mockSearchService'
import { SearchActions } from './searchActions'

describe('SearchActions', () => {
  const searchActions = new SearchActions(new MockSearchService())

  it('should set searchResults', () => {
    const query = 'test'

    searchActions.search(query).then(result => {
      expect(1 === result.length)
      expect('0' === result[0].videoId)
      expect('foo' === result[0].title)
      expect('channelFoo' === result[0].channelTitle)
      expect('2022-10-10T10:18:26.785085' === result[0].publishDate)
    })
  })

  it('should set searchResults to empty list upon error', () => {
    const query = 'exception'

    searchActions.search(query).then(result => expect(!result))
  })

  it('should set searchResults to empty list upon empty query', () => {
    const query = ''

    searchActions.search(query).then(result => expect(!result))
  })
})
