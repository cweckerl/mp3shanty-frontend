import React, { useState } from 'react'
import { DownloadPlaylistActions } from '../actions/downloadPlaylistActions'
import { Playlist } from '../models/searchResults'

export interface PlaylistResultsProps {
  readonly playlistResults: Playlist[]
}

export const PlaylistResults = (props: PlaylistResultsProps) => {
  const downloadActions = new DownloadPlaylistActions()
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
                props.playlistResults.map((val) => (
                  <tr key={val.id}>
                    <td>{val.title}</td>
                    <td>
                      <p>{val.channelTitle}</p>
                      <p>Videos: {Number(val.itemCount).toLocaleString()}</p>
                      <p>{new Date(val.publishDate).toLocaleDateString()}</p>
                    </td>
                    <td>
                      <button
                        value={val.id}
                        onClick={async () => {
                          setDownloading(true)
                          await downloadActions.download(val.id)
                            .then(result => downloadActions.click(result, val.title))
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
          <h6><sup>1</sup>Lists channel channel title and video count.</h6>
        </div> : downloading && !error ? <h3>Downloading...</h3> : <h3>An error occurred. Please refresh and retry.</h3>}
    </div>
  )
}
