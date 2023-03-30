<template>
  <div class="type" :style="theme">
    <!--面包屑-->
    <NavBar />

    <!--路由出口-->
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition>
    </router-view>

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

// 设置默认主题 ------------------------------
let theme = ref(themes.defaultTheme)
// 修改主题
const changeThemeHandler = (style) => {
  theme.value = style
  changeColor(DOM.value)
}
//  主题
let isShowThemePage = ref(false)
// 打开修改主题盒子
const showThemePageHandler = () => {
  isShowThemePage.value = !isShowThemePage.value
}
// 该DOM为sentence-page的下划线
let DOM = ref('')
// 该方法专门处理sentence-page的无法修改样式bug
const changeColor = (Dom) => {
  DOM.value = Dom
  Dom.value.style.color = theme.value.color
  Dom.value.style.borderColor = theme.value.color
}

// 添加词语 --------------------------
const isShowTextPage = ref(true)
const isShowTextPageHandler = () => {
  isShowTextPage.value = !isShowTextPage.value
}

// 导出方法--------------------------
provide('ThemeHandler', {
  showThemePageHandler,
  changeThemeHandler,
  theme: theme.value,
  changeColor,
  isShowTextPageHandler
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
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

/*.slide-fade-leave-active {*/
/*  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);*/
/*}*/

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(200px);
  opacity: 0;
}
</style>
