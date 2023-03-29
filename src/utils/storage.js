// localStorage-------
// 存储历史
export const SetLoItem = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val))
}
// 获取历史
export const GetLoItem = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
// 删除历史
export const RemoveLoItem = (key) => {
  localStorage.removeItem(key)
}

// sessionStorage------------
// 存储历史
export const SetSeItem = (key, val) => {
  sessionStorage.setItem(key, JSON.stringify(val))
}
// 获取历史
export const GetSEItem = (key) => {
  return JSON.parse(sessionStorage.getItem(key))
}
// 删除历史
export const RemoveSeItem = (key) => {
  sessionStorage.removeItem(key)
}

// cookie--------------------
// 存储cookie
export const SetCookie = (name, val, hover = 1) => {
  const date = new Date()
  // 设置过期时间 默认一小时后过期
  date.setHours(date.getHours() + hover)
  const time = date.toUTCString()

  // 设置cookie
  document.cookie = `${name}=${val};expires=${time}`
}

// 获取cookie
export const getCookie = () => {
  const cookieArr = document.cookie.split(';')
  let value = ''
  cookieArr.push.forEach((item) => {
    if (item.split('=')[0].trim() === key) {
      value = item.split('='[1])
    }
    return value
  })
}

// 删除cookie
export const delCookie = (name) => {
  SetCookie(name, 1, -1)
}
