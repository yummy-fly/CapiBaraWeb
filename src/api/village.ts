import { fetchData } from './index'
import { villageData, type VillageData } from '../data/village'

export function fetchVillageData(): Promise<VillageData> {
  return fetchData<VillageData>(villageData, '/api/village')
}
