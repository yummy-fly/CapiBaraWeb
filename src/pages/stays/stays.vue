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

    <!-- 页面介绍 -->
    <view class="page-intro">
      <view class="wrap">
        <text class="eyebrow">{{ stays.eyebrow }}</text>
        <text class="intro-title">{{ stays.title }}</text>
        <text class="intro-desc">{{ stays.desc }}</text>
      </view>
    </view>

    <!-- 主内容 -->
    <view class="page-content">
      <!-- 日期筛选卡 -->
      <view class="wrap">
        <view class="datebar">
          <view class="datebar-row">
            <view class="date-field">
              <text class="field-label">入住日期</text>
              <picker mode="date" :value="checkin" @change="onCheckinChange">
                <view class="field-box">
                  <text class="field-value">{{ formatDate(checkin) }}</text>
                  <Icon name="calendar" :size="14" color="#8b9280" />
                </view>
              </picker>
            </view>
            <view class="date-arrow">
              <text>→</text>
            </view>
            <view class="date-field">
              <text class="field-label">离店日期</text>
              <picker mode="date" :value="checkout" :start="checkin" @change="onCheckoutChange">
                <view class="field-box">
                  <text class="field-value">{{ formatDate(checkout) }}</text>
                  <Icon name="calendar" :size="14" color="#8b9280" />
                </view>
              </picker>
            </view>
          </view>
          <view class="guest-field">
            <text class="field-label">出行人数</text>
            <picker mode="selector" :range="guestOptions" :value="guestIndex" @change="onGuestChange">
              <view class="field-box">
                <text class="field-value">{{ guestOptions[guestIndex] }}</text>
                <Icon name="chevdown" :size="14" color="#8b9280" />
              </view>
            </picker>
          </view>
          <text class="datebar-note">{{ stays.priceNote }}</text>
        </view>
      </view>

      <!-- 分类筛选 -->
      <view class="wrap">
        <view class="filter-chips">
          <view
            v-for="chip in stays.filters"
            :key="chip"
            class="chip"
            :class="{ active: activeFilter === chip }"
            @tap="activeFilter = chip"
          >
            <text>{{ chip }}</text>
          </view>
        </view>
        <text class="count-text">{{ filteredStays.length }} 个山野民宿项目</text>
      </view>

      <!-- 房源卡片 -->
      <view class="wrap">
        <view class="stays-grid">
          <view v-for="item in filteredStays" :key="item.title" class="stay-block">
            <view class="stay-card" @tap="onStayTap(item)">
              <view class="stay-image">
                <image :src="item.img" mode="aspectFill" />
                <text class="image-label">{{ item.tag }}</text>
                <view class="favorite-button" :class="{ active: item.faved }" @tap.stop="toggleFav(item)">
                  <Icon :name="item.faved ? 'heart-filled' : 'heart'" :size="14" :color="item.faved ? '#5a7150' : '#ffffff'" />
                </view>
              </view>
              <view class="stay-body">
                <text class="stay-category">{{ item.category }}</text>
                <text class="stay-title">{{ item.title }}</text>
                <text class="stay-desc">{{ item.desc }}</text>
                <text class="stay-specs">{{ item.specs }}</text>
                <view class="stay-bottom">
                  <view class="price">
                    <text class="price-symbol">¥</text>
                    <text class="price-num">{{ item.price }}</text>
                    <text class="price-unit">/ 晚</text>
                  </view>
                  <view class="round-arrow">
                    <Icon name="arrowupright" :size="14" color="#3d4534" />
                  </view>
                </view>
              </view>
            </view>
            <text class="nights-text">所选入住共 {{ nights }} 晚 · ¥{{ item.price }}/晚</text>
            <view class="room-link" @tap="onRoomStatus(item)">
              <text>查看房态</text>
              <Icon name="arrowright" :size="12" color="#3d4534" />
            </view>
          </view>
        </view>
      </view>

      <!-- 演示说明 -->
      <view class="wrap">
        <view class="notice-panel">
          <view class="notice-icon">
            <Icon name="leaf" :size="18" color="#5a7150" />
          </view>
          <view class="notice-copy">
            <text class="notice-title">{{ stays.noticeTitle }}</text>
            <text class="notice-desc">{{ stays.noticeDesc }}</text>
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
    <TabBar current="stays" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import Icon from '@/components/Icon.vue'
import GlobalNavMenu from '@/components/GlobalNavMenu.vue'
import TabBar from '@/components/TabBar.vue'
import { fetchStaysData } from '@/api/stays'
import type { StaysData, StayItem } from '@/data/stays'

/* ---------- 页面数据（通过 API 层获取） ---------- */
const stays = ref<StaysData>({
  eyebrow: '',
  title: '',
  desc: '',
  priceNote: '',
  filters: ['全部'],
  stays: [],
  noticeTitle: '',
  noticeDesc: ''
})

onMounted(async () => {
  stays.value = await fetchStaysData()
})

/* ---------- 查询参数（支持 ?date=&end=&people=） ---------- */
const pad = (n: number) => String(n).padStart(2, '0')
const fmtDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const today = new Date()
const plusDays = (n: number) => {
  const t = new Date(today)
  t.setDate(t.getDate() + n)
  return fmtDate(t)
}

const checkin = ref(plusDays(2))
const checkout = ref(plusDays(3))
const guestOptions = ['1 位', '2 位', '3 位', '4 位', '5 位', '6 位']
const guestIndex = ref(1)

onLoad((options) => {
  const o = (options || {}) as Record<string, string>
  const inDate = o.checkin || o.date
  const outDate = o.checkout || o.end
  if (inDate && /^\d{4}-\d{2}-\d{2}$/.test(inDate)) checkin.value = inDate
  if (outDate && /^\d{4}-\d{2}-\d{2}$/.test(outDate) && outDate > checkin.value) checkout.value = outDate
  const people = Number(o.people || o.guests)
  if (people >= 1 && people <= 6) guestIndex.value = people - 1
})

/* ---------- 日期/人数 ---------- */
const formatDate = (v: string) => v.replace(/-/g, '/')
function onCheckinChange(e: { detail: { value: string } }) {
  checkin.value = e.detail.value
  if (checkout.value <= checkin.value) {
    const d = new Date(checkin.value)
    d.setDate(d.getDate() + 1)
    checkout.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  }
}
function onCheckoutChange(e: { detail: { value: string } }) {
  if (e.detail.value > checkin.value) checkout.value = e.detail.value
}
function onGuestChange(e: { detail: { value: number } }) {
  guestIndex.value = e.detail.value
}

/** 入住晚数 */
const nights = computed(() => {
  const diff = (new Date(checkout.value).getTime() - new Date(checkin.value).getTime()) / 86400000
  return Math.max(1, Math.round(diff))
})

/* ---------- 分类筛选 ---------- */
const activeFilter = ref('全部')
const filteredStays = computed(() =>
  activeFilter.value === '全部'
    ? stays.value.stays
    : stays.value.stays.filter((s) => s.category === activeFilter.value)
)

/* ---------- 收藏 ---------- */
function toggleFav(item: StayItem) {
  item.faved = !item.faved
  uni.showToast({ title: item.faved ? '已加入收藏' : '已取消收藏', icon: 'none' })
}

/* ---------- 交互 ---------- */
function onStayTap(item: StayItem) {
  uni.navigateTo({
    url: `/pages/stays/detail?id=${item.id}&date=${checkin.value}&end=${checkout.value}&people=${guestIndex.value + 1}`
  })
}
function onRoomStatus(item: StayItem) {
  onStayTap(item)
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
$cream-card: #edefdd;
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

/* ---------- 页面介绍 ---------- */
.page-intro {
  background: #f0f1e5;
  padding: 32px 0 28px;
}
.eyebrow {
  display: block;
  margin-bottom: 8px;
  font-size: 7px;
  letter-spacing: 0.18em;
  color: $ink-muted;
}
.intro-title {
  display: block;
  font-size: 28px;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
  line-height: 1.4;
}
.intro-desc {
  display: block;
  margin-top: 10px;
  font-size: 10px;
  color: $ink-soft;
}

/* ---------- 主内容 ---------- */
.page-content {
  padding-top: 25px;
}

/* 日期筛选卡 */
.datebar {
  padding: 18px 16px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.datebar-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}
.date-field {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.date-arrow {
  padding-bottom: 10px;
  font-size: 13px;
  color: $ink-soft;
}
.guest-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-label {
  font-size: 9px;
  color: $ink-soft;
}
.field-box {
  height: 38px;
  padding: 0 10px;
  border: 1px solid $line;
  border-radius: 8px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.field-value {
  font-size: 11px;
  font-weight: 500;
  color: $ink;
}
.datebar-note {
  font-size: 8px;
  color: $ink-muted;
}

/* 分类筛选 */
.filter-chips {
  margin-top: 20px;
  display: flex;
  gap: 8px;
}
.chip {
  padding: 8px 15px;
  border-radius: 7px;
  border: 1px solid $line;
  background: #ffffff;
  font-size: 10px;
  color: $ink-soft;
}
.chip.active {
  background: $green;
  border-color: $green;
  color: #ffffff;
  font-weight: 600;
}
.count-text {
  display: block;
  margin-top: 13px;
  font-size: 9px;
  color: $ink-muted;
}

/* 房源卡片 */
.stays-grid {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.stay-block {
  box-sizing: border-box;
  width: 48.5%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}
.stay-card {
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.stay-image {
  position: relative;
}
.stay-image image {
  width: 100%;
  height: 140px;
  display: block;
}
.image-label {
  position: absolute;
  top: 9px;
  left: 9px;
  padding: 3px 6px;
  border-radius: 4px;
  background: rgba(245, 242, 232, 0.92);
  font-size: 7px;
  color: $ink;
}
.favorite-button {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  backdrop-filter: blur(3px);
  background: #4a554442;
  display: flex;
  align-items: center;
  justify-content: center;
}
.favorite-button.active {
  background: #f5f2e8;
}
.stay-body {
  padding: 13px 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.stay-category {
  font-size: 7px;
  letter-spacing: 0.1em;
  color: $ink-muted;
}
.stay-title {
  margin-top: 3px;
  font-size: 15px;
  line-height: 1.6;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
}
.stay-desc {
  margin-top: 5px;
  font-size: 8px;
  line-height: 1.8;
  color: $ink-soft;
}
.stay-specs {
  margin-top: 8px;
  padding: 10px 0 0;
  border-top: 1px solid #f0f2e6;
  font-size: 8px;
  color: $ink-muted;
}
.stay-bottom {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price {
  display: flex;
  align-items: baseline;
  gap: 2px;
  color: $ink;
}
.price-symbol {
  font-size: 10px;
  font-weight: 600;
}
.price-num {
  font-size: 21px;
  font-family: $serif;
  font-weight: 700;
}
.price-unit {
  font-size: 8px;
  color: $ink-muted;
}
.round-arrow {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid $line;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nights-text {
  margin-top: 10px;
  font-size: 8px;
  color: $ink-soft;
}
.room-link {
  margin-top: 7px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 9px;
  color: $ink;
  font-weight: 600;
}

/* 演示说明 */
.notice-panel {
  margin-top: 26px;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 9px;
  background: #eff1e6;
  border: 1px solid #e4e8d7;
  
  display: flex;
  gap: 13px;
  align-items: flex-start;
}
.notice-icon {
  flex-shrink: 0;
  margin-top: 2px;
}
.notice-copy {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.notice-title {
  font-size: 11px;
  font-weight: 700;
  color: $ink;
  font-family: $serif;
}
.notice-desc {
  font-size: 9px;
  line-height: 1.9;
  color: $ink-soft;
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
