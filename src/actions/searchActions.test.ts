import { SearchType } from '../models/types'
import { MockSearchService } from '../services/mockSearchService'
import { SearchActions } from './searchActions'

const searchActions = new SearchActions(new MockSearchService())

describe('search', () => {

  it('should return searchResults', () => {
    const query = 'test'
    const type = SearchType.Video

    searchActions.search(query, type).then(result => {
      expect(result.length).toEqual(1)
      expect(result[0].id).toEqual('0')
      expect(result[0].title).toEqual('foo')
      expect(result[0].channelTitle).toEqual('channelFoo')
      expect(result[0].publishDate).toEqual('2022-10-10T10:18:26.785085')
      expect(result[0].thumbnail).toEqual('foo.jpg')
    })
  })

  it('should set searchResults to empty list upon empty query', () => {
    const query = ''
    const type = SearchType.Video

    searchActions.search(query, type).then(result => expect(result).toHaveLength(0))
  })
})

describe('searchVideo', () => {
  it('should return video', () => {
    const query = 'test'

    searchActions.searchVideo(query).then(result => {
      expect(result).toHaveLength(1)
      expect(result[0].id).toEqual('0')
      expect(result[0].title).toEqual('foo')
      expect(result[0].channelTitle).toEqual('channelFoo')
      expect(result[0].publishDate).toEqual('2022-10-10T10:18:26.785085')
      expect(result[0].viewCount).toEqual('5000')
      expect(result[0].duration).toEqual('PT1M')
    })
  })
})

describe('searchPlaylist', () => {
  it('should return playlist', () => {
    const query = 'test'

    searchActions.searchPlaylists(query).then(result => {
      expect(result).toHaveLength(1)
      expect(result[0].id).toEqual('0')
      expect(result[0].title).toEqual('foo')
      expect(result[0].channelTitle).toEqual('channelFoo')
      expect(result[0].publishDate).toEqual('2022-10-10T10:18:26.785085')
      expect(result[0].itemCount).toEqual(10)
    })
  })
})
