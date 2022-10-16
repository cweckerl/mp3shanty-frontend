import React from 'react'
import { SearchResult } from '../models/searchResults'

export interface SearchResultsProps {
  readonly searchResults: SearchResult[]
  download(videoId: string, fileName: string): void
}

export const SearchResults = (props: SearchResultsProps) => {
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
                <button onClick={() => props.download(val.videoId, val.title)}>
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
