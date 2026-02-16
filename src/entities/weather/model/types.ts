import * as z from 'zod'

const weatherConditionSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
})

const mainSchema = z.object({
  temp: z.number(),
  feels_like: z.number(),
  temp_min: z.number(),
  temp_max: z.number(),
  pressure: z.number(),
  humidity: z.number(),
})

export const currentWeatherSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  weather: z.array(weatherConditionSchema).nonempty(),
  main: mainSchema,
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
  }),
  clouds: z.object({
    all: z.number(),
  }),
  visibility: z.number(),
  dt: z.number(),
  sys: z.object({
    sunrise: z.number(),
    sunset: z.number(),
  }),
  timezone: z.number(),
  name: z.string(),
})

const forecastItemSchema = z.object({
  dt: z.number(),
  main: mainSchema,
  weather: z.array(weatherConditionSchema).nonempty(),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
  }),
  dt_txt: z.string(),
})

export const forecastSchema = z.object({
  list: z.array(forecastItemSchema),
  city: z.object({
    name: z.string(),
    coord: z.object({
      lat: z.number(),
      lon: z.number(),
    }),
    timezone: z.number(),
  }),
})

export type CurrentWeather = z.infer<typeof currentWeatherSchema>
export type ForecastItem = z.infer<typeof forecastItemSchema>
export type Forecast = z.infer<typeof forecastSchema>
export type WeatherCondition = z.infer<typeof weatherConditionSchema>
