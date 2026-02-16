import type { ReactNode } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { MapPin, Wind, Droplets, Cloud } from 'lucide-react'
import { motion, type Variants } from 'motion/react'
import { weatherQueries } from '@/entities/weather'
import { formatTemp, getWeatherIconUrl } from '@/shared/lib'

interface CurrentWeatherSectionProps {
  lat: number
  lon: number
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function CurrentWeatherSection({ lat, lon }: CurrentWeatherSectionProps) {
  const { data } = useSuspenseQuery(weatherQueries.current(lat, lon))
  const weather = data.weather[0]

  return (
    <motion.div
      className="flex flex-col items-center gap-4 py-6"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={item} className="flex items-center gap-1.5">
        <MapPin className="h-4 w-4 text-violet-400" />
        <p className="text-sm font-medium text-slate-300">{data.name}</p>
      </motion.div>

      <motion.div variants={item} className="relative">
        <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-3xl" />
        <img
          src={getWeatherIconUrl(weather.icon)}
          alt={weather.description}
          className="relative h-40 w-40 drop-shadow-[0_8px_32px_rgba(124,58,237,0.3)]"
        />
      </motion.div>

      <motion.div variants={item} className="flex flex-col items-center">
        <span className="text-xs font-medium tracking-wider text-slate-500">현재 기온</span>
        <p className="text-8xl font-extralight tracking-tighter">
          {formatTemp(data.main.temp)}
        </p>
      </motion.div>

      <motion.p variants={item} className="text-lg capitalize text-slate-300">
        {weather.description}
      </motion.p>

      <motion.p variants={item} className="text-sm text-slate-500">
        최고 {formatTemp(data.main.temp_max)} · 최저 {formatTemp(data.main.temp_min)}
      </motion.p>

      <motion.div variants={item} className="mt-2 grid w-full grid-cols-3 gap-3">
        <StatCard icon={<Wind className="h-5 w-5 text-violet-400" />} label="바람" value={`${data.wind.speed}m/s`} />
        <StatCard icon={<Droplets className="h-5 w-5 text-blue-400" />} label="습도" value={`${data.main.humidity}%`} />
        <StatCard icon={<Cloud className="h-5 w-5 text-indigo-400" />} label="구름" value={`${data.clouds.all}%`} />
      </motion.div>
    </motion.div>
  )
}

function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="glass flex flex-col items-center gap-2 rounded-2xl py-4">
      {icon}
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  )
}
