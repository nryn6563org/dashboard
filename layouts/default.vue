<template>
  <div id="wrap">
    <DefaultHeader />
    <Nuxt />
  </div>
</template>

<script>
import DefaultHeader from '~/components/DefaultHeader.vue'

export default {
  components: {
    DefaultHeader
  }
}
</script>
<style scoped>
  #wrap{
    @apply w-full h-full min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100
  }
</style>