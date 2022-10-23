import React from 'react'
import { DownloadActions } from '../actions/downloadActions'
import { SearchResult } from '../models/searchResults'

export interface SearchResultsProps {
  readonly searchResults: SearchResult[]
}

export const SearchResults = (props: SearchResultsProps) => {
  const downloadActions = new DownloadActions()

  return (
    <table>
      <tbody>
        <tr>
          <th>Title</th>
          <th>Channel</th>
          <th>Date</th>
          <th></th>
        </tr>
        {
          props.searchResults.map((val) => (
            <tr key={val.videoId}>
              <td>{val.title}</td>
              <td>{val.channelTitle}</td>
              <td>{new Date(val.publishDate).toDateString()}</td>
              <td>
                <button
                  value={val.videoId}
                  onClick={() => downloadActions.download(val.videoId, val.title)
                    .then(result => downloadActions.click(result.url))}
                >
                  Download
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
