<template>
  <div class="mask" @click="exitHandler">
    <div class="cart" @click.stop>
      <!--退出按钮-->
      <div class="exit">
        <span @click="exitHandler">❌</span>
      </div>

      <!--样式列表-->
      <div class="box">
        <!--每一个小box-->
        <div
          class="items"
          v-for="item in themesList.theme"
          :key="item"
          :style="item"
          @click="changeThemeHandler(item)"
        >
          样式
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { useThemesStore } from '@/stores/theme'
// 样式列表
const themesList = useThemesStore()

// 修改主题
const changeTheme = inject('ThemeHandler')
const changeThemeHandler = (value) => {
  changeTheme.changeThemeHandler(value)
  exitHandler()
}

// 关闭方法
const shutDown = inject('ThemeHandler')
// 关闭
const exitHandler = () => {
  shutDown.showThemePageHandler()
}
</script>

<style scoped>
.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
.cart {
  width: 500px;
  background: #fff;
  margin: 10% auto;
  padding: 20px;
}
.exit {
  display: flex;
  justify-content: end;
  font-size: 16px;
  cursor: pointer;
}
.box {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
}
.items {
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
