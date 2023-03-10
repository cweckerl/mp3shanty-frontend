export const decode = (input: string): string => {
  const text = document.createElement('textarea')
  text.innerHTML = input
  return text.value
}
