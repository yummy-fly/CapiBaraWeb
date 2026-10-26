/**
 * 名厨私宴相关接口
 */
import { fetchData } from './index'
import {
  chefsData,
  chefDetailData,
  chefBookingData,
  type ChefsData,
  type ChefDetailData,
  type ChefBookingData
} from '../data/chefs'

/** GET /api/chefs 获取名厨私宴列表页数据 */
export function fetchChefsData(): Promise<ChefsData> {
  return fetchData<ChefsData>(chefsData, '/api/chefs')
}

/** GET /api/chefs/:id 获取私宴详情页数据 */
export function fetchChefDetail(id: string): Promise<ChefDetailData> {
  return fetchData<ChefDetailData>(chefDetailData, `/api/chefs/${id}`)
}

/** GET /api/chefs/:id/booking 获取私宴预约页数据 */
export function fetchChefBooking(id: string): Promise<ChefBookingData> {
  return fetchData<ChefBookingData>(chefBookingData, `/api/chefs/${id}/booking`)
}
