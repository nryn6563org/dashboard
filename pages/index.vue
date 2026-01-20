<template>
  <div class="index-container dashboard-page">
    <!-- Dashboard Header/Actions -->
    <div class="index-header">
      <div>
        <h1 class="index-title">워크스페이스</h1>
        <p class="index-subtitle">인터랙티브 위젯과 시스템 인사이트를 관리합니다.</p>
      </div>
      
      <div class="index-actions">
        <button 
          v-if="!isEditMode"
          @click="openAddWidget"
          class="btn-add-widget-main"
        >
          <i-plus :size="18" />
          <span>위젯 추가</span>
        </button>
        <button 
          v-else
          @click="$store.commit('SET_EDIT_MODE', false)"
          class="btn-edit-done"
        >
          <i-check :size="18" />
          <span>편집 완료</span>
        </button>
      </div>
    </div>

    <!-- Grid Layout Board -->
    <div class="grid-board-container">
      <client-only>
        <grid-layout
          :layout.sync="localLayout"
          :col-num="12"
          :row-height="300"
          :is-draggable="isEditMode"
          :is-resizable="isEditMode"
          :vertical-compact="true"
          :margin="[20, 20]"
          :use-css-transforms="true"
          :responsive="true"
          class="min-h-full"
          @layout-updated="onLayoutUpdated"
        >
          <grid-item
            v-for="item in localLayout"
            :key="item.i"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            class="group"
            @resized="onResized"
            @moved="onMoved"
          >
            <Widget 
              :title="item.title"
              :is-edit-mode="isEditMode"
              @remove="handleRemoveWidget(item.i)"
              @update:title="handleUpdateTitle(item.i, $event)"
            >
              <!-- Simulated Widget Data -->
              <div v-if="item.title === '매출'" class="h-full flex flex-col justify-end">
                <div class="text-3xl font-black mb-1">₩42,910,000</div>
                <div class="text-xs text-green-500 flex items-center gap-1 font-bold">
                  <span>↑ 12.5%</span>
                  <span class="text-slate-400 font-normal">지난달 대비</span>
                </div>
              </div>
            </Widget>
            
            <!-- Edit Overlay -->
            <div v-if="isEditMode" class="edit-overlay"></div>
          </grid-item>
        </grid-layout>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localLayout: []
    }
  },
  computed: {
    isEditMode() { return this.$store.state.isEditMode },
    widgets() { return this.$store.state.widgets }
  },
  watch: {
    widgets: {
      handler(newVal) {
        const nextStr = JSON.stringify(newVal);
        const currentStr = JSON.stringify(this.localLayout);
        if (nextStr !== currentStr) {
          this.localLayout = JSON.parse(nextStr);
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onLayoutUpdated(newLayout) {
      this.$store.commit('UPDATE_WIDGETS', JSON.parse(JSON.stringify(newLayout)));
    },
    onResized(i, newH, newW, newHPx, newWPx) {
      // Logic if needed
    },
    onMoved(i, newX, newY) {
      // Logic if needed
    },
    openAddWidget() {
      this.$store.commit('SET_EDIT_MODE', true);
      this.$store.commit('SET_DRAWER', 'widget');
    },
    handleRemoveWidget(id) {
      this.$store.commit('REMOVE_WIDGET', id);
    },
    handleUpdateTitle(id, title) {
      this.$store.commit('UPDATE_WIDGET_TITLE', { id, title });
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/pages/index.css';

.vue-grid-item.vue-grid-placeholder {
  background: rgba(59, 130, 246, 0.1) !important;
  border-radius: 1rem !important;
}
</style>
