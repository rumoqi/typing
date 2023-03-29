<template>
  <div class="sentence-page">
    <p class="sentence">
      <span
        v-for="(item, key) in sentence"
        :class="[
          textList[key] === item ? 'success' : null,
          textList[key] !== item && textList[key] !== undefined ? 'err' : null
        ]"
        :key="key"
        >{{ item }}</span
      >
    </p>
    <input
      type="text"
      ref="textRef"
      class="text"
      v-model="text"
      @input="typingHandler"
      @keydown="getNewText"
      placeholder="完成后回车切换下一句"
    />
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'
import { useTextStore } from '@/stores/text'
// 获取当前颜色
const Inject = inject('ThemeHandler')

const textRef = ref(null)

// 修改颜色
onMounted(() => Inject.changeColor(textRef))

// 获取诗句
const store = useTextStore()
const sentence = ref(...store.getText())

const textList = ref([])

// 双向绑定输入内容
const text = ref(null)
// 输入诗句
const typingHandler = () => {
  let newText = text.value
  if (newText === null) return
  newText = newText.split('')
  textList.value = newText
}

// 获取新的句子
const getNewText = (el) => {
  console.log()
  if (el.key === 'Enter') {
    if (sentence.value.length !== textList.value.length) return
    sentence.value = store.getText().join()
    text.value = ''
    textList.value = []
  }
}
</script>

<style scoped>
.sentence-page {
  width: 1000px;
  margin: 0 auto;
  padding-top: 150px;
  font-size: 26px;
}
.sentence {
  line-height: 40px;
}
.text {
  width: 100%;
  height: 50px;
  font-size: 26px;
  border-bottom: 2px solid;
  background-color: rgba(0, 0, 0, 0);
}
.text::placeholder {
  font-size: 16px;
}
</style>
