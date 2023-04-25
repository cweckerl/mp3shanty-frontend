import React, { Dispatch, SetStateAction, useState } from 'react'
import { DownloadActions } from '../actions/downloadVideoActions'
import { Video } from '../models/types'

export interface RecommendationProps {
  readonly video: Video
  readonly error: boolean
  readonly setError: Dispatch<SetStateAction<boolean>>
}

export const Recommendation = (props: RecommendationProps) => {
  const downloadActions = new DownloadActions()
  const [downloading, setDownloading] = useState(false)

  return (
    <div>
      {!downloading && !props.error ?
        <div>
          <table>
            <tbody>
              <tr key={props.video.id}>
                <td>
                  <img
                    className='thumbnail'
                    src={props.video.thumbnail}
                    alt='thumbnail'
                  />
                  <button
                    style={{ margin: 'auto', display: 'block' }}
                    value={props.video.id}
                    onClick={async () => {
                      setDownloading(true)
                      await downloadActions.download(props.video.id)
                        .then(downloadActions.click)
                        .catch(() => props.setError(true))
                      setDownloading(false)
                    }}
                  >↓</button>
                </td>
                <td>
                  <p><b>Song of the Week</b><i className='alert'> (new!)</i></p>
                  <p>Title: <i>{props.video.title}</i></p>
                  <p>Artist: <i>{props.video.channelTitle}</i></p>
                  <br />
                </td>
              </tr>
            </tbody>
          </table>
        </div> : downloading && !props.error ? <h3>Downloading...</h3> : <h3>An error occurred. Please retry.</h3>
      }
    </div>
  )
}
