import { defineComponent } from 'vue'
import { UiAlert, UiContainer } from '@shgk/vue-course-ui'
import MeetupAgenda from './MeetupAgenda.js'
import MeetupDescription from './MeetupDescription.js'
import MeetupCover from './MeetupCover.js'
import MeetupInfo from './MeetupInfo.js'
import './MeetupView.css'

export default defineComponent({
  name: 'MeetupView',

  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupAgenda,
    MeetupCover,
    MeetupInfo,
  },

  props: {
    meetup: {
      type: Object,
      required: true,   },
  },

  template: `
    <div>

      <!-- Обложка митапа -->
       <MeetupCover :title="meetup.title" :image="meetup.image" ></MeetupCover>

      <UiContainer>
        <div class="meetup">
          <div class="meetup__content">
            <h2>Описание</h2>
            <!-- Описание митапа -->
            <MeetupDescription :description="meetup.description"></MeetupDescription>

            <h2>Программа</h2>
            <MeetupAgenda v-if="meetup.agenda && meetup.agenda.length > 0" :agenda="meetup.agenda"></MeetupAgenda>

            <!-- Программа митапа -->
            <!-- Или при пустой программе - сообщение "Программа пока пуста..." в UiAlert -->
            <UiAlert v-else text="Программа пока пуста..." />

          </div>
          <div class="meetup__aside">

            <!-- Краткая информация о митапе -->
            <MeetupInfo :organizer="meetup.organizer" :date="meetup.date" :place="meetup.place"></MeetupInfo>

            <div class="meetup__aside-buttons"></div>
          </div>
        </div>
      </UiContainer>
    </div>
  `,
})
