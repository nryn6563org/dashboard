<template>
  <aside 
    class="lnb-aside"
    :class="isOpen ? 'lnb-open' : 'lnb-closed'"
  >
    <div class="lnb-menu-wrapper">
      <div v-for="(item, index) in menuItems" :key="index" class="lnb-nav-group">
        <div 
          v-if="item.children"
          class="lnb-menu-item lnb-depth-1 has-children"
          @click="toggleExpand(item.name)"
        >
          <div class="lnb-menu-link-content">
            <component :is="`i-${item.icon}`" :size="20" class="lnb-icon" />
            <span class="lnb-menu-name">{{ item.name }}</span>
          </div>
          <component 
            :is="expandedMenus.includes(item.name) ? 'i-chevron-up' : 'i-chevron-down'" 
            :size="16" 
            class="lnb-arrow"
          />
        </div>
        <NuxtLink 
          v-else
          :to="item.path"
          class="lnb-menu-item lnb-depth-1"
          :class="{ 'active': $route.path === item.path }"
        >
          <div class="lnb-menu-link-content">
            <component :is="`i-${item.icon}`" :size="20" class="lnb-icon" />
            <span class="lnb-menu-name">{{ item.name }}</span>
          </div>
        </NuxtLink>

        <!-- Level 2 -->
        <transition name="slide">
          <div v-if="item.children && expandedMenus.includes(item.name)" class="lnb-submenu lnb-depth-2-wrap">
            <div v-for="(sub, subIdx) in item.children" :key="subIdx" class="lnb-nav-group">
              <div 
                v-if="sub.children"
                class="lnb-menu-item lnb-depth-2 has-children"
                @click="toggleExpand(sub.name)"
              >
                <div class="lnb-menu-link-content">
                  <component v-if="sub.icon" :is="`i-${sub.icon}`" :size="18" class="lnb-icon" />
                  <span class="lnb-menu-name">{{ sub.name }}</span>
                </div>
                <component 
                  :is="expandedMenus.includes(sub.name) ? 'i-chevron-up' : 'i-chevron-down'" 
                  :size="14" 
                  class="lnb-arrow"
                />
              </div>
              <NuxtLink 
                v-else
                :to="sub.path"
                class="lnb-menu-item lnb-depth-2"
                :class="{ 'active': $route.path === sub.path }"
              >
                <div class="lnb-menu-link-content">
                  <component v-if="sub.icon" :is="`i-${sub.icon}`" :size="18" class="lnb-icon" />
                  <span class="lnb-menu-name">{{ sub.name }}</span>
                </div>
              </NuxtLink>

              <!-- Level 3 -->
              <transition name="slide">
                <div v-if="sub.children && expandedMenus.includes(sub.name)" class="lnb-submenu lnb-depth-3-wrap">
                  <NuxtLink 
                    v-for="(low, lowIdx) in sub.children" 
                    :key="lowIdx"
                    :to="low.path"
                    class="lnb-menu-item lnb-depth-3"
                    :class="{ 'active': $route.path === low.path }"
                  >
                    <div class="lnb-menu-link-content">
                      <component v-if="low.icon" :is="`i-${low.icon}`" :size="14" class="lnb-icon" />
                      <span class="lnb-menu-name">{{ low.name }}</span>
                    </div>
                  </NuxtLink>
                </div>
              </transition>
            </div>
          </div>
        </transition>
      </div>
    </div>
    
    <div class="lnb-footer">
      <button 
        @click="$store.commit('SET_DRAWER', 'settings')"
        class="lnb-settings-btn"
      >
        <i-settings :size="20" class="lnb-icon" />
        <span class="lnb-menu-name">설정</span>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      expandedMenus: []
    }
  },
  computed: {
    isOpen() {
      return this.$store.state.isLnbOpen
    },
    menuItems() {
      return this.$store.state.menuItems
    }
  },
  methods: {
    toggleExpand(name) {
      if (this.expandedMenus.includes(name)) {
        this.expandedMenus = this.expandedMenus.filter(m => m !== name)
      } else {
        this.expandedMenus.push(name)
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/components/lnb.css';
</style>
