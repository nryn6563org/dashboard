<template>
  <div id="lnb">
    <div class="lnb-content">
      <div class="lnb-logo">
      </div>
      <div class="lnb-menu">
        <div class="dark">
          <button @click="toggleMode">
            <span v-if="$colorMode.value === 'dark'">🌙</span>
            <span v-else>☀️</span>
            
            <span class="toggle-txt">
              {{ $colorMode.value == 'dark' ? '다크모드' : '라이트 모드' }}
            </span>
          </button>
        </div>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="lnb-toggle">
      <button>
        <span class="material-symbols-rounded">
          menu
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleMode() {
      // light -> dark -> light 순으로 전환
      this.$colorMode.preference = this.$colorMode.value === 'light' ? 'dark' : 'light'
    }
  }
}
</script>

<style scoped>
#lnb {
  @apply fixed top-[80px] left-0 w-[300px] h-[calc(100%-80px)] flex
}
.lnb-content{
  @apply w-[260px] h-full border-r border-gray-200
}
.lnb-toggle{
  @apply pt-5
}
.lnb-toggle button{
  @apply border-l-0 border-[1px] border-gray-200 flex w-[30px] h-[35px] justify-center items-center rounded-[0_4px_4px_0]
}
.dark button{
  @apply flex items-center space-x-2 w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition
}
.dark button .toggle-txt{
  @apply text-sm font-medium text-gray-700 dark:text-gray-200
}
</style>