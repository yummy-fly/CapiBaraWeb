<template>
  <view class="global-nav-menu">
    <view class="icon-button" @tap="toggleMenu">
      <Icon :name="menuOpen ? 'close' : 'menu'" :size="20" color="#3d4534" />
    </view>
    <view v-if="menuOpen" class="nav-panel">
      <view
        v-for="item in navItems"
        :key="item.path"
        class="nav-item"
        :class="{ active: item.path === currentPath }"
        @tap="goTo(item.path)"
      >
        <text>{{ item.label }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '@/components/Icon.vue'

const menuOpen = ref(false)
const navItems = [
  { label: '村庄首页', path: '/pages/index/index' },
  { label: '山野民宿', path: '/pages/stays/stays' },
  { label: '乡村体验', path: '/pages/experiences/experiences' },
  { label: '名厨私宴', path: '/pages/chefs/chefs' },
  { label: '团建套餐', path: '/pages/packages/packages' },
  { label: '关于村庄', path: '/pages/village/village' }
]

const currentPath = computed(() => {
  const pages = getCurrentPages()
  const route = pages[pages.length - 1]?.route || ''
  return route ? `/${route}` : ''
})

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function goTo(path: string) {
  menuOpen.value = false
  uni.reLaunch({ url: path })
}
</script>

<style scoped>
.global-nav-menu {
  position: relative;
}
.icon-button {
  position: relative;
  display: flex;
  align-items: center;
  padding: 7px;
}
.nav-panel {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 20;
  width: min(420px, calc(100vw - 36px));
  box-sizing: border-box;
  padding: 22px 18px 30px;
  background: #ffffff;
  box-shadow: 0 12px 24px rgba(45, 57, 39, 0.08);
}
.nav-item {
  display: flex;
  align-items: center;
  min-height: 65px;
  color: #6f776b;
  font-size: 16px;
}
.nav-item.active {
  color: #5a7150;
  font-weight: 600;
}
</style>
