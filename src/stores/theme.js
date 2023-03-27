import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useThemesStore = defineStore('themes', () => {
  const theme = ref([
    { backgroundColor: 'rgb(40, 44, 52)', color: 'rgb(255, 255, 254)' },
    { backgroundColor: 'rgb(70, 71, 70)', color: 'rgb(255, 172, 0)' },
    { backgroundColor: 'rgb(87, 93, 94)', color: 'rgb(237, 107, 33)' },
    { backgroundColor: 'rgb(108, 59, 123)', color: 'rgb(248, 204, 42)' },
    { backgroundColor: 'rgb(54, 52, 52)', color: 'rgb(232, 196, 184)' },
    { backgroundColor: 'rgb(182, 176, 154)', color: 'rgb(46, 47, 51)' },
    { backgroundColor: 'rgb(106, 151, 181)', color: 'rgb(250, 238, 105)' },
    { backgroundColor: 'rgb(16, 44, 78)', color: 'rgb(234, 192, 4)' },
    { backgroundColor: 'rgb(101, 145, 91)', color: 'rgb(239, 234, 155)' },
    { backgroundColor: 'rgb(247, 242, 234)', color: 'rgb(244, 84, 124)' },
    { backgroundColor: 'rgb(206, 215, 224)', color: 'rgb(117, 153, 177)' },
    { backgroundColor: 'rgb(129, 185, 208)', color: 'rgb(255, 255, 255)' },
    { backgroundColor: 'rgb(63, 66, 65)', color: 'rgb(208, 223, 0)' },
    { backgroundColor: 'rgb(255, 255, 254)', color: 'rgb(40, 44, 52)' }
  ]) // store的数据
  // 处理state的方法
  const defaultTheme = computed(() => theme.value[0])

  return { theme, defaultTheme, useThemesStore }
})
