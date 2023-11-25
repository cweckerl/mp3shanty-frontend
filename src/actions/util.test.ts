import { decode } from "./util"

describe('decode', () => {
  it('should remove html entities from string', () => {
    const input = '&amp; &quot; &lt; &#43;'

    const output = decode(input)

    expect(output).toEqual('& " < +')
  })
})
