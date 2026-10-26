/**
 * 民宿相关接口
 */
import { fetchData } from './index'
import {
  staysData,
  stayDetailData,
  stayBookingData,
  type StaysData,
  type StayDetailData,
  type StayBookingData
} from '../data/stays'

/** GET /api/stays 获取民宿列表页数据 */
export function fetchStaysData(): Promise<StaysData> {
  return fetchData<StaysData>(staysData, '/api/stays')
}

/** GET /api/stays/:id 获取民宿详情页数据 */
export function fetchStayDetail(id: string): Promise<StayDetailData> {
  return fetchData<StayDetailData>(stayDetailData, `/api/stays/${id}`)
}

/** GET /api/stays/:id/booking 获取民宿预约页数据 */
export function fetchStayBooking(id: string): Promise<StayBookingData> {
  return fetchData<StayBookingData>(stayBookingData, `/api/stays/${id}/booking`)
}
