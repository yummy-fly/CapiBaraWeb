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
        <text class="eyebrow">{{ pkg.eyebrow }}</text>
        <text class="intro-title">{{ pkg.title }}</text>
        <text class="intro-desc">{{ pkg.desc }}</text>
      </view>
    </view>

    <!-- 主内容 -->
    <view class="page-content">
      <view class="wrap">
        <view class="filter-chips">
          <view
            v-for="chip in pkg.filters"
            :key="chip"
            class="chip"
            :class="{ active: activeFilter === chip }"
            @tap="activeFilter = chip"
          >
            <text>{{ chip }}</text>
          </view>
        </view>
        <text class="count-text">{{ filteredPackages.length }} 个团建套餐项目</text>
      </view>

      <!-- 套餐卡片 -->
      <view class="wrap">
        <view class="pkg-grid">
          <view v-for="item in filteredPackages" :key="item.id" class="pkg-card" @tap="onPackageTap(item)">
            <view class="pkg-image">
              <image :src="item.img" mode="aspectFill" />
              <text class="image-label">{{ item.tag }}</text>
              <view class="favorite-button" :class="{ active: item.faved }" @tap.stop="toggleFav(item)">
                <Icon :name="item.faved ? 'heart-filled' : 'heart'" :size="14" :color="item.faved ? '#5a7150' : '#ffffff'" />
              </view>
            </view>
            <view class="pkg-body">
              <text class="pkg-category">{{ item.category }}</text>
              <text class="pkg-title">{{ item.title }}</text>
              <text class="pkg-desc">{{ item.desc }}</text>
              <text class="pkg-meta">{{ item.meta }}</text>
              <view class="pkg-bottom">
                <view class="price">
                  <text class="price-symbol">¥</text>
                  <text class="price-num">{{ item.price }}</text>
                  <text class="price-unit">/ {{ item.unit }}</text>
                </view>
                <view class="round-arrow">
                  <Icon name="arrowupright" :size="14" color="#3d4534" />
                </view>
              </view>
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
            <text class="notice-title">{{ pkg.noticeTitle }}</text>
            <text class="notice-desc">{{ pkg.noticeDesc }}</text>
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
import { ref, computed, onMounted } from 'vue'
import Icon from '@/components/Icon.vue'
import GlobalNavMenu from '@/components/GlobalNavMenu.vue'
import TabBar from '@/components/TabBar.vue'
import { fetchPackagesData } from '@/api/packages'
import type { PackagesData, PackageItem } from '@/data/packages'

/* ---------- 页面数据（通过 API 层获取） ---------- */
const pkg = ref<PackagesData>({
  eyebrow: '',
  title: '',
  desc: '',
  filters: ['全部'],
  packages: [],
  noticeTitle: '',
  noticeDesc: ''
})

onMounted(async () => {
  pkg.value = await fetchPackagesData()
})

/* ---------- 分类筛选 ---------- */
const activeFilter = ref('全部')
const filteredPackages = computed(() =>
  activeFilter.value === '全部'
    ? pkg.value.packages
    : pkg.value.packages.filter((p) => p.category === activeFilter.value)
)

/* ---------- 收藏 ---------- */
function toggleFav(item: PackageItem) {
  item.faved = !item.faved
  uni.showToast({ title: item.faved ? '已加入收藏' : '已取消收藏', icon: 'none' })
}

/* ---------- 交互 ---------- */
function onPackageTap(item: PackageItem) {
  uni.navigateTo({ url: `/pages/packages/detail?id=${item.id}` })
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
.filter-chips {
  display: flex;
  flex-wrap: wrap;
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

/* ---------- 套餐卡片 ---------- */
.pkg-grid {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.pkg-card {
  box-sizing: border-box;
  width: 48.5%;
  margin-bottom: 15px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.pkg-image {
  position: relative;
}
.pkg-image image {
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
.pkg-body {
  padding: 13px 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.pkg-category {
  font-size: 7px;
  letter-spacing: 0.1em;
  color: $ink-muted;
}
.pkg-title {
  margin-top: 3px;
  font-size: 15px;
  line-height: 1.6;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
}
.pkg-desc {
  margin-top: 5px;
  font-size: 8px;
  line-height: 1.8;
  color: $ink-soft;
}
.pkg-meta {
  margin-top: 8px;
  padding: 10px 0 0;
  border-top: 1px solid #f0f2e6;
  font-size: 8px;
  color: $ink-muted;
}
.pkg-bottom {
  margin-top: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px;
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

/* 演示说明 */
.notice-panel {
  margin-top: 26px;
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 9px;
  background: $cream-card;
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
