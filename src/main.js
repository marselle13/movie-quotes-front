import './index.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import English from '@/locales/en.json'
import Georgian from '@/locales/ka.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale'),
  messages: {
    en: English,
    ka: Georgian,
  },
})

const app = createApp(App)

app.use(router)
app.use(i18n)

app.component('base-dropdown', BaseDropdown)
app.component('base-button', BaseButton)

app.mount('#app')
