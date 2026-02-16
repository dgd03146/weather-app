export function formatTemp(temp: number) {
  return `${Math.round(temp)}°`
}

export function formatTime(timestamp: number, timezone: number) {
  const date = new Date((timestamp + timezone) * 1000)
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })
}

export function formatHour(dt: number) {
  const date = new Date(dt * 1000)
  return `${date.getHours().toString().padStart(2, '0')}:00`
}

export function getWeatherIconUrl(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

export function findCurrentSlotIndex(timestamps: number[]) {
  const now = Date.now() / 1000
  let idx = 0
  for (let i = 0; i < timestamps.length; i++) {
    if (timestamps[i] <= now) idx = i
    else break
  }
  return idx
}
