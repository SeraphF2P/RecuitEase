export function randomNumBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function sleep(duration: number | undefined) {
  return new Promise(resolve => {
    setTimeout(resolve, duration)
  })
}

