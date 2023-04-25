import { decode, recommendationToVideo} from "./util"

describe('decode', () => {
  it('should remove html entities from string', () => {
    const input = '&amp; &quot; &lt; &#43;'

    const output = decode(input)

    expect(output).toEqual('& " < +')
  })
})


describe('recommendationToVideo', () => {
  it('should map recommendation to video type', () => {
    const recommendation = {
      id: 'id',
      title: 'title',
      channelTitle: 'channelTitle'
    }
    const expected = {
      id: 'id',
      title: 'title',
      channelTitle: 'channelTitle',
      publishDate: '',
      thumbnail: `https://i.ytimg.com/vi/id/mqdefault.jpg`,
      viewCount: '',
      duration: ''
    }

    const output = recommendationToVideo(recommendation)

    expect(output).toEqual(expected)
  })
})