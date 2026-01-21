<template>
  <div class="index-container dashboard-page">
    <!-- Top Section: Greeting, Search, Mini Index -->
    <section class="dashboard-top-section">
      <div class="dashboard-top-inner">
        <h1 class="greeting-title">
          안녕하세요! <span class="greeting-name">관리자</span>님, 오늘도 좋은 하루 보내세요!
        </h1>
        
        <div class="top-actions-wrapper">
          <div class="search-bar-container">
            <input type="text" placeholder="주식종목 검색" class="search-input">
            <label class="search-btn">검색</label>
          </div>
          
          <div class="mini-index-list custom-scrollbar">
            <div v-for="idx in marketIndices" :key="idx.name" class="mini-index-card">
              <span class="mini-index-name">{{ idx.name }}</span>
              <span class="mini-index-value">{{ idx.value }}</span>
              <span class="mini-index-change" :class="idx.change > 0 ? 'plus' : 'minus'">
                {{ idx.change > 0 ? '▲' : '▼' }} {{ Math.abs(idx.change) }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Dashboard Header/Actions -->
    <div class="dashboard-section-header">
      <div class="dashboard-title-group">
        <h2 class="dashboard-title">DASHBOARD</h2>
        <p class="dashboard-subtitle">위젯을 편집하여 나만의 대시보드를 구성하세요.</p>
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
          :row-height="400"
          :is-draggable="isEditMode"
          :is-resizable="isEditMode"
          :vertical-compact="true"
          :margin="[20, 20]"
          :use-css-transforms="true"
          :responsive="true"
          class="grid-board-layout"
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
            class="widget-grid-item"
            @resized="onResized"
            @moved="onMoved"
          >
            <Widget 
              :title="item.title"
              :is-edit-mode="isEditMode"
              @remove="handleRemoveWidget(item.i)"
              @update:title="handleUpdateTitle(item.i, $event)"
            >
              <!-- Market Indicators -->
              <div v-if="item.type && item.type.startsWith('market')" class="market-widget">
                <div class="widget-stat-group">
                  <div>
                    <div class="widget-label">현재가</div>
                    <div class="widget-main-value">
                      {{ item.type === 'market-kospi' ? '2,562.14' : item.type === 'market-kosdaq' ? '842.12' : '15,215.12' }}
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="widget-change-tag plus">▲ 0.85%</div>
                    <div class="widget-caption">전일대비</div>
                  </div>
                </div>
                <div class="sparkline-box overflow-visible">
                  <Sparkline :data="getRandomData()" :color="'#ef4444'" />
                </div>
              </div>

              <!-- CRM Widgets -->
              <div v-if="item.type && item.type.startsWith('crm')" class="crm-widget">
                <div class="widget-stat-group">
                  <div>
                    <div class="widget-label">통계</div>
                    <div v-if="item.type === 'crm-count'" class="widget-main-value">1,425명</div>
                    <div v-if="item.type === 'crm-aum'" class="widget-main-value">₩8.2B</div>
                  </div>
                </div>
                <div class="widget-change-tag plus">
                  <i-trending-up :size="14" />
                  <span>↑ 5.2%</span>
                  <span class="widget-caption">이번주</span>
                </div>
              </div>

              <!-- Commodity / Crypto -->
              <div v-if="item.type && (item.type.startsWith('commodity') || item.type.startsWith('crypto'))" class="asset-widget">
                <div class="widget-stat-group">
                  <div>
                    <div class="widget-label">{{ item.type.startsWith('crypto') ? 'Symbol' : 'Asset' }}</div>
                    <div class="widget-sub-value">{{ item.title }}</div>
                  </div>
                  <div class="text-right">
                    <div class="widget-main-value">
                      {{ item.type === 'commodity-wti' ? '$74.12' : item.type === 'crypto-btc' ? '$42,500' : '$2,025' }}
                    </div>
                    <div class="widget-change-tag minus">▼ 1.2%</div>
                  </div>
                </div>
                <div class="sparkline-box overflow-visible">
                  <Sparkline :data="getRandomData()" :color="item.type.startsWith('commodity') ? '#3b82f6' : '#f59e0b'" />
                </div>
              </div>

              <!-- News / Invest / AI Picks -->
              <div v-if="item.type && (item.type.startsWith('news') || item.type.startsWith('invest') || item.type.startsWith('ai-pick'))" class="list-widget">
                <ul class="list-widget-ul">
                  <li v-for="n in 6" :key="n" class="list-item-li">
                    <span class="list-item-dot"></span>
                    <span class="list-item-text">
                      {{ item.title }} 분석결과 리포트 {{ n }}호 발간안내...
                    </span>
                  </li>
                </ul>
              </div>

              <!-- AI Issue Bubble Chart -->
              <div v-if="item.type === 'ai-bubble'" class="bubble-chart-widget">
                <BubbleChart />
              </div>

              <!-- Default Fallback -->
              <div v-if="!item.type" class="widget-inner-content">
                <div>
                  <div class="widget-label">기본정보</div>
                  <div class="widget-main-value">데이터 없음</div>
                </div>
                <div class="widget-caption">항목을 선택해주세요.</div>
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
import BubbleChart from '@/components/BubbleChart.vue'
import Sparkline from '@/components/Sparkline.vue'

export default {
  components: {
    BubbleChart,
    Sparkline
  },
  data() {
    return {
      localLayout: [],
      marketIndices: [
        { name: '코스피', value: '2,562.14', change: 0.85 },
        { name: '코스닥', value: '842.12', change: -0.32 },
        { name: '나스닥', value: '15,215.12', change: 1.25 },
        { name: 'S&P 500', value: '4,842.10', change: 0.45 },
        { name: '다우존스', value: '38,124.50', change: 0.12 }
      ]
    }
  },
  mounted() {
    this.$store.dispatch('fetchWidgets');
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
    getRandomData() {
      return Array.from({ length: 20 }, () => Math.floor(Math.random() * 50) + 50);
    },
    onLayoutUpdated(newLayout) {
      this.$store.commit('UPDATE_WIDGETS', JSON.parse(JSON.stringify(newLayout)));
      this.$store.dispatch('saveWidgets');
    },
    onResized(i, newH, newW, newHPx, newWPx) {
    },
    onMoved(i, newX, newY) {
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
  border-radius: 2rem !important;
}
</style>
