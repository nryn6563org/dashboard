<template>
  <section :class="['widget', `size-${w}x${h}`, { 'is-resizing': isResizing }]">
    <header class="widget-header">
      <div class="title-group">
        <span class="material-symbols-rounded">folder_open</span>
        <input
v-if="isEditMode" :value="title" class="edit-title-input"
          @input="$emit('update-title', $event.target.value)">
        <h3 v-else class="widget-title">{{ title }}</h3>
      </div>
      <div v-if="isEditMode" class="widget-controls">
        <div class="drag-handle">
          <span class="material-symbols-rounded">drag_indicator</span>
        </div>
        <button class="remove-btn" @click="$emit('remove')">
          <span class="material-symbols-rounded">close</span>
        </button>
      </div>
    </header>

    <div class="widget-body">
      <textarea
v-if="isEditMode" :value="content" class="edit-content-input"
        @input="$emit('update-content', $event.target.value)" />
      <slot v-else></slot>

      <div v-if="isEditMode" class="resizer-handle" @mousedown.stop.prevent="initResize">
        <span class="material-symbols-rounded">south_east</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DashBoardWidget',
  props: {
    title: { type: String, default: '위젯' },
    content: { type: String, default: '' },
    w: { type: Number, default: 4 },
    h: { type: Number, default: 4 },
    isEditMode: { type: Boolean, default: false }
  },
  data() {
    return {
      isResizing: false
    }
  },
  methods: {
    initResize() {
      this.isResizing = true
      window.addEventListener('mousemove', this.resize)
      window.addEventListener('mouseup', this.stopResize)
    },
    resize(e) {
      if (!this.isResizing) { return }

      // 현재 위젯의 절대 위치 획득
      const rect = this.$el.getBoundingClientRect()

      /* --- 핵심: 사용자가 설정한 $100\text{px}$ 단위를 기준으로 리사이즈 계산 --- */
      const colWidth = 100
      const rowHeight = 100

      // 마우스 좌표를 그리드 단위($1\text{unit}$)로 환산
      let targetW = Math.round((e.clientX - rect.left) / colWidth)
      let targetH = Math.round((e.clientY - rect.top) / rowHeight)

      // 최소 2x2, 최대 12x24 범위 제한 및 스냅 적용
      targetW = Math.max(2, Math.min(12, Math.round(targetW / 2) * 2))
      targetH = Math.max(2, Math.min(24, Math.round(targetH / 2) * 2))

      if (targetW !== this.w || targetH !== this.h) {
        this.$emit('update-size', { w: targetW, h: targetH })
      }
    },
    stopResize() {
      this.isResizing = false
      window.removeEventListener('mousemove', this.resize)
      window.removeEventListener('mouseup', this.stopResize)
    }
  }
}
</script>

<style scoped>
@import url('@/assets/css/dashboard_widget.css');
</style>