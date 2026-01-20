<template>
  <header id="header">
    <div class="header-left">
      <button id="lnb-toggle" @click="$emit('toggle-lnb')">
        <span class="material-symbols-rounded">menu</span>
      </button>
      <h1 class="logo">DASHBOARD</h1>
    </div>

    <div class="header-right">
      <button id="edit-mode-toggle" :class="{ 'is-editing': isEditMode }" @click="$emit('toggle-edit')">
        <span class="material-symbols-rounded">
          {{ isEditMode ? 'check_circle' : 'edit_dashboard' }}
        </span>
        <span class="btn-text">{{ isEditMode ? '저장하기' : '위젯 편집' }}</span>
      </button>

      <button id="dark-mode-toggle" @click="cycleColorMode">
        <span class="material-symbols-rounded">{{ modeIcon }}</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    isEditMode: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    modeIcon() {
      const mode = this.$colorMode.preference
      if (mode === 'system') { return 'desktop_windows' }
      if (mode === 'dark') { return 'dark_mode' }
      return 'light_mode'
    }
  },
  methods: {
    cycleColorMode() {
      const modes = ['system', 'light', 'dark']
      const currentIndex = modes.indexOf(this.$colorMode.preference)
      const nextIndex = (currentIndex + 1) % modes.length
      this.$colorMode.preference = modes[nextIndex]
    }
  }
}
</script>

<style scoped>
  @import url('@/assets/css/header.css');
</style>