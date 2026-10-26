/**
 * 首页模拟数据
 */

/** 图片生成辅助：AI 生成占位图 */
const IMG_BASE = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt='
const img = (prompt: string, size: string) => IMG_BASE + encodeURIComponent(prompt) + '&image_size=' + size

export interface CardItem {
  /** 详情页 id（套餐卡片使用） */
  id?: string
  /** 左上角标签，如「非遗手作」「含住宿」 */
  tag: string
  /** 分类，如「古法酿酒」 */
  category: string
  title: string
  desc: string
  meta: string
  price: string
  unit: string
  img: string
  faved: boolean
}

export interface QuickEntry {
  label: string
  icon: string
  /** 页面路径，空字符串表示演示中暂未开放 */
  path: string
}

export interface CalendarDay {
  week: string
  num: number
}

export interface AgendaEvent {
  time: string
  name: string
  meta: string
}

export interface HomeData {
  /** Hero 轮播图 */
  slides: string[]
  /** 民宿编辑排版大图 */
  stayImg: string
  /** 村里消息文案 */
  announcement: string
  quickEntries: QuickEntry[]
  experiences: CardItem[]
  packages: CardItem[]
  calendarDays: CalendarDay[]
  agendaEvents: AgendaEvent[]
}

export const homeData: HomeData = {
  slides: [
    img('misty Chinese countryside village at golden sunrise, terraced rice fields, winding river, white-walled rural houses among green mountains, serene pastoral morning atmosphere, landscape photography', 'landscape_16_9'),
    img('traditional Chinese village courtyard, artisan steaming fresh rice cakes, rustic wooden tools, warm morning light, green hills behind, documentary photography', 'landscape_16_9'),
    img('lush green terraced tea fields in Zhejiang mountains China, narrow footpath, soft morning fog, tranquil countryside, landscape photography', 'landscape_16_9')
  ],
  stayImg: img('cozy mountain view bedroom with large window facing green mountains, wooden bed with sage green throw, rattan rug, warm pendant lamp, natural interior design photography', 'landscape_16_9'),
  announcement: '秋日乡村体验开放预约，亲子与团建请提前选择场次。',
  quickEntries: [
    { label: '民宿预订', icon: 'bed', path: '/pages/stays/stays' },
    { label: '体验活动', icon: 'sprout', path: '/pages/experiences/experiences' },
    { label: '名厨私宴', icon: 'chef', path: '/pages/chefs/chefs' },
    { label: '团建套餐', icon: 'users', path: '/pages/packages/packages' },
    { label: '村庄介绍', icon: 'pin', path: '/pages/village/village' }
  ],
  experiences: [
    {
      id: 'wine-craft',
      tag: '非遗手作',
      category: '古法酿酒',
      title: '古法酿酒体验',
      desc: '酿一坛米酒，留一份山野记忆',
      meta: '约90分钟 · 6岁以上',
      price: '128',
      unit: '人',
      img: img('artisan hands working with large clay wine fermentation jars in traditional Chinese craft workshop, warm earthy tones, documentary photography', 'landscape_4_3'),
      faved: false
    },
    {
      id: 'rice-craft',
      tag: '亲子推荐',
      category: '打年糕',
      title: '乡村打年糕',
      desc: '热气腾腾的，是乡村的人情味',
      meta: '约60分钟 · 3岁以上',
      price: '98',
      unit: '人',
      img: img('parent and child pounding steamed rice with wooden mallet in Chinese village courtyard, steam rising, joyful moment, documentary photography', 'landscape_4_3'),
      faved: false
    }
  ],
  packages: [
    {
      id: 'slow-weekend',
      tag: '含住宿',
      category: '住宿+体验',
      title: '山野慢生活 · 双人两天一夜',
      desc: '住进山里，体验乡村的日常',
      meta: '2天1夜 · 2–4人',
      price: '998',
      unit: '套',
      img: img('golden rice terraces and river valley in Chinese countryside, traditional village, warm autumn evening light, landscape photography', 'landscape_4_3'),
      faved: false
    },
    {
      id: 'team-retreat',
      tag: '住宿+双体验',
      category: '企业团建',
      title: '一起去村里 · 企业团建',
      desc: '离开办公室，让默契自然发生',
      meta: '2天1夜 · 20–40人',
      price: '12,800',
      unit: '20人档',
      img: img('rustic farm to table dining table outdoors in Chinese village garden, fresh vegetable dishes on linen cloth, warm daylight, food photography', 'landscape_4_3'),
      faved: false
    }
  ],
  calendarDays: (() => {
    const weeks = ['日', '一', '二', '三', '四', '五', '六']
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() + i)
      return { week: weeks[d.getDay()], num: d.getDate() }
    })
  })(),
  agendaEvents: [
    { time: '09:30–11:00', name: '古法酿酒体验', meta: '余16位 · ¥128/人' },
    { time: '14:00–15:30', name: '乡村打年糕', meta: '余24位 · ¥98/人' }
  ]
}
