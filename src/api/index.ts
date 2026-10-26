/**
 * 统一请求层
 * - USE_LOCAL_DATA = true  时返回 src/data 下的模拟数据（模拟网络延迟）
 * - USE_LOCAL_DATA = false 时通过 uni.request 调用真实后端 API
 */
import { USE_LOCAL_DATA, API_BASE_URL } from '../config'

/** 模拟网络延迟（毫秒） */
const MOCK_DELAY = 200

function mockResponse<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), MOCK_DELAY)
  })
}

function request<T>(path: string, method: 'GET' | 'POST' = 'GET', data?: unknown): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: API_BASE_URL + path,
      method,
      data: data as Record<string, unknown> | undefined,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T)
        } else {
          reject(new Error(`请求失败: ${res.statusCode} ${path}`))
        }
      },
      fail: (err) => reject(new Error(err.errMsg || '网络请求失败'))
    })
  })
}

/** 获取数据：本地模式走 mock，真实模式走后端 */
export function fetchData<T>(mockData: T, path: string, method: 'GET' | 'POST' = 'GET', payload?: unknown): Promise<T> {
  return USE_LOCAL_DATA ? mockResponse(mockData) : request<T>(path, method, payload)
}
