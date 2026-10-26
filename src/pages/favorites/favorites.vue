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
        <text class="eyebrow">{{ favs.eyebrow }}</text>
        <text class="intro-title">{{ favs.title }}</text>
        <text class="intro-desc">{{ favs.desc }}</text>
      </view>
    </view>

    <!-- 主内容 -->
    <view class="page-content">
      <view class="wrap">
        <view v-if="favList.length" class="fav-grid">
          <view v-for="item in favList" :key="item.id" class="fav-card" @tap="onItemTap(item)">
            <view class="fav-image">
              <image :src="item.img" mode="aspectFill" />
              <text class="image-label">{{ item.tag }}</text>
              <view class="favorite-button active" @tap.stop="removeFav(item)">
                <Icon name="heart-filled" :size="14" color="#5a7150" />
              </view>
            </view>
            <view class="fav-body">
              <text class="fav-category">{{ item.category }}</text>
              <text class="fav-title">{{ item.title }}</text>
              <text class="fav-desc">{{ item.desc }}</text>
              <text class="fav-meta">{{ item.meta }}</text>
              <view class="fav-bottom">
                <view class="price">
                  <text class="price-symbol">¥</text>
                  <text class="price-num">{{ item.price }}</text>
                  <text class="price-unit">{{ item.priceUnit }}</text>
                </view>
                <view class="round-arrow">
                  <Icon name="arrowupright" :size="14" color="#3d4534" />
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 空状态 -->
        <view v-else class="empty-panel">
          <Icon name="heart" :size="30" color="#8b9280" />
          <text class="empty-title">还没有山野心愿</text>
          <text class="empty-desc">在民宿与体验里点亮心形，把它们留在这里。</text>
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
import { fetchFavoritesData } from '@/api/account'
import type { FavoritesData, FavoriteItem } from '@/data/account'

/* ---------- 页面数据（通过 API 层获取） ---------- */
const favs = ref<FavoritesData>({ eyebrow: '', title: '', desc: '', favorites: [] })

onMounted(async () => {
  favs.value = await fetchFavoritesData()
})

const favList = computed(() => favs.value.favorites.filter((f) => f.faved))

/* ---------- 交互 ---------- */
function removeFav(item: FavoriteItem) {
  item.faved = false
  uni.showToast({ title: '已取消收藏', icon: 'none' })
}
function onItemTap(item: FavoriteItem) {
  if (item.type === '住宿') {
    uni.navigateTo({ url: `/pages/stays/detail?id=${item.id}` })
  } else {
    uni.navigateTo({ url: `/pages/experiences/detail?id=${item.id}` })
  }
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
  padding-bottom: 30px;
}

/* 收藏卡片 */
.fav-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.fav-card {
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
.fav-image {
  position: relative;
}
.fav-image image {
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
  background: #f5f2e8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fav-body {
  padding: 13px 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.fav-category {
  font-size: 7px;
  letter-spacing: 0.1em;
  color: $ink-muted;
}
.fav-title {
  margin-top: 3px;
  font-size: 15px;
  line-height: 1.6;
  font-family: $serif;
  font-weight: 600;
  color: $ink;
}
.fav-desc {
  margin-top: 5px;
  font-size: 8px;
  line-height: 1.8;
  color: $ink-soft;
}
.fav-meta {
  margin-top: 8px;
  font-size: 8px;
  color: $ink-muted;
}
.fav-bottom {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f2e6;
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

/* 空状态 */
.empty-panel {
  padding: 60px 20px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #eff1e2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.empty-title {
  margin-top: 6px;
  font-size: 14px;
  font-weight: 700;
  color: $ink;
  font-family: $serif;
}
.empty-desc {
  font-size: 10px;
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
