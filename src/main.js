// 公共样式
import('./styles/base.css')

import { createPinia } from 'pinia'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// 字体图标
import('./assets/fontIcon/iconfont.css')

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.mount('#app')
