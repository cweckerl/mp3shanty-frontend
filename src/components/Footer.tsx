export const Footer = () => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td className='section'>
              <h5>Help</h5>
              <br />
              <h6>
                - <a
                  className='subsection'
                  target='_blank'
                  rel='noopener noreferrer'
                  href="https://github.com/cweckerl/mp3shanty-frontend/blob/master/README.md"
                >How do I use this?</a>
              </h6>
            </td>
          </tr>
          <tr>
            <td className='section'>
              <h5>Disclaimer</h5>
              <br />
              <h6 className='subsection'>- Optimized for mobile display.</h6>
              <br />
              <h6 className='subsection'>- Not for commercial use.</h6>
              <br />
              <h6 className='subsection'> - Downloading copyrighted work is prohibited.</h6>
              <br />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
