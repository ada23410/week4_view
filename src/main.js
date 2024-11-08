/* eslint-disable no-use-before-define */
import { createApp } from 'vue'
import 'bootstrap'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { daysSince } from './methods/filter'

library.add(fas)

const emitter = mitt()
const app = createApp(App)

app.config.globalProperties.emitter = emitter
app.config.globalProperties.$filters = {
  daysSince
}

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
