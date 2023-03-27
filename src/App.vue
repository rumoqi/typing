<template>
  <div class="type" :style="theme">
    <!--面包屑-->
    <NavBar />
    <router-view />

    <!--遮罩层，修改主题-->
    <transition>
      <ThemePage v-if="isShowThemePage" />
    </transition>
  </div>
</template>

<script setup>
import NavBar from '@/components/navBar/navBar.vue'
import { useThemesStore } from '@/stores/theme'
import { provide, ref } from 'vue'
import ThemePage from '@/components/themePage/themePage.vue'

// 获取 pinia 数据
const themes = useThemesStore()

// 设置默认主题
let theme = ref(themes.defaultTheme)
// 修改主题
const changeThemeHandler = (style) => {
  theme.value = style
}

//  主题
let isShowThemePage = ref(false)
// 打开修改主题盒子
const showThemePageHandler = () => {
  isShowThemePage.value = !isShowThemePage.value
}
// 导出方法
provide('ThemeHandler', {
  showThemePageHandler,
  changeThemeHandler
})
</script>

<style scoped>
.type {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: 1s;
  user-select: none;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
