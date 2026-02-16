import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSuspenseQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { weatherQueries } from '@/entities/weather'
import { removeFavorite, updateNickname } from '@/entities/favorite'
import type { FavoriteItem } from '@/entities/favorite'
import { formatTemp, getWeatherIconUrl } from '@/shared/lib'
import { EditNicknameInput } from './EditNicknameInput'

interface FavoriteCardProps {
  item: FavoriteItem
}

export function FavoriteCard({ item }: FavoriteCardProps) {
  const { data } = useSuspenseQuery(weatherQueries.current(item.lat, item.lon))
  const weather = data.weather[0]
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Link
      to={`/detail/${item.lat}/${item.lon}`}
      className="glass group relative flex cursor-pointer flex-col items-center gap-2 rounded-2xl p-4 transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-violet-500/50 outline-none"
    >
      <button
        type="button"
        aria-label="즐겨찾기 삭제"
        onClick={(e) => {
          e.preventDefault()
          removeFavorite(item.id)
        }}
        className="absolute right-2 top-2 rounded-full p-1 text-slate-500 opacity-0 transition-opacity hover:bg-white/10 hover:text-slate-300 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-violet-500/50"
      >
        <X aria-hidden="true" className="h-3.5 w-3.5" />
      </button>

      {isEditing ? (
        <EditNicknameInput
          value={item.nickname}
          onSave={(name) => {
            updateNickname(item.id, name)
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <button
          type="button"
          aria-label="닉네임 편집"
          onClick={(e) => {
            e.preventDefault()
            setIsEditing(true)
          }}
          className="truncate text-sm font-medium text-slate-300 hover:text-white max-w-full focus-visible:ring-1 focus-visible:ring-violet-500/50 rounded"
        >
          {item.nickname || item.district}
        </button>
      )}

      <img
        src={getWeatherIconUrl(weather.icon)}
        alt={weather.description}
        width={48}
        height={48}
        className="h-12 w-12"
      />

      <span className="text-2xl font-light">{formatTemp(data.main.temp)}</span>

      <span className="text-xs text-slate-500">
        최고 {formatTemp(data.main.temp_max)} · 최저 {formatTemp(data.main.temp_min)}
      </span>
    </Link>
  )
}
