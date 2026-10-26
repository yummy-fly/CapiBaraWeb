/**
 * 名厨私宴列表页模拟数据
 */

const IMG_BASE = 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt='
const img = (prompt: string, size: string) => IMG_BASE + encodeURIComponent(prompt) + '&image_size=' + size

export interface ChefItem {
  id: string
  /** 图片左上角标签，如「当季食材」 */
  tag: string
  /** 分类（与筛选 chips 对应）：浙南乡土菜 / 田园创意菜 */
  category: string
  title: string
  desc: string
  /** 形式与起订，如「私宴 / 长桌宴 · 6人起订」 */
  meta: string
  price: string
  /** 价格单位，如「/ 人起」「/ 人」 */
  priceUnit: string
  img: string
  faved: boolean
}

export interface ChefsData {
  introDesc: string
  filters: string[]
  chefs: ChefItem[]
  noticeTitle: string
  noticeDesc: string
}

export const chefsData: ChefsData = {
  introDesc: '当季食材与驻村民厨，把一方乡土做成一桌美好。',
  filters: ['全部', '浙南乡土菜', '田园创意菜'],
  chefs: [
    {
      id: 'chef-lin',
      tag: '当季食材',
      category: '浙南乡土菜',
      title: '林师傅 · 山野私宴',
      desc: '把山里最新鲜的食材，端上餐桌',
      meta: '私宴 / 长桌宴 · 6人起订',
      price: '268',
      priceUnit: '/ 人起',
      img: img('rustic long table banquet with many shared Chinese dishes in mountain village courtyard, green garden and terrace, farm to table dining, documentary photography', 'landscape_4_3'),
      faved: false
    },
    {
      id: 'chef-chen',
      tag: '固定套餐',
      category: '田园创意菜',
      title: '陈师傅 · 田园家宴',
      desc: '简单好食材，一桌好味道',
      meta: '固定家宴 / 团建餐 · 6人起订',
      price: '198',
      priceUnit: '/ 人',
      img: img('cozy countryside home style dinner table with seasonal vegetable dishes and grilled fish, warm evening light in village house, documentary photography', 'landscape_4_3'),
      faved: false
    }
  ],
  noticeTitle: '选个好日子，来村里做客',
  noticeDesc: '所有图片、人物、价格均为演示；预约后可在订单中心体验模拟支付与核销。'
}

/* ================= 私宴详情页 ================= */

export interface ChefDetailData {
  id: string
  /** 标题上方分类，如「浙南乡土菜」 */
  category: string
  title: string
  desc: string
  img: string
  imageLabel: string
  highlights: { icon: string; text: string }[]
  /** 认识这位驻村民厨 */
  about: string
  /** 厨师介绍卡 */
  chefCard: {
    avatarChar: string
    name: string
    role: string
    bio: string
  }
  includes: string[]
  notices: string[]
  refund: string
  comboText: string
  priceCard: {
    eyebrow: string
    price: string
    priceUnit: string
    priceNote: string
    tags: string[]
    /** 已约满的日期（yyyy-MM-dd） */
    closedDates: string[]
    buttonText: string
    footnote: string
  }
}

export const chefDetailData: ChefDetailData = {
  id: 'chef-lin',
  category: '浙南乡土菜',
  title: '林师傅 · 山野私宴',
  desc: '把山里最新鲜的食材，端上餐桌',
  img: img('rustic long table banquet outdoors in mountain village garden, wooden table with many shared Chinese dishes, pergola and mountain view, chef preparing food, documentary photography', 'landscape_16_9'),
  imageLabel: '概念图片 · 非实拍',
  highlights: [
    { icon: 'clock', text: '私宴 / 长桌宴 · 6人起订' },
    { icon: 'users', text: '6人起订' },
    { icon: 'pin', text: '自治村 · 演示场地' }
  ],
  about: '以乡土食材为灵感，呈现山野与季节的味道。代表菜品：山泉鱼、土灶焖肉、时令野蔬。菜单可根据忌口及团队需求商议。此厨师资料为虚构演示。',
  chefCard: {
    avatarChar: '林',
    name: '林师傅',
    role: '驻村民厨 · 演示人物',
    bio: '演示履历：深耕地方菜20年，从乡村厨房到驻村私宴，把家乡的味道讲给每一位客人。'
  },
  includes: ['个性化菜单沟通', '当季乡土食材', '私宴烹饪服务', '用餐布置'],
  notices: ['请提前15分钟到达；儿童需成人陪同，手作操作遵守导师指引；如遇天气影响由运营联系调整。'],
  refund: '演示规则：体验开始 / 入住时间前24小时可免费取消；不足24小时请联系运营协商。',
  comboText: '想把住宿与体验一起安排？看看组合套餐',
  priceCard: {
    eyebrow: 'MAKE A GOOD DAY',
    price: '268',
    priceUnit: '/ 人起',
    priceNote: '参考价 · 提交需求后人工报价，不直接付款',
    tags: ['当季食材', '预约报价', '乡土风味'],
    closedDates: [],
    buttonText: '提交私宴需求',
    footnote: '此为模拟预约，不发生真实扣款。'
  }
}

/* ================= 私宴预约页 ================= */

export interface ChefSession {
  /** 场次时间，如「11:30-13:30」 */
  time: string
  /** 剩余席位 */
  left: number
  /** 每人价格 */
  price: string
}

export interface ChefBookingData {
  eyebrow: string
  title: string
  steps: string[]
  /** 01 预约时间卡 */
  dateLabel: string
  sessionLabel: string
  /** 默认演示日期（yyyy-MM-dd） */
  defaultDate: string
  sessions: ChefSession[]
  /** 02 参与信息卡 */
  minGuests: number
  maxGuests: number
  guestNote: string
  contactLabel: string
  phoneLabel: string
  namePlaceholder: string
  phonePlaceholder: string
  orgLabel: string
  orgPlaceholder: string
  remarkLabel: string
  remarkPlaceholder: string
  /** 03 预约须知卡 */
  bookingNotices: string[]
  agreeText: string
  /** 摘要卡 */
  summaryEyebrow: string
  totalLabel: string
  totalNote: string
  submitText: string
  submitFootnote: string
}

export const chefBookingData: ChefBookingData = {
  eyebrow: 'PLAN YOUR COUNTRYSIDE MOMENT',
  title: '预约一桌山野私宴',
  steps: ['选择项目', '填写预约', '等待确认'],
  dateLabel: '到店日期',
  sessionLabel: '选择时段',
  defaultDate: '2026-10-25',
  sessions: [
    { time: '11:30-13:30', left: 30, price: '268' },
    { time: '17:30-19:30', left: 30, price: '268' }
  ],
  minGuests: 6,
  maxGuests: 30,
  guestNote: '6人起订，最多30人',
  contactLabel: '联系人',
  phoneLabel: '手机号（演示）',
  namePlaceholder: '请填写联系人姓名',
  phonePlaceholder: '请填写手机号',
  orgLabel: '公司 / 团队名称（选填）',
  orgPlaceholder: '如：山野创意工作室（演示）',
  remarkLabel: '需求备注（选填）',
  remarkPlaceholder: '团建名称、儿童情况、用餐忌口或其他需求',
  bookingNotices: [
    '演示规则：体验开始 / 入住时间前24小时可免费取消；不足24小时请联系运营协商。',
    '请提前15分钟到达；儿童需成人陪同，手作操作遵守导师指引；如遇天气影响由运营联系调整。'
  ],
  agreeText: '我已阅读预约与退改规则，知晓这是演示订单，无真实付款。',
  summaryEyebrow: 'YOUR RESERVATION',
  totalLabel: '参考总价',
  totalNote: '参考金额非最终报价，运营人工确认后沟通，不在此直接支付。',
  submitText: '提交私宴需求',
  submitFootnote: '只作流程演示 · 不产生真实消费'
}
