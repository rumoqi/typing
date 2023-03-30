<template>
  <!--模式-->
  <div class="nav-bar">
    <span
      v-for="item in navList"
      :key="item.name"
      @click="barClick(item.type)"
      v-show="item.type !== 3 || isShowRoute"
    >
      <i class="iconfont icon-box" :class="item.fontIcon" />
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
  { name: '主题', fontIcon: 'icon-moshi1', type: 2 }
])

// 打开主题
const theme = inject('ThemeHandler')
const $router = useRouter()
let isShowRoute = ref(true)

const barClick = (index) => {
  // 模式1
  if (index === 0) {
    $router.push('/')
    isShowRoute.value = true
  } else if (index === 1) {
    // 模式2
    $router.push('/mode2')
    isShowRoute.value = false
  } else if (index === 2) {
    // 主题
    openTheme()
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
.icon-box {
  width: 16px ;
  height: 16px;
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
