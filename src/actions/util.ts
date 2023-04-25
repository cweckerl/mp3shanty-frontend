import { Recommendation, Video } from "../models/types"

export const decode = (input: string): string => {
  const text = document.createElement('textarea')
  text.innerHTML = input
  return text.value
}

export const recommendationToVideo = (recommendation: Recommendation): Video => {
  return {
    id: recommendation.id,
    title: recommendation.title,
    channelTitle: recommendation.channelTitle,
    publishDate: '',
    thumbnail: `https://i.ytimg.com/vi/${recommendation.id}/mqdefault.jpg`,
    viewCount: '',
    duration: ''
  }
}
