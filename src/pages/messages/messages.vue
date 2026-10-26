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
          <view class="icon-button active"><Icon name="bell" :size="20" color="#3d4534" /><view class="badge-dot" /></view>
          <GlobalNavMenu />
        </view>
      </view>
    </view>

    <view class="page-intro">
      <view class="wrap">
        <text class="eyebrow">NEWS FROM THE VILLAGE</text>
        <text class="intro-title">村里消息</text>
        <text class="intro-desc">每一份预约，都有回应。</text>
      </view>
    </view>

    <view class="message-content wrap">
      <view v-for="message in messages" :key="message.id" class="message-card">
        <view class="message-icon" :class="message.type">
          <Icon :name="message.type === 'notice' ? 'bell' : 'check'" :size="24" color="#5a7150" />
        </view>
        <view class="message-body">
          <text v-if="message.kicker" class="message-kicker">{{ message.kicker }}</text>
          <text class="message-title">{{ message.title }}</text>
          <text v-if="message.meta" class="message-meta">{{ message.meta }}</text>
          <view v-if="message.order" class="message-link" @tap="goOrders">
            <text>查看相关订单</text>
            <Icon name="arrowright" :size="14" color="#3d4534" />
          </view>
        </view>
      </view>
      <text class="message-note">此为本地消息中心，不会发送真实微信订阅通知。</text>
    </view>

    <view class="site-footer">
      <view class="footer-inner wrap">
        <view class="brand">
          <Icon name="logo" :size="37" color="#3d4534" />
          <view class="brand-text"><text class="brand-name">卡皮巴拉自治村</text><text class="brand-en">CAPYBARA VILLAGE</text></view>
        </view>
        <text class="footer-slogan">在山与田之间，找到生活本来的节奏。</text>
        <view class="footer-links"><text @tap="goVillage">村庄介绍</text><text @tap="goOrders">我的预约</text><text>运营后台</text><text>联系村里</text></view>
      </view>
      <view class="footer-bottom wrap"><text>丽水卡皮巴拉健康科技有限公司 × 杭州咏创科技集团有限公司</text><text>DEMO · 2026</text></view>
    </view>
    <TabBar />
  </view>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import GlobalNavMenu from '@/components/GlobalNavMenu.vue'
import TabBar from '@/components/TabBar.vue'

const messages = [
  { id: 1, type: 'notice', kicker: '村庄公告', title: '秋日乡村体验开放预约，亲子与团建请提前选择场次。', meta: '演示公告 · 由运营后台维护' },
  { id: 2, type: 'order', title: '山景 · 大床房预约已提交，当前待支付。', meta: '2026/10/23 15:47:11', order: true },
  { id: 3, type: 'order', title: '山景 · 大床房状态更新为已退款。', meta: '2026/10/22 19:18:03', order: true },
  { id: 4, type: 'order', title: '山景 · 大床房状态更新为待使用，核销凭证已生成。', meta: '2026/10/22 14:38:29', order: true },
  { id: 5, type: 'order', title: '欢迎来到自治村 Demo。项目、价格、人物和图片均为演示，请勿填写真实个人信息。', meta: '2026/10/22 11:50:18' }
]

function goOrders() { uni.reLaunch({ url: '/pages/orders/orders' }) }
function goVillage() { uni.reLaunch({ url: '/pages/village/village' }) }
</script>

<style lang="scss" scoped>
$ink: #3d4534; $green: #5a7150; $muted: #8b9280; $cream: #f8f8f2; $line: #e5e8d6;
.page { min-height: 100vh; background: $cream; padding-bottom: 59px; color: $ink; }
.wrap { width: calc(100% - 36px); margin: 0 auto; }
.header { background: #fff; border-bottom: 1px solid $line; }
.header-inner { min-height: 78px; display: flex; align-items: center; justify-content: space-between; }
.brand, .header-actions, .footer-links, .message-link { display: flex; align-items: center; }
.brand { gap: 10px; }
.brand-text { display: flex; flex-direction: column; }
.brand-name { font-family: 'Noto Serif SC', serif; font-size: 15px; font-weight: 600; }
.brand-en { margin-top: 3px; color: $muted; font-size: 8px; letter-spacing: 2px; }
.header-actions { gap: 12px; }
.icon-button { position: relative; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #f5f7ef; }
.badge-dot { position: absolute; top: 6px; right: 7px; width: 5px; height: 5px; border-radius: 50%; background: #b39b4e; }
.page-intro { padding: 48px 0 42px; background: #eef0e5; border-bottom: 1px solid $line; }
.eyebrow { display: block; color: $green; font-size: 10px; letter-spacing: 2.5px; }
.intro-title { display: block; margin-top: 22px; font-family: 'Noto Serif SC', serif; font-size: 28px; line-height: 1.2; }
.intro-desc { display: block; margin-top: 18px; color: $muted; font-size: 14px; }
.message-content { padding: 36px 0 52px; }
.message-card { display: flex; gap: 18px; margin-bottom: 24px; padding: 28px; background: #fff; border: 1px solid #dfe3d4; border-radius: 14px; }
.message-icon { flex: 0 0 50px; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: #edf3e4; }
.message-body { flex: 1; min-width: 0; }
.message-kicker, .message-meta { display: block; color: $muted; font-size: 9px; }
.message-kicker { margin-bottom: 12px; }
.message-title { display: block; color: #263024; font-size: 11px; line-height: 1.8; }
.message-meta { margin-top: 14px; }
.message-link { gap: 10px; margin-top: 16px; font-size: 10px; font-weight: 600; }
.message-note { display: block; color: $muted; font-size: 14px; line-height: 1.8; }
.site-footer { padding: 46px 0 24px; background: #eef0e5; border-top: 1px solid $line; }
.footer-slogan { display: block; margin-top: 22px; color: $muted; font-size: 9px; }
.footer-links { justify-content: space-between; margin-top: 34px; color: $muted; font-size: 9px; }
.footer-bottom { display: flex; justify-content: space-between; gap: 12px; margin-top: 32px; padding-top: 18px; border-top: 1px solid #dfe3d4; color: $muted; font-size: 7px; }
@media (min-width: 700px) { .wrap { width: min(920px, calc(100% - 80px)); } .message-card { padding: 30px; } }
</style>
