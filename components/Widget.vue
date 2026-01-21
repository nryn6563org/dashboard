<template>
  <div class="widget-container group">
    <!-- Widget Header -->
    <div class="widget-header">
      <div class="widget-title-container">
        <input 
          v-if="isEditingTitle"
          ref="titleInput"
          v-model="localTitle"
          class="widget-title-input"
          @blur="saveTitle"
          @keyup.enter="saveTitle"
        >
        <h4 
          v-else 
          class="widget-title"
          :class="{ 'is-editable': isEditMode }"
          @click="startEditTitle"
        >
          {{ title }}
        </h4>
      </div>
      <div class="widget-timestamp">
        {{ currentDateTime }}
      </div>
    </div>
    
    <!-- Widget Content -->
    <div class="widget-content">
      <slot>
        <div class="widget-no-data">
          <div class="widget-no-data-icon">
            <i-layout-dashboard :size="24" />
          </div>
          <span class="widget-no-data-text">데이터가 없습니다</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '위젯' },
    isEditMode: { type: Boolean, default: false }
  },
  data() {
    return {
      isEditingTitle: false,
      localTitle: this.title
    }
  },
  watch: {
    title(newVal) {
      this.localTitle = newVal
    }
  },
  computed: {
    currentDateTime() {
      const now = new Date()
      const yy = String(now.getFullYear()).slice(-2)
      const mm = String(now.getMonth() + 1).padStart(2, '0')
      const dd = String(now.getDate()).padStart(2, '0')
      const hh = String(now.getHours()).padStart(2, '0')
      const min = String(now.getMinutes()).padStart(2, '0')
      return `${yy}.${mm}.${dd} ${hh}-${min}`
    }
  },
  methods: {
    startEditTitle() {
      if (this.isEditMode) {
        this.isEditingTitle = true
        this.$nextTick(() => {
          this.$refs.titleInput?.focus()
        })
      }
    },
    saveTitle() {
      this.isEditingTitle = false
      if (this.localTitle !== this.title) {
        this.$emit('update:title', this.localTitle)
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/components/widget.css';
</style>
