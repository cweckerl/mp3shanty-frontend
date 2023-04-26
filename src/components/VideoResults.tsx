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
                props.videoResults.map((video) => (
                  <tr key={video.id}>
                    <td>
                      <img
                        className='thumbnail'
                        src={video.thumbnail}
                        alt='thumbnail'
                        draggable='false'
                      />
                      <button
                        style={{ margin: 'auto', display: 'block' }}
                        value={video.id}
                        onClick={async () => {
                          setDownloading(true)
                          await downloadActions.download(video.id)
                            .then(downloadActions.click)
                            .catch(() => props.setError(true))
                          setDownloading(false)
                        }}
                      >↓</button>
                    </td>
                    <td>
                      <b>{video.title}</b>
                      <p>{video.channelTitle}</p>
                      <p>{Number(video.viewCount).toLocaleString()} • {new Date(video.publishDate).toLocaleDateString()}</p>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div> : downloading && !props.error ? <h3>Downloading...</h3> : <h3>An error occurred. Please retry.</h3>
      }
    </div>
  )
}
