<template>
  <div class="dashboard-content">
    <div v-if="isEditMode" class="add-widget-menu">
      <button v-for="size in ['2x4', '4x6', '6x8', '12x4']" :key="size" @click="addWidget(size)">
        + {{ size }} 추가
      </button>
    </div>

    <draggable
v-model="widgets" v-bind="dragOptions" handle=".drag-handle" class="grid-container"
      :class="{ 'is-editing': isEditMode }">
      <DashBoardWidget
v-for="(item, index) in widgets" :key="item.id" :title="item.title" :content="item.content"
        :w="item.w" :h="item.h" :is-edit-mode="isEditMode" @remove="removeWidget(index)"
        @update-size="(payload) => updateWidgetSize(index, payload)" @update-title="(val) => item.title = val"
        @update-content="(val) => item.content = val">
        <div class="widget-inner-content">{{ item.content }}</div>
      </DashBoardWidget>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import DashBoardWidget from './DashBoardWidget.vue'

export default {
  components: { draggable, DashBoardWidget },
  props: { isEditMode: { type: Boolean, default: false } },
  data() { return { widgets: [] } },
  computed: {
    dragOptions() {
      return {
        animation: 300,
        disabled: !this.isEditMode,
        ghostClass: 'ghost',
        forceFallback: true
      }
    }
  },
  watch: {
    widgets: {
      deep: true,
      handler() { localStorage.setItem('dashboard-layout', JSON.stringify(this.widgets)) }
    }
  },
  mounted() {
    const saved = localStorage.getItem('dashboard-layout')
    if (saved) { this.widgets = JSON.parse(saved) } else {
      this.widgets = [
        { id: 1, title: '영상 분석', w: 6, h: 8, content: 'Sleep Awake 조회수 추이 데이터입니다.' },
        { id: 2, title: 'AI 음성 설정', w: 4, h: 4, content: '나레이션 모델: Horror-v1' }
      ]
    }
  },
  methods: {
    addWidget(size) {
      const [w, h] = size.split('x').map(Number)
      this.widgets.push({ id: Date.now(), title: '새 위젯', w, h, content: '내용을 입력하세요.' })
    },
    removeWidget(index) { this.widgets.splice(index, 1) },
    updateWidgetSize(index, { w, h }) {
      const widget = this.widgets[index]
      widget.w = w
      widget.h = h
    }
  }
}
</script>

<style>
  @import url('@/assets/css/dashboard_grid.css');
</style>