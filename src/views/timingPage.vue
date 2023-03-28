<template>
  <div class="typing-box" @click="working">
    <!--单个词盒子-->
    <div class="text-box" v-for="(items, key) in textList" :key="key">
      <!--拼音部分-->
      <p class="Chinese">{{ items.text }}</p>
      <!--拼音部分-->
      <div class="Pinyin">
        <!--每一个音节-->
        <span class="pinyin-item" v-for="(item, index) in items.pinYin" :key="index">
          {{ item }}
        </span>
      </div>
    </div>
  </div>
  <input class="input-text" type="text" ref="inputText" @keydown="typingHandler" v-focus />
</template>

<script setup>
import { usePhraseStore } from '@/stores/phrase'
import { getArrayItems, getPinyin } from '@/utils'
import { onBeforeMount, ref } from 'vue'

const phrase = usePhraseStore()
// 渲染列表
const textList = ref([])

// 获取inputDOM
const inputText = ref(null)

// 获取焦点
const working = () => inputText.value.focus()

// 键盘敲击处理
const typingHandler = (el) => {
  // 获取当前打出的字
  const key = el.key.toLowerCase()
  // 当输入中文时处理
  if (key === 'process') return alert('请使用英文输入法')
  console.log(key)
}

// 获取列表数组
const getPhrase = (num = 10) => {
  const list = getArrayItems(phrase.phraseList, num)
  textList.value = getPinyin(list)
}
// 默认在挂载dom之前添加一次
onBeforeMount(() => {
  getPhrase()
})
</script>

<style scoped>
.typing-box {
  width: 900px;
  max-height: 500px;
  overflow: auto;
  margin: 100px auto;
  display: flex;
  flex-wrap: wrap;
}

.text-box {
  width: auto;
  font-size: 20px;
  text-align: center;
  padding: 0 30px 20px 0;
}
.Chinese {
  opacity: 0.8;
}
.Pinyin {
  display: flex;
}
.pinyin-item {
  width: 14px;
  opacity: 0.6;
  font-weight: 500;
}

.success {
  color: blue;
}
.err {
  color: red;
}
.input-text {
  position: absolute;
  left: -99999px;
}
</style>
