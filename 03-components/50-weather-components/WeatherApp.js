import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'
import './WeatherApp.css'
import WeatherCardList from './WeatherCardList.js'

export default defineComponent({
  name: 'WeatherApp',  

  components: {
    WeatherCardList
  },
  
  setup() {
      const weatherData = getWeatherData()
      const weatherIcons = WeatherConditionIcons
      return { 
        weatherData, 
        weatherIcons 
      }
  }, 

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <WeatherCardList :weathers="weatherData" :icons="weatherIcons" />
    </div>
  `,
})
