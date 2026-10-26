/**
 * 体验相关接口
 */
import { fetchData } from './index'
import {
  experiencesData,
  experienceDetailData,
  experienceBookingData,
  type ExperiencesData,
  type ExperienceDetailData,
  type ExperienceBookingData
} from '../data/experiences'

/** GET /api/experiences 获取体验列表页数据 */
export function fetchExperiencesData(): Promise<ExperiencesData> {
  return fetchData<ExperiencesData>(experiencesData, '/api/experiences')
}

/** GET /api/experiences/:id 获取体验详情页数据 */
export function fetchExperienceDetail(id: string): Promise<ExperienceDetailData> {
  return fetchData<ExperienceDetailData>(experienceDetailData, `/api/experiences/${id}`)
}

/** GET /api/experiences/:id/booking 获取体验预约页数据 */
export function fetchExperienceBooking(id: string): Promise<ExperienceBookingData> {
  return fetchData<ExperienceBookingData>(experienceBookingData, `/api/experiences/${id}/booking`)
}
