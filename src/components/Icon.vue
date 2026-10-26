<template>
  <image
    class="ui-icon"
    :src="src"
    :style="{ width: size + 'px', height: size + 'px' }"
    mode="aspectFit"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ICONS } from '../utils/icons'

const props = withDefaults(
  defineProps<{
    name: string
    size?: number
    color?: string
  }>(),
  { size: 20, color: '#3d4534' }
)

const src = computed(() => {
  const svg = (ICONS[props.name] || '').replace(/\{c\}/g, props.color)
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
})
</script>

<style scoped>
.ui-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
</style>
