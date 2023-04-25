import { decode, formatQuery } from "./util"

describe('decode', () => {
  it('should remove html entities from string', () => {
    const input = '&amp; &quot; &lt; &#43;'

    const output = decode(input)

    expect(output).toEqual('& " < +')
  })
})

describe('formatQuery', () => {
  it('should join song and artist', () => {
    const artist = 'Michael Jackson'
    const song = 'Thriller'

    const output = formatQuery(artist, song)

    expect(output).toEqual('Thriller by Michael Jackson')
  })
})
