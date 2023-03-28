<template>
  <div class="typing-box" @click="working">
    <!--单个词盒子-->
    <div class="text-box" v-for="(items, key) in textList" :key="key">
      <!--拼音部分-->
      <p class="Chinese">{{ items.text }}</p>
      <!--拼音部分-->
      <div class="Pinyin">
        <!--每一个音节-->
        <span
          class="pinyin-item"
          v-for="(item, index) in items.pinYin"
          :class="fondClass(key, index, item)"
          :key="index"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
  {{ nowPinyin }}
  <input class="input-text" type="text" ref="inputText" @keydown="typingHandler" v-focus />
</template>

<script setup>
import { usePhraseStore } from '@/stores/phrase'
import { getArrayItems, getPinyin } from '@/utils'
import { onBeforeMount, ref } from 'vue'

const phrase = usePhraseStore()
// 渲染列表
const textList = ref([])

// 获取列表数组
const getPhrase = (num = 10) => {
  const list = getArrayItems(phrase.phraseList, num)
  textList.value = getPinyin(list)
}
// 默认在挂载dom之前添加一次
onBeforeMount(() => {
  getPhrase()
})

// 获取inputDOM
const inputText = ref(null)

// 获取焦点
const working = () => inputText.value.focus()

// 当前的拼音位置
// itemIndex 当前词在那个位置     pinyinIndex 当前词的拼音的位置     PinYin 当前拼音打了什么字
let nowPinyin = ref([{ itemIndex: 0, pinyinIndex: -1, PinYin: '' }])

// 输入的文字
const textSpace = 'qwertyuiopasdfghjklzxcvbnm'

// 键盘敲击处理
const typingHandler = (el) => {
  // 获取当前打出的字
  const key = el.key.toLowerCase()

  // 当输入中文时处理
  if (key === 'process') return alert('请使用英文输入法')

  // 获取上一个对象的itemIndex
  const value = nowPinyin.value[nowPinyin.value.length - 1].itemIndex
  // 获取当前拼音位置
  const INX = nowPinyin.value[nowPinyin.value.length - 1].pinyinIndex

  // 空格换行
  if (key === ' ') {
    nowPinyin.value.push({
      itemIndex: value + 1,
      pinyinIndex: -1,
      PinYin: ''
    })
  }

  // 删除按钮
  if (key === 'backspace' && INX !== -1) {
    nowPinyin.value.pop()
  }
  // 输入26字母阶段
  if (textSpace.indexOf(key) === -1) return

  nowPinyin.value.push({
    itemIndex: value,
    pinyinIndex: INX + 1,
    PinYin: key
  })
}

// 修改样式
const fondClass = (key, index, item) => {
  let returnClass = ''
  nowPinyin.value.forEach((pin) => {
    if (key === pin.itemIndex && index === pin.pinyinIndex && item !== pin.PinYin) {
      returnClass = 'err'
    }
    if (key === pin.itemIndex && index === pin.pinyinIndex && item === pin.PinYin) {
      returnClass = 'success'
    }
  })
  return returnClass
}
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
