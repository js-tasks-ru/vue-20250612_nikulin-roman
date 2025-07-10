import { onMounted, onUnmounted, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const dateFormat = {
      timeStyle: 'medium',
    }
    const currentTime = ref(formatTime(new Date()))
    let interval = null

    function formatTime(date) {
      try {
        return date.toLocaleTimeString(navigator.language, dateFormat)
      } catch (e) {
        return date.toLocaleTimeString()
      }
    }

    onMounted(() => {
      interval = setInterval(() => {
        currentTime.value = formatTime(new Date())
      }, 1000)
    })

    onUnmounted(() => {
      if (interval) {
        clearInterval(interval)
      }
    })

    return {
      currentTime,
    }
  },

  template: `<div class="clock">{{ currentTime }}</div>`,
})
