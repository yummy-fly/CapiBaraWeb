/**
 * 首页相关接口
 */
import { fetchData } from './index'
import { homeData, type HomeData } from '../data/home'

/** GET /api/home 获取首页数据 */
export function fetchHomeData(): Promise<HomeData> {
  return fetchData<HomeData>(homeData, '/api/home')
}
