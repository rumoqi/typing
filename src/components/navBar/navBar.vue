<template>
  <!--模式-->
  <div class="nav-bar">
    <span v-for="item in navList" :key="item.name">
      <i class="iconfont" :class="item.fontIcon" />
      {{ item.name }}
    </span>
  </div>

  <!--设置-->
  <div class="nav-bar">
    <span @click.stop="openTheme">
      <i class="iconfont icon-moshi1" />
      主题
    </span>
    <span>
      <i class="iconfont icon-31shezhi" />
      单词表
    </span>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
// 顶部样式
const navList = ref([
  { name: '模式1', fontIcon: 'icon-icon_xianshi-xian', type: 0 },
  { name: '模式2', fontIcon: 'icon-liebiao', type: 1 },
  { name: '按键声音', fontIcon: 'icon-shengyin', type: 2 }
])

// 打开主题
const theme = inject('ThemeHandler')

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
