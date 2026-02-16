import { useSuspenseQuery } from '@tanstack/react-query'
import { weatherQueries } from '@/entities/weather'
import { formatTemp, getWeatherIconUrl } from '@/shared/lib'

interface CurrentWeatherSectionProps {
  lat: number
  lon: number
}

export function CurrentWeatherSection({ lat, lon }: CurrentWeatherSectionProps) {
  const { data } = useSuspenseQuery(weatherQueries.current(lat, lon))
  const weather = data.weather[0]

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <p className="text-sm font-medium text-slate-400">{data.name}</p>

      <div className="relative">
        <img
          src={getWeatherIconUrl(weather.icon)}
          alt={weather.description}
          className="h-36 w-36 drop-shadow-[0_0_24px_rgba(255,255,255,0.15)]"
        />
      </div>

      <p className="text-8xl font-extralight tracking-tighter">
        {formatTemp(data.main.temp)}
      </p>

      <p className="text-lg capitalize text-slate-300">{weather.description}</p>

      <p className="text-sm text-slate-500">
        최고 {formatTemp(data.main.temp_max)} · 최저 {formatTemp(data.main.temp_min)}
      </p>

      <div className="mt-2 grid w-full grid-cols-3 gap-2">
        <StatCard label="바람" value={`${data.wind.speed}m/s`} />
        <StatCard label="습도" value={`${data.main.humidity}%`} />
        <StatCard label="구름" value={`${data.clouds.all}%`} />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-white/5 py-4 backdrop-blur-sm">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  )
}
