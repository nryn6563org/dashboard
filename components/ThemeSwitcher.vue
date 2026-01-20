<template>
  <div class="theme-switcher-container">
    <button 
      v-for="opt in options" 
      :key="opt.id"
      @click="setTheme(opt.id)"
      class="theme-opt-btn"
      :class="currentTheme === opt.id ? 'theme-opt-active' : 'theme-opt-inactive'"
      :title="opt.name"
    >
      <component :is="`i-${opt.icon}`" :size="18" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { id: 'light', name: '라이트', icon: 'sun' },
        { id: 'dark', name: '다크', icon: 'moon' },
        { id: 'system', name: '시스템', icon: 'monitor' }
      ]
    }
  },
  computed: {
    currentTheme() {
      return this.$store.state.theme
    }
  },
  mounted() {
    this.applyTheme(this.currentTheme)
    
    // Watch for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', () => {
      if (this.currentTheme === 'system') {
        this.applyTheme('system')
      }
    })
  },
  methods: {
    setTheme(theme) {
      this.$store.commit('SET_THEME', theme)
      this.applyTheme(theme)
    },
    applyTheme(theme) {
      const root = document.documentElement
      let actualTheme = theme
      
      if (theme === 'system') {
        actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      
      if (actualTheme === 'dark') {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/components/theme-switcher.css';
</style>
