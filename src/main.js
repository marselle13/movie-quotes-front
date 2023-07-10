import './index.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { setLocale } from '@vee-validate/i18n'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './config/vee-validate/rules'
import './config/vee-validate/messages'

import BaseDropdown from '@/components/common/form/BaseDropdown.vue'
import BaseButton from '@/components/common/form/BaseButton.vue'
import English from '@/locales/en.json'
import Georgian from '@/locales/ka.json'
import AuthCard from '@/components/common/AuthCard.vue'
import BaseInput from '@/components/common/form/BaseInput.vue'
import MainCard from '@/components/common/MainCard.vue'
import BaseTextarea from '@/components/common/form/BaseTextarea.vue'
import BaseUpload from '@/components/common/form/BaseUpload.vue'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'en',
  messages: {
    en: English,
    ka: Georgian,
  },
})

setLocale(localStorage.getItem('locale'))

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(i18n)
app.use(pinia)

app.component('base-dropdown', BaseDropdown)
app.component('base-button', BaseButton)
app.component('base-input', BaseInput)
app.component('base-upload', BaseUpload)
app.component('base-textarea', BaseTextarea)
app.component('auth-card', AuthCard)
app.component('main-card', MainCard)

app.mount('#app')
