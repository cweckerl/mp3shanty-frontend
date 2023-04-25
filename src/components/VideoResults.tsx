import React, { Dispatch, SetStateAction, useState } from 'react'
import { DownloadActions } from '../actions/downloadVideoActions'
import { Video } from '../models/types'

export interface VideoResultsProps {
  readonly videoResults: Video[]
  readonly error: boolean
  readonly setError: Dispatch<SetStateAction<boolean>>
}

export const VideoResults = (props: VideoResultsProps) => {
  const downloadActions = new DownloadActions()
  const [downloading, setDownloading] = useState(false)

  return (
    <div>
      {!downloading && !props.error ?
        <div>
          <table>
            <tbody>
              {
                props.videoResults.map((val) => (
                  <tr key={val.id}>
                    <td>
                      <img
                        className='thumbnail'
                        src={val.thumbnail}
                        alt='thumbnail'
                      />
                      <button
                        style={{ margin: 'auto', display: 'block' }}
                        value={val.id}
                        onClick={async () => {
                          setDownloading(true)
                          await downloadActions.download(val.id)
                            .then(downloadActions.click)
                            .catch(() => props.setError(true))
                          setDownloading(false)
                        }}
                      >↓</button>
                    </td>
                    <td>
                      <b>{val.title}</b>
                      <p>{val.channelTitle}</p>
                      <p>{Number(val.viewCount).toLocaleString()} • {new Date(val.publishDate).toLocaleDateString()}</p>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <h6>Lists title, channel title, and views • publish date </h6>
        </div> : downloading && !props.error ? <h3>Downloading...</h3> : <h3>An error occurred. Please retry.</h3>
      }
    </div>
  )
}
