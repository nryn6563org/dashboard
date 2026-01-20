<template>
  <header class="header-main">
    <div class="header-left">
      <button 
        @click="$store.commit('TOGGLE_LNB')"
        class="menu-toggle-btn"
      >
        <i-menu :size="20" />
      </button>
      <div class="logo-container">
        <div class="logo-icon">
          <i-layout-dashboard :size="20" />
        </div>
        <span>대시보드</span>
      </div>
    </div>

    <div class="header-right">
      <ThemeSwitcher />
      <div class="header-divider"></div>
      <button class="user-profile-btn group">
        <div class="user-avatar-container">
          <i-user :size="18" />
        </div>
        <span class="user-name">관리자</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
@import '@/assets/css/components/header.css';
</style>
