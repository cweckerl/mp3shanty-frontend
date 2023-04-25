import React, { Dispatch, SetStateAction, useState } from 'react'
import { DownloadPlaylistActions } from '../actions/downloadPlaylistActions'
import { Playlist } from '../models/types'

export interface PlaylistResultsProps {
  readonly playlistResults: Playlist[]
  readonly error: boolean
  readonly setError: Dispatch<SetStateAction<boolean>>
}

export const PlaylistResults = (props: PlaylistResultsProps) => {
  const downloadActions = new DownloadPlaylistActions()
  const [downloading, setDownloading] = useState(false)

  return (
    <div>
      {!downloading && !props.error ?
        <div>
          <table>
            <tbody>
              {
                props.playlistResults.map((playlist) => (
                  <tr key={playlist.id}>
                    <td>
                      <img
                        className='thumbnail'
                        src={playlist.thumbnail}
                        alt='thumbnail'
                      />
                      <button
                        style={{ margin: 'auto', display: 'block' }}
                        value={playlist.id}
                        onClick={async () => {
                          setDownloading(true)
                          await downloadActions.download(playlist.id)
                            .then(downloadActions.click)
                            .catch(() => props.setError(true))
                          setDownloading(false)
                        }}
                      >↓</button>
                    </td>
                    <td>
                      <b>{playlist.title}</b>
                      <p>{playlist.channelTitle}</p>
                      <p>{Number(playlist.itemCount).toLocaleString()} • {new Date(playlist.publishDate).toLocaleDateString()}</p>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <h6>Lists title, channel title, and video count • publish date.</h6>
        </div> : downloading && !props.error ? <h3>Downloading...</h3> : <h3>An error occurred. Please retry.</h3>}
    </div>
  )
}
