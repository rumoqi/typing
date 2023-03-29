<template>
  <!--模式-->
  <div class="nav-bar">
    <span v-for="item in navList" :key="item.name" @click="barClick(item.type)">
      <i class="iconfont" :class="item.fontIcon" />
      {{ item.name }}
    </span>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'
// 顶部样式
const navList = ref([
  { name: '模式1', fontIcon: 'icon-icon_xianshi-xian', type: 0 },
  { name: '模式2', fontIcon: 'icon-liebiao', type: 1 },
  { name: '主题', fontIcon: 'icon-moshi1', type: 2 },
  { name: '单词表', fontIcon: 'icon-31shezhi', type: 3 }
])

// 打开主题
const theme = inject('ThemeHandler')
const $router = useRouter()

const barClick = (index) => {
  if (index === 0) {
    $router.push('/')
  } else if (index === 1) {
    $router.push('mode2')
  } else if (index === 2) {
    openTheme()
  } else if (index === 3) {
    console.log('单词表')
  }
}

const openTheme = () => {
  theme.showThemePageHandler()
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
}

.nav-bar:first-child {
  padding-top: 10px;
}

.nav-bar > span {
  padding: 10px 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.nav-bar i {
  margin-right: 4px;
}
</style>
