import './index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BaseDropdown from '@/components/ui/BaseDropdown.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const app = createApp(App)

app.use(router)

app.component('base-dropdown', BaseDropdown)
app.component('base-button', BaseButton)

app.mount('#app')
