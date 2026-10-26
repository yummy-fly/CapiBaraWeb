/**
 * 团建套餐相关接口
 */
import { fetchData } from './index'
import {
  packagesData,
  getPackageDetail,
  getPackageBooking,
  type PackagesData,
  type PackageDetailData,
  type PackageBookingData
} from '../data/packages'

/** GET /api/packages 获取团建套餐列表页数据 */
export function fetchPackagesData(): Promise<PackagesData> {
  return fetchData<PackagesData>(packagesData, '/api/packages')
}

/** GET /api/packages/:id 获取团建套餐详情页数据 */
export function fetchPackageDetail(id?: string): Promise<PackageDetailData> {
  return fetchData<PackageDetailData>(getPackageDetail(id), `/api/packages/${id || 'slow-weekend'}`)
}

/** GET /api/packages/:id/booking 获取团建套餐预约页数据 */
export function fetchPackageBooking(id?: string): Promise<PackageBookingData> {
  return fetchData<PackageBookingData>(getPackageBooking(id), `/api/packages/${id || 'slow-weekend'}/booking`)
}
