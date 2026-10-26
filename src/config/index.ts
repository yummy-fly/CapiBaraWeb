/**
 * 全局配置文件
 */

/**
 * 数据源开关
 * true  = 本地模式：所有接口返回 src/data 下的模拟数据
 * false = 真实模式：所有接口调用 API_BASE_URL 指向的真实后端
 */
export const USE_LOCAL_DATA = true

/**
 * 真实后端 API 地址（USE_LOCAL_DATA 为 false 时生效）
 */
export const API_BASE_URL = 'https://api.capivilla.example.com'
