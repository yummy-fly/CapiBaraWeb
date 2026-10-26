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
        <text class="eyebrow">{{ account.eyebrow }}</text>
        <text class="intro-title">{{ account.title }}</text>
        <text class="intro-desc">{{ account.desc }}</text>
      </view>
    </view>

    <!-- 主内容 -->
    <view class="page-content">
      <!-- 登录卡 -->
      <view class="wrap">
        <view class="user-card">
          <view class="user-row">
            <view class="user-avatar">
              <Icon name="logo" :size="34" color="#5a7150" />
            </view>
            <view class="user-info">
              <text class="user-role">{{ account.user.role }}</text>
              <text class="user-name">{{ userName }}</text>
              <text class="user-phone">演示登录中 · {{ userPhone }}</text>
            </view>
          </view>
          <view class="logout-button" @tap="onLogout">
            <Icon name="logout" :size="14" color="#3d4534" />
            <text>{{ account.user.logoutText }}</text>
          </view>
        </view>
      </view>

      <!-- 我的预约 -->
      <view class="wrap">
        <view class="booking-card">
          <view class="booking-head">
            <text class="booking-title">{{ account.bookingTitle }}</text>
            <view class="booking-more" @tap="goOrders">
              <text>{{ account.bookingMore }}</text>
              <Icon name="arrowright" :size="13" color="#3d4534" />
            </view>
          </view>
          <view class="stats-row">
            <view
              v-for="(s, i) in displayStats"
              :key="s.label"
              class="stat-item"
              :class="{ 'stat-line': i > 0 }"
              @tap="onStatTap(s.label)"
            >
              <view class="stat-icon">
                <Icon name="calendar" :size="26" color="#3d4534" />
                <text class="stat-badge">{{ s.count }}</text>
              </view>
              <text class="stat-label">{{ s.label }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 功能卡 2×2 -->
      <view class="wrap">
        <view class="menu-grid">
          <view v-for="m in account.menus" :key="m.key" class="menu-card" @tap="onMenuTap(m)">
            <view class="menu-icon">
              <Icon :name="m.icon" :size="24" color="#3d4534" />
            </view>
            <text class="menu-title">{{ m.title }}</text>
            <text class="menu-desc">{{ m.desc }}</text>
          </view>
        </view>
      </view>

      <!-- 盾牌提示 -->
      <view class="wrap">
        <view class="shield-tip">
          <Icon name="shield" :size="18" color="#5a7150" />
          <text>{{ account.shieldTip }}</text>
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
    <TabBar current="account" />

    <!-- 个人资料弹窗 -->
    <view v-if="showProfile" class="modal-mask" @tap="showProfile = false">
      <view class="modal" @tap.stop>
        <view class="modal-head">
          <text class="modal-title">编辑演示资料</text>
          <view class="modal-close" @tap="showProfile = false">
            <Icon name="close" :size="16" color="#3d4534" />
          </view>
        </view>
        <text class="modal-tip">请勿填写真实个人资料或身份证信息。</text>
        <view class="modal-field">
          <text class="modal-label">昵称 / 姓名</text>
          <input class="modal-input" v-model="profileName" placeholder="请填写昵称" placeholder-class="input-ph" />
        </view>
        <view class="modal-field">
          <text class="modal-label">演示手机号</text>
          <input class="modal-input" v-model="profilePhone" type="number" placeholder="请填写手机号" placeholder-class="input-ph" />
        </view>
        <view class="modal-save" @tap="saveProfile">
          <text>保存演示资料</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Icon from '@/components/Icon.vue'
import GlobalNavMenu from '@/components/GlobalNavMenu.vue'
import TabBar from '@/components/TabBar.vue'
import { fetchAccountData } from '@/api/account'
import { fetchOrdersData } from '@/api/orders'
import type { AccountData, AccountMenuCard } from '@/data/account'
import type { OrderItem } from '@/data/orders'

/* ---------- 页面数据（通过 API 层获取） ---------- */
const account = ref<AccountData>({
  eyebrow: '',
  title: '',
  desc: '',
  user: { role: '', name: '', phone: '', logoutText: '' },
  bookingTitle: '',
  bookingMore: '',
  stats: [],
  menus: [],
  shieldTip: ''
})

onMounted(async () => {
  account.value = await fetchAccountData()
  userName.value = account.value.user.name
  userPhone.value = account.value.user.phone
  profileName.value = account.value.user.name
  profilePhone.value = account.value.user.phone
  loadOrderStats()
})

/* ---------- 我的预约统计（与订单页数据同源） ---------- */
const orderList = ref<OrderItem[]>([])

async function loadOrderStats() {
  const data = await fetchOrdersData()
  orderList.value = data.orders
}

const displayStats = computed(() =>
  account.value.stats.map((s) => ({
    ...s,
    count: orderList.value.filter((o) => o.status === s.label).length
  }))
)

/* ---------- 用户资料 ---------- */
const userName = ref('')
const userPhone = ref('')
const showProfile = ref(false)
const profileName = ref('')
const profilePhone = ref('')

function saveProfile() {
  if (!profileName.value.trim()) {
    uni.showToast({ title: '请填写昵称', icon: 'none' })
    return
  }
  userName.value = profileName.value
  userPhone.value = profilePhone.value
  showProfile.value = false
  uni.showToast({ title: '演示：资料已保存', icon: 'success' })
}

/* ---------- 交互 ---------- */
function onLogout() {
  uni.showToast({ title: '演示：已退出登录', icon: 'none' })
}
function goOrders() {
  uni.reLaunch({ url: '/pages/orders/orders' })
}
function goVillage() {
  uni.reLaunch({ url: '/pages/village/village' })
}
function goMessages() {
  uni.navigateTo({ url: '/pages/messages/messages' })
}
function onStatTap(status: string) {
  uni.reLaunch({ url: `/pages/orders/orders?status=${status}` })
}
function onMenuTap(m: AccountMenuCard) {
  if (m.key === 'favorites') {
    uni.navigateTo({ url: '/pages/favorites/favorites' })
  } else if (m.key === 'profile') {
    profileName.value = userName.value
    profilePhone.value = userPhone.value
    showProfile.value = true
  } else if (m.key === 'messages') {
    goMessages()
  } else {
    uni.showToast({ title: '演示：客服即将开放', icon: 'none' })
  }
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

/* ---------- 页面介绍 ---------- */
.page-intro {
  background: #f0f1e5;
  padding: 26px 0;
}
.eyebrow {
  display: block;
  margin-bottom: 9px;
  font-size: 8px;
  letter-spacing: 0.15em;
  color: $ink-muted;
}
.intro-title {
  display: block;
  font-size: 30px;
  line-height: 1.4;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
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

/* 登录卡 */
.user-card {
  padding: 22px;
  background: #eaf0df;
    border: 1px solid #e2e8d4;
    border-radius: 11px;
}
.user-row {
  display: flex;
  align-items: center;
  gap: 15px;
}
.user-avatar {
  flex-shrink: 0;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #e2e7d2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.user-role {
  font-size: 8px;
  letter-spacing: 0.15em;
  color: $ink-muted;
}
.user-name {
  font-size: 22px;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
}
.user-phone {
  font-size: 9px;
  color: $ink-soft;
}
.logout-button {
  margin-top: 18px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid #dfe5cf;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.45);
  font-size: 11px;
  font-weight: 600;
  color: $ink;
}

/* 我的预约 */
.booking-card {
  margin-top: 16px;
  padding: 20px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
}
.booking-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.booking-title {
  font-size: 20px;
  font-family: $serif;
  font-weight: 700;
  color: $ink;
}
.booking-more {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 9px;
  color: $ink;
}
.stats-row {
  margin-top: 18px;
  display: flex;
  align-items: stretch;
}
.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
}
.stat-line {
  border-left: 1px solid #f0f2e6;
}
.stat-icon {
  position: relative;
}
.stat-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #e4e8d7;
  font-size: 8px;
  color: $ink;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.stat-label {
  font-size: 9px;
  color: $ink-soft;
}

/* 功能卡 2×2 */
.menu-grid {
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.menu-card {
  box-sizing: border-box;
  width: 48.5%;
  margin-bottom: 12px;
  padding: 20px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.menu-icon {
  margin-bottom: 14px;
}
.menu-title {
  font-size: 13px;
  font-weight: 700;
  color: $ink;
}
.menu-desc {
  margin-top: 6px;
  font-size: 9px;
  line-height: 1.7;
  color: $ink-muted;
}

/* 盾牌提示 */
.shield-tip {
  margin-top: 12px;
  padding: 16px 18px;
  border-radius: 9px;
  background: $cream-card;
  border: 1px solid #e4e8d7;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.shield-tip text {
  flex: 1;
  font-size: 9px;
  line-height: 1.9;
  color: $ink-soft;
}

/* 页脚 */
.site-footer {
  margin-top: 30px;
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

/* ---------- 个人资料弹窗 ---------- */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(40, 48, 32, 0.45);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.modal {
  width: 100%;
  max-width: 420px;
  padding: 24px;
  border-radius: 12px;
  background: #ffffff;
}
.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal-title {
  font-size: 21px;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
}
.modal-close {
  padding: 4px;
}
.modal-tip {
  display: block;
  margin-top: 14px;
  font-size: 10px;
  color: $ink-soft;
}
.modal-field {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.modal-label {
  font-size: 10px;
  color: $ink-soft;
}
.modal-input {
  height: 42px;
  padding: 0 12px;
  border: 1px solid $line;
  border-radius: 8px;
  background: #ffffff;
  font-size: 12px;
  color: $ink;
}
.input-ph {
  color: #b6bcaa;
}
.modal-save {
  margin-top: 22px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: $green;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
}
</style>
