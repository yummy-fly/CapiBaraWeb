<template>
  <view class="page">
    <!-- 顶部导航 -->
    <view class="header">
      <view class="header-inner wrap">
        <view class="brand">
          <Icon name="logo" :size="37" color="#3d4534" />
          <view class="brand-text">
            <text class="brand-name">卡皮巴拉自治村</text>
            <text class="brand-en">CAPYBARA VILLAGE</text>
          </view>
        </view>
        <view class="header-actions">
          <view class="icon-button" @tap="goMessages">
            <Icon name="bell" :size="20" color="#3d4534" />
            <view class="badge-dot" />
          </view>
          <GlobalNavMenu />
        </view>
      </view>
    </view>

    <view class="detail-page">
      <view class="wrap">
        <!-- 返回 -->
        <view class="back-link" @tap="goBack">
          <Icon name="chevleft" :size="13" color="#3d4534" />
          <text>返回名厨私宴</text>
        </view>

        <!-- 标题区 -->
        <view class="detail-heading">
          <text class="eyebrow">{{ detail.category }} / CAPYBARA VILLAGE</text>
          <text class="detail-title">{{ detail.title }}</text>
          <text class="detail-desc">{{ detail.desc }}</text>
          <view class="detail-tools">
            <view class="tool-button" :class="{ active: faved }" @tap="toggleFav">
              <Icon :name="faved ? 'heart-filled' : 'heart'" :size="14" :color="faved ? '#5a7150' : '#3d4534'" />
              <text>{{ faved ? '已收藏' : '收藏' }}</text>
            </view>
            <view class="tool-button" @tap="onShare">
              <Icon name="share" :size="14" color="#3d4534" />
              <text>分享</text>
            </view>
          </view>
        </view>

        <!-- 大图 -->
        <view class="detail-image">
          <image :src="detail.img" mode="aspectFill" />
          <text class="image-label">{{ detail.imageLabel }}</text>
        </view>

        <!-- 亮点 -->
        <view class="detail-highlights">
          <view v-for="h in detail.highlights" :key="h.text" class="highlight-item">
            <Icon :name="h.icon" :size="15" color="#3d4534" />
            <text>{{ h.text }}</text>
          </view>
        </view>

        <!-- 认识这位驻村民厨 -->
        <view class="detail-copy">
          <text class="h2">认识这位驻村民厨</text>
          <text class="copy-text">{{ detail.about }}</text>
          <view class="chef-card">
            <view class="chef-avatar">
              <text>{{ detail.chefCard.avatarChar }}</text>
            </view>
            <view class="chef-info">
              <text class="chef-name">{{ detail.chefCard.name }}</text>
              <text class="chef-role">{{ detail.chefCard.role }}</text>
              <text class="chef-bio">{{ detail.chefCard.bio }}</text>
            </view>
          </view>
        </view>

        <!-- 包含内容 -->
        <view class="detail-copy">
          <text class="h2">这一份预约，包含什么</text>
          <view class="includes-list">
            <view v-for="inc in detail.includes" :key="inc" class="include-item">
              <Icon name="check" :size="13" color="#3d4534" />
              <text>{{ inc }}</text>
            </view>
          </view>
        </view>

        <!-- 预约须知 -->
        <view class="detail-copy">
          <text class="h2">预约须知</text>
          <text v-for="(n, i) in detail.notices" :key="i" class="copy-text">{{ n }}</text>
        </view>

        <!-- 退改说明 -->
        <view class="detail-copy">
          <text class="h2">退改说明</text>
          <text class="copy-text">{{ detail.refund }}</text>
        </view>

        <!-- 组合套餐 -->
        <view class="combo-link" @tap="onCombo">
          <text>{{ detail.comboText }}</text>
          <Icon name="arrowright" :size="13" color="#3d4534" />
        </view>
      </view>

      <!-- 预约卡 -->
      <view class="wrap">
        <view class="reservation-card">
          <text class="eyebrow">{{ detail.priceCard.eyebrow }}</text>
          <view class="price-line">
            <text class="price-symbol">¥</text>
            <text class="price-num">{{ detail.priceCard.price }}</text>
            <text class="price-unit">{{ detail.priceCard.priceUnit }}</text>
          </view>
          <text class="price-note">{{ detail.priceCard.priceNote }}</text>
          <view class="price-tags">
            <text v-for="t in detail.priceCard.tags" :key="t" class="price-tag">{{ t }}</text>
          </view>

          <!-- 日历 -->
          <view class="calendar">
            <view class="calendar-head">
              <text class="calendar-title">{{ viewYear }}年 {{ viewMonth }}月</text>
              <view class="calendar-nav">
                <view class="nav-btn" @tap="prevMonth">
                  <Icon name="chevleft" :size="13" color="#3d4534" />
                </view>
                <view class="nav-btn" @tap="nextMonth">
                  <Icon name="chevright" :size="13" color="#3d4534" />
                </view>
              </view>
            </view>
            <view class="calendar-grid">
              <text v-for="w in weekHeads" :key="w" class="grid-week">{{ w }}</text>
              <view
                v-for="(cell, i) in calendarCells"
                :key="i"
                class="grid-cell"
                :class="{
                  empty: !cell.day,
                  disabled: cell.disabled,
                  selected: cell.dateStr === selectedDate
                }"
                @tap="onSelectDate(cell)"
              >
                <template v-if="cell.day">
                  <text class="cell-day">{{ cell.day }}</text>
                  <text class="cell-label">{{ cell.label }}</text>
                </template>
              </view>
            </view>
          </view>

          <!-- 已选信息 -->
          <view class="selected-info">
            <text class="selected-text">已选 {{ selectedText }}</text>
            <text class="selected-tip">具体时段在下一步选择</text>
          </view>

          <!-- 预约按钮 -->
          <view class="book-button" @tap="onBook">
            <text>{{ detail.priceCard.buttonText }}</text>
            <Icon name="arrowright" :size="14" color="#ffffff" />
          </view>
          <text class="book-footnote">{{ detail.priceCard.footnote }}</text>
        </view>
      </view>
    </view>

    <!-- 页脚 -->
    <view class="site-footer">
      <view class="footer-inner wrap">
        <view class="brand">
          <Icon name="logo" :size="37" color="#3d4534" />
          <view class="brand-text">
            <text class="brand-name">卡皮巴拉自治村</text>
            <text class="brand-en">CAPYBARA VILLAGE</text>
          </view>
        </view>
        <text class="footer-slogan">在山与田之间，找到生活本来的节奏。</text>
        <view class="footer-links">
          <text>村庄介绍</text>
          <text>我的预约</text>
          <text>运营后台</text>
          <text>联系村里</text>
        </view>
      </view>
      <view class="footer-bottom wrap">
        <text>丽水卡皮巴拉健康科技有限公司 × 杭州咏创科技集团有限公司</text>
        <text>DEMO · 2026</text>
      </view>
    </view>

    <!-- 底部导航 -->
    <TabBar />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import Icon from '@/components/Icon.vue'
import GlobalNavMenu from '@/components/GlobalNavMenu.vue'
import TabBar from '@/components/TabBar.vue'
import { fetchChefDetail } from '@/api/chefs'
import { chefDetailData, type ChefDetailData } from '@/data/chefs'

/* ---------- 页面数据 ---------- */
const detail = ref<ChefDetailData>(chefDetailData)
const faved = ref(false)

onLoad((options) => {
  const o = (options || {}) as Record<string, string>
  if (o.id) {
    fetchChefDetail(o.id).then((d) => {
      detail.value = d
    })
  }
  // 从列表/首页带入的日期作为默认选中
  const inDate = o.checkin || o.date
  if (inDate && /^\d{4}-\d{2}-\d{2}$/.test(inDate) && inDate >= fmtDate(new Date())) {
    selectedDate.value = inDate
  }
})

/* ---------- 收藏 / 分享 / 组合套餐 / 预约 ---------- */
function toggleFav() {
  faved.value = !faved.value
  uni.showToast({ title: faved.value ? '已加入收藏' : '已取消收藏', icon: 'none' })
}
function goBack() {
  uni.navigateBack({ fail: () => uni.reLaunch({ url: '/pages/chefs/chefs' }) })
}
function onShare() {
  uni.showToast({ title: '演示：分享功能即将开放', icon: 'none' })
}
function onCombo() {
  uni.showToast({ title: '演示：组合套餐即将开放', icon: 'none' })
}
function onBook() {
  if (!selectedDate.value) {
    uni.showToast({ title: '请先选择私宴日期', icon: 'none' })
    return
  }
  uni.navigateTo({ url: `/pages/chefs/book?id=${detail.value.id}&date=${selectedDate.value}` })
}

/* ---------- 日历 ---------- */
const pad = (n: number) => String(n).padStart(2, '0')
const fmtDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const todayStr = fmtDate(new Date())
const weekHeads = ['日', '一', '二', '三', '四', '五', '六']

const viewYear = ref(new Date().getFullYear())
const viewMonth = ref(new Date().getMonth() + 1)
const selectedDate = ref(fmtDate(new Date(Date.now() + 2 * 86400000)))

/** 是否可预约（非过去、非约满） */
function isBookable(dateStr: string): boolean {
  if (dateStr < todayStr) return false
  return !detail.value.priceCard.closedDates.includes(dateStr)
}

interface CalendarCell {
  day: number
  dateStr: string
  disabled: boolean
  label: string
}

const calendarCells = computed<CalendarCell[]>(() => {
  const y = viewYear.value
  const m = viewMonth.value
  const firstDay = new Date(y, m - 1, 1).getDay()
  const daysInMonth = new Date(y, m, 0).getDate()
  const cells: CalendarCell[] = []
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: 0, dateStr: '', disabled: true, label: '' })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${y}-${pad(m)}-${pad(d)}`
    let label: string
    if (dateStr < todayStr) label = '已过期'
    else label = '可预约'
    cells.push({ day: d, dateStr, disabled: !isBookable(dateStr), label })
  }
  return cells
})

function prevMonth() {
  if (viewMonth.value === 1) {
    viewYear.value--
    viewMonth.value = 12
  } else {
    viewMonth.value--
  }
}
function nextMonth() {
  if (viewMonth.value === 12) {
    viewYear.value++
    viewMonth.value = 1
  } else {
    viewMonth.value++
  }
}
function onSelectDate(cell: CalendarCell) {
  if (!cell.day || cell.disabled) return
  selectedDate.value = cell.dateStr
}

const selectedText = computed(() => {
  const [y, m, d] = selectedDate.value.split('-')
  return `${Number(m)}月${Number(d)}日`
})
function goMessages() {
  uni.navigateTo({ url: '/pages/messages/messages' })
}
</script>

<style lang="scss" scoped>
$green: #5a7150;
$ink: #3d4534;
$ink-soft: #6f7663;
$ink-muted: #8b9280;
$cream: #f8f8f2;
$cream-card: #eef0e5;
$line: #e5e8d6;
$serif: 'Noto Serif SC', 'Songti SC', 'STSong', 'SimSun', serif;

.page {
  min-height: 100vh;
  background: $cream;
  padding-bottom: 59px;
}
.wrap {
  width: calc(100% - 36px);
  margin: 0 auto;
}

/* ---------- Header ---------- */
.header {
  background: #ffffff;
  position: relative;
  z-index: 10;
}
.header-inner {
  min-height: 68px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.brand {
  display: flex;
  align-items: center;
  gap: 6px;
}
.brand-text {
  display: flex;
  flex-direction: column;
}
.brand-name {
  font-size: 15px;
  font-weight: 700;
  color: $ink;
  letter-spacing: 0.035em;
  font-family: $serif;
}
.brand-en {
  font-size: 6px;
  letter-spacing: 0.2em;
  color: $ink-muted;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 5px;
}
.icon-button {
  position: relative;
  padding: 7px;
}
.badge-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d9814e;
}

/* ---------- 详情页 ---------- */
.detail-page {
  padding-top: 20px;
  padding-bottom: 40px;
}
.back-link {
  margin-bottom: 18px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: $ink-soft;
}
.detail-heading {
  margin-bottom: 21px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.eyebrow {
  margin-bottom: 8px;
  font-size: 8px;
  letter-spacing: 0.15em;
  color: $ink-muted;
}
.detail-title {
  font-size: 28px;
  line-height: 1.4;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
}
.detail-desc {
  margin-top: 8px;
  font-size: 11px;
  color: $ink-soft;
}
.detail-tools {
  margin-top: 17px;
  display: flex;
  gap: 9px;
}
.tool-button {
  min-height: 34px;
  padding: 6px 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 7px;
  border: 1px solid $line;
  background: #ffffff;
  font-size: 10px;
  color: $ink;
}
.tool-button.active {
  background: $cream-card;
  border-color: #dfe5cf;
}

/* 大图 */
.detail-image {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}
.detail-image image {
  width: 100%;
  height: 260px;
  display: block;
}
.detail-image .image-label {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 3px 7px;
  border-radius: 4px;
  background: rgba(30, 38, 22, 0.55);
  font-size: 7px;
  color: #ffffff;
}

/* 亮点 */
.detail-highlights {
  margin-top: 18px;
  padding-bottom: 20px;
  border-bottom: 1px solid $line;
  display: flex;
  flex-wrap: wrap;
}
.highlight-item {
  width: 50%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  font-size: 10px;
  color: $ink;
}

/* 文案区块 */
.detail-copy {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
}
.h2 {
  margin-bottom: 14px;
  font-size: 21px;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
  line-height: 1.4;
}
.copy-text {
  display: block;
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 2;
  color: $ink-soft;
}

/* 厨师介绍卡 */
.chef-card {
  margin-top: 4px;
  padding: 20px;
  border-radius: 9px;
  background: $cream-card;
  display: flex;
  gap: 15px;
  align-items: flex-start;
}
.chef-avatar {
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #dfe5cf;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-family: $serif;
  color: $ink;
}
.chef-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.chef-name {
  font-size: 13px;
  font-weight: 700;
  color: $ink;
  font-family: $serif;
}
.chef-role {
  font-size: 8px;
  color: $ink-muted;
}
.chef-bio {
  margin-top: 3px;
  font-size: 9px;
  line-height: 1.9;
  color: $ink-soft;
}

/* 包含内容 */
.includes-list {
  padding: 20px;
  border-radius: 9px;
  background: $cream-card;
  display: flex;
  flex-wrap: wrap;
}
.include-item {
  width: 50%;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 0;
  font-size: 10px;
  color: $ink;
}

/* 组合套餐 */
.combo-link {
  margin-top: 25px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  font-weight: 700;
  color: $ink;
}

/* ---------- 预约卡 ---------- */
.reservation-card {
  margin-top: 27px;
  padding: 23px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
  display: flex;
  flex-direction: column;
}
.price-line {
  margin-top: 15px;
  display: flex;
  align-items: baseline;
  gap: 3px;
  color: $ink;
}
.price-symbol {
  font-size: 13px;
  font-weight: 700;
}
.price-num {
  font-size: 30px;
  font-family: $serif;
  font-weight: 700;
}
.price-unit {
  font-size: 10px;
  color: $ink-muted;
}
.price-note {
  margin-top: 8px;
  font-size: 9px;
  color: $ink-soft;
}
.price-tags {
  margin-top: 13px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.price-tag {
  padding: 4px 9px;
  border-radius: 5px;
  background: $cream-card;
  font-size: 8px;
  color: $ink-soft;
}

/* 日历 */
.calendar {
  margin-top: 22px;
}
.calendar-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.calendar-title {
  font-size: 12px;
  font-weight: 700;
  color: $ink;
}
.calendar-nav {
  display: flex;
  gap: 14px;
}
.nav-btn {
  padding: 4px;
}
.calendar-grid {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
}
.grid-week {
  width: 14.28%;
  padding: 6px 0;
  text-align: center;
  font-size: 9px;
  color: $ink-muted;
}
.grid-cell {
  width: 14.28%;
  min-height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1px;
  border-radius: 8px;
}
.grid-cell.empty {
  min-height: 0;
}
.cell-day {
  font-size: 12px;
  font-weight: 600;
  color: $ink;
}
.cell-label {
  font-size: 8px;
  color: $ink-muted;
}
.grid-cell.disabled .cell-day,
.grid-cell.disabled .cell-label {
  color: #c3c8b6;
}
.grid-cell.selected {
  background: $green;
}
.grid-cell.selected .cell-day {
  color: #ffffff;
}
.grid-cell.selected .cell-label {
  color: rgba(255, 255, 255, 0.85);
}

/* 已选信息 */
.selected-info {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f2e6;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.selected-text {
  font-size: 11px;
  font-weight: 700;
  color: $ink;
}
.selected-tip {
  font-size: 9px;
  color: $ink-muted;
}

/* 预约按钮 */
.book-button {
  margin-top: 18px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  background: $green;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
}
.book-footnote {
  margin-top: 11px;
  font-size: 8px;
  color: $ink-muted;
  text-align: center;
}

/* 页脚 */
.site-footer {
  background: #eeefe5;
  border-top: 1px solid #e4e7d8;
  padding-top: 28px;
}
.footer-inner {
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
}
.footer-slogan {
  margin-left: 43px;
  font-size: 9px;
  color: $ink-soft;
}
.footer-links {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  font-size: 9px;
  color: $ink-soft;
}
.footer-bottom {
  padding: 14px 0 25px;
  border-top: 1px solid #dfe5cf;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 7px;
  line-height: 1.8;
  color: $ink-muted;
}
</style>
