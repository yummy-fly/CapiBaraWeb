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

      <!-- 01 入住安排 -->
      <view class="wrap">
        <view class="panel">
          <view class="panel-head">
            <text class="panel-no">01</text>
            <text class="panel-title">入住安排</text>
          </view>

          <view class="date-row">
            <view class="date-field">
              <text class="field-label">入住日期</text>
              <picker mode="date" :value="checkin" :start="todayStr" @change="onCheckinChange">
                <view class="field-box">
                  <text class="field-value">{{ formatDate(checkin) }}</text>
                  <Icon name="calendar" :size="14" color="#8b9280" />
                </view>
              </picker>
            </view>
            <view class="date-field">
              <text class="field-label">离店日期</text>
              <picker mode="date" :value="checkout" :start="nextDay" @change="onCheckoutChange">
                <view class="field-box">
                  <text class="field-value">{{ formatDate(checkout) }}</text>
                  <Icon name="calendar" :size="14" color="#8b9280" />
                </view>
              </picker>
            </view>
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
                  selected: cell.dateStr === checkin
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

          <text class="stay-note">共 {{ nights }} 晚 · 周五/周六每晚加价 ¥100。日期价格以日历为准。</text>
        </view>
      </view>

      <!-- 02 入住信息 -->
      <view class="wrap">
        <view class="panel">
          <view class="panel-head">
            <text class="panel-no">02</text>
            <text class="panel-title">入住信息</text>
          </view>

          <view class="guest-row">
            <view class="guest-copy">
              <text class="field-label-strong">入住人数</text>
              <text class="guest-note">{{ booking.guestNote }}</text>
            </view>
            <view class="stepper">
              <view class="step-btn" @tap="changeGuest(-1)">
                <text>−</text>
              </view>
              <text class="step-num">{{ guests }}</text>
              <view class="step-btn" @tap="changeGuest(1)">
                <text>＋</text>
              </view>
            </view>
          </view>

          <view class="form-row">
            <view class="form-field">
              <text class="field-label-strong">入住人姓名</text>
              <input class="form-input" v-model="name" :placeholder="booking.namePlaceholder" placeholder-class="input-ph" />
            </view>
            <view class="form-field">
              <text class="field-label-strong">手机号（演示）</text>
              <input class="form-input" v-model="phone" type="number" :placeholder="booking.phonePlaceholder" placeholder-class="input-ph" />
            </view>
          </view>

          <view class="idcard-tip">
            <Icon name="check" :size="15" color="#5a7150" />
            <text>{{ booking.idCardTip }}</text>
          </view>

          <view class="remark-field">
            <text class="field-label-strong">{{ booking.remarkLabel }}</text>
            <textarea
              class="form-textarea"
              v-model="remark"
              :placeholder="booking.remarkPlaceholder"
              placeholder-class="input-ph"
              :maxlength="200"
              auto-height
            />
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
            <text class="summary-specs">{{ detail.specs.map((s) => s.value).join(' · ') }}</text>
            <view class="summary-lines">
              <view class="line">
                <text class="line-label">日期</text>
                <text class="line-value">{{ dateRangeText }}</text>
              </view>
              <view class="line">
                <text class="line-label">住宿</text>
                <text class="line-value">{{ nights }}晚</text>
              </view>
              <view class="line">
                <text class="line-label">人数</text>
                <text class="line-value">{{ guests }}人</text>
              </view>
              <view class="line">
                <text class="line-label">基础价格</text>
                <text class="line-value">¥{{ detail.priceCard.price }} / 晚</text>
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
              <Icon name="check" :size="12" color="#8b9280" />
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
import { fetchStayDetail, fetchStayBooking } from '@/api/stays'
import { stayDetailData, stayBookingData, type StayDetailData, type StayBookingData } from '@/data/stays'

/* ---------- 页面数据 ---------- */
const detail = ref<StayDetailData>(stayDetailData)
const booking = ref<StayBookingData>(stayBookingData)

const pad = (n: number) => String(n).padStart(2, '0')
const fmtDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const todayStr = fmtDate(new Date())
const plusDays = (n: number) => {
  const t = new Date()
  t.setDate(t.getDate() + n)
  return fmtDate(t)
}

/* ---------- 查询参数 ---------- */
const checkin = ref(plusDays(2))
const checkout = ref(plusDays(3))
const guests = ref(2)
const name = ref('小林（演示）')
const phone = ref('13800000000')
const remark = ref('')
const agreed = ref(false)

onLoad((options) => {
  const o = (options || {}) as Record<string, string>
  const inDate = o.checkin || o.date
  if (inDate && /^\d{4}-\d{2}-\d{2}$/.test(inDate) && inDate >= todayStr) {
    checkin.value = inDate
  }
  if (o.end && /^\d{4}-\d{2}-\d{2}$/.test(o.end) && o.end > checkin.value) {
    checkout.value = o.end
  }
  const people = Number(o.people || o.guests)
  if (people >= 1) guests.value = Math.min(people, booking.value.maxGuests)

  fetchStayDetail(o.id || 'mountain-room').then((d) => {
    detail.value = d
  })
  fetchStayBooking(o.id || 'mountain-room').then((d) => {
    booking.value = d
    guests.value = Math.min(guests.value, d.maxGuests)
  })
})

/* ---------- 日期 ---------- */
const formatDate = (v: string) => v.replace(/-/g, '/')
const nextDay = computed(() => {
  const d = new Date(checkin.value.replace(/-/g, '/'))
  d.setDate(d.getDate() + 1)
  return fmtDate(d)
})
function onCheckinChange(e: { detail: { value: string } }) {
  checkin.value = e.detail.value
  if (checkout.value <= checkin.value) checkout.value = nextDay.value
}
function onCheckoutChange(e: { detail: { value: string } }) {
  if (e.detail.value > checkin.value) checkout.value = e.detail.value
}

const nights = computed(() => {
  const diff = (new Date(checkout.value.replace(/-/g, '/')).getTime() - new Date(checkin.value.replace(/-/g, '/')).getTime()) / 86400000
  return Math.max(1, Math.round(diff))
})

/* ---------- 人数 ---------- */
function changeGuest(delta: number) {
  const next = guests.value + delta
  if (next >= 1 && next <= booking.value.maxGuests) guests.value = next
}

/* ---------- 日历 ---------- */
const weekHeads = ['日', '一', '二', '三', '四', '五', '六']
const viewYear = ref(new Date().getFullYear())
const viewMonth = ref(new Date().getMonth() + 1)

function priceOfDay(dateStr: string): string {
  const day = new Date(dateStr.replace(/-/g, '/')).getDay()
  return day === 5 || day === 6 ? detail.value.priceCard.weekendPrice : detail.value.priceCard.price
}
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
    else if (!isBookable(dateStr)) label = '约满'
    else label = '¥' + priceOfDay(dateStr)
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
/** 点击日历选择入住日期，离店自动为次日（若早于当前离店） */
function onSelectDate(cell: CalendarCell) {
  if (!cell.day || cell.disabled) return
  checkin.value = cell.dateStr
  if (checkout.value <= cell.dateStr) checkout.value = nextDay.value
}

/* ---------- 摘要 ---------- */
const dateRangeText = computed(() => {
  const [, im, id] = checkin.value.split('-')
  const [, om, od] = checkout.value.split('-')
  return `${Number(im)}月${Number(id)}日 — ${Number(om)}月${Number(od)}日`
})
/** 总价 = 每晚价格之和（周末加价） */
const totalPrice = computed(() => {
  let sum = 0
  const d = new Date(checkin.value.replace(/-/g, '/'))
  const end = new Date(checkout.value.replace(/-/g, '/'))
  while (d < end) {
    sum += Number(priceOfDay(fmtDate(d)))
    d.setDate(d.getDate() + 1)
  }
  return sum || Number(detail.value.priceCard.price)
})

/* ---------- 提交 ---------- */
function goBack() {
  uni.navigateBack({ fail: () => uni.reLaunch({ url: '/pages/stays/stays' }) })
}
function onSubmit() {
  if (!name.value.trim()) {
    uni.showToast({ title: '请填写入住人姓名', icon: 'none' })
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
  uni.navigateTo({ url: `/pages/orders/detail?id=DMVNGT0TU&category=山野民宿&title=${encodeURIComponent(detail.value.title)}&dateText=${encodeURIComponent(dateRangeText.value)}&timeText=14:00后入住&peopleText=${guests.value}人&price=${totalPrice.value}&name=${encodeURIComponent(name.value)}&phone=${encodeURIComponent(phone.value)}&remark=${encodeURIComponent(remark.value)}` })
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

/* 日期双输入 */
.date-row {
  display: flex;
  gap: 12px;
}
.date-field {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.field-label {
  font-size: 9px;
  color: $ink-soft;
}
.field-label-strong {
  font-size: 11px;
  font-weight: 600;
  color: $ink;
}
.field-box {
  height: 40px;
  padding: 0 11px;
  border: 1px solid $line;
  border-radius: 8px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.field-value {
  font-size: 12px;
  font-weight: 500;
  color: $ink;
}

/* 日历 */
.calendar {
  margin-top: 20px;
  padding: 16px;
  border-radius: 9px;
  background: #ffffffff;
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
.stay-note {
  display: block;
  margin-top: 15px;
  font-size: 9px;
  color: $ink-soft;
}

/* ---------- 02 入住信息 ---------- */
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
.form-row {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}
.form-field {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.form-input {
  height: 40px;
  padding: 0 11px;
  border: 1px solid $line;
  border-radius: 8px;
  background: #ffffff;
  font-size: 12px;
  color: $ink;
}
.input-ph {
  color: #b6bcaa;
}
.idcard-tip {
  margin-top: 16px;
  padding: 12px 13px;
  border-radius: 8px;
  background: $cream-card;
  display: flex;
  gap: 9px;
  align-items: flex-start;
}
.idcard-tip text {
  flex: 1;
  font-size: 9px;
  line-height: 1.8;
  color: $ink-soft;
}
.remark-field {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.form-textarea {
  min-height: 74px;
  padding: 10px 11px;
  border: 1px solid $line;
  border-radius: 8px;
  background: #ffffff;
  font-size: 12px;
  color: $ink;
  width: auto;
  box-sizing: border-box;
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
