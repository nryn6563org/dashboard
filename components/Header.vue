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
      
      <div v-if="isLoggedIn" class="user-auth-wrap">
        <button class="user-profile-btn group">
          <div class="user-avatar-container">
            <i-user :size="18" />
          </div>
          <span class="user-name">관리자</span>
        </button>
        <button @click="$store.commit('LOGOUT')" class="auth-btn logout-btn">
          로그아웃
        </button>
      </div>
      <div v-else class="user-auth-wrap">
        <button @click="$store.commit('LOGIN')" class="auth-btn login-btn">
          로그인
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    }
  }
}
</script>

<style scoped>
@import '@/assets/css/components/header.css';
</style>
