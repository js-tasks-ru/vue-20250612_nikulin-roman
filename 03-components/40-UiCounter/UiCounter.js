import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      // default: 0,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
      validator: (value, props) => value >= 0 && value <= props.max,
      required: false
    },

    max: {
      type: Number,
      validator: (value, props) => value >= 0 && value >= props.min,
      default: Infinity,
      required: false
    }
  },

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне

    function increment() {
      if (props.count < props.max) {
        emit('update:count', props.count + 1)
      }
    }

    function decrement() {
      if (props.count > props.min) {
        emit('update:count', props.count - 1)
      }
    }

    return {
      increment,
      decrement,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" @click="decrement" :disabled="count <= min">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" @click="increment" :disabled="count >= max">➕</UiButton>
    </div>
  `,
})
