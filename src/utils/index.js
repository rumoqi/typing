export const getArrayItems = (arr, num = 10) => {
  let temp_arr = arr.slice(0)
  // 取出的数值项，保存在此数组
  let return_arr = []
  for (let i = 0; i < num; i++) {
    // 判断如果数组还有可以取出的元素，以防下标越界
    if (temp_arr.length > 0) {
      // 在数组中产生一个随机索引
      let arrIndex = Math.floor(Math.random() * temp_arr.length)
      // 将此随机索引的对应数组元素值复制出来
      return_arr[i] = temp_arr[arrIndex]
      // 然后删掉此索引的数组元素，这时候temp_arr变为新的数组
      temp_arr.splice(arrIndex, 1)
    } else {
      // 数组中数据项取完后，退出循环，比如数组本来只有10项，但要求取出20项
      break
    }
  }
  return return_arr
}
