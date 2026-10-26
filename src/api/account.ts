/**
 * 个人中心 / 收藏相关接口
 */
import { fetchData } from './index'
import { accountData, favoritesData, type AccountData, type FavoritesData } from '../data/account'

/** GET /api/account 获取个人中心页数据 */
export function fetchAccountData(): Promise<AccountData> {
  return fetchData<AccountData>(accountData, '/api/account')
}

/** GET /api/favorites 获取收藏页数据 */
export function fetchFavoritesData(): Promise<FavoritesData> {
  return fetchData<FavoritesData>(favoritesData, '/api/favorites')
}
