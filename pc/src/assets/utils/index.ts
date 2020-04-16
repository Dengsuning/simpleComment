/**
 * 随机获取16进制颜色值
 * @returns {String}
 */
export function getRandomColor () {
  return '#' + Math.random().toString(16).slice(2, 8)
}
/**
 * 判断传入得变量是否不是有值数组
 * @param {any} arr - 待判断得值
 * @returns {Boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEmptyArray (arr: any): boolean {
  return Array.isArray(arr) ? arr.length === 0 : true
}
/**
 * 首字母大写
 * @param {String} word - 待转换的单词
 * @returns {String}
 */
export function titleCase (word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

/**
 * 生成指定数量的空格
 * @param {number} num - 生成的空格数量
 * @returns {String} 指定数量的空格字符串
 */
export function genSpace (num: number): string {
  return ' '.repeat(num)
}

/**
 * 判断是否为单行字符串
 * @param {String} text - 待判断得字符串
 * @returns {Boolean}
 */
export function isSingleLine (text: string): boolean {
  return !text.trim().includes('\n')
}

/**
 * 计算字符串物理长度
 * 数字，字母长度为1 汉字为1.8
 * @param {string} str - 待计算的字符串
 * @returns {Number} 字符串模拟物理长度
 */
export const getRealStrLenth: (str: string) => number = (str): number => {
  let len = 0

  for (let i = 0; i < str.length; i++) {
    if (!['—', '┃'].includes(str[i]) && (str.charCodeAt(i) & 0xff00) !== 0) {
      len += 0.8333333333333334 // 每个汉字是数字的物理长度的11/6倍  也就是1.8xxx倍 （11- 6 == 5）
    }
    len++
  }
  return Math.ceil(len)
}

/**
 * 计算字符串中的占两个字节（汉字）的字符数量
 * 数字，字母长度为1 汉字为1.8
 * @param {string} str - 待计算的字符串
 * @returns {Number} 双字节字符数
 */
export const getDoubleByteLen: (str: string) => number = (str): number => {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    if (!['—'].includes(str[i]) && (str.charCodeAt(i) & 0xff00) !== 0) {
      len++
    }
  }
  return len
}
/**
 * 替换指定位置的子字符串
 * @param {string} text - 父字符串
 * @param {string} replacetext - 替换的文本
 * @param {string} start - 替换的起始位置（会被替换该位置字符）
 * @param {string} end - 替换的结束位置（会保留该位置字符）
 * @returns {String} 替换后的文本
 */
export function replaceStr (text: string, replacetext: string, start: number, end: number): string {
  return text.substring(0, start) + replacetext + text.substring(end)
}
/**
 * 根据最大长度分割字符串为字符数组
 * @param {String} text - 待分割字符串
 * @param {Number} length - 分行长度
 * @returns {String[]} 分割后的字符数组
 */
export function splitStringByLength (text: string, length: number): string[] {
  let count = 0; let lastIndex = 0
  const res = []
  for (let i = 0; i < text.length; i++) {
    if ((text.charCodeAt(i) & 0xff00) !== 0) {
      count++
    }
    count++

    if (count >= length) {
      count = 0
      res.push(text.slice(lastIndex, i + 1))
      lastIndex = i + 1
    }
  }
  if (lastIndex <= text.length - 1) {
    res.push(text.slice(lastIndex))
  }
  return res
}
/**
 * 根据模拟实际宽度填充空格
 * @param {String} text - 带填充字符串
 * @param {Number} length - 需要有内容的长度  不足的会被填充
 * @param {String} char - 填充字符
 * @returns {String} 填充后的字符串
 */
export function padEndByRealLen (text: string, length: number, char?: string): string {
  if (text.length >= length) {
    return text
  }
  const paddingLen: number = length - getRealStrLenth(text)
  return text + (char ? char.repeat(paddingLen) : genSpace(paddingLen))
}

export function getCmdType (cmd: string): string {
  const res = cmd.match(/^\s*@\w*\b/g)
  return res ? res[0] : ''
}

/**
 * 给注释文本添加斜杠的边框
 * @param {String} comment - 被包裹的注释文本
 * @param {String} char - 边框字符
 * @returns {String} 包裹后的文本
 */
export function wrapComment (comment: string, char = '/'): string {
  const charLen: number = getRealStrLenth(char)
  const arr: string[] = comment.split('\n').filter(t => t)
  const maxLen: number = arr.reduce((p: number, c: string) => {
    const realLen: number = getRealStrLenth(c)
    return p < realLen ? realLen : p
  }, 0)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = char + genSpace(2) + padEndByRealLen(arr[i], maxLen) + genSpace(2) + char
  }
  const repeatNum = Math.ceil((maxLen + charLen * 2 + 4) / charLen)
  const border: string = char.repeat(repeatNum)
  return border + '\n' + arr.join('\n') + '\n' + border
}

/**
 * 获取方法元信息（参数和返回值）
 * @param {String} cmd - 命令行输入得命令字符
 * @example
 * @  func  -d.xxx..  -p.string.number. ID - 学生编号 .. p.string.number. name - 学生姓名 ..  -r.Student.学生信息..
 * @param {Boolean} isParam - 元信息类型 true=>参数 false=>返回值
 * @returns {String} 提取的元信息描述字符串
 */
function getMetaInfo (cmd: string, isParam: boolean): string {
  const regexp = isParam ? /-p.+?\.\./g : /-r.+?\.\./g
  const prefix = isParam ? '@param' : '@returns'
  const textList = [...cmd.replace(/\.\.\./g, '. ...').matchAll(regexp)]
  if (isEmptyArray(textList)) {
    // 当只输入-p -p 填充为默认占位 @param {*} prop - desc
    // 填充空格是为了保证-p在末尾时也能被匹配
    if (isParam && (cmd + genSpace(1)).includes('-p ')) {
      return [...cmd.matchAll(/-p\s?/g)].map((c: string[]) => c[0] ? '@param {*} prop - desc\n' : '').join('')
    }
    if (!isParam && (cmd + genSpace(1)).includes('-r')) {
      return '@returns {*} \n'
    }
    return ''
  }
  return textList.map(t => {
    if (t[0]) {
      // 去除-p. -r. 前置定位字符 和 .. 结束定位符
      const contents = t[0].slice(3, -2).split('.')
      let typesText = contents.slice(0, -1).reduce((p, c, i, arr) => {
        const excludeType = ['undefined', 'null']
        const r = p + (excludeType.includes(c) ? c : titleCase(c))
        return r + (i === arr.length - 1 ? '' : '|')
      }, '')
      typesText = typesText ? `{${typesText}}` : ''
      return `${prefix} ${typesText} ${contents.slice(-1)}`
    }
    return ''
  }).join('\n') + '\n'
}
/**
 * 获取方法描述
 * @param {String} cmd - 命令行输入得命令字符
 * @returns {String} 提取的方法描述字符串
 */
function getMethodDesc (cmd: string, appendLF = true): string {
  const suffix = appendLF ? '\n' : ''
  const res = cmd.match(/-d.+?\.\./g)
  // 未传值也保留函数描述空行
  if (isEmptyArray(res)) return suffix
  return (res as Array<string>)[0].slice(3, -2) + suffix
}
/**
 * 获取函数相关的注释信息
 * @param {String} cmd - 命令行输入得命令字符
 * @example
 * $root  @func  -d.发发的犯得上发射点发大夫士大夫..  -p.string.number. ID - 学生编号 .. -r.f犯得上反对法..   -p.string.number. Ifd - 学生fsdf编号 ..
 * @returns {String} 提取的方法描述字符串
 */
function getFuncComment (cmd: string): string {
  const desc = getMethodDesc(cmd)
  const params = getMetaInfo(cmd, true)
  const returns = getMetaInfo(cmd, false)
  return desc + params + returns
}
function getVersion (cmd: string): string {
  const res = cmd.match(/-v.+?\.\./g)
  // 未传值也保留函数描述空行
  if (isEmptyArray(res)) return '\n'
  return (res as Array<string>)[0].slice(3, -2)
}
/**
 * 获取文件相关的注释信息
 * @param {String} cmd - 命令行输入得命令字符
 * @example @file -v1.0.0.. -u.诸葛亮.. -d.文件描述..
 * @returns {String} 提取的方法描述字符串
 */
function getFileComment (cmd: string): string {
  const res = cmd.match(/-a.+?\.\./g)
  let userStr = ''
  if (res) {
    userStr = res[0].slice(3, -2)
  }
  return `@File  
@Desription ${getMethodDesc(cmd, false)}
@Date
@Version ${getVersion(cmd)}
@Author ${userStr} 
@LastEditors ${userStr} 
@LastEditTime ${new Date().toLocaleString().replace(/\//g, '-')}
  `
}

/**
 * 给注释文本包装一般多行注释语法包裹
 * @param {String} comment - 待转换得注释文本
 * @returns {String} 多行注释包裹后的文本
 */
export function multilineWrapper (comment: string): string {
  if (isSingleLine(comment)) {
    return '/********    ' + comment.trim() + '    ********/'
  }
  const linePrefix = ' * '
  // 为首行得下一行添加行前缀
  const firstLine = '/**\n' + linePrefix
  const endLine = '/'
  return firstLine + comment.replace(/\n/g, '\n' + linePrefix) + endLine
}

/**
 * 按命令行参数生成函数参数及返回值注释
 */
export function genCommByCmd (cmd: string): string {
  let res = ''
  switch (getCmdType(cmd).trim()) {
    case '@func':
      res = multilineWrapper(getFuncComment(cmd))
      break
    case '@file':
      res = multilineWrapper(getFileComment(cmd))
      break
  }
  return res
}
