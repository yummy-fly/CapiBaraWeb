/**
 * 团建套餐列表页 / 详情页模拟数据
 */

const IMG_BASE = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt='
const img = (prompt: string, size: string) => IMG_BASE + encodeURIComponent(prompt) + '&image_size=' + size

export interface PackageItem {
  id: string
  /** 图片左上角标签，如「含住宿」 */
  tag: string
  /** 分类（与筛选 chips 对应）：住宿+体验 / 企业团建 */
  category: string
  title: string
  desc: string
  /** 天数与人数，如「2天1夜 · 2–4人」 */
  meta: string
  price: string
  /** 价格单位，如「套」「20人档」 */
  unit: string
  img: string
  faved: boolean
}

export interface PackagesData {
  eyebrow: string
  title: string
  desc: string
  filters: string[]
  packages: PackageItem[]
  noticeTitle: string
  noticeDesc: string
}

export const packagesData: PackagesData = {
  eyebrow: 'BETTER TOGETHER',
  title: '一起去村里',
  desc: '从两个人的周末，到一群人的团建，好时光一次安排。',
  filters: ['全部', '住宿+体验', '企业团建'],
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
  noticeTitle: '选个好日子，来村里做客',
  noticeDesc: '所有图片、人物与价格均为演示；套餐档期与专属行程由村里运营确认。'
}

/* ================= 团建套餐详情页 ================= */

export interface PackageItineraryDay {
  /** 如「DAY 01」 */
  day: string
  items: string[]
}

export interface PackageDetailData {
  id: string
  category: string
  title: string
  desc: string
  img: string
  imageLabel: string
  highlights: { icon: string; text: string }[]
  about: string
  includes: string[]
  itinerary: PackageItineraryDay[]
  itineraryNote: string
  notices: string[]
  refund: string
  comboText: string
  priceCard: {
    eyebrow: string
    price: string
    /** 价格单位，如「套」「20人档」 */
    unit: string
    tags: string[]
    /** 已约满的日期（yyyy-MM-dd） */
    closedDates: string[]
    buttonText: string
    footnote: string
  }
}

const sharedItinerary: PackageItineraryDay[] = [
  { day: 'DAY 01', items: ['14:00 抵达村庄，办理入住', '15:00 酿酒 / 手作体验', '18:00 乡村晚餐与自由活动'] },
  { day: 'DAY 02', items: ['08:30 田园早餐', '09:30 打年糕 / 村庄漫游', '12:00 收拾美好，轻松返程'] }
]

const sharedNotices = [
  '请提前15分钟到达；儿童需成人陪同，手作操作遵守导师指引；如遇天气影响由运营联系调整。'
]

const sharedRefund = '演示规则：体验开始 / 入住时间前24小时可免费取消；不足24小时请联系运营协商。'

const packageDetailMap: Record<string, PackageDetailData> = {
  'slow-weekend': {
    id: 'slow-weekend',
    category: '住宿+体验',
    title: '山野慢生活 · 双人两天一夜',
    desc: '住进山里，体验乡村的日常',
    img: img('aerial view of a tranquil river valley village surrounded by green mountains in Zhejiang China, golden rice fields, soft afternoon light, landscape photography', 'landscape_16_9'),
    imageLabel: '概念图片 · 非实拍',
    highlights: [
      { icon: 'clock', text: '2天1夜 · 2–4人' },
      { icon: 'users', text: '2人起订' },
      { icon: 'pin', text: '自治村 · 演示场地' }
    ],
    about: '一个不用赶路的周末。山景客房一晚、双人酿酒体验与早餐，让两天一夜成为一段真正的休息。',
    includes: ['山景大床房1间1晚', '双人古法酿酒体验', '双人早餐', '村庄漫游'],
    itinerary: sharedItinerary,
    itineraryNote: '演示行程，双人套餐不含名厨私宴与打年糕，包含内容以项目清单为准。实际场次待运营确认。',
    notices: sharedNotices,
    refund: sharedRefund,
    comboText: '想把住宿与体验一起安排？看看组合套餐',
    priceCard: {
      eyebrow: 'MAKE A GOOD DAY',
      price: '998',
      unit: '套',
      tags: ['含住宿', '酿酒体验', '早餐'],
      closedDates: [],
      buttonText: '预约这段好时光',
      footnote: '此为模拟预约，不发生真实扣款。'
    }
  },
  'team-retreat': {
    id: 'team-retreat',
    category: '企业团建',
    title: '一起去村里 · 企业团建',
    desc: '离开办公室，让默契自然发生',
    img: img('long wooden dining table set outdoors in a Chinese village garden at dusk, string lights, shared dishes, team dinner atmosphere, warm photography', 'landscape_16_9'),
    imageLabel: '概念图片 · 非实拍',
    highlights: [
      { icon: 'clock', text: '2天1夜 · 20–40人' },
      { icon: 'users', text: '20人起订' },
      { icon: 'pin', text: '自治村 · 演示场地' }
    ],
    about: '走进山野，换一种方式相处。住民宿、酿米酒、打年糕，晚上围着长桌共进晚餐，把团队的好时光留在村里。',
    includes: ['10间双人客房1晚', '20人酿酒与打年糕体验', '20人名厨长桌宴', '团建活动空间', '专属行程协调'],
    itinerary: sharedItinerary,
    itineraryNote: '演示行程，双人套餐不含名厨私宴与打年糕，包含内容以项目清单为准。实际场次待运营确认。',
    notices: sharedNotices,
    refund: sharedRefund,
    comboText: '想把住宿与体验一起安排？看看组合套餐',
    priceCard: {
      eyebrow: 'MAKE A GOOD DAY',
      price: '12,800',
      unit: '20人档',
      tags: ['住宿+双体验', '名厨长桌宴', '团队专属'],
      closedDates: [],
      buttonText: '预约这段好时光',
      footnote: '此为模拟预约，不发生真实扣款。'
    }
  }
}

/** 默认展示第一个套餐（无 id 参数时） */
export const packageDetailData: PackageDetailData = packageDetailMap['slow-weekend']

export function getPackageDetail(id?: string): PackageDetailData {
  return (id && packageDetailMap[id]) || packageDetailData
}

/* ================= 团建套餐预约页 ================= */

export interface PackageBookingData {
  eyebrow: string
  title: string
  steps: string[]
  /** 01 预约时间卡 */
  dateLabel: string
  /** 每个日期剩余库存（套） */
  stockPerDay: number
  /** 可预约日期起始（yyyy-MM-dd），之前为已过期 */
  openFrom: string
  dateNote: string
  /** 02 参与信息卡 */
  minPeople: number
  maxPeople: number
  pricePerSet: number
  /** 超出基础人数后每人加价 */
  extraPerPerson: number
  peopleNote: string
  priceTip: string
  contactLabel: string
  phoneLabel: string
  namePlaceholder: string
  phonePlaceholder: string
  companyLabel: string
  companyPlaceholder: string
  remarkLabel: string
  remarkPlaceholder: string
  /** 可选增值：山野茶歇 */
  addon: {
    title: string
    desc: string
    pricePerPerson: number
  }
  /** 03 预约须知卡 */
  bookingNotices: string[]
  agreeText: string
  /** 摘要卡 */
  summaryEyebrow: string
  submitText: string
  submitFootnote: string
}

const packageBookingMap: Record<string, PackageBookingData> = {
  'slow-weekend': {
    eyebrow: 'PLAN YOUR COUNTRYSIDE MOMENT',
    title: '选个日子，来村里做客',
    steps: ['选择项目', '填写预约', '模拟支付'],
    dateLabel: '到店日期',
    stockPerDay: 8,
    openFrom: '2026-10-24',
    dateNote: '套餐使用独立演示库存，住宿、活动与用餐时间由运营统一协调，不代表实时锁定所有子项目。',
    minPeople: 2,
    maxPeople: 4,
    pricePerSet: 998,
    extraPerPerson: 298,
    peopleNote: '2人起订，最多4人',
    priceTip: '基础2人档 ¥998，超出每人加 ¥298。',
    contactLabel: '联系人',
    phoneLabel: '手机号（演示）',
    namePlaceholder: '请填写联系人姓名',
    phonePlaceholder: '请填写手机号',
    companyLabel: '公司 / 团队名称（选填）',
    companyPlaceholder: '如：山野创意工作室（演示）',
    remarkLabel: '需求备注（选填）',
    remarkPlaceholder: '团建名称、儿童情况、用餐忌口或其他需求',
    addon: {
      title: '增加山野茶歇',
      desc: '季节水果、乡村点心',
      pricePerPerson: 60
    },
    bookingNotices: [
      '演示规则：体验开始 / 入住时间前24小时可免费取消；不足24小时请联系运营协商。',
      '请提前15分钟到达；儿童需成人陪同，手作操作遵守导师指引；如遇天气影响由运营联系调整。'
    ],
    agreeText: '我已阅读预约与退改规则，知晓这是演示订单，无真实付款。',
    summaryEyebrow: 'YOUR RESERVATION',
    submitText: '提交演示预约',
    submitFootnote: '只作流程展示 · 不产生真实消费'
  },
  'team-retreat': {
    eyebrow: 'PLAN YOUR COUNTRYSIDE MOMENT',
    title: '选个日子，来村里做客',
    steps: ['选择项目', '填写预约', '模拟支付'],
    dateLabel: '到店日期',
    stockPerDay: 3,
    openFrom: '2026-10-24',
    dateNote: '套餐使用独立演示库存，住宿、活动与用餐时间由运营统一协调，不代表实时锁定所有子项目。',
    minPeople: 20,
    maxPeople: 40,
    pricePerSet: 12800,
    extraPerPerson: 320,
    peopleNote: '20人起订，最多40人',
    priceTip: '基础20人档 ¥12,800，超出每人加 ¥320。',
    contactLabel: '联系人',
    phoneLabel: '手机号（演示）',
    namePlaceholder: '请填写联系人姓名',
    phonePlaceholder: '请填写手机号',
    companyLabel: '公司 / 团队名称（选填）',
    companyPlaceholder: '如：山野创意工作室（演示）',
    remarkLabel: '需求备注（选填）',
    remarkPlaceholder: '团建名称、儿童情况、用餐忌口或其他需求',
    addon: {
      title: '增加山野茶歇',
      desc: '季节水果、乡村点心',
      pricePerPerson: 60
    },
    bookingNotices: [
      '演示规则：体验开始 / 入住时间前24小时可免费取消；不足24小时请联系运营协商。',
      '请提前15分钟到达；儿童需成人陪同，手作操作遵守导师指引；如遇天气影响由运营联系调整。'
    ],
    agreeText: '我已阅读预约与退改规则，知晓这是演示订单，无真实付款。',
    summaryEyebrow: 'YOUR RESERVATION',
    submitText: '提交演示预约',
    submitFootnote: '只作流程展示 · 不产生真实消费'
  }
}

/** 默认预约页数据（无 id 参数时） */
export const packageBookingData: PackageBookingData = packageBookingMap['slow-weekend']

export function getPackageBooking(id?: string): PackageBookingData {
  return (id && packageBookingMap[id]) || packageBookingData
}
