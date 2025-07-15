import { defineComponent } from 'vue'
import './WeatherApp.css'
import './WeatherCard.js'
import WeatherCard from './WeatherCard.js'

export default defineComponent({
  name: 'WeatherCardList',

  components: {
    WeatherCard
  },

  props: {
    weathers: {
      type: Array,
      required: true,
    },

    icons: {
      type: Object,
      required: false,
    }
  },

      setup() {

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

        return {
            isNight
        }

    },

  template: `
      <ul class="weather-list unstyled-list">
        <li v-for="weather in weathers" class="weather-card" :class="{ 'weather-card--night': isNight(weather.current.dt, weather.current.sunrise, weather.current.sunset) }" >
          <WeatherCard :weather="weather" :icons="icons" />
        </li>
      </ul>
  `,
})
