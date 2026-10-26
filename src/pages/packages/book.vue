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

    <view class="booking-page">
      <view class="wrap">
        <!-- 返回 -->
        <view class="back-link" @tap="goBack">
          <Icon name="chevleft" :size="13" color="#3d4534" />
          <text>返回项目详情</text>
        </view>

        <!-- 标题 -->
        <view class="booking-heading">
          <text class="eyebrow">{{ booking.eyebrow }}</text>
          <text class="h1">{{ booking.title }}</text>
        </view>

        <!-- 步骤条 -->
        <view class="steps">
          <view class="step done">
            <Icon name="check" :size="12" color="#5a7150" />
            <text>1 {{ booking.steps[0] }}</text>
          </view>
          <view class="step-line" />
          <view class="step current">
            <text>2 {{ booking.steps[1] }}</text>
          </view>
          <view class="step-line" />
          <view class="step">
            <text>3 {{ booking.steps[2] }}</text>
          </view>
        </view>
      </view>

      <!-- 01 预约时间 -->
      <view class="wrap">
        <view class="panel">
          <view class="panel-head">
            <text class="panel-no">01</text>
            <text class="panel-title">预约时间</text>
          </view>

          <text class="field-label">{{ booking.dateLabel }}</text>
          <picker mode="date" :value="bookDate" :start="todayStr" @change="onDateChange">
            <view class="date-box">
              <text class="date-value">{{ formatDate(bookDate) }}</text>
              <Icon name="calendar" :size="14" color="#8b9280" />
            </view>
          </picker>

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
                  selected: cell.dateStr === bookDate
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

          <text class="date-note">{{ booking.dateNote }}</text>
        </view>
      </view>

      <!-- 02 参与信息 -->
      <view class="wrap">
        <view class="panel">
          <view class="panel-head">
            <text class="panel-no">02</text>
            <text class="panel-title">参与信息</text>
          </view>

          <view class="guest-row">
            <view class="guest-copy">
              <text class="field-label-strong">参与人数</text>
              <text class="guest-note">{{ booking.peopleNote }}</text>
            </view>
            <view class="stepper">
              <view class="step-btn" @tap="changePeople(-1)">
                <text>−</text>
              </view>
              <text class="step-num">{{ people }}</text>
              <view class="step-btn" @tap="changePeople(1)">
                <text>＋</text>
              </view>
            </view>
          </view>

          <view class="price-tip">
            <Icon name="clock" :size="13" color="#6f7663" />
            <text>{{ booking.priceTip }}</text>
          </view>

          <view class="form-row">
            <view class="form-field">
              <text class="field-label-strong">{{ booking.contactLabel }}</text>
              <input class="form-input" v-model="name" :placeholder="booking.namePlaceholder" placeholder-class="input-ph" />
            </view>
            <view class="form-field">
              <text class="field-label-strong">{{ booking.phoneLabel }}</text>
              <input class="form-input" v-model="phone" type="number" :placeholder="booking.phonePlaceholder" placeholder-class="input-ph" />
            </view>
          </view>

          <view class="field-block">
            <text class="field-label-strong">{{ booking.companyLabel }}</text>
            <input class="form-input" v-model="company" :placeholder="booking.companyPlaceholder" placeholder-class="input-ph" />
          </view>

          <view class="field-block">
            <text class="field-label-strong">{{ booking.remarkLabel }}</text>
            <textarea
              class="form-textarea"
              v-model="remark"
              :placeholder="booking.remarkPlaceholder"
              placeholder-class="input-ph"
              :maxlength="200"
            />
          </view>

          <!-- 增值项 -->
          <view class="addon" :class="{ active: withTea }" @tap="withTea = !withTea">
            <view class="checkbox" :class="{ checked: withTea }">
              <Icon v-if="withTea" name="check" :size="11" color="#ffffff" />
            </view>
            <view class="addon-copy">
              <text class="addon-title">{{ booking.addon.title }}</text>
              <text class="addon-desc">{{ booking.addon.desc }} · ¥{{ booking.addon.pricePerPerson }} / 人</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 03 预约须知 -->
      <view class="wrap">
        <view class="panel">
          <view class="panel-head">
            <text class="panel-no">03</text>
            <text class="panel-title">预约须知</text>
          </view>
          <text v-for="(n, i) in booking.bookingNotices" :key="i" class="notice-text">{{ n }}</text>
          <view class="agree-row" @tap="agreed = !agreed">
            <view class="checkbox" :class="{ checked: agreed }">
              <Icon v-if="agreed" name="check" :size="11" color="#ffffff" />
            </view>
            <text class="agree-text">{{ booking.agreeText }}</text>
          </view>
        </view>
      </view>

      <!-- 摘要卡 -->
      <view class="wrap">
        <view class="summary-card">
          <view class="summary-image">
            <image :src="detail.img" mode="aspectFill" />
          </view>
          <view class="summary-body">
            <text class="eyebrow">{{ booking.summaryEyebrow }}</text>
            <text class="summary-title">{{ detail.title }}</text>
            <text class="summary-specs">{{ detail.highlights[0]?.text }}</text>
            <view class="summary-lines">
              <view class="line">
                <text class="line-label">日期</text>
                <text class="line-value">{{ dateText }}</text>
              </view>
              <view class="line">
                <text class="line-label">时段</text>
                <text class="line-value">运营协调</text>
              </view>
              <view class="line">
                <text class="line-label">人数</text>
                <text class="line-value">{{ people }}人</text>
              </view>
              <view class="line">
                <text class="line-label">基础价格</text>
                <text class="line-value">¥{{ booking.pricePerSet }} / 套</text>
              </view>
            </view>
            <view class="total-line">
              <text class="total-label">演示应付</text>
              <view class="total-price">
                <text class="total-symbol">¥</text>
                <text class="total-num">{{ totalPrice }}</text>
              </view>
            </view>
            <view class="submit-button" @tap="onSubmit">
              <text>{{ booking.submitText }}</text>
              <Icon name="arrowright" :size="14" color="#ffffff" />
            </view>
            <view class="submit-footnote">
              <Icon name="shield" :size="12" color="#8b9280" />
              <text>{{ booking.submitFootnote }}</text>
            </view>
          </view>
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
import { fetchPackageDetail, fetchPackageBooking } from '@/api/packages'
import {
  packageBookingData,
  getPackageDetail,
  type PackageBookingData,
  type PackageDetailData
} from '@/data/packages'

/* ---------- 页面数据 ---------- */
const booking = ref<PackageBookingData>(packageBookingData)
const detail = ref<PackageDetailData>(getPackageDetail())
const packageId = ref('slow-weekend')

const pad = (n: number) => String(n).padStart(2, '0')
const fmtDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const todayStr = fmtDate(new Date())

/* ---------- 表单状态 ---------- */
const bookDate = ref(todayStr)
const people = ref(2)
const name = ref('小林（演示）')
const phone = ref('13800000000')
const company = ref('')
const remark = ref('')
const withTea = ref(false)
const agreed = ref(false)

onLoad((options) => {
  const o = (options || {}) as Record<string, string>
  if (o.id) packageId.value = o.id
  if (o.date && /^\d{4}-\d{2}-\d{2}$/.test(o.date) && o.date >= todayStr) {
    bookDate.value = o.date
  }

  fetchPackageDetail(packageId.value).then((d) => {
    detail.value = d
  })
  fetchPackageBooking(packageId.value).then((d) => {
    booking.value = d
    people.value = d.minPeople
    if (bookDate.value < d.openFrom) bookDate.value = d.openFrom
    syncViewMonth()
  })
})

/* ---------- 日期 ---------- */
const formatDate = (v: string) => v.replace(/-/g, '/')
const dateText = computed(() => {
  const [, m, d] = bookDate.value.split('-')
  return `${Number(m)}月${Number(d)}日`
})

function onDateChange(e: { detail: { value: string } }) {
  bookDate.value = e.detail.value
  syncViewMonth()
}

/* ---------- 日历 ---------- */
const weekHeads = ['日', '一', '二', '三', '四', '五', '六']
const viewYear = ref(new Date().getFullYear())
const viewMonth = ref(new Date().getMonth() + 1)

/** 日历视图跟随所选日期所在月份 */
function syncViewMonth() {
  const [y, m] = bookDate.value.split('-')
  viewYear.value = Number(y)
  viewMonth.value = Number(m)
}

/** 已过期 = 早于可预约起始日 */
function isExpired(dateStr: string): boolean {
  return dateStr < booking.value.openFrom
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
    const expired = isExpired(dateStr)
    cells.push({
      day: d,
      dateStr,
      disabled: expired,
      label: expired ? '已过期' : `余${booking.value.stockPerDay}套`
    })
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
  bookDate.value = cell.dateStr
}

/* ---------- 人数 ---------- */
function changePeople(delta: number) {
  const next = people.value + delta
  if (next >= booking.value.minPeople && next <= booking.value.maxPeople) people.value = next
}

/* ---------- 合计 ---------- */
const totalPrice = computed(() => {
  const extra = Math.max(0, people.value - booking.value.minPeople) * booking.value.extraPerPerson
  const tea = withTea.value ? people.value * booking.value.addon.pricePerPerson : 0
  return booking.value.pricePerSet + extra + tea
})

/* ---------- 提交 ---------- */
function goBack() {
  uni.navigateBack({
    fail: () => uni.redirectTo({ url: `/pages/packages/detail?id=${packageId.value}` })
  })
}
function onSubmit() {
  if (!name.value.trim()) {
    uni.showToast({ title: '请填写联系人', icon: 'none' })
    return
  }
  if (!phone.value.trim()) {
    uni.showToast({ title: '请填写手机号', icon: 'none' })
    return
  }
  if (!agreed.value) {
    uni.showToast({ title: '请先阅读并勾选预约须知', icon: 'none' })
    return
  }
  uni.navigateTo({ url: `/pages/orders/detail?id=DMVNGT0TU&category=团建套餐&title=${encodeURIComponent(detail.value.title)}&dateText=${encodeURIComponent(dateText.value)}&timeText=全天&peopleText=${people.value}人&price=${totalPrice.value}&name=${encodeURIComponent(name.value)}&phone=${encodeURIComponent(phone.value)}&remark=${encodeURIComponent(remark.value)}` })
}
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

/* ---------- 预约页 ---------- */
.booking-page {
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
.booking-heading {
  display: flex;
  flex-direction: column;
}
.eyebrow {
  margin-bottom: 8px;
  font-size: 8px;
  letter-spacing: 0.15em;
  color: $ink-muted;
}
.h1 {
  font-size: 28px;
  line-height: 1.4;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
}

/* 步骤条 */
.steps {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.step {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: $ink-muted;
}
.step.done,
.step.current {
  color: $green;
  font-weight: 600;
}
.step-line {
  flex: 1;
  height: 1px;
  background: $line;
}

/* ---------- 白卡 ---------- */
.panel {
  margin-top: 25px;
  padding: 23px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
}
.panel-head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 18px;
}
.panel-no {
  font-size: 15px;
  font-family: $serif;
  font-weight: 600;
  color: $ink-muted;
}
.panel-title {
  font-size: 20px;
  font-family: $serif;
  font-weight: 700;
  color: $ink;
}

/* 日期 */
.field-label {
  display: block;
  margin-bottom: 8px;
  font-size: 10px;
  color: $ink-soft;
}
.field-label-strong {
  display: block;
  margin-bottom: 8px;
  font-size: 11px;
  font-weight: 600;
  color: $ink;
}
.date-box {
  height: 44px;
  padding: 0 13px;
  border: 1px solid $line;
  border-radius: 8px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.date-value {
  font-size: 13px;
  font-weight: 500;
  color: $ink;
}

/* 日历 */
.calendar {
  margin-top: 14px;
  padding: 16px;
  border-radius: 9px;
  background: #ffffff;
  border: 1px solid #f0f2e6;
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
  margin-top: 12px;
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
  min-height: 46px;
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
  font-size: 13px;
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
.date-note {
  display: block;
  margin-top: 15px;
  font-size: 9px;
  line-height: 1.9;
  color: $ink-soft;
}

/* ---------- 02 参与信息 ---------- */
.guest-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.guest-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.guest-note {
  font-size: 8px;
  color: $ink-muted;
}
.stepper {
  display: flex;
  align-items: center;
  border: 1px solid $line;
  border-radius: 8px;
  background: #fafaf4;
  overflow: hidden;
}
.step-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: $ink-soft;
}
.step-num {
  min-width: 30px;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
  color: $ink;
}
.price-tip {
  margin-top: 16px;
  padding: 12px 13px;
  border-radius: 8px;
  background: $cream-card;
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 9px;
  line-height: 1.8;
  color: $ink-soft;
}
.form-row {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}
.form-field {
  flex: 1;
  min-width: 0;
}
.field-block {
  margin-top: 16px;
}
.form-input {
  height: 40px;
  padding: 0 11px;
  border: 1px solid $line;
  border-radius: 8px;
  background: #ffffff;
  font-size: 12px;
  color: $ink;
  box-sizing: border-box;
}
.input-ph {
  color: #b6bcaa;
}
.form-textarea {
  min-height: 82px;
  width: 100%;
  padding: 10px 11px;
  border: 1px solid $line;
  border-radius: 8px;
  background: #ffffff;
  font-size: 12px;
  color: $ink;
  box-sizing: border-box;
}

/* 增值项 */
.addon {
  margin-top: 16px;
  padding: 13px;
  border-radius: 8px;
  border: 1px solid $line;
  background: #fafaf4;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.addon.active {
  background: $cream-card;
  border-color: #dfe5cf;
}
.addon-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.addon-title {
  font-size: 11px;
  font-weight: 600;
  color: $ink;
}
.addon-desc {
  font-size: 9px;
  color: $ink-soft;
}

/* ---------- 03 预约须知 ---------- */
.notice-text {
  display: block;
  margin-bottom: 12px;
  font-size: 10px;
  line-height: 1.9;
  color: $ink-soft;
}
.agree-row {
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  gap: 9px;
}
.checkbox {
  flex-shrink: 0;
  margin-top: 1px;
  width: 15px;
  height: 15px;
  border: 1.5px solid #b6bcaa;
  border-radius: 3px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox.checked {
  background: $green;
  border-color: $green;
}
.agree-text {
  font-size: 10px;
  line-height: 1.7;
  color: $ink;
}

/* ---------- 摘要卡 ---------- */
.summary-card {
  margin-top: 25px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
  overflow: hidden;
}
.summary-image image {
  width: 100%;
  height: 210px;
  display: block;
}
.summary-body {
  padding: 22px;
}
.summary-title {
  display: block;
  margin-top: 10px;
  font-size: 26px;
  line-height: 1.4;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
}
.summary-specs {
  display: block;
  margin-top: 8px;
  font-size: 9px;
  color: $ink-soft;
}
.summary-lines {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #f0f2e6;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.line-label {
  font-size: 10px;
  color: $ink-soft;
}
.line-value {
  font-size: 11px;
  font-weight: 600;
  color: $ink;
}
.total-line {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #f0f2e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.total-label {
  font-size: 11px;
  color: $ink-soft;
}
.total-price {
  display: flex;
  align-items: baseline;
  gap: 2px;
  color: $ink;
}
.total-symbol {
  font-size: 16px;
  font-weight: 700;
}
.total-num {
  font-size: 30px;
  font-family: $serif;
  font-weight: 700;
}
.submit-button {
  margin-top: 18px;
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 8px;
  background: $green;
  font-size: 13px;
  font-weight: 600;
  color: #ffffff;
}
.submit-footnote {
  margin-top: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 8px;
  color: $ink-muted;
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
