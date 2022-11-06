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
              <tr>
                <th>Title</th>
                <th>Metadata<sup>1</sup></th>
                <th>Action</th>
              </tr>
              {
                props.videoResults.map((val) => (
                  <tr key={val.id}>
                    <td>{val.title}</td>
                    <td>
                      <p>{val.channelTitle}</p>
                      <p>{Number(val.viewCount).toLocaleString()}</p>
                      <p>{new Date(val.publishDate).toLocaleDateString()}</p>
                    </td>
                    <td>
                      <button
                        value={val.id}
                        onClick={async () => {
                          setDownloading(true)
                          await downloadActions.download(val.id, val.title)
                            .then(result => downloadActions.click(result.url))
                            .catch(() => setError(true))
                          setDownloading(false)
                        }}
                      >DL</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <h6><sup>1</sup>Lists channel title, view count, and publish date respectively.</h6>
        </div> : downloading && !error ? <h3>Downloading...</h3> : <h3>An error occurred. Please refresh and retry.</h3>}
    </div>
  )
}
