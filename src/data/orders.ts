/**
 * 订单页模拟数据
 */

const IMG_BASE = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt='
const img = (prompt: string, size: string) => IMG_BASE + encodeURIComponent(prompt) + '&image_size=' + size

export interface OrderItem {
  /** 订单号 */
  id: string
  /** 业务类型，如「山野民宿」「乡村体验」「名厨私宴」 */
  category: string
  title: string
  /** 日期时间，如「10月25日 — 10月26日 · 14:00后入住」 */
  dateText: string
  /** 人数与联系人，如「2人 · 小林（演示）」 */
  peopleText: string
  price: string
  /** 价格前缀，如私宴的「参考」 */
  pricePrefix?: string
  /** 订单状态：待支付 / 待确认 / 待使用 / 已完成 / 已取消 / 已退款 */
  status: string
  img: string
}

export interface OrdersData {
  eyebrow: string
  title: string
  desc: string
  /** 状态筛选 chips，第一项为「全部订单」 */
  filters: string[]
  orders: OrderItem[]
  noticeText: string
}

export const ordersData: OrdersData = {
  eyebrow: 'YOUR COUNTRYSIDE MOMENTS',
  title: '我的山野预约',
  desc: '每一段好时光，都在这里等你出发。',
  filters: ['全部订单', '待支付', '待确认', '待使用', '已完成', '已取消', '已退款'],
  orders: [
    {
      id: 'DEMO1002',
      category: '山野民宿',
      title: '山景 · 大床房',
      dateText: '10月25日 — 10月26日 · 14:00后入住',
      peopleText: '2人 · 小林（演示）',
      price: '580',
      status: '待支付',
      img: img('cozy mountain view bedroom with large window facing green mountains, wooden bed with sage green throw, rattan rug, warm morning light, natural interior design photography', 'square')
    },
    {
      id: 'DEMO1005',
      category: '山野民宿',
      title: '山景 · 大床房',
      dateText: '10月24日 — 11月1日 · 14:00后入住',
      peopleText: '2人 · 小林（演示）',
      price: '4,940',
      status: '已退款',
      img: img('mountain view guesthouse bedroom at dusk with soft lamp light, wooden bed and linen bedding, window showing dark green hills, warm natural interior photography', 'square')
    },
    {
      id: 'DEMO1009',
      category: '名厨私宴',
      title: '林师傅 · 山野私宴',
      dateText: '10月28日 · 11:30–13:30',
      peopleText: '6人 · 小林（演示）',
      price: '1,608',
      pricePrefix: '参考',
      status: '待确认',
      img: img('rustic long table banquet with seasonal Chinese dishes in a mountain village courtyard, natural daylight, documentary photography', 'square')
    },
    {
      id: 'DEMO1001',
      category: '乡村体验',
      title: '乡村打年糕',
      dateText: '10月26日 · 09:30–11:00',
      peopleText: '3人 · 小林（演示）',
      price: '294',
      status: '待使用',
      img: img('parent and child pounding steamed rice with wooden mallet in Chinese village courtyard, steam rising, joyful moment, documentary photography', 'square')
    },
    {
      id: 'DEMO1003',
      category: '乡村体验',
      title: '古法酿酒体验',
      dateText: '10月22日 · 14:00–15:30',
      peopleText: '2人 · 小林（演示）',
      price: '256',
      status: '已完成',
      img: img('artisan hands working with large clay wine fermentation jars in traditional Chinese craft workshop, warm earthy tones, documentary photography', 'square')
    },
    {
      id: 'DEMO1004',
      category: '名厨私宴',
      title: '林师傅 · 山野私宴',
      dateText: '10月27日 · 17:30–19:30',
      peopleText: '8人 · 王女士（演示）',
      price: '2,144',
      pricePrefix: '参考',
      status: '已取消',
      img: img('rustic long table banquet with many shared Chinese dishes in mountain village courtyard, green garden and terrace, farm to table dining, documentary photography', 'square')
    },
    {
      id: 'DEMO1006',
      category: '山野民宿',
      title: '田园 · 亲子套房',
      dateText: '10月30日 — 11月1日 · 14:00后入住',
      peopleText: '4人 · 陈先生（演示）',
      price: '1,760',
      status: '待支付',
      img: img('bright family suite bedroom in countryside guesthouse, two beds with children bed, pastoral decor with dried flowers, garden view window, warm natural interior photography', 'square')
    },
    {
      id: 'DEMO1007',
      category: '乡村体验',
      title: '山野竹编小课堂',
      dateText: '11月2日 · 15:00–16:00',
      peopleText: '2人 · 小林（演示）',
      price: '176',
      status: '待使用',
      img: img('close up of hands weaving bamboo baskets in a Chinese village workshop, bamboo strips, warm sunlight, documentary photography', 'square')
    },
    {
      id: 'DEMO1008',
      category: '名厨私宴',
      title: '陈师傅 · 田园家宴',
      dateText: '10月18日 · 11:30–13:30',
      peopleText: '8人 · 王女士（演示）',
      price: '1,584',
      pricePrefix: '参考',
      status: '已退款',
      img: img('cozy countryside home style dinner table with seasonal vegetable dishes and grilled fish, warm evening light in village house, documentary photography', 'square')
    }
  ],
  noticeText: '订单仅保存在当前浏览器。不同设备不共享；刷新可保留，清除浏览器数据会移除演示记录。'
}
