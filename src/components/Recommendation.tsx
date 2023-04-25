import React, { Dispatch, SetStateAction, useState } from 'react'
import { DownloadActions } from '../actions/downloadVideoActions'

export interface RecommendationProps {
  readonly error: boolean
  readonly setError: Dispatch<SetStateAction<boolean>>
}

export const VideoResults = (props: RecommendationProps) => {
  const downloadActions = new DownloadActions()
  const [downloading, setDownloading] = useState(false)

  return (
    <div>
      {!downloading && !props.error ?
        <div>
          <h6>\(new!\)Recommended Song: </h6>
        </div> : downloading && !props.error ? <h3>Downloading...</h3> : <h3>An error occurred. Please retry.</h3>
      }
    </div>
  )
}
