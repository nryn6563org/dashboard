<template>
  <div class="layout-wrapper" :class="theme">
    <Header />
    <div class="content-container">
      <LNB />
      <main 
        class="main-content"
        :class="{ 'lnb-open-content': isLnbOpen }"
      >
        <div class="main-container-p">
          <Nuxt />
        </div>
      </main>
      
      <!-- Right Side Drawers -->
      <transition name="drawer">
        <div 
          v-if="activeDrawer" 
          v-click-outside="closeDrawer"
          class="drawer-sidebar"
        >
          <div class="drawer-inner">
            <div class="drawer-header">
              <h3 class="drawer-title">{{ drawerTitle }}</h3>
              <button @click="closeDrawer" class="drawer-close-btn">
                <i-x :size="20" />
              </button>
            </div>
            
            <div class="drawer-content">
              <!-- Widget Selection View -->
              <div v-if="activeDrawer === 'widget'" class="drawer-widget-view">
                <!-- Vertical Category Nav like LNB -->
                <nav class="drawer-category-nav">
                  <div class="drawer-category-menu">
                    <div 
                      v-for="catData in availableWidgets" :key="catData.category"
                      class="category-menu-item"
                      :class="{ 'active': currentCategory === catData.category }"
                      @click="currentCategory = catData.category"
                    >
                      <div class="category-icon-wrap">
                        <component :is="getCategoryIcon(catData.category)" :size="20" />
                      </div>
                      <span class="category-name">{{ catData.category }}</span>
                    </div>
                  </div>
                </nav>

                <!-- Sub-titles and Horizontal Swipe for items -->
                <div class="drawer-widget-scroll-area custom-scrollbar">
                  <div 
                    v-for="sub in currentSubCategories" 
                    :key="sub.name"
                    class="drawer-subcategory-group"
                  >
                    <h4 class="subcategory-name">{{ sub.name }}</h4>
                    <div class="horizontal-widget-swipe custom-scrollbar">
                      <button 
                        v-for="w in sub.items" :key="w.type"
                        class="drawer-item-btn group"
                        :disabled="isWidgetOnBoard(w.type)"
                        :class="{ 'opacity-50 cursor-not-allowed grayscale': isWidgetOnBoard(w.type) }"
                        @click="addWidget(w)"
                      >
                        <div class="drawer-item-icon">
                          <component :is="getWidgetIcon(w)" :size="24" />
                        </div>
                        <div class="drawer-item-title">{{ w.title }}</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Systems Settings View -->
              <div v-if="activeDrawer === 'settings'" class="drawer-settings-view">
                <p class="drawer-description">사이드바 메뉴와 시스템 설정을 관리합니다.</p>
                
                <div class="settings-section">
                  <div class="settings-group">
                    <h4 class="settings-title">현재 활성 메뉴</h4>
                    <div class="settings-list">
                      <div v-for="item in menuItems" :key="item.path" class="settings-item">
                        <div class="settings-item-info">
                          <component :is="`i-${item.icon}`" :size="16" />
                          <span class="settings-item-name">{{ item.name }}</span>
                        </div>
                        <button v-if="item.path !== '/'" @click="removeMenuItem(item.path)" class="settings-remove-btn">
                          <i-trash2 :size="14" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="settings-add-wrap">
                    <h4 class="settings-title">새 메뉴 추가</h4>
                    <div class="flex flex-col gap-3">
                      <input v-model="newItem.name" type="text" placeholder="메뉴 이름" class="drawer-input">
                      <input v-model="newItem.path" type="text" placeholder="경로 (예: /analytics)" class="drawer-input">
                      <select v-model="newItem.icon" class="drawer-input">
                        <option v-for="icon in availableIcons" :key="icon" :value="icon">{{ icon }}</option>
                      </select>
                      <button @click="addMenuItem" class="settings-add-btn">메뉴 추가</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    
    <!-- News Source Selection Modal -->
    <div v-if="isNewsModalOpen" class="modal-overlay">
      <div class="modal-card">
        <h3 class="modal-title">뉴스 소스 선택</h3>
        <p class="modal-desc">대시보드에 표시할 뉴스 채널을 선택해 주세요.</p>
        <div class="modal-grid">
          <label v-for="source in newsSources" :key="source" class="modal-item">
            <input type="checkbox" v-model="selectedNewsSources" :value="source">
            <span>{{ source }}</span>
          </label>
        </div>
        <div class="modal-actions">
          <button @click="isNewsModalOpen = false" class="modal-btn cancel">취소</button>
          <button @click="confirmNewsAdd" class="modal-btn confirm">위젯 추가</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentCategory: '시장지수',
      categoryIconMap: {
        '시장지수': 'i-trending-up',
        '환율/원자재': 'i-dollar-sign',
        '가상자산': 'i-bitcoin',
        '고객/뉴스': 'i-newspaper'
      },
      availableIcons: [
        'layout-dashboard', 'users', 'pie-chart', 'bell', 'calendar', 'message-square', 'search', 'trending-up', 'briefcase', 'zap', 'signal'
      ],
      newItem: { name: '', path: '', icon: 'layout-dashboard' },
      isNewsModalOpen: false,
      selectedNewsSources: [],
      pendingWidget: null,
      newsSources: ['연합뉴스', '매일경제', '한국경제', 'SBS 뉴스', 'KBS 뉴스', 'YTN', '블룸버그']
    }
  },
  computed: {
    isLnbOpen() { return this.$store.state.isLnbOpen },
    activeDrawer() { return this.$store.state.activeDrawer },
    menuItems() { return this.$store.state.menuItems },
    availableWidgets() { return this.$store.state.availableWidgets },
    widgets() { return this.$store.state.widgets },
    theme() { return this.$store.state.theme },
    currentSubCategories() {
      const cat = this.availableWidgets.find(w => w.category === this.currentCategory)
      return cat ? cat.subCategories : []
    },
    drawerTitle() {
      if (this.activeDrawer === 'widget') return '위젯 추가'
      if (this.activeDrawer === 'settings') return '시스템 설정'
      return ''
    }
  },
  directives: {
    'click-outside': {
      bind(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event)
          }
        }
        setTimeout(() => {
          document.body.addEventListener('click', el.clickOutsideEvent)
        }, 0)
      },
      unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },
  methods: {
    getCategoryIcon(cat) {
      return this.categoryIconMap[cat] || 'i-grid'
    },
    getWidgetIcon(w) {
      if (w.icon) return `i-${w.icon}`
      return 'i-grid'
    },
    closeDrawer() {
      this.$store.commit('CLOSE_DRAWER')
    },
    isWidgetOnBoard(type) {
      return this.widgets.some(w => w.type === type)
    },
    addWidget(widget) {
      if (widget.type?.startsWith('news')) {
        this.pendingWidget = widget
        this.isNewsModalOpen = true
        return
      }
      this.confirmAddWidget(widget)
    },
    confirmNewsAdd() {
      if (this.selectedNewsSources.length === 0) {
        alert('최소 하나 이상의 채널을 선택해주세요.')
        return
      }
      const widget = {
        ...this.pendingWidget,
        sources: [...this.selectedNewsSources]
      }
      this.confirmAddWidget(widget)
      this.isNewsModalOpen = false
      this.selectedNewsSources = []
      this.pendingWidget = null
    },
    confirmAddWidget(widget) {
      const id = Date.now().toString()
      this.$store.commit('ADD_WIDGET', {
        ...widget,
        i: id, x: 0, y: Infinity
      })
    },
    addMenuItem() {
      if (this.newItem.name && this.newItem.path) {
        this.$store.commit('ADD_MENU_ITEM', { ...this.newItem })
        this.newItem.name = ''
        this.newItem.path = ''
        this.newItem.icon = 'layout-dashboard'
      }
    },
    removeMenuItem(path) {
      if (confirm('정말 삭제하시겠습니까?')) {
        this.$store.commit('REMOVE_MENU_ITEM', path)
      }
    }
  }
}
</script>

<style>
@import '@/assets/css/layout.css';

.drawer-enter-active, .drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
}
.drawer-enter {
  transform: translateX(100%);
  opacity: 0;
}
.drawer-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.lnb-open-content {
  margin-left: 260px; /* Matching LNB width */
}
</style>
