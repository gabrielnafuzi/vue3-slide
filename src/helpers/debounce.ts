export default function debounce(
  callback: (args: Array<Event>) => void,
  delay: number
): () => void {
  let timer: ReturnType<typeof setTimeout> = 0

  return (...args: Array<Event>) => {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      callback([...args])
      timer = 0
    }, delay)
  }
}
