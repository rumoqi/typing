<template>
  <div class="timing">
    <div class="more">
      <span @click="changeNumHandler(10)">10/</span>
      <span @click="changeNumHandler(20)">20/</span>
      <span @click="changeNumHandler(30)">30/</span>
      <span @click="changeNumHandler(40)">40</span>
    </div>
    <div class="typing-box" @click="working">
      <!--      指引线     -->
      <div class="line"></div>

      <!--单个词盒子-->
      <div class="text-box" v-for="(items, key) in textList" :key="key">
        <!--拼音部分-->
        <p
          class="Chinese"
          :class="[
            HangErrClassList.indexOf(key) !== -1 ? 'err' : null,
            HangSuccessClassList.indexOf(key) !== -1 ? 'success' : null
          ]"
        >
          {{ items.text }}
        </p>
        <!--拼音部分-->
        <div class="Pinyin">
          <!--每一个音节-->
          <span
            class="pinyin-item"
            v-for="(item, index) in items.pinYin"
            :class="[
              fondClass(key, index, item),
              PinyinAfter.itemIndex === key && PinyinAfter.pinyinIndex === index
                ? 'line-after'
                : null,
              PinyinBefore === key ? 'line-before' : null
            ]"
            :key="index"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </div>

    <!--刷新-->
    <div class="flushed">
      <i class="iconfont icon-shuaxin" @click="flushedHandler" />
    </div>

    <!--输入-->
    <input
      class="input-text"
      @blur="lostFocus"
      type="text"
      ref="inputText"
      @keydown="typingHandler"
      v-focus
    />
  </div>
</template>

<script setup>
import { usePhraseStore } from '@/stores/phrase'
import { getArrayItems, getPinyin } from '@/utils'
import { onBeforeMount, ref } from 'vue'

const phrase = usePhraseStore()
// 渲染列表 --------------------------------------------------------
const textList = ref([])

// 当前单词 --------------------------------------------------------
const phraseNum = ref(10)

// 获取列表数组 --------------------------------------------------------
const getPhrase = (num = phraseNum.value) => {
  const list = getArrayItems(phrase.phraseList, num)
  textList.value = getPinyin(list)
}
// 默认在挂载dom之前添加一次 --------------------------------------------------------
onBeforeMount(() => {
  getPhrase()
})

// 刷新按钮  --------------------------------------------------------
const flushedHandler = () => {
  getPhrase()
  nowPinyin.value = [{ itemIndex: 0, pinyinIndex: 999, PinYin: '', isErr: 'no' }]
  HangErrClassList.value = []
  HangSuccessClassList.value = []
  PinyinAfter.value = PinyinAfterCopy.value = {}
  PinyinBefore.value = PinyinBeforeCopy.value = 0
  working()
}

// 修改多少单词 --------------------------------------------------------
const changeNumHandler = (num) => {
  phraseNum.value = num
  getPhrase()
}

// 获取inputDOM --------------------------------------------------------
const inputText = ref(null)
// 获取焦点
const working = () => {
  inputText.value.focus()
  PinyinAfter.value = PinyinAfterCopy.value || {}
  if (PinyinAfter.value === {}) return
  if (PinyinBefore.value === 0) {
    PinyinBefore.value = 0
  } else {
    PinyinBefore.value = PinyinBeforeCopy.value
  }
}
// 失去焦点
const lostFocus = () => {
  PinyinAfterCopy.value = PinyinAfter.value
  PinyinAfter.value = {}

  PinyinBeforeCopy.value = PinyinBefore.value
  PinyinBefore.value = null
}

// 创建虚拟拼音树
// itemIndex 当前词在那个位置     pinyinIndex 当前词的拼音的位置     PinYin 当前拼音打了什么字
let nowPinyin = ref([{ itemIndex: 0, pinyinIndex: 999, PinYin: '', isErr: 'no' }])

// 指引线 --------------------------------------------------------
//  指引线 --- 当前输入的拼音后显示
let PinyinAfter = ref({}) // 输入位置
let PinyinAfterCopy = ref({}) // 输入位置

let PinyinLocation = () => {
  const length = nowPinyin.value.length - 1
  const PinYin = [...nowPinyin.value]
  PinyinAfter.value = PinYin[length]
}
// 指引线 --- 拼音第一行显示
const PinyinBefore = ref(0) // 当前位置
const PinyinBeforeCopy = ref(0)

// 输入的文字 规定只能输入26字母
const textSpace = 'qwertyuiopasdfghjklzxcvbnm'

// 键盘敲击处理  --------------------------------------------------------
const typingHandler = (el) => {
  // 获取当前打出的字
  const key = el.key.toLowerCase()

  // 当输入中文时处理
  if (key === 'process') return alert('请使用英文输入法')

  // 获取最后一个对象的itemIndex
  const VALUE = nowPinyin.value[nowPinyin.value.length - 1].itemIndex
  // 获取最后一个拼音位置
  const INX = nowPinyin.value[nowPinyin.value.length - 1].pinyinIndex

  // 空格换行
  if (key === ' ' && textList.value[VALUE].pinYin.length - 1 <= INX && INX !== 999) {
    nowPinyin.value.push({
      itemIndex: VALUE + 1,
      pinyinIndex: 999,
      PinYin: '',
      isErr: 'no'
    })
    PinyinAfter.value = {}
    PinyinBefore.value = VALUE + 1

    HangErrClass()
    HangSuccessClass()
  }

  // 删除按钮
  if (key === 'backspace' && INX !== 999) {
    nowPinyin.value.pop()
    HangErrClass() // 输入错误处理
    HangSuccessClass() // 输入正确处理
    PinyinLocation() // 右边线处理

    if (INX === 0) {
      PinyinBefore.value = PinyinBeforeCopy.value = VALUE
    }
  }
  // 输入26字母阶段
  if (textSpace.indexOf(key) === -1) return

  // 当前文字打完后不回车就不能接着输入
  if (textList.value[VALUE].pinYin.length - 1 <= INX && INX !== 999) return

  // 添加一项打字位置
  nowPinyin.value.push({
    itemIndex: VALUE,
    pinyinIndex: INX === 999 ? 0 : INX + 1,
    PinYin: key,
    isErr: 'no'
  })
  PinyinBefore.value = null
  PinyinLocation()
}

// 汉字样式 --------------------------------------------------------
// 汉字失败样式
let HangErrClassList = ref([])
const HangErrClass = () => {
  const list = nowPinyin.value.map((item) => (item.isErr !== 'no' ? item.isErr : null))
  HangErrClassList.value = [...new Set(list)].filter((item) => item !== null)
}

// 汉字成功样式
let HangSuccessClassList = ref([])
const HangSuccessClass = () => {
  let list = nowPinyin.value.map((item) => (item.isErr === 'no' ? item.itemIndex : null))
  list = list.filter((value, index) => value !== list[index + 1])
  list.forEach((item, index) => {
    if (item === null) {
      list.splice(index - 1, 2)
    }
  })
  list.pop()
  HangSuccessClassList.value = list
}

// 修改拼音样式 --------------------------------------------------------
const fondClass = (key, index, item) => {
  let returnClass = ''
  nowPinyin.value.forEach((pin) => {
    // 拼音设置错误样式
    if (key === pin.itemIndex && index === pin.pinyinIndex && item !== pin.PinYin) {
      pin.isErr = key
      returnClass = 'err'
    }
    // 拼音设置正确样式
    if (key === pin.itemIndex && index === pin.pinyinIndex && item === pin.PinYin) {
      pin.isErr = 'no'
      returnClass = 'success'
    }
  })
  return returnClass
}
</script>

<style scoped>
.timing {
  width: 1200px;
  margin: 100px auto;
}
.more {
  font-size: 16px;
  padding-left: 50px;
}
.more span {
  cursor: pointer;
}
.typing-box {
  width: 900px;
  max-height: 500px;
  overflow: auto;
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.text-box {
  width: auto;
  font-size: 22px;

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
  transition: 0.5s;
}

.input-text {
  position: absolute;
  left: -99999px;
}
.flushed {
  text-align: center;
}

.flushed i {
  cursor: pointer;
  font-size: 40px;
  opacity: 0.7;
}

.line-after::after {
  content: '';
  width: 3px;
  height: 30px;
  border-radius: 2px;
  background-color: #1890ff;
  position: absolute;
  transform: translate(0, -5px);
  transition: 1s;
  animation: shrink-expand 1.5s linear infinite;
}

.pinyin-item:first-child.line-before::before {
  content: '';
  width: 3px;
  height: 30px;
  border-radius: 2px;
  background-color: #1890ff;
  position: absolute;
  transform: translate(0, -5px);
  transition: 1s;
  animation: shrink-expand 1.5s linear infinite;
}

@keyframes shrink-expand {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
