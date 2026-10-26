<template>
  <view class="page">
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

    <view v-if="!loading" class="content">
      <view class="hero">
        <image class="hero-image" :src="data.heroImage" mode="aspectFill" />
        <view class="hero-overlay" />
        <view class="hero-copy wrap">
          <text class="hero-eyebrow">THIS IS OUR LITTLE VILLAGE</text>
          <text class="hero-title">{{ data.heroTitle }}</text>
          <text class="hero-location">卡皮巴拉自治村 · 浙江丽水</text>
          <text class="hero-note">概念图 · 非村庄实拍</text>
        </view>
      </view>

      <view class="story wrap">
        <text class="eyebrow">OUR STORY</text>
        <text class="story-title">一座村庄，一种生活</text>
        <text class="story-body">在山与田之间，找到生活本来的节奏。卡皮巴拉自治村以民宿、手作体验与乡村餐桌，连接每一次温暖相聚。此页面为概念演示，具体场地与设施以甲方确认资料为准。</text>
        <view class="keywords">
          <view v-for="keyword in data.keywords" :key="keyword.word" class="keyword" @tap="goByKeyword(keyword.word)">
            <text>{{ keyword.word }}</text>
          </view>
        </view>
        <text class="keyword-label">STAY · MAKE · TASTE</text>
      </view>

      <view class="joy-section wrap">
        <text class="eyebrow">LITTLE JOYS EVERYWHERE</text>
        <text class="section-title">在村里，时间有自己的节奏</text>

        <view v-for="section in data.sections" :key="section.key" class="village-section" @tap="goToSection(section.key)">
          <image class="section-image" :src="section.image" mode="aspectFill" />
          <view class="section-head">
            <Icon :name="section.key === 'stays' ? 'mountain' : section.key === 'experiences' ? 'leaf' : 'utensils'" :size="31" color="#506b49" />
            <Icon name="arrowupright" :size="23" color="#506b49" />
          </view>
          <text class="section-title-small">{{ section.title }}</text>
          <text class="section-desc">{{ section.desc }}</text>
        </view>
      </view>

      <view class="route-card wrap">
        <text class="route-eyebrow">FIND YOUR WAY TO THE VILLAGE</text>
        <text class="route-title">来村里坐坐</text>
        <view class="location-row">
          <Icon name="pin" :size="24" color="#91a080" />
          <text>浙江省 · 丽水市（详细地址待甲方确认）</text>
        </view>
        <text class="route-desc">出发前请联系运营确认具体地址、停车位置及接驳安排。Demo不提供真实地图导航或未经确认的车程信息。</text>
        <view class="route-action" @tap="showRouteTip">
          <text>咨询到店路线</text>
          <Icon name="arrowupright" :size="18" color="#ffffff" />
        </view>
        <view class="route-divider" />
        <text class="facility-title">配套设施 · 演示规划</text>
        <view class="facility-grid">
          <view class="facility-item">
            <Icon name="car" :size="25" color="#91a080" />
            <text>停车区域</text>
          </view>
          <view class="facility-item">
            <Icon name="users" :size="25" color="#91a080" />
            <text>团建活动空间</text>
          </view>
          <view class="facility-item">
            <Icon name="utensils" :size="25" color="#91a080" />
            <text>乡村餐厅</text>
          </view>
          <view class="facility-item">
            <Icon name="leaf" :size="25" color="#91a080" />
            <text>亲子体验区</text>
          </view>
        </view>
        <text class="facility-note">实际可用设施、位置与服务以甲方确认资料为准。</text>
      </view>

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
          <text @tap="goToVillage">村庄介绍</text>
          <text @tap="goToOrders">我的预约</text>
            <text>运营后台</text>
            <text @tap="showRouteTip">联系村里</text>
          </view>
          <view class="footer-bottom">
            <text>丽水卡皮巴拉健康科技有限公司 × 杭州咏创科技集团有限公司</text>
            <text>DEMO · 2026</text>
          </view>
        </view>
      </view>
    </view>
    <view v-else class="loading">正在准备村庄信息…</view>

    <TabBar />
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Icon from '@/components/Icon.vue'
import GlobalNavMenu from '@/components/GlobalNavMenu.vue'
import TabBar from '@/components/TabBar.vue'
import { fetchVillageData } from '@/api/village'
import type { VillageData, VillageSection } from '@/data/village'

const loading = ref(true)
const data = ref<VillageData>({} as VillageData)

onMounted(async () => {
  data.value = await fetchVillageData()
  loading.value = false
})

function goToSection(key: VillageSection['key']) {
  const paths = {
    stays: '/pages/stays/stays',
    experiences: '/pages/experiences/experiences',
    chefs: '/pages/chefs/chefs'
  }
  uni.navigateTo({ url: paths[key] })
}

function goByKeyword(word: string) {
  const key = word === '住' ? 'stays' : word === '做' ? 'experiences' : 'chefs'
  goToSection(key)
}

function goToVillage() {
  uni.reLaunch({ url: '/pages/village/village' })
}

function goToOrders() {
  uni.navigateTo({ url: '/pages/orders/orders' })
}

function showRouteTip() {
  uni.showToast({ title: '请联系运营咨询路线', icon: 'none' })
}
function goMessages() {
  uni.navigateTo({ url: '/pages/messages/messages' })
}
</script>

<style lang="scss" scoped>
$green: #506b49;
$ink: #26352a;
$muted: #8a9b83;
$cream: #f8f8f2;
$card: #eef0e5;
$line: #dce3d2;
$serif: 'Noto Serif SC', 'Songti SC', 'STSong', 'SimSun', serif;

.page { min-height: 100vh; padding-bottom: 59px; background: $cream; color: $ink; }
.wrap { width: calc(100% - 36px); margin: 0 auto; }
.header { background: #fff; position: relative; z-index: 10; }
.header-inner { min-height: 68px; display: flex; align-items: center; justify-content: space-between; }
.brand, .header-actions, .icon-button { display: flex; align-items: center; }
.brand { gap: 6px; }.brand-text { display: flex; flex-direction: column; }.brand-name { font: 700 15px $serif; letter-spacing: .035em; }.brand-en { font-size: 6px; letter-spacing: .2em; color: $muted; }
.header-actions { gap: 5px; }.icon-button { position: relative; padding: 7px; }.badge-dot { position: absolute; top: 6px; right: 6px; width: 6px; height: 6px; border-radius: 50%; background: #c6a35c; }
.hero { position: relative; height: 477px; overflow: hidden; }.hero-image, .hero-overlay { position: absolute; inset: 0; width: 100%; height: 100%; }.hero-overlay { background: linear-gradient(180deg, rgba(24,40,27,.18), rgba(24,40,27,.6)); }.hero-copy { position: relative; height: 100%; box-sizing: border-box; padding-top: 95px; color: #fff; }.hero-eyebrow, .eyebrow { display: block; font-size: 8px; letter-spacing: .2em; font-weight: 600; }.hero-title { display: block; width: 260px; margin-top: 35px; font: 600 39px/1.75 $serif; white-space: pre-line; }.hero-location { display: block; margin-top: 24px; font-size: 12px; }.hero-note { position: absolute; right: 18px; bottom: 30px; font-size: 10px; }
.story { padding: 48px 18px 50px; box-sizing: border-box; }.eyebrow { color: $ink; }.story-title, .section-title, .visit-title { display: block; font-family: $serif; }.story-title { margin-top: 24px; font-size: 28px; }.story-body { display: block; margin-top: 28px; color: $muted; font-size: 16px; line-height: 2; }.keywords { display: flex; gap: 18px; margin-top: 34px; }.keyword { width: 68px; height: 68px; border: 1px solid #cbd8bd; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: $ink; font: 25px $serif; }.keyword-label { display: block; margin-top: 16px; color: $muted; font-size: 10px; letter-spacing: .2em; }
.joy-section { padding: 0 18px 30px; box-sizing: border-box; }.section-title { margin-top: 22px; font-size: 28px; }.village-section { margin-top: 30px; }.section-image { width: 100%; height: 285px; display: block; border-radius: 12px; }.section-head { display: flex; justify-content: space-between; align-items: center; margin: 26px 3px 0; }.section-title-small { display: block; margin-top: 17px; font: 27px $serif; }.section-desc { display: block; margin-top: 13px; color: $muted; font-size: 15px; }
.route-card { box-sizing: border-box; margin-top: 20px; padding: 43px 37px 38px; border-radius: 14px; background: $card; }.route-eyebrow { display: block; color: $ink; font-size: 10px; letter-spacing: .2em; font-weight: 600; }.route-title { display: block; margin-top: 28px; font: 600 31px/1.3 $serif; }.location-row { display: flex; align-items: center; gap: 12px; margin-top: 30px; color: $muted; font-size: 14px; line-height: 1.5; }.route-desc { display: block; margin-top: 29px; color: $muted; font-size: 14px; line-height: 2; }.route-action { width: 231px; height: 72px; margin-top: 28px; border-radius: 10px; background: $green; display: flex; align-items: center; justify-content: center; gap: 18px; color: #fff; font-size: 17px; font-weight: 600; }.route-divider { height: 1px; margin-top: 42px; background: $line; }.facility-title { display: block; margin-top: 38px; font: 600 20px/1.3 $serif; }.facility-grid { display: grid; grid-template-columns: 1fr 1fr; row-gap: 25px; margin-top: 33px; }.facility-item { display: flex; align-items: center; gap: 12px; color: $muted; font-size: 14px; white-space: nowrap; }.facility-note { display: block; margin-top: 37px; color: $muted; font-size: 12px; line-height: 1.7; }
.site-footer { margin-top: 48px; padding: 42px 0 24px; background: $card; }.footer-inner { box-sizing: border-box; }.footer-slogan { display: block; margin: 22px 0 35px 43px; color: $muted; font-size: 12px; }.footer-links { display: flex; justify-content: space-between; color: #6f806a; font-size: 11px; }.footer-bottom { display: flex; justify-content: space-between; gap: 12px; margin-top: 30px; padding-top: 18px; border-top: 1px solid $line; color: $muted; font-size: 8px; line-height: 1.6; }.loading { min-height: 500px; display: flex; align-items: center; justify-content: center; color: $muted; }
@media (max-width: 390px) { .hero { height: 430px; }.hero-title { font-size: 34px; }.story-body { font-size: 14px; }.section-image { height: 240px; }.section-title-small { font-size: 24px; }.route-card { padding-left: 28px; padding-right: 28px; }.route-action { width: 100%; }.location-row, .route-desc, .facility-item { font-size: 13px; }.footer-links { font-size: 10px; } }
</style>
