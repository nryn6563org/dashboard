<template>
  <aside 
    class="lnb-aside"
    :class="isOpen ? 'lnb-open' : 'lnb-closed'"
  >
    <div class="lnb-menu-container">
      <NuxtLink 
        v-for="item in menuItems" 
        :key="item.path"
        :to="item.path"
        class="lnb-menu-item group"
        :class="$route.path === item.path ? 'lnb-menu-item-active' : 'lnb-menu-item-inactive'"
      >
        <component 
          :is="`i-${item.icon}`" 
          :size="20" 
          :class="$route.path === item.path ? 'lnb-icon-active' : 'lnb-icon-inactive'" 
        />
        <span class="lnb-menu-name">{{ item.name }}</span>
      </NuxtLink>
    </div>
    
    <div class="lnb-footer">
      <button 
        @click="$store.commit('SET_DRAWER', 'settings')"
        class="lnb-settings-btn group"
      >
        <i-settings :size="20" class="lnb-settings-icon" />
        <span class="lnb-menu-name">설정</span>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    isOpen() {
      return this.$store.state.isLnbOpen
    },
    menuItems() {
      return this.$store.state.menuItems
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/components/lnb.css';
</style>
