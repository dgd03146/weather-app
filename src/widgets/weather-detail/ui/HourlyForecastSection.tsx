import { useSuspenseQuery } from '@tanstack/react-query'
import { motion } from 'motion/react'
import { weatherQueries } from '@/entities/weather'
import type { ForecastItem } from '@/entities/weather'
import { formatTemp, formatHour, getWeatherIconUrl, findCurrentSlotIndex } from '@/shared/lib'

const HOURLY_DISPLAY_COUNT = 8

interface HourlyForecastSectionProps {
  lat: number
  lon: number
}

export function HourlyForecastSection({ lat, lon }: HourlyForecastSectionProps) {
  const { data: forecast } = useSuspenseQuery(weatherQueries.forecast(lat, lon))
  const items = forecast.list.slice(0, HOURLY_DISPLAY_COUNT)
  const activeIndex = findCurrentSlotIndex(items.map((item) => item.dt))

  return (
    <motion.section
      aria-label="시간별 예보"
      className="glass mt-6 rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="mb-4 text-sm font-medium text-slate-400">시간별 예보</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item, index) => (
          <HourlyCard key={item.dt} item={item} isActive={index === activeIndex} />
        ))}
      </div>
    </motion.section>
  )
}

function HourlyCard({ item, isActive }: { item: ForecastItem; isActive: boolean }) {
  const weather = item.weather[0]

  return (
    <div
      className={`flex min-w-0 flex-1 flex-col items-center gap-2 rounded-2xl py-3 transition-colors ${
        isActive
          ? 'glass-accent shadow-lg shadow-violet-500/10'
          : 'bg-transparent'
      }`}
    >
      <span className={`text-xs ${isActive ? 'font-medium text-white' : 'text-slate-400'}`}>
        {formatHour(item.dt)}
      </span>
      <img
        src={getWeatherIconUrl(weather.icon)}
        alt={weather.description}
        width={32}
        height={32}
        className="h-8 w-8"
      />
      <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-200'}`}>
        {formatTemp(item.main.temp)}
      </span>
    </div>
  )
}
