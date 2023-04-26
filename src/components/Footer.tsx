import React, { Dispatch, SetStateAction, useState } from 'react'
import { DownloadActions } from '../actions/downloadVideoActions'
import { Video } from '../models/types'

export interface FooterProps {
  readonly video: Video
  readonly error: boolean
  readonly setError: Dispatch<SetStateAction<boolean>>
}

export const Footer = (props: FooterProps) => {
  const downloadActions = new DownloadActions()
  const [downloading, setDownloading] = useState(false)

  return (
    <div>
      {!downloading && !props.error ?
        <table>
          <tbody>
            <div className='section'>
              <h5>Help</h5>
              <br />
              <h6>
                <a
                  className='subsection'
                  target='_blank'
                  rel='noopener noreferrer'
                  href="https://github.com/cweckerl/mp3shanty-frontend/blob/master/README.md"
                >How do I use this?</a>
              </h6>
            </div>
            <div className='section'>
              <h5>Disclaimer</h5>
              <br />
              <h6 className='subsection'>Not for commercial use.</h6>
              <br />
              <h6 className='subsection'>Downloading copyrighted work is prohibited.</h6>
            </div>
            <div className='section'>
              <h5>Recommendation (Apr. 25)</h5>
              <br />
              <h6 className='subsection'>{props.video.title} by {props.video.channelTitle}</h6>
                <button
                  style={{ marginLeft: '5px', display: 'inline' }}
                  value={props.video.id}
                  onClick={async () => {
                    setDownloading(true)
                    await downloadActions.download(props.video.id)
                      .then(downloadActions.click)
                      .catch(() => props.setError(true))
                    setDownloading(false)
                  }}
                >↓</button>
            </div>
          </tbody>
        </table>
         : downloading && !props.error ? <h3>Downloading...</h3> : <h3>An error occurred. Please retry.</h3>
      }
    </div>
  )
}
