import { computed, defineComponent } from 'vue'
import './WeatherApp.css'

export default defineComponent({
    name: 'WeatherCard',

    props: {
        weather: {
            type: Object,
            required: true,
        },

        icons: {
            type: Object,
            required: false,
        }

    },

    setup(props) {
      const icon = computed(() => {
        return props.icons
          ? props.icons[props.weather.current.weather.id]
          : '';
      })
      return {
        icon,
      }
    },

    template: `
          <div v-if="weather.alert" class="weather-alert">
                <span class="weather-alert__icon">{{ icon }}</span>
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
            <div class="weather-conditions__icon" :title="weather.current.weather.description">{{ icon }}</div>
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

  `,
})
