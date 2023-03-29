import { defineStore } from 'pinia'
import { ref } from 'vue'
const ARR_PHRASE = [
  '天空',
  '大海',
  '绿草',
  '白云',
  '红花',
  '黄叶',
  '紫罗兰',
  '青蛙',
  '黑猫',
  '灰狼',
  '棕熊',
  '金鱼',
  '银杏',
  '橙子',
  '绿叶',
  '红酒',
  '黑咖',
  '白鹭',
  '紫砂',
  '青山',
  '紫烟',
  '橙汁',
  '黑夜',
  '灰烬',
  '金银',
  '铁钩',
  '玉石',
  '珍珠',
  '海鲜',
  '山水',
  '河流',
  '湖泊',
  '草原',
  '你好啊',
  '我爱你',
  '天气好',
  '快乐生活',
  '学习努力',
  '工作顺利',
  '美好未来',
  '开心每一天',
  '成功在望',
  '加油加油',
  '天空之城',
  '风吹雨落',
  '梦里花开',
  '山水相连',
  '人海茫茫',
  '心如止水',
  '春暖花开',
  '秋高气爽',
  '岁月静好',
  '今天天',
  '气很好',
  '中午吃',
  '了烤鸭',
  '明天去',
  '旅游吧',
  '下雨了',
  '别忘带',
  '雨伞哦',
  '我喜欢',
  '吃火锅',
  '你呢',
  '青山',
  '黄昏',
  '橙色',
  '紫罗',
  '粉红',
  '深蓝',
  '浅灰',
  '鲜红',
  '淡黄',
  '碧绿',
  '玫瑰',
  '橄榄',
  '茉莉',
  '荷花',
  '菊花',
  '梅花',
  '樱花',
  '竹子',
  '松树',
  '枫叶',
  '橡树',
  '椰子',
  '草莓',
  '柿子',
  '桃子',
  '苹果',
  '葡萄',
  '西瓜',
  '香蕉',
  '芒果',
  '樱桃',
  '石榴',
  '杏子',
  '橙汁',
  '冰茶',
  '可乐',
  '咖啡',
  '牛奶',
  '面包',
  '蛋糕',
  '巧克力',
  '糖果',
  '饼干',
  '大家',
  '一起',
  '去玩',
  '游戏',
  '这里',
  '很美',
  '人山人海',
  '天上人间',
  '十年',
  '河东',
  '十年',
  '河西',
  '蓝天',
  '明天',
  '会更好',
  '快乐',
  '幸福',
  '和谐',
  '友善',
  '欢迎',
  '光临',
  '美丽',
  '动人',
  '天空',
  '白雪',
  '黄沙',
  '黑夜',
  '明月',
  '流水',
  '飞鸟',
  '远方',
  '彩虹',
  '星空',
  '梦境',
  '烟花',
  '阳光',
  '微笑',
  '温暖',
  '感恩',
  '真爱',
  '友谊',
  '家庭',
  '未来',
  '希望',
  '勇气',
  '坚强',
  '自信',
  '努力',
  '奋斗',
  '成功',
  '成长',
  '青春',
  '美丽',
  '时光',
  '回忆',
  '思念',
  '爱情',
  '浪漫'
]

export const usePhraseStore = defineStore('phrase', () => {
  const phraseList = ref(ARR_PHRASE) // store的数据
  //  设置表
  const setList = (list) => {
    phraseList.value = list
  }

  return { setList, phraseList, usePhraseStore }
})
