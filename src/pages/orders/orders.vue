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
        <text class="eyebrow">{{ orders.eyebrow }}</text>
        <text class="intro-title">{{ orders.title }}</text>
        <text class="intro-desc">{{ orders.desc }}</text>
      </view>
    </view>

    <!-- 主内容 -->
    <view class="page-content">
      <!-- 状态筛选 -->
      <view class="wrap">
        <view class="filter-chips">
          <view
            v-for="chip in orders.filters"
            :key="chip"
            class="chip"
            :class="{ active: activeFilter === chip }"
            @tap="activeFilter = chip"
          >
            <text>{{ chip }}</text>
            <text class="chip-count">{{ countOf(chip) }}</text>
          </view>
        </view>
      </view>

      <!-- 订单列表 -->
      <view class="wrap">
        <view v-if="filteredOrders.length" class="order-list">
          <view v-for="order in filteredOrders" :key="order.id" class="order-card" @tap="onOrderTap(order)">
            <view class="order-main">
              <image class="order-thumb" :src="order.img" mode="aspectFill" />
              <view class="order-info">
                <text class="order-category">{{ order.category }} · {{ order.id }}</text>
                <text class="order-title">{{ order.title }}</text>
                <view class="order-line">
                  <Icon name="calendar" :size="12" color="#8b9280" />
                  <text>{{ order.dateText }}</text>
                </view>
                <view class="order-line">
                  <Icon name="user" :size="12" color="#8b9280" />
                  <text>{{ order.peopleText }}</text>
                </view>
              </view>
            </view>
            <view class="order-foot">
              <text class="status-badge" :class="statusClass(order.status)">{{ order.status }}</text>
              <view class="order-price">
                <text v-if="order.pricePrefix" class="price-prefix">{{ order.pricePrefix }}</text>
                <text class="price-symbol">¥</text>
                <text class="price-num">{{ order.price }}</text>
              </view>
              <view class="order-action" @tap.stop="onActionTap(order)">
                <text>{{ order.status === '待支付' ? '去模拟支付' : '查看详情' }}</text>
                <Icon name="arrowright" :size="12" color="#3d4534" />
              </view>
            </view>
          </view>
        </view>

        <!-- 空状态 -->
        <view v-else class="empty-panel">
          <Icon name="calendar" :size="28" color="#8b9280" />
          <text class="empty-title">这里还没有订单</text>
          <text class="empty-desc">去村里挑一段好时光，预约后就会出现在这里。</text>
        </view>
      </view>

      <!-- 演示说明 -->
      <view class="wrap">
        <view class="notice-panel">
          <Icon name="shield" :size="18" color="#5a7150" />
          <text class="notice-text">{{ orders.noticeText }}</text>
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
    <TabBar current="orders" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import Icon from '@/components/Icon.vue'
import GlobalNavMenu from '@/components/GlobalNavMenu.vue'
import TabBar from '@/components/TabBar.vue'
import { fetchOrdersData } from '@/api/orders'
import type { OrdersData, OrderItem } from '@/data/orders'

/* ---------- 页面数据（通过 API 层获取） ---------- */
const orders = ref<OrdersData>({
  eyebrow: '',
  title: '',
  desc: '',
  filters: ['全部订单'],
  orders: [],
  noticeText: ''
})

onMounted(async () => {
  orders.value = await fetchOrdersData()
})

/* ---------- 状态筛选 ---------- */
const activeFilter = ref('全部订单')

/** 支持从「我的」页带 ?status=待支付 进入并定位到对应标签 */
const ORDER_STATUSES = ['待支付', '待确认', '待使用', '已完成', '已取消', '已退款']
onLoad((options) => {
  const status = (options as Record<string, string> | undefined)?.status
  if (status && ORDER_STATUSES.includes(status)) activeFilter.value = status
})

const filteredOrders = computed(() =>
  activeFilter.value === '全部订单'
    ? orders.value.orders
    : orders.value.orders.filter((o) => o.status === activeFilter.value)
)
function countOf(chip: string) {
  return chip === '全部订单'
    ? orders.value.orders.length
    : orders.value.orders.filter((o) => o.status === chip).length
}

/* ---------- 状态样式 ---------- */
function statusClass(status: string) {
  const map: Record<string, string> = {
    待支付: 'pending',
    待确认: 'confirm',
    待使用: 'ready',
    已完成: 'done',
    已取消: 'cancel',
    已退款: 'refund'
  }
  return map[status] || 'done'
}

/* ---------- 交互 ---------- */
function onOrderTap(order: OrderItem) {
  uni.navigateTo({
    url: `/pages/orders/detail?id=${order.id}&status=${encodeURIComponent(order.status)}&category=${encodeURIComponent(order.category)}&title=${encodeURIComponent(order.title)}&dateText=${encodeURIComponent(order.dateText)}&timeText=${encodeURIComponent(order.dateText.split(' · ')[1] || '')}&peopleText=${encodeURIComponent(order.peopleText)}&price=${encodeURIComponent(order.price)}`
  })
}
function onActionTap(order: OrderItem) {
  onOrderTap(order)
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
  padding: 30px 0 26px;
}
.eyebrow {
  display: block;
  margin-bottom: 9px;
  font-size: 8px;
  letter-spacing: 0.18em;
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
  padding-top: 20px;
  padding-bottom: 26px;
}

/* 状态筛选 */
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  padding: 9px 13px;
  border-radius: 7px;
  border: 1px solid $line;
  background: #ffffff;
  font-size: 10px;
  color: $ink-soft;
  display: flex;
  align-items: center;
  gap: 6px;
}
.chip-count {
  font-size: 9px;
  color: $ink-muted;
}
.chip.active {
  background: $green;
  border-color: $green;
  color: #ffffff;
  font-weight: 600;
}
.chip.active .chip-count {
  color: rgba(255, 255, 255, 0.8);
}

/* 订单卡片 */
.order-list {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 13px;
}
.order-card {
  padding: 15px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
}
.order-main {
  display: flex;
  gap: 13px;
}
.order-thumb {
  flex-shrink: 0;
  width: 92px;
  height: 92px;
  border-radius: 7px;
  display: block;
}
.order-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.order-category {
  font-size: 8px;
  letter-spacing: 0.06em;
  color: $ink-muted;
}
.order-title {
  margin-bottom: 2px;
  font-size: 17px;
  line-height: 1.5;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
}
.order-line {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 9px;
  color: $ink-soft;
}

/* 卡片底部：状态 / 价格 / 操作 */
.order-foot {
  margin-top: 14px;
  padding-top: 13px;
  border-top: 1px solid #f0f2e6;
  display: flex;
  align-items: center;
}
.status-badge {
  flex-shrink: 0;
  min-width: 58px;
  padding: 6px 9px;
  border-radius: 5px;
  font-size: 9px;
  text-align: center;
  box-sizing: border-box;
}
.status-badge.pending {
  background: #f2efdc;
  color: #857440;
}
.status-badge.confirm {
  background: #e8eef3;
  color: #5b7488;
}
.status-badge.ready {
  background: #e7efe0;
  color: $green;
}
.status-badge.done {
  background: #eceee4;
  color: $ink-soft;
}
.status-badge.cancel {
  background: #eeeee9;
  color: #8b8b80;
}
.status-badge.refund {
  background: #f7e6e6;
  color: #a56464;
}
.order-price {
  flex: 1;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
  color: $ink;
}
.price-prefix {
  margin-right: 3px;
  font-size: 12px;
  font-family: $serif;
  color: $ink-soft;
}
.price-symbol {
  font-size: 11px;
  font-weight: 600;
}
.price-num {
  font-size: 22px;
  font-family: $serif;
  font-weight: 700;
  letter-spacing: 0.01em;
}
.order-action {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  color: $ink;
}

/* 空状态 */
.empty-panel {
  margin-top: 18px;
  padding: 55px 20px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
}
.empty-title {
  margin-top: 5px;
  font-size: 14px;
  font-family: $serif;
  font-weight: 700;
  color: $ink;
}
.empty-desc {
  font-size: 10px;
  color: $ink-muted;
  text-align: center;
}

/* 演示说明 */
.notice-panel {
  margin-top: 20px;
  padding: 17px 18px;
  border-radius: 9px;
  background: #eff1e6;
  border: 1px solid #e2e7d3;
  display: flex;
  gap: 11px;
  align-items: flex-start;
}
.notice-text {
  flex: 1;
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
