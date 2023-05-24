import './index.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'

import BaseDropdown from '@/components/ui/form/BaseDropdown.vue'
import BaseButton from '@/components/ui/form/BaseButton.vue'
import English from '@/locales/en.json'
import Georgian from '@/locales/ka.json'
import AuthCard from '@/components/ui/AuthCard.vue'

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
app.component('auth-card', AuthCard)

app.mount('#app')
