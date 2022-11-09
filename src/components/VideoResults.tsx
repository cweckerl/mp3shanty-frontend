import React, { useState } from 'react'
import { DownloadActions } from '../actions/downloadVideoActions'
import { Video } from '../models/searchResults'

export interface VideoResultsProps {
  readonly videoResults: Video[]
}

export const VideoResults = (props: VideoResultsProps) => {
  const downloadActions = new DownloadActions()
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState(false)

  return (
    <div>
      {!downloading && !error ?
        <div>
          <table>
            <tbody>
              {
                props.videoResults.map((val) => (
                  <tr key={val.id}>
                    <td>
                      <img
                        src={val.thumbnail}
                        width='112'
                        height='63'
                        alt='thumbnail'
                      />
                      <button
                        style={{ margin: 'auto', display: 'block' }}
                        value={val.id}
                        onClick={async () => {
                          setDownloading(true)
                          await downloadActions.download(val.id, val.title, val.channelTitle)
                            .then(result => downloadActions.click(result.url))
                            .catch(() => setError(true))
                          setDownloading(false)
                        }}
                      >DL</button>
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
        </div> : downloading && !error ? <h3>Downloading...</h3> : <h3>An error occurred. Please refresh and retry.</h3>
      }
    </div >
  )
}
