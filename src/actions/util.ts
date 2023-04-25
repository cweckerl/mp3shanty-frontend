export const decode = (input: string): string => {
  const text = document.createElement('textarea')
  text.innerHTML = input
  return text.value
}

export const formatQuery = (artist: string, song: string): string => {
  return `${song} by ${artist}`
}
