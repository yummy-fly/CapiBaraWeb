<template>
  <view class="bottom-nav">
    <view
      v-for="tab in tabs"
      :key="tab.key"
      class="bottom-nav-item"
      :class="{ active: current === tab.key }"
      @tap="onSwitch(tab)"
    >
      <Icon :name="tab.icon" :size="22" :color="current === tab.key ? '#5a7150' : '#9ba58d'" />
      <text>{{ tab.label }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import Icon from './Icon.vue'

interface TabItem {
  key: string
  path: string
  label: string
  icon: string
}

const props = defineProps<{ current?: string }>()

const tabs: TabItem[] = [
  { key: 'index', path: '/pages/index/index', label: '首页', icon: 'home' },
  { key: 'experiences', path: '/pages/experiences/experiences', label: '体验', icon: 'sprout' },
  { key: 'stays', path: '/pages/stays/stays', label: '民宿', icon: 'bed' },
  { key: 'orders', path: '/pages/orders/orders', label: '订单', icon: 'calendar' },
  { key: 'account', path: '/pages/account/account', label: '我的', icon: 'user' }
]

function onSwitch(tab: TabItem) {
  uni.reLaunch({ url: tab.path })
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 40;
  display: flex;
  min-height: 59px;
  padding-bottom: env(safe-area-inset-bottom);
  background: rgba(255, 255, 255, 0.94);
  border-top: 1px solid #e7ebdc;
  backdrop-filter: blur(10px);
}
.bottom-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 7px 0;
  font-size: 9px;
  color: #9ba58d;
}
.bottom-nav-item.active {
  color: #5a7150;
  font-weight: 600;
}
</style>
