<template>
  <div class="widget-container group">
    <!-- Widget Header -->
    <div class="widget-header">
      <div class="flex-1 min-w-0">
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
          :class="{ 'cursor-text hover:text-blue-600': isEditMode }"
          @click="startEditTitle"
        >
          {{ title }}
        </h4>
      </div>
      <div class="widget-actions">
        <button 
          v-if="isEditMode"
          class="widget-action-btn text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          title="위젯 삭제"
          @click="$emit('remove')"
        >
          <i-trash2 :size="14" />
        </button>
        <button v-else class="widget-action-btn">
          <i-maximize-2 :size="14" />
        </button>
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
