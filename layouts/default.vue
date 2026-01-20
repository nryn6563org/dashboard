<template>
  <div class="layout-wrapper">
    <Header />
    <div class="content-container">
      <LNB />
      <main 
        class="main-content"
        :class="isLnbOpen ? 'ml-64' : 'ml-0'"
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
            
            <!-- Drawer Content Placeholder -->
            <div class="drawer-content">
              <div v-if="activeDrawer === 'widget'">
                <p class="drawer-description">보드에 추가할 위젯을 선택하세요.</p>
                <div class="drawer-grid">
                  <button 
                    v-for="i in 5" :key="i"
                    class="drawer-item-btn group"
                    @click="addWidget(i)"
                  >
                    <div class="drawer-item-title">샘플 위젯 {{ i }}</div>
                    <div class="drawer-item-desc text-slate-500">300x300 단위 콘텐츠</div>
                  </button>
                </div>
              </div>
              <div v-if="activeDrawer === 'settings'">
                <p class="drawer-description">사이드바 메뉴를 관리합니다.</p>
                
                <div class="space-y-6">
                  <!-- Current Menu Items -->
                  <div>
                    <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">현재 메뉴</h4>
                    <div class="space-y-2">
                      <div v-for="item in menuItems" :key="item.path" class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div class="flex items-center gap-3">
                          <component :is="`i-${item.icon}`" :size="16" class="text-slate-400" />
                          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ item.name }}</span>
                        </div>
                        <button 
                          v-if="item.path !== '/'"
                          @click="removeMenuItem(item.path)" 
                          class="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <i-trash2 :size="14" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Add New Menu Item -->
                  <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">새 메뉴 추가</h4>
                    <div class="space-y-3">
                      <input v-model="newItem.name" type="text" placeholder="메뉴 이름" class="drawer-input">
                      <input v-model="newItem.path" type="text" placeholder="경로 (예: /analytics)" class="drawer-input">
                      <select v-model="newItem.icon" class="drawer-input">
                        <option value="layout-dashboard">대시보드</option>
                        <option value="users">사용자</option>
                        <option value="pie-chart">통계</option>
                        <option value="bell">알림</option>
                        <option value="calendar">일정</option>
                        <option value="message-square">메시지</option>
                        <option value="search">검색</option>
                      </select>
                      <button @click="addMenuItem" class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all active:scale-95">
                        추가하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: {
        name: '',
        path: '',
        icon: 'layout-dashboard'
      }
    }
  },
  computed: {
    isLnbOpen() { return this.$store.state.isLnbOpen },
    activeDrawer() { return this.$store.state.activeDrawer },
    menuItems() { return this.$store.state.menuItems },
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
          // If the drawer is just opening, we might want to skip the first click
          // but usually .stop on the trigger is better.
          // Here we check if the click was outside the element
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event)
          }
        }
        // Use timeout to avoid immediate closing when opening
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
    closeDrawer() {
      this.$store.commit('CLOSE_DRAWER')
    },
    addWidget(type) {
      const id = Date.now().toString()
      this.$store.commit('ADD_WIDGET', {
        i: id, x: 0, y: Infinity, w: 3, h: 1, title: `위젯 ${type}`
      })
      this.closeDrawer()
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
</style>
