<template>
  <view class="page">
    <view class="header">
      <view class="header-inner wrap">
        <view class="brand">
          <Icon name="logo" :size="37" color="#3d4534" />
          <view class="brand-text"><text class="brand-name">卡皮巴拉自治村</text><text class="brand-en">CAPYBARA VILLAGE</text></view>
        </view>
        <view class="header-actions">
          <view class="icon-button" @tap="goMessages"><Icon name="bell" :size="20" color="#3d4534" /><view class="badge-dot" /></view>
          <GlobalNavMenu />
        </view>
      </view>
    </view>

    <view class="content wrap">
      <view class="back-link" @tap="goOrders"><Icon name="chevleft" :size="13" color="#71816b" /><text>返回我的订单</text></view>

      <view class="status-card">
        <view class="status-icon"><Icon :name="isCancelled ? 'close' : isPendingConfirm || isReady ? 'clock' : isCompleted ? 'check' : paid ? 'check' : 'calendar'" :size="31" color="#536b4d" /></view>
        <view class="status-copy"><text class="eyebrow">RESERVATION DETAILS</text><text class="status-title">{{ isRefunded ? '这次预约已退款' : isCancelled ? '这次预约已取消' : isPendingConfirm ? '私宴需求已收到' : isCompleted ? '把好时光，留在记忆里' : isReady ? '村里见，我们准备好了' : paid ? '预约成功，等你出发' : '好时光，待你确认' }}</text><text class="status-desc">{{ isCancelled ? '取消或退款仅改变演示订单状态，无真实资金变动。' : isPendingConfirm ? '运营将人工对接报价。Demo中可进入运营后台确认该预约。' : isCompleted ? '感谢你的到访，期待在村里再次见到你。' : isReady ? '请在到店后向前台出示预约核销码。' : paid ? '支付完成后，请按预约时间到村里核销。' : '完成模拟支付后，即可查看演示核销凭证。' }}</text></view>
      </view>

      <view class="order-card">
        <view class="summary">
          <image class="cover" :src="cover" mode="aspectFill" />
          <view class="summary-copy"><text class="category">{{ category }}</text><text class="title">{{ title }}</text><text class="summary-meta">{{ summaryDateText }} · {{ summaryPeopleText }}</text></view>
        </view>
        <view class="divider" />
        <view class="info-list">
          <view class="info-row"><text>订单编号</text><text class="value">{{ orderId }}</text></view>
          <view class="info-row"><text>预约时段</text><text class="value">{{ timeText }}</text></view>
          <view class="info-row"><text>联系人</text><text class="value">{{ name }}</text></view>
          <view class="info-row"><text>演示手机号</text><text class="value">{{ phone }}</text></view>
          <view class="info-row"><text>需求备注</text><text class="value">{{ remark || '无' }}</text></view>
          <view class="info-row"><text>创建时间</text><text class="value">{{ createdAt }}</text></view>
          <view v-if="isCompleted" class="info-row"><text>核销时间</text><text class="value">{{ verifiedAt }}</text></view>
        </view>
        <view class="divider" />
        <view class="amount-row"><text>{{ isPendingConfirm ? '参考金额（人工报价）' : '演示订单金额' }}</text><text class="amount">¥{{ price }}</text></view>
        <view class="actions">
          <view v-if="isCompleted" class="primary-button" @tap="openReview"><text>评价这次体验</text></view>
          <view v-else-if="!isCancelled && !paid && !isReady" class="primary-button" @tap="pay"><Icon name="calendar" :size="19" color="#fff" /><text>模拟支付</text></view>
          <view v-else-if="!isCancelled && !isReady && !isPendingConfirm" class="primary-button" @tap="goOrders"><Icon name="check" :size="19" color="#fff" /><text>查看我的订单</text></view>
          <view v-if="!isCancelled && (!paid || isPendingConfirm) && !isReady" class="secondary-button" @tap="cancel"><text>取消预约</text></view>
          <view v-if="isReady" class="secondary-button" @tap="refund"><text>申请退款</text></view>
          <view class="secondary-button" @tap="contact"><Icon name="headset" :size="18" color="#536b4d" /><text>联系村里</text></view>
        </view>
        <view class="refund"><text class="refund-title">退改说明</text><text>演示规则：体验开始 / 入住时间前24小时可免费取消；不足24小时请联系运营协商。</text><text>Demo退款按钮仅演示流程，正式版需校验规则与支付回调。</text></view>
      </view>

      <view v-if="isReady || isCompleted" class="pass-card"><text class="pass-eyebrow">YOUR VILLAGE PASS</text><text class="pass-title">山野通行证</text><view class="qr-frame"><image class="qr-code" :class="{ 'qr-code-used': isCompleted }" :src="qrCode" mode="aspectFit" /><view v-if="isCompleted" class="qr-overlay"><text class="qr-used">已核销</text></view></view><text class="pass-code">CAPY{{ orderId }}</text><text class="pass-status">{{ isCompleted ? '已完成核销' : '到店出示，前台核验' }}</text><view v-if="isReady" class="pass-tip"><Icon name="shield" :size="18" color="#8d9d7f" /><text>演示二维码，仅用于模拟核验；请到店向前台出示。</text></view></view>
      <view v-else-if="isCancelled" class="pass-card cancelled-pass"><text class="pass-eyebrow">YOUR VILLAGE PASS</text><text class="pass-title">山野通行证</text><Icon name="close" :size="76" color="#9ca98c" /><text class="pass-status">{{ isRefunded ? '预约已退款' : '预约已取消' }}</text><text class="pass-note">已取消订单无需核销，演示退款状态以订单记录为准。</text></view>
      <view v-else class="pass-card"><text class="pass-eyebrow">YOUR VILLAGE PASS</text><text class="pass-title">山野通行证</text><Icon name="logo" :size="76" color="#9ca98c" /><text class="pass-status">{{ isPendingConfirm ? '确认后生成核销凭证' : '付款后生成核销凭证' }}</text><text class="pass-note">{{ isPendingConfirm ? '仅待使用的演示预约可以核销。' : '仅待使用的演示预约可以核销。' }}</text></view>
    </view>

    <view class="site-footer"><view class="footer-inner wrap"><view class="brand"><Icon name="logo" :size="37" color="#3d4534" /><view class="brand-text"><text class="brand-name">卡皮巴拉自治村</text><text class="brand-en">CAPYBARA VILLAGE</text></view></view><text class="footer-slogan">在山与田之间，找到生活本来的节奏。</text><view class="footer-links"><text @tap="goVillage">村庄介绍</text><text @tap="goOrders">我的预约</text><text>运营后台</text><text>联系村里</text></view></view><view class="footer-bottom wrap"><text>丽水卡皮巴拉健康科技有限公司 × 杭州咏创科技集团有限公司</text><text>DEMO · 2026</text></view></view>
    <TabBar current="orders" />

    <view v-if="reviewVisible" class="review-mask" @tap.self="closeReview">
      <view class="review-modal">
        <view class="review-header"><text class="review-title">给好时光，留个评价</text><text class="review-close" @tap="closeReview">×</text></view>
        <view class="stars"><text v-for="star in 5" :key="star" class="star" :class="{ active: star <= reviewRating }" @tap="reviewRating = star">★</text></view>
        <text class="field-label">体验感受</text>
        <textarea v-model="reviewContent" class="review-textarea" placeholder="说说你的乡村好时光…" maxlength="500" />
        <text class="field-label upload-label">上传体验图片（小于1.5MB，勿使用敏感图片）</text>
        <view class="file-picker"><text>选择文件</text><text class="file-name">{{ reviewFileName || '未选择文件' }}</text></view>
        <view class="review-submit" @tap="saveReview">保存演示评价</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import Icon from '@/components/Icon.vue'
import GlobalNavMenu from '@/components/GlobalNavMenu.vue'
import TabBar from '@/components/TabBar.vue'
import { updateLocalOrderStatus } from '@/api/orders'

const paid = ref(false)
const isReady = ref(false)
const isPendingConfirm = ref(false)
const isCompleted = ref(false)
const isRefunded = ref(false)
const isCancelled = ref(false)
const reviewVisible = ref(false)
const reviewRating = ref(5)
const reviewContent = ref('')
const reviewFileName = ref('')
const orderId = ref('DMVNGT0TU')
const category = ref('乡村体验')
const title = ref('古法酿酒体验')
const dateText = ref('10月27日')
const timeText = ref('09:30–11:00')
const peopleText = ref('2人')
const name = ref('小林（演示）')
const phone = ref('13800000000')
const remark = ref('')
const price = ref('256')
const createdAt = ref('2026/10/25 14:46:52')
const verifiedAt = computed(() => {
  const createdTime = new Date(createdAt.value.replaceAll('/', '-'))
  if (Number.isNaN(createdTime.getTime())) return createdAt.value
  createdTime.setHours(createdTime.getHours() + 2)
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${createdTime.getFullYear()}/${pad(createdTime.getMonth() + 1)}/${pad(createdTime.getDate())} ${pad(createdTime.getHours())}:${pad(createdTime.getMinutes())}:${pad(createdTime.getSeconds())}`
})
const itemId = ref('wine-craft')
const summaryDateText = computed(() => {
  const separatorIndex = dateText.value.indexOf(' · ')
  return separatorIndex >= 0 ? dateText.value.slice(0, separatorIndex) : dateText.value
})
const summaryPeopleText = computed(() => {
  const match = peopleText.value.match(/^\d+人/)
  return match ? match[0] : peopleText.value
})
const qrCode = computed(() => {
  const seed = `${orderId.value}-${title.value}`
  return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(seed)}`
})

const cover = computed(() => {
  const prompt = category.value === '山野民宿' ? 'cozy mountain view bedroom with large window facing green mountains, wooden bed, warm morning light' : category.value === '名厨私宴' ? 'rustic long table banquet with Chinese dishes in mountain village courtyard, natural documentary photography' : category.value === '团建套餐' ? 'friends gathering for countryside team retreat, wooden table, green mountain village, warm documentary photography' : 'artisan hands working with clay wine fermentation jars in traditional Chinese craft workshop, warm earthy tones'
  return 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' + encodeURIComponent(prompt) + '&image_size=square'
})

onLoad((options) => {
  const o = (options || {}) as Record<string, string>
  if (o.id) orderId.value = o.id
  if (o.id === 'DMVJCO3OT') {
    isCancelled.value = true
    category.value = '名厨私宴'
    title.value = '林师傅 · 山野私宴'
    dateText.value = '10月24日'
    timeText.value = '11:30–13:30'
    peopleText.value = '6人 · 小林（演示）'
    price.value = '1,608'
    createdAt.value = '2026/10/22 17:39:59'
  }
  if (o.status) {
    const status = decodeURIComponent(o.status)
    isPendingConfirm.value = status === '待确认'
    isReady.value = status === '待使用'
    isCompleted.value = status === '已完成'
    isRefunded.value = status === '已退款'
    isCancelled.value = status === '已取消' || isRefunded.value
    paid.value = isPendingConfirm.value || isReady.value || isCompleted.value
  }
  if (o.category) category.value = o.category
  if (o.title) title.value = o.title
  if (o.dateText) dateText.value = o.dateText
  if (o.timeText) timeText.value = o.timeText
  if (o.peopleText) peopleText.value = o.peopleText
  if (o.name) name.value = o.name
  if (o.phone) phone.value = o.phone
  if (o.remark) remark.value = o.remark
  if (o.price) price.value = o.price
  if (o.itemId) itemId.value = o.itemId
})

function pay() {
  paid.value = true
  if (category.value === '名厨私宴') {
    isPendingConfirm.value = true
    updateLocalOrderStatus(orderId.value, '待确认')
    uni.showToast({ title: '演示：已提交村里确认', icon: 'success' })
    return
  }
  isReady.value = true
  updateLocalOrderStatus(orderId.value, '待使用')
  uni.showToast({ title: '演示：支付成功', icon: 'success' })
}
function cancel() {
  uni.showModal({ title: '取消预约', content: '确认取消这笔演示预约吗？', confirmText: '确认取消', success: (res) => {
    if (!res.confirm) return
    isCancelled.value = true
    isPendingConfirm.value = false
    isReady.value = false
    paid.value = false
    updateLocalOrderStatus(orderId.value, '已取消')
    uni.showToast({ title: '演示：预约已取消', icon: 'success' })
  } })
}
function refund() {
  uni.showModal({ title: '申请退款', content: '确认申请这笔演示订单退款吗？', confirmText: '确认申请', success: (res) => {
    if (!res.confirm) return
    isRefunded.value = true
    isCancelled.value = true
    isReady.value = false
    updateLocalOrderStatus(orderId.value, '已退款')
    uni.showToast({ title: '演示：退款申请已提交', icon: 'success' })
  } })
}
function contact() { uni.showToast({ title: '演示：村里会尽快联系你', icon: 'none' }) }
function openReview() { reviewVisible.value = true }
function closeReview() { reviewVisible.value = false }
function saveReview() {
  reviewVisible.value = false
  uni.showToast({ title: '演示：评价已保存', icon: 'success' })
}
function goOrders() { uni.reLaunch({ url: '/pages/orders/orders' }) }
function goVillage() { uni.reLaunch({ url: '/pages/village/village' }) }
function goMessages() { uni.navigateTo({ url: '/pages/messages/messages' }) }
</script>

<style lang="scss" scoped>
$green:#536b4d;$ink:#243328;$soft:#899783;$cream:#f8f8f2;$line:#e0e5d5;$serif:'Noto Serif SC','Songti SC','STSong',serif;
.page{min-height:100vh;background:$cream;padding-bottom:59px;color:$ink}.wrap{width:calc(100% - 36px);margin:0 auto}.header{background:#fff;position:relative;z-index:10}.header-inner{min-height:68px;display:flex;align-items:center;justify-content:space-between}.brand{display:flex;align-items:center;gap:6px}.brand-text{display:flex;flex-direction:column}.brand-name{font:700 15px $serif;letter-spacing:.035em}.brand-en{font-size:6px;letter-spacing:.2em;color:$soft}.header-actions{display:flex;align-items:center;gap:5px}.icon-button{position:relative;padding:7px}.badge-dot{position:absolute;top:6px;right:6px;width:6px;height:6px;border-radius:50%;background:#caa45c}.content{padding:25px 0 45px}.back-link{display:flex;align-items:center;gap:6px;color:#71816b;font-size:11px;margin-bottom:27px}.status-card{display:flex;gap:20px;align-items:center;padding:30px;border-radius:15px;background:#edf1e2;border:1px solid #dce4ce}.status-icon{width:62px;height:62px;border-radius:50%;background:#dfe8ce;display:flex;align-items:center;justify-content:center;flex-shrink:0}.status-copy{display:flex;flex-direction:column}.eyebrow,.pass-eyebrow{font-size:6px;letter-spacing:.2em;color:$green}.status-title{margin-top:1px;font:600 19px $serif}
.status-desc{margin-top:14px;font-size:10px;color:#93a18b}.order-card{margin-top:34px;padding:30px;border:1px solid #dfe4d5;border-radius:14px;background:#fff}.summary{display:flex;gap:24px;align-items:center}
.cover{width:95px;height:78px;border-radius:9px;flex-shrink:0}.summary-copy{display:flex;flex-direction:column;gap:9px}.category{font-size:7px;color:$soft}.title{font:600 17px $serif}.summary-meta{font-size:10px;color:#81927c}.divider{height:1px;background:$line;margin:30px 0}.info-list{display:flex;flex-direction:column;gap:20px}.info-row,.amount-row{display:flex;justify-content:space-between;gap:20px;color:#9ba694;font-size:11px}.info-row .value{color:$ink;text-align:right}.amount-row{align-items:center;font-size:11px}.amount{font:700 23px $serif;color:$green}.actions{display:flex;gap:16px;margin-top:28px}
.primary-button,.secondary-button
{
min-height: 34px;
    padding: 0px 12px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
}
.primary-button{background:$green;color:#fff}.secondary-button{border:1px solid #d1dac8;color:$green;background:#fff}
.refund{margin-top:31px;padding-top:28px;border-top:1px solid $line;display:flex;flex-direction:column;gap:11px;color:#93a18b;font-size:10px;line-height:1.8}
.refund-title{font:700 13px $serif;color:$ink;margin-bottom:2px}.pass-card{margin-top:34px;padding:45px 20px 50px;background:#fff;border:1px solid #dfe4d5;border-radius:14px;display:flex;align-items:center;flex-direction:column}
.pass-title{margin:24px 0 29px;font:600 23px $serif}.cancelled-pass .pass-title{margin-bottom:34px}.cancelled-pass .pass-status{margin-top:25px}.cancelled-pass .pass-note{margin-top:11px;color:#93a18b;font-size:10px;text-align:center}.qr-frame{width:198px;height:198px;padding:19px;box-sizing:border-box;border:1px solid #dfe4d5;border-radius:12px;display:flex;align-items:center;justify-content:center;position:relative}.qr-code{width:160px;height:160px;display:block}.qr-code-used{filter:grayscale(1);opacity:.28}.qr-overlay{position:absolute;inset:19px;background:rgba(255,255,255,.48);display:flex;align-items:center;justify-content:center}.qr-used{color:#849579;font:600 16px $serif}.pass-code{margin-top:25px;font-size:18px;letter-spacing:.18em;font-weight:600;color:$green}.pass-status{margin-top:13px;font:600 15px $serif;color:$soft}.pass-tip{margin-top:27px;width:calc(100% - 34px);padding:13px 15px;box-sizing:border-box;border-radius:9px;background:#eff3e7;border:1px solid #e0e8d4;display:flex;gap:10px;align-items:flex-start;color:#819078;font-size:10px;line-height:1.8}.pass-tip text{flex:1}.site-footer{background:#eef0e5;border-top:1px solid #e0e5d5;padding-top:28px}.footer-inner{padding-bottom:25px;display:flex;flex-direction:column;gap:25px}.footer-slogan{margin-left:43px;font-size:10px;color:#71816b}.footer-links{display:flex;justify-content:space-between;font-size:10px;color:#71816b}.footer-bottom{padding:14px 0 25px;border-top:1px solid #dfe5cf;display:flex;justify-content:space-between;gap:12px;font-size:8px;color:#9ba694}.review-mask{position:fixed;z-index:30;inset:0;background:rgba(49,61,51,.42);display:flex;align-items:center;justify-content:center;padding:24px 18px;box-sizing:border-box}
.review-modal{    width: 100%;
    max-width: 514px;
    padding: 16px 27px 36px;
    box-sizing: border-box;
    border-radius: 15px;
    background: #fff;}
    .review-header{display:flex;align-items:center;justify-content:space-between}
.review-title{font:600 19px $serif;color:$ink}
.review-close{font-size:20px;font-weight:500;line-height:1;color:$ink}
.stars{display: flex;
    justify-content: center;
    gap: 9px;
    margin: 15px 0 15px;}
.star{font-size:28px;line-height:1;color:#dfe3d8}
.star.active{color:#c4a94e}.field-label{display:block;color:#687767;font-size:11px}
.review-textarea,
.file-picker{width:100%;box-sizing:border-box;border:1px solid #dbe1d3;border-radius:11px;background:#fff;color:$ink;font-size:12px}
.review-textarea{height:105px;margin-top:12px;padding:15px;line-height:1.6}
.upload-label{margin-top:27px}
.file-picker{height: 50px;
    margin-top: 8px;
    padding: 0 17px;
    display: flex;
    align-items: center;
    gap: 8px;}.file-name{color:$ink}
.review-submit{    height: 50px;
    margin-top: 17px;
    border-radius: 9px;
    background: #506b4b;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;}
</style>
