/**
 * 订单相关接口
 */
import { fetchData } from './index'
import { ordersData, type OrdersData } from '../data/orders'

/** GET /api/orders 获取订单页数据 */
export function fetchOrdersData(): Promise<OrdersData> {
  const localOrders = getLocalOrders()
  const localIds = new Set(localOrders.map((order) => order.id))
  return fetchData<OrdersData>(
    {
      ...ordersData,
      orders: [
        ...localOrders,
        ...ordersData.orders.filter((order) => !localIds.has(order.id))
      ]
    },
    '/api/orders'
  )
}

export function getLocalOrders(): OrdersData['orders'] {
  return uni.getStorageSync('localOrders') || []
}

export function saveLocalOrder(order: OrdersData['orders'][number]): void {
  const orders = getLocalOrders()
  uni.setStorageSync('localOrders', [order, ...orders.filter((item) => item.id !== order.id)])
}

export function updateLocalOrderStatus(id: string, status: string): void {
  const orders = getLocalOrders()
  const source = orders.find((order) => order.id === id) || ordersData.orders.find((order) => order.id === id)
  if (!source) return
  saveLocalOrder({ ...source, status })
}

export function createLocalOrder(order: OrdersData['orders'][number]): void {
  saveLocalOrder(order)
}
