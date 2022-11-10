import { decode, replace } from "./util"

describe('decode', () => {
  it('should remove html entities from string', () => {
    const input = '&amp; &quot; &lt; &#43;'

    const output = decode(input)

    expect(output).toEqual('& " < +')
  })
})

describe('replace', () => {
  it('should replace non alphanumeric chars and most special chars with an empty string', () => {
    const input = '123_test&foo().*%$,"'

    const output = replace(input)

    expect(output).toEqual('123_testfoo().,"')
  })
})
