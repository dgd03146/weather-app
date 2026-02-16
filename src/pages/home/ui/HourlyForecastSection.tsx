import { useSuspenseQuery } from '@tanstack/react-query'
import { weatherQueries } from '@/entities/weather'
import type { ForecastItem } from '@/entities/weather'
import { formatTemp, formatHour, getWeatherIconUrl } from '@/shared/lib'

interface HourlyForecastSectionProps {
  lat: number
  lon: number
}

export function HourlyForecastSection({ lat, lon }: HourlyForecastSectionProps) {
  const { data: forecast } = useSuspenseQuery(weatherQueries.forecast(lat, lon))
  const items = forecast.list.slice(0, 8)

  return (
    <div className="mt-4">
      <h2 className="mb-3 text-sm font-medium text-slate-400">시간별 예보</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => (
          <HourlyCard key={item.dt} item={item} />
        ))}
      </div>
    </div>
  )
}

function HourlyCard({ item }: { item: ForecastItem }) {
  const weather = item.weather[0]

  return (
    <div className="flex shrink-0 flex-col items-center gap-1 rounded-xl bg-slate-800/60 px-3 py-3">
      <span className="text-xs text-slate-400">{formatHour(item.dt_txt)}</span>
      <img
        src={getWeatherIconUrl(weather.icon)}
        alt={weather.description}
        className="h-8 w-8"
      />
      <span className="text-sm font-semibold">{formatTemp(item.main.temp)}</span>
    </div>
  )
}
