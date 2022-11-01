import React, { useState } from 'react'
import { DownloadActions } from '../actions/downloadActions'
import { Video } from '../models/searchResults'

export interface SearchResultsProps {
  readonly videoResults: Video[]
}

export const SearchResults = (props: SearchResultsProps) => {
  const downloadActions = new DownloadActions()
  const [downloading, setDownloading] = useState(false)

  const decode = (input: string): string => {
    const text = document.createElement("textarea")
    text.innerHTML = input
    return text.value
  }

  return (
    <div>
      {!downloading ?
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
                    <td>{decode(val.title)}</td>
                    <td>
                      <p>{decode(val.channelTitle)}</p>
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
        </div> : <h3>Downloading...</h3>}
    </div >
  )
}
