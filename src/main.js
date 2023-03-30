// 公共样式
import('@/styles/base.css')

import { createPinia } from 'pinia'

import { createApp } from 'vue'

import App from '@/App.vue'
import router from '@/router/index'

// 字体图标
import('@/assets/fontIcon/iconfont.css')

const app = createApp(App)

// 默认获取焦点
app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.use(createPinia())

app.use(router)

app.mount('#app')
