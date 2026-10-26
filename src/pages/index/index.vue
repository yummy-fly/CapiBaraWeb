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

    <!-- Hero 轮播 -->
    <view class="hero">
      <view
        v-for="(slide, i) in slides"
        :key="i"
        class="hero-img"
        :class="{ show: heroIndex === i }"
        :style="{ backgroundImage: 'url(' + slide + ')' }"
      />
      <view class="hero-mask" />
      <view class="hero-content">
        <text class="hero-location">中国 · 浙江 · 丽水 / 山野慢生活</text>
        <text class="hero-eyebrow">A LITTLE VILLAGE. A SLOWER LIFE.</text>
        <text class="hero-title">把日子，过慢一点。</text>
        <text class="hero-desc">住在山野，尝一口乡土，亲手做一份记忆。</text>
        <view class="hero-button" @tap="goStays">
          <text>选一间山野好房</text>
          <Icon name="arrowupright" :size="12" color="#3d4534" />
        </view>
      </view>
      <view class="hero-bottom">
        <view class="hero-arrow" @tap="prevSlide">
          <Icon name="chevleft" :size="14" color="#ffffff" />
        </view>
        <view class="hero-dots">
          <view
            v-for="(_, i) in slides"
            :key="i"
            class="hero-dot"
            :class="{ on: heroIndex === i }"
          />
        </view>
        <view class="hero-arrow" @tap="nextSlide">
          <Icon name="chevright" :size="14" color="#ffffff" />
        </view>
        <text class="hero-count">{{ String(heroIndex + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}</text>
      </view>
    </view>

    <!-- 日期搜索卡 -->
    <view class="wrap booking-wrap">
      <view class="booking-bar">
        <view class="booking-bar-title">
          <Icon name="calendar" :size="17" color="#5a7150" />
          <text>选个好日子，来村里做客</text>
        </view>
        <view class="booking-fields">
          <picker class="booking-field" mode="date" :value="checkin" @change="onCheckinChange">
            <view class="booking-field-inner">
              <text class="field-label">入住日期</text>
              <view class="field-value">
                <text>{{ formatDate(checkin) }}</text>
                <Icon name="calendar" :size="13" color="#8b9280" />
              </view>
            </view>
          </picker>
          <picker class="booking-field" mode="date" :value="checkout" :start="checkin" @change="onCheckoutChange">
            <view class="booking-field-inner">
              <text class="field-label">离店日期</text>
              <view class="field-value">
                <text>{{ formatDate(checkout) }}</text>
                <Icon name="calendar" :size="13" color="#8b9280" />
              </view>
            </view>
          </picker>
          <picker class="booking-field" mode="selector" :range="guestOptions" :value="guestIndex" @change="onGuestChange">
            <view class="booking-field-inner">
              <text class="field-label">出行人数</text>
              <view class="field-value">
                <text>{{ guestOptions[guestIndex] }}</text>
                <Icon name="chevdown" :size="13" color="#8b9280" />
              </view>
            </view>
          </picker>
        </view>
        <view class="booking-submit" @tap="goStays">
          <text>寻找好住处</text>
          <Icon name="arrowright" :size="13" color="#ffffff" />
        </view>
      </view>
    </view>

    <!-- 村里消息 -->
    <view class="wrap">
      <view class="announcement">
        <Icon name="megaphone" :size="14" color="#5a7150" />
        <text class="announcement-tag">村里消息</text>
        <text class="announcement-text">{{ announcement }}</text>
        <view class="announcement-link" @tap="goMessages">
          <text>查看</text>
          <Icon name="arrowright" :size="11" color="#5a7150" />
        </view>
      </view>
    </view>

    <!-- 主内容区 -->
    <view class="main-section">
      <!-- 快捷入口 -->
      <view class="wrap quick-entries">
        <view v-for="entry in quickEntries" :key="entry.label" class="quick-entry" @tap="onQuickEntry(entry)">
          <view class="quick-icon">
            <Icon :name="entry.icon" :size="22" color="#3d4534" />
          </view>
          <text>{{ entry.label }}</text>
        </view>
      </view>

      <!-- 体验活动 -->
      <view class="wrap home-experiences">
        <view class="section-heading">
          <view class="heading-left">
            <text class="eyebrow">EXPERIENCE THE VILLAGE</text>
            <text class="h2">把乡村，亲手过一遍</text>
            <text class="heading-desc">在米香和笑声里，找回生活的小小乐趣。</text>
          </view>
          <view class="text-link" @tap="goTab('/pages/experiences/experiences')">
            <text>查看全部</text>
            <Icon name="arrowright" :size="11" color="#5a7150" />
          </view>
        </view>
        <view class="cards-two">
          <view v-for="item in experiences" :key="item.title" class="card" @tap="goExperienceDetail(item)">
            <view class="card-image">
              <image :src="item.img" mode="aspectFill" />
              <text class="image-label">{{ item.tag }}</text>
              <view class="favorite-button" :class="{ active: item.faved }" @tap.stop="toggleFav(item)">
                <Icon :name="item.faved ? 'heart-filled' : 'heart'" :size="14" :color="item.faved ? '#5a7150' : '#ffffff'" />
              </view>
            </view>
            <view class="card-body">
              <text class="card-category">{{ item.category }}</text>
              <text class="card-title">{{ item.title }}</text>
              <text class="card-desc">{{ item.desc }}</text>
              <text class="card-meta">{{ item.meta }}</text>
              <view class="card-bottom">
                <view class="price">
                  <text class="price-symbol">¥</text>
                  <text class="price-num">{{ item.price }}</text>
                  <text class="price-unit">/ {{ item.unit }}</text>
                </view>
                <view class="round-arrow">
                  <Icon name="arrowright" :size="15" color="#5a7150" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 村里的好日子（村历） -->
      <view class="wrap">
        <view class="village-calendar">
          <view class="calendar-head">
            <view class="agenda-heading">
              <text class="eyebrow">VILLAGE CALENDAR</text>
              <text class="h3">村里的好日子</text>
              <text class="calendar-desc">挑一个日子，赴一场乡村之约。</text>
            </view>
            <Icon name="calendar" :size="18" color="#5a7150" />
          </view>
          <view class="agenda-days">
            <view
              v-for="(day, i) in calendarDays"
              :key="i"
              class="agenda-day"
              :class="{ active: selectedDay === i }"
              @tap="selectedDay = i"
            >
              <text class="day-week">{{ day.week }}</text>
              <text class="day-num">{{ day.num }}</text>
              <view class="day-dot" />
            </view>
          </view>
          <view class="agenda-events">
            <view v-for="ev in agendaEvents" :key="ev.time" class="agenda-event">
              <text class="event-time">{{ ev.time }}</text>
              <text class="event-name">{{ ev.name }}</text>
              <text class="event-meta">{{ ev.meta }}</text>
            </view>
          </view>
          <view class="agenda-more" @tap="goTab('/pages/experiences/experiences')">
            <text>查看全部体验</text>
            <Icon name="arrowright" :size="11" color="#5a7150" />
          </view>
        </view>
      </view>

      <!-- 民宿 -->
      <view class="wrap home-stays">
        <view class="section-heading">
          <view class="heading-left">
            <text class="eyebrow">STAY CLOSE TO NATURE</text>
            <text class="h2">推开窗，就是山野</text>
            <text class="heading-desc">一夜好眠，一顿早餐，一段不被打扰的时光。</text>
          </view>
          <view class="text-link" @tap="goStays">
            <text>查看全部</text>
            <Icon name="arrowright" :size="11" color="#5a7150" />
          </view>
        </view>
        <view class="stay-editorial">
          <view class="stay-editorial-image">
            <image :src="stayImg" mode="aspectFill" />
            <text class="stay-image-label">STAY IN THE MOMENT</text>
          </view>
          <view class="stay-editorial-copy">
            <text class="eyebrow">YOUR HOME IN THE HILLS</text>
            <text class="stay-title">在这里，睡进一片好风景。</text>
            <text class="stay-desc">不是换个地方睡觉，是换一种方式醒来。</text>
            <view class="stay-features">
              <view class="stay-feature">
                <Icon name="mountain" :size="14" color="#5a7150" />
                <text>山景客房</text>
              </view>
              <view class="stay-feature">
                <Icon name="leaf" :size="14" color="#5a7150" />
                <text>田园早餐</text>
              </view>
            </view>
            <view class="stay-button" @tap="goStays">
              <text>看看我们的房间</text>
              <Icon name="arrowupright" :size="12" color="#ffffff" />
            </view>
          </view>
        </view>
      </view>

      <!-- 团建套餐 -->
      <view class="wrap home-packages">
        <view class="section-heading">
          <view class="heading-left">
            <text class="eyebrow">BETTER TOGETHER</text>
            <text class="h2">好时光，要一起分享</text>
            <text class="heading-desc">亲子出游、朋友相聚、企业团建，一次预约就安排好。</text>
          </view>
        </view>
        <view class="cards-two">
          <view v-for="item in packages" :key="item.title" class="card" @tap="goPackageDetail(item)">
            <view class="card-image">
              <image :src="item.img" mode="aspectFill" />
              <text class="image-label">{{ item.tag }}</text>
              <view class="favorite-button" :class="{ active: item.faved }" @tap.stop="toggleFav(item)">
                <Icon :name="item.faved ? 'heart-filled' : 'heart'" :size="14" :color="item.faved ? '#5a7150' : '#ffffff'" />
              </view>
            </view>
            <view class="card-body">
              <text class="card-category">{{ item.category }}</text>
              <text class="card-title">{{ item.title }}</text>
              <text class="card-desc">{{ item.desc }}</text>
              <text class="card-meta">{{ item.meta }}</text>
              <view class="card-bottom wrap-line">
                <view class="price">
                  <text class="price-symbol">¥</text>
                  <text class="price-num">{{ item.price }}</text>
                  <text class="price-unit">/ {{ item.unit }}</text>
                </view>
                <view class="round-arrow">
                  <Icon name="arrowright" :size="15" color="#5a7150" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 村庄 CTA -->
      <view class="wrap">
        <view class="village-strip">
          <text class="strip-eyebrow">MEET CAPYBARA VILLAGE</text>
          <text class="strip-title">远一点，是山野。\n近一点，是生活。</text>
          <text class="strip-desc">民宿、手作与一张乡村餐桌，等你来坐坐。</text>
          <view class="strip-button" @tap="goVillage">
            <text>认识我们的村庄</text>
            <Icon name="arrowupright" :size="12" color="#3d4534" />
          </view>
        </view>
      </view>

      <!-- 演示说明 -->
      <view class="wrap">
        <text class="demo-caption">概念交互演示：图片非实拍，项目、场次和价格仅作流程展示。</text>
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
          <text @tap="goVillage">村庄介绍</text>
          <text @tap="goOrders">我的预约</text>
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
    <TabBar current="index" />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Icon from '@/components/Icon.vue'
import GlobalNavMenu from '@/components/GlobalNavMenu.vue'
import TabBar from '@/components/TabBar.vue'
import { fetchHomeData } from '@/api/home'
import type { CardItem, QuickEntry, CalendarDay, AgendaEvent } from '@/data/home'

/* ---------- 页面数据（通过 API 层获取） ---------- */
const loading = ref(true)
const slides = ref<string[]>([])
const stayImg = ref('')
const announcement = ref('')
const quickEntries = ref<QuickEntry[]>([])
const experiences = ref<CardItem[]>([])
const packages = ref<CardItem[]>([])
const calendarDays = ref<CalendarDay[]>([])
const agendaEvents = ref<AgendaEvent[]>([])

onMounted(async () => {
  try {
    const data = await fetchHomeData()
    slides.value = data.slides
    stayImg.value = data.stayImg
    announcement.value = data.announcement
    quickEntries.value = data.quickEntries
    experiences.value = data.experiences
    packages.value = data.packages
    calendarDays.value = data.calendarDays
    agendaEvents.value = data.agendaEvents
  } finally {
    loading.value = false
  }
})

/* ---------- Hero 轮播 ---------- */
const heroIndex = ref(0)
function prevSlide() {
  if (!slides.value.length) return
  heroIndex.value = (heroIndex.value - 1 + slides.value.length) % slides.value.length
}
function nextSlide() {
  if (!slides.value.length) return
  heroIndex.value = (heroIndex.value + 1) % slides.value.length
}

/* ---------- 日期搜索 ---------- */
const pad = (n: number) => String(n).padStart(2, '0')
const today = new Date()
const plusDays = (d: number) => {
  const t = new Date(today)
  t.setDate(t.getDate() + d)
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`
}
const checkin = ref(plusDays(2))
const checkout = ref(plusDays(3))
const guestOptions = ref(['1 位客人', '2 位客人', '4 位客人'])
const guestIndex = ref(1)

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

/* ---------- 快捷入口 ---------- */
function onQuickEntry(entry: QuickEntry) {
  if (entry.path) {
    goTab(entry.path)
  } else {
    uni.showToast({ title: '演示：页面暂未开放', icon: 'none' })
  }
}
function goTab(path: string) {
  uni.reLaunch({ url: path })
}
function goVillage() {
  uni.reLaunch({ url: '/pages/village/village' })
}
function goOrders() {
  uni.reLaunch({ url: '/pages/orders/orders' })
}
function goMessages() {
  uni.navigateTo({ url: '/pages/messages/messages' })
}
function goExperienceDetail(item: CardItem) {
  uni.navigateTo({ url: `/pages/experiences/detail?id=${item.id || ''}` })
}
function goPackageDetail(item: CardItem) {
  uni.navigateTo({ url: `/pages/packages/detail?id=${item.id || ''}` })
}
/** 携带日期/人数跳转民宿列表页 */
function goStays() {
  uni.reLaunch({ url: `/pages/stays/stays?date=${checkin.value}&end=${checkout.value}&people=${guestIndex.value + 1}` })
}

/* ---------- 收藏 ---------- */
function toggleFav(item: CardItem) {
  item.faved = !item.faved
  uni.showToast({ title: item.faved ? '已加入收藏' : '已取消收藏', icon: 'none' })
}

/* ---------- 村历 ---------- */
const selectedDay = ref(2)

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

/* ---------- Hero ---------- */
.hero {
  position: relative;
  height: 387px;
  overflow: hidden;
}
.hero-img {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.5s ease;
}
.hero-img.show {
  opacity: 1;
}
.hero-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(20, 30, 15, 0.25), rgba(20, 30, 15, 0.05) 45%, rgba(30, 40, 20, 0.35));
}
.hero-content {
  position: relative;
  z-index: 2;
  padding: 27px 18px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.hero-location {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.05em;
}
.hero-eyebrow {
  margin-top: 25px;
  font-size: 8px;
  letter-spacing: 0.18em;
  color: rgba(255, 255, 255, 0.8);
}
.hero-title {
  margin: 11px 0;
  font-size: 35px;
  line-height: 1.6;
  font-family: $serif;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0 2px 14px rgba(20, 30, 10, 0.35);
}
.hero-desc {
  max-width: 240px;
  margin-bottom: 20px;
  font-size: 10px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.9);
}
.hero-button {
  min-height: 39px;
  padding: 9px 15px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border-radius: 6px;
  background: rgba(245, 242, 232, 0.95);
  font-size: 11px;
  font-weight: 600;
  color: $ink;
}
.hero-bottom {
  position: absolute;
  bottom: 49px;
  left: 18px;
  right: 18px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 10px;
}
.hero-arrow {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-dots {
  display: flex;
  align-items: center;
  gap: 4px;
}
.hero-dot {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.25s ease;
}
.hero-dot.on {
  width: 18px;
  background: #ffffff;
}
.hero-count {
  margin-left: auto;
  font-size: 9px;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.85);
}

/* ---------- 搜索卡 ---------- */
.booking-wrap {
  position: relative;
  z-index: 5;
}
.booking-bar {
  margin-top: -26px;
  padding: 18px 16px;
  border-radius: 9px;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(60, 70, 45, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.booking-bar-title {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 12px;
  font-weight: 700;
  color: $ink;
  font-family: $serif;
}
.booking-fields {
  display: flex;
  gap: 10px;
}
.booking-field {
  flex: 1;
  min-width: 0;
}
.booking-field-inner {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.field-label {
  font-size: 8px;
  color: $ink-muted;
}
.field-value {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  font-weight: 500;
  color: $ink;
}
.booking-submit {
  min-height: 37px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 6px;
  background: $green;
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
}

/* ---------- 村里消息 ---------- */
.announcement {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding-bottom: 14px;
  font-size: 9px;
}
.announcement-tag {
  color: $green;
  font-weight: 600;
  flex-shrink: 0;
}
.announcement-text {
  flex: 1;
  color: #565c4c;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.announcement-link {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  color: $green;
}

/* ---------- 主内容区 ---------- */
.quick-entries {
  margin-top: 5px;
  margin-bottom: 31px;
  padding: 19px 0;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid $line;
  border-bottom: 1px solid $line;
}
.quick-entry {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 0 5px;
  font-size: 9px;
  color: $ink-soft;
}
.quick-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: $cream-card;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 区块标题 */
.section-heading {
  margin-bottom: 18px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 10px;
}
.heading-left {
  display: flex;
  flex-direction: column;
}
.eyebrow {
  margin-bottom: 6px;
  font-size: 7px;
  letter-spacing: 0.18em;
  color: $ink-muted;
}
.h2 {
  font-size: 22px;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
  line-height: 1.4;
}
.heading-desc {
  margin-top: 6px;
  max-width: 250px;
  font-size: 9px;
  color: $ink-muted;
}
.text-link {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  color: $green;
  padding-bottom: 4px;
}

/* 卡片 */
.cards-two {
  display: flex;
  gap: 12px;
}
.card {
  flex: 1;
  min-width: 0;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
  overflow: hidden;
}
.card-image {
  position: relative;
}
.card-image image {
  width: 100%;
  height: 150px;
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
.card-body {
  padding: 13px 12px;
  display: flex;
  flex-direction: column;
}
.card-category {
  font-size: 7px;
  letter-spacing: 0.1em;
  color: $ink-muted;
}
.card-title {
  margin-top: 3px;
  font-size: 15px;
  line-height: 1.6;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
}
.card-desc {
  margin-top: 5px;
  font-size: 8px;
  line-height: 1.8;
  color: $ink-soft;
}
.card-meta {
  margin-top: 8px;
  padding: 10px 0 0;
  border-top: 1px solid #f0f2e6;
  font-size: 8px;
  color: $ink-muted;
}
.card-bottom {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-bottom.wrap-line {
  flex-wrap: wrap;
  gap: 3px;
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

/* 体验区 */
.home-experiences {
  margin-bottom: 24px;
}

/* 村历 */
.village-calendar {
  margin-bottom: 34px;
  padding: 22px;
  border-radius: 12px;
  border: 1px solid #e6e8d9;
  background: #f0f1e5;
}
.calendar-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.agenda-heading {
  display: flex;
  flex-direction: column;
}
.h3 {
  font-size: 18px;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
  line-height: 1.4;
}
.calendar-desc {
  margin-top: 5px;
  font-size: 9px;
  color: $ink-soft;
}
.agenda-days {
  margin-top: 18px;
  display: flex;
  gap: 8px;
}
.agenda-day {
  flex: 1;
  padding: 9px 0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.agenda-day .day-week {
  font-size: 8px;
  color: $ink-muted;
}
.agenda-day .day-num {
  font-size: 13px;
  font-weight: 600;
  color: $ink;
}
.agenda-day .day-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: $green;
}
.agenda-day.active {
  background: $green;
}
.agenda-day.active .day-week,
.agenda-day.active .day-num {
  color: #ffffff;
}
.agenda-day.active .day-dot {
  background: #ffffff;
}
.agenda-events {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #dfe5cf;
  display: flex;
  gap: 18px;
}
.agenda-event {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.event-time {
  font-size: 8px;
  color: $green;
  font-weight: 600;
}
.event-name {
  font-size: 11px;
  font-weight: 600;
  color: $ink;
}
.event-meta {
  font-size: 8px;
  color: $ink-muted;
}
.agenda-more {
  margin-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 9px;
  color: $green;
}

/* 民宿 */
.home-stays {
  margin-bottom: 33px;
}
.stay-editorial {
  display: flex;
  flex-direction: column;
  background: #ebeede;
  border-radius: 10px;
  
}
.stay-editorial-image {
  position: relative;
}
.stay-editorial-image image {
  width: 100%;
  height: 240px;
  display: block;
 border-radius: 10px 10px 0 0;

}
.stay-image-label {
  position: absolute;
  left: 14px;
  bottom: 14px;
  font-size: 8px;
  letter-spacing: 0.2em;
  color: #ffffff;
  text-shadow: 0 1px 6px rgba(20, 30, 10, 0.4);
}
.stay-editorial-copy {
  padding: 28px 15px 37px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.stay-title {
  font-size: 24px;
  line-height: 1.5;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
}
.stay-desc {
  margin-top: 11px;
  font-size: 11px;
  color: $ink-soft;
}
.stay-features {
  margin: 18px 0;
  display: flex;
  gap: 20px;
}
.stay-feature {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: $ink-soft;
}
.stay-button {
  min-height: 30px;
  padding: 9px 15px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  background: $green;
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
}

/* 套餐 */
.home-packages {
  margin-bottom: 33px;
}
.home-packages .card-image image {
  height: 165px;
}
.home-packages .card-title {
  font-size: 13px;
}
.home-packages .price-num {
  font-size: 18px;
}

/* 村庄 CTA */
.village-strip {
  margin-bottom: 28px;
  padding: 25px;
  border-radius: 12px;
  background: radial-gradient(circle at 85% 15%, #6f8a63 0%, rgba(111, 138, 99, 0) 55%), $green;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.strip-eyebrow {
  font-size: 7px;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.65);
}
.strip-title {
  margin-top: 10px;
  font-size: 22px;
  line-height: 1.6;
  font-family: $serif;
  font-weight: 600;
  color: #ffffff;
  white-space: pre-line;
}
.strip-desc {
  margin-top: 10px;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.8);
}
.strip-button {
  margin-top: 24px;
  min-height: 30px;
  padding: 9px 15px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  background: rgba(245, 242, 232, 0.95);
  font-size: 11px;
  font-weight: 600;
  color: $ink;
}

/* 演示说明 */
.demo-caption {
  display: block;
  margin-bottom: 28px;
  font-size: 8px;
  line-height: 1.8;
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
