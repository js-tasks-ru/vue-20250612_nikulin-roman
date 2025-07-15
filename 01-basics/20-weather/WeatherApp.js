import { defineComponent, onMounted } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData()
    const weatherIcons = WeatherConditionIcons

    // const fetchData = (() => {
    //   weatherData.value = getWeatherData()
    //   weatherIcons.value = WeatherConditionIcons
    // })

  const isNight = ((currentTimeStr, sunriseStr, sunsetStr) => {
      const currentTime = new Date()
      {
        const [hours, minutes] = currentTimeStr.split(":").map(Number)
        currentTime.setHours(hours, minutes, 0)
      }
      const sunrise = new Date()
      {
        const [hours, minutes] = sunriseStr.split(":").map(Number)
        sunrise.setHours(hours, minutes, 0)
      }
      const sunset = new Date()
      {
        const [hours, minutes] = sunsetStr.split(":").map(Number)
        sunset.setHours(hours, minutes, 0)
      }
      return currentTime < sunrise || currentTime > sunset
  })

    onMounted(() => {
      // fetchData()
    })

    return {
      weatherData,
      weatherIcons,
      isNight
    }

  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li  v-for="weather in weatherData" :class="{ 'weather-card--night': isNight(weather.current.dt, weather.current.sunrise, weather.current.sunset) }" class="weather-card">
          <div v-if="weather.alert" class="weather-alert">
            <span class="weather-alert__icon">{{ weatherIcons[weather.current.weather.id] }}</span>
            <span class="weather-alert__description">{{ weather.alert.sender_name }}: {{ weather.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weather.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weather.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weather.current.weather.description">{{ weatherIcons[weather.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ (weather.current.temp - 273.15).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ Math.round(weather.current.pressure * 0.75)  }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weather.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weather.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weather.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
