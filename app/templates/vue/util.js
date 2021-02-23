

/**
 * 判断 值是否有效（不为null "null" undefined ""）
 * @param {Object} v
 */
export function valueIsBlank(v) {
  if (v === null || v === "null" || v === "" || typeof (v) === "undefined") {
    return true;
  }
  return false;
}
/**
 * 获取时间字符串的 年月日
 */
export function getSimpleTimeString(timeString) {
  try {
    let t = timeString.split(" ");
    if (t.length > 0) {
      return t[0];
    }
    return timeString;
  } catch (e) {
    return timeString;
  }
}