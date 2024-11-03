export function daysSince (createdAt) {
  const createdDate = new Date(createdAt) // 將 createdAt 轉為 Date 對象
  const currentDate = new Date() // 當前時間
  // 計算時間差異（毫秒）
  const timeDifference = currentDate - createdDate
  // 將毫秒轉換為天數
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  return daysDifference // 返回天數差異
}
